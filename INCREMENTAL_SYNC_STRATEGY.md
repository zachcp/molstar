# Incremental Sync Strategy for 2025-jsr Branch

**Last Updated:** 2025-12-28  
**Strategy:** Continuous tracking with release branches

---

## Philosophy

The `2025-jsr` branch is a **continuous JSR-compatible mirror** of `upstream/master`:

- **2025-jsr**: Always tracks latest upstream/master with JSR compatibility
- **Release branches**: Created from 2025-jsr when you want to publish specific versions

**Why this approach:**
- Upstream development continues independently
- We stay synchronized with all upstream changes
- Publishing is decoupled from syncing
- Can publish any version at any time by creating a release branch

---

## Branch Structure

```
upstream/master (Molstar official)
    ↓ (continuous sync)
2025-jsr (JSR-compatible, tracks master)
    ↓ (create release branch when ready to publish)
release/jsr-v5.5.0 (frozen, publishable to JSR)
release/jsr-v5.4.0 (frozen, publishable to JSR)
```

### Branch Purposes

| Branch | Purpose | Updates | Publishing |
|--------|---------|---------|------------|
| `upstream/master` | Official Molstar | Upstream team | npm/GitHub |
| `2025-jsr` | JSR-compatible tracking | Daily/Weekly sync | Never directly |
| `release/jsr-vX.X.X` | Frozen release | Never | JSR publish from here |

---

## Continuous Sync Workflow

### Daily/Weekly: Sync 2025-jsr with Upstream

**Goal:** Keep `2025-jsr` within 5-10 commits of `upstream/master`

```bash
# 1. Fetch latest upstream
git fetch upstream

# 2. Check commits behind
git log --oneline 2025-jsr..upstream/master | wc -l

# 3. If < 20 commits, sync immediately
git checkout 2025-jsr
git pull  # Ensure local is up-to-date

# 4. Create sync branch
git checkout -b sync-$(date +%Y%m%d) 2025-jsr

# 5. Merge upstream (take their version for conflicts)
git merge upstream/master --no-commit --no-ff
git checkout --theirs .
git rm -f package.json package-lock.json 2>/dev/null || true
git add -A

# 6. Apply JSR compatibility fixes
python3 scripts/add-ts-extensions.py
python3 scripts/fix-directory-imports.py
python3 scripts/fix-tsx-imports.py
bash scripts/remove-empty-imports.sh

# 7. Test (CRITICAL - must pass)
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
# Must be 0

# 8. If tests pass, commit and merge
git commit -m "Sync with upstream/master $(date +%Y-%m-%d)

Merged latest upstream changes with JSR compatibility.
TypeScript errors: 0
JSR slow-type warnings: ~493 (acceptable)"

git checkout 2025-jsr
git merge sync-$(date +%Y%m%d) --ff-only
git branch -D sync-$(date +%Y%m%d)
git push origin 2025-jsr
```

### When Sync Fails (Upstream Has Type Errors)

If upstream introduces TypeScript errors that block JSR:

```bash
# Abort the sync
git merge --abort
git checkout 2025-jsr
git branch -D sync-$(date +%Y%m%d)

# Document the blocker
echo "$(date +%Y-%m-%d): Sync blocked - upstream has X TS errors" >> SYNC_BLOCKERS.md

# Options:
# 1. Wait for upstream to fix (check daily)
# 2. Report to upstream (if they care about strict types)
# 3. Fix errors ourselves if simple (< 10 errors)
# 4. Stay on current version until resolved
```

**Resume syncing** when upstream fixes the errors:
```bash
# Check daily if upstream is healthy again
git fetch upstream
git checkout -b test-upstream upstream/master
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
git checkout 2025-jsr && git branch -D test-upstream

# If 0 errors, resume sync workflow
```

---

## Release Branching Workflow

### When to Create a Release Branch

Create a release branch when:
- You want to publish a specific version to JSR
- Upstream tags a new release (e.g., v5.5.0)
- You need a stable version for production
- You want to test a specific version

### Creating a Release Branch

```bash
# Example: Publishing JSR v5.5.0 based on upstream v5.5.0

# 1. Ensure 2025-jsr is synced past upstream v5.5.0
git log --oneline 2025-jsr | grep "5.5.0"

# 2. Find the commit in 2025-jsr that corresponds to upstream v5.5.0
# (This is the merge commit that brought in v5.5.0)
git log --oneline --all --grep="5.5.0" | head -5

# 3. Create release branch from that commit
git checkout -b release/jsr-v5.5.0 <commit-hash-in-2025-jsr>

# 4. Update deno.json version
# Edit: "version": "5.5.0"
git add deno.json
git commit -m "Release: JSR v5.5.0"

# 5. Test publishing (dry run)
deno publish --dry-run --allow-slow-types

# 6. If successful, tag and push
git tag jsr-v5.5.0
git push origin release/jsr-v5.5.0 --tags

# 7. Publish to JSR
deno publish --allow-slow-types

# 8. Go back to tracking branch
git checkout 2025-jsr
```

### Alternative: Release from Latest

If you want to publish "whatever is latest right now":

```bash
# 1. Create release from current 2025-jsr HEAD
git checkout -b release/jsr-v5.5.0 2025-jsr

# 2. Update version, test, publish (same as above)
```

### Managing Multiple Releases

```bash
# List all releases
git branch -r | grep release/jsr

# Example output:
origin/release/jsr-v5.0.0
origin/release/jsr-v5.1.0
origin/release/jsr-v5.2.0
origin/release/jsr-v5.5.0

# Each release is frozen and independently publishable
```

### Patching a Release

If you need to fix a bug in a specific published version:

```bash
# 1. Check out the release branch
git checkout release/jsr-v5.5.0

# 2. Create patch branch
git checkout -b patch/jsr-v5.5.1

# 3. Apply fix
# ... make changes ...

# 4. Test
deno check --all src/mod.ts
deno publish --dry-run --allow-slow-types

# 5. Update version to v5.5.1
# Edit deno.json: "version": "5.5.1"

# 6. Commit and merge back to release branch
git commit -m "Patch: Fix issue X in v5.5.1"
git checkout release/jsr-v5.5.0
git merge patch/jsr-v5.5.1 --ff-only

# 7. Tag and publish
git tag jsr-v5.5.1
deno publish --allow-slow-types

# 8. Optionally merge fix back to 2025-jsr
git checkout 2025-jsr
git cherry-pick <patch-commit-hash>
```

---

## Automation Scripts

### 1. Daily Sync Script (`scripts/sync-upstream.sh`)

```bash
#!/bin/bash
# Automatically sync 2025-jsr with upstream/master

set -e

BRANCH_NAME="sync-$(date +%Y%m%d)"

echo "Starting sync of 2025-jsr with upstream/master..."

# Fetch latest
git fetch upstream

# Check how far behind
COMMITS_BEHIND=$(git log --oneline 2025-jsr..upstream/master | wc -l | xargs)
echo "Currently $COMMITS_BEHIND commits behind upstream"

if [ "$COMMITS_BEHIND" -eq 0 ]; then
    echo "✅ Already up-to-date!"
    exit 0
fi

# Test upstream health first
echo "Checking upstream health..."
git checkout -b test-upstream-health upstream/master
ERROR_COUNT=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l | xargs)
git checkout 2025-jsr
git branch -D test-upstream-health

if [ "$ERROR_COUNT" -gt 0 ]; then
    echo "❌ Upstream has $ERROR_COUNT TypeScript errors - BLOCKING sync"
    echo "$(date +%Y-%m-%d): Sync blocked - upstream has $ERROR_COUNT TS errors" >> SYNC_BLOCKERS.md
    exit 1
fi

echo "✅ Upstream is healthy (0 TS errors)"

# Create sync branch
git checkout -b "$BRANCH_NAME" 2025-jsr

# Merge upstream
echo "Merging upstream/master..."
git merge upstream/master --no-commit --no-ff
git checkout --theirs .
git rm -f package.json package-lock.json 2>/dev/null || true
git add -A

# Apply JSR fixes
echo "Applying JSR compatibility fixes..."
python3 scripts/add-ts-extensions.py
python3 scripts/fix-directory-imports.py
python3 scripts/fix-tsx-imports.py
bash scripts/remove-empty-imports.sh

# Validate
echo "Validating..."
TS_ERRORS=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l | xargs)

if [ "$TS_ERRORS" -ne 0 ]; then
    echo "❌ Sync introduced $TS_ERRORS TypeScript errors"
    git merge --abort
    git checkout 2025-jsr
    git branch -D "$BRANCH_NAME"
    exit 1
fi

# Commit
git commit -m "Sync with upstream/master $(date +%Y-%m-%d)

Merged $COMMITS_BEHIND commits from upstream.
Applied JSR compatibility fixes.
TypeScript errors: 0
JSR slow-type warnings: ~493 (acceptable)"

# Merge to main branch
git checkout 2025-jsr
git merge "$BRANCH_NAME" --ff-only
git branch -D "$BRANCH_NAME"

echo "✅ Sync complete! Merged $COMMITS_BEHIND commits"
echo "Run: git push origin 2025-jsr"
```

### 2. Create Release Script (`scripts/create-release.sh`)

```bash
#!/bin/bash
# Create a JSR release branch

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 5.5.0"
    exit 1
fi

VERSION=$1
RELEASE_BRANCH="release/jsr-v${VERSION}"

echo "Creating release branch: $RELEASE_BRANCH"

# Ensure on 2025-jsr
git checkout 2025-jsr
git pull

# Create release branch
git checkout -b "$RELEASE_BRANCH"

# Update deno.json version
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" deno.json
git add deno.json
git commit -m "Release: JSR v${VERSION}"

# Test
echo "Testing release..."
deno check --all src/mod.ts
deno publish --dry-run --allow-slow-types

if [ $? -eq 0 ]; then
    echo "✅ Release is ready!"
    echo ""
    echo "Next steps:"
    echo "  1. Review changes"
    echo "  2. git push origin $RELEASE_BRANCH"
    echo "  3. git tag jsr-v${VERSION}"
    echo "  4. git push origin --tags"
    echo "  5. deno publish --allow-slow-types"
else
    echo "❌ Release validation failed"
    exit 1
fi
```

### 3. Check Sync Status Script (`scripts/check-sync-status.sh`)

```bash
#!/bin/bash
# Check how far behind 2025-jsr is from upstream

git fetch upstream

COMMITS_BEHIND=$(git log --oneline 2025-jsr..upstream/master | wc -l | xargs)
LAST_SYNC=$(git log -1 --format="%ci" 2025-jsr)

echo "╔════════════════════════════════════════╗"
echo "║     2025-jsr Sync Status               ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Commits behind upstream:  $COMMITS_BEHIND"
echo "Last sync:                $LAST_SYNC"
echo ""

if [ "$COMMITS_BEHIND" -eq 0 ]; then
    echo "✅ Up-to-date with upstream"
elif [ "$COMMITS_BEHIND" -lt 10 ]; then
    echo "✅ Nearly up-to-date ($COMMITS_BEHIND commits)"
elif [ "$COMMITS_BEHIND" -lt 50 ]; then
    echo "⚠️  Falling behind ($COMMITS_BEHIND commits)"
    echo "Recommendation: Run sync-upstream.sh"
else
    echo "❌ Significantly behind ($COMMITS_BEHIND commits)"
    echo "Recommendation: Plan catch-up merge"
fi
```

---

## Current State & Next Steps

### Current State (2025-12-28)

```
Common ancestor:  c10f9d8c7
2025-jsr:         dcc45826c (v5.0.0 era)
upstream/master:  e658a1194 (v5.5.0+)
Commits behind:   131
Blocker:          Upstream v5.5.0 has 132 TS errors
```

### Catch-Up Plan

Since we're 131 commits behind AND upstream has errors, we need a phased approach:

#### Phase 1: Test Intermediate Versions

```bash
# Test each version to find last clean one
bash scripts/check-upstream-health.sh upstream/v5.4.0
bash scripts/check-upstream-health.sh upstream/v5.3.0
bash scripts/check-upstream-health.sh upstream/v5.2.0
bash scripts/check-upstream-health.sh upstream/v5.1.0
```

#### Phase 2: Sync to Last Clean Version

```bash
# Assuming v5.3.0 is clean
git checkout 2025-jsr
git merge upstream/v5.3.0 --no-commit --no-ff
# Apply JSR fixes
# Test and commit
```

#### Phase 3: Wait for Upstream Fix

```bash
# Monitor upstream daily
git fetch upstream --tags
git tag -l | tail -5

# When v5.5.1+ appears, check health
bash scripts/check-upstream-health.sh upstream/v5.5.1

# If clean, sync immediately
bash scripts/sync-upstream.sh
```

#### Phase 4: Resume Daily Sync

Once caught up to a clean version:
```bash
# Set up cron job (daily at 2 AM)
0 2 * * * cd /path/to/molstar && bash scripts/sync-upstream.sh
```

---

## Best Practices

### DO ✅

1. **Sync frequently** (daily or at least weekly)
2. **Always check upstream health** before syncing
3. **Test immediately** after every sync
4. **Create release branches** for publishing, never publish from 2025-jsr
5. **Keep 2025-jsr clean** - only JSR compatibility changes, no features
6. **Tag all releases** (jsr-v5.X.X)
7. **Document blockers** in SYNC_BLOCKERS.md
8. **Automate** with scripts and cron jobs

### DON'T ❌

1. **Never publish directly from 2025-jsr** - use release branches
2. **Never add features to 2025-jsr** - only JSR compatibility
3. **Never skip health checks** - always test upstream first
4. **Never merge if upstream has >10 TS errors** - wait for fix
5. **Never batch multiple days** of syncs - sync frequently
6. **Never ignore test failures** - investigate and fix or abort
7. **Never lose sync history** - keep clear commit messages

---

## Troubleshooting

### Problem: Sync introduces TypeScript errors

**Solution:**
```bash
# Abort merge
git merge --abort

# Check which upstream commit introduced errors
git bisect start
git bisect bad upstream/master
git bisect good 2025-jsr
# Test each commit until you find the culprit

# Options:
# 1. Skip that commit (cherry-pick around it)
# 2. Fix the error ourselves
# 3. Report to upstream
# 4. Wait for upstream fix
```

### Problem: Upstream is stuck with errors for weeks

**Solution:**
```bash
# Stay on current working version
# Continue development on 2025-jsr without syncing

# Create releases from current state
bash scripts/create-release.sh 5.0.1

# Monitor upstream weekly
# Resume syncing when they fix errors
```

### Problem: Need urgent upstream feature but can't sync

**Solution:**
```bash
# Cherry-pick specific commits
git cherry-pick <upstream-commit-with-feature>

# Apply JSR fixes only to that commit
# Test and commit

# Resume full sync when upstream is healthy
```

---

## Quick Reference

```bash
# Check sync status
bash scripts/check-sync-status.sh

# Sync with upstream
bash scripts/sync-upstream.sh

# Create release
bash scripts/create-release.sh 5.5.0

# Check upstream health
bash scripts/check-upstream-health.sh

# List releases
git branch -r | grep release/jsr
```

---

**Remember:** `2025-jsr` is always moving forward. Release branches are frozen snapshots for publishing.
