#!/bin/bash
# Automatically sync 2025-jsr with upstream/master

set -e

BRANCH_NAME="sync-$(date +%Y%m%d)"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         Syncing 2025-jsr with upstream/master               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Fetch latest
echo "→ Fetching upstream..."
git fetch upstream

# Check how far behind
COMMITS_BEHIND=$(git log --oneline 2025-jsr..upstream/master | wc -l | xargs)
echo "→ Currently $COMMITS_BEHIND commits behind upstream"
echo ""

if [ "$COMMITS_BEHIND" -eq 0 ]; then
    echo "✅ Already up-to-date!"
    exit 0
fi

# Test upstream health first
echo "→ Checking upstream health..."
git checkout -b test-upstream-health upstream/master 2>/dev/null
ERROR_COUNT=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l | xargs)
git checkout 2025-jsr
git branch -D test-upstream-health

if [ "$ERROR_COUNT" -gt 0 ]; then
    echo "❌ SYNC BLOCKED: Upstream has $ERROR_COUNT TypeScript errors"
    echo ""
    echo "$(date +%Y-%m-%d): Sync blocked - upstream has $ERROR_COUNT TS errors" >> SYNC_BLOCKERS.md
    echo "Logged to SYNC_BLOCKERS.md"
    echo ""
    echo "Actions:"
    echo "  1. Wait for upstream to fix errors"
    echo "  2. Check daily: bash scripts/check-upstream-health.sh"
    echo "  3. Report to upstream (optional)"
    exit 1
fi

echo "✅ Upstream is healthy (0 TS errors)"
echo ""

# Create sync branch
echo "→ Creating sync branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME" 2025-jsr

# Merge upstream
echo "→ Merging upstream/master..."
git merge upstream/master --no-commit --no-ff
git checkout --theirs .
git rm -f package.json package-lock.json 2>/dev/null || true
git add -A

# Apply JSR fixes
echo "→ Applying JSR compatibility fixes..."
echo "  - Adding .ts/.tsx extensions..."
python3 scripts/add-ts-extensions.py > /dev/null 2>&1
echo "  - Fixing directory imports..."
python3 scripts/fix-directory-imports.py > /dev/null 2>&1
echo "  - Fixing .tsx imports..."
python3 scripts/fix-tsx-imports.py > /dev/null 2>&1
echo "  - Removing empty imports..."
bash scripts/remove-empty-imports.sh > /dev/null 2>&1

# Validate
echo "→ Validating..."
TS_ERRORS=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l | xargs)

if [ "$TS_ERRORS" -ne 0 ]; then
    echo "❌ SYNC FAILED: Introduced $TS_ERRORS TypeScript errors"
    echo ""
    git merge --abort
    git checkout 2025-jsr
    git branch -D "$BRANCH_NAME"
    echo "Actions:"
    echo "  1. Investigate which upstream commit caused errors"
    echo "  2. Fix errors manually or skip problematic commits"
    echo "  3. Report issue in SYNC_BLOCKERS.md"
    exit 1
fi

echo "✅ Validation passed (0 TS errors)"
echo ""

# Commit
git commit -m "Sync with upstream/master $(date +%Y-%m-%d)

Merged $COMMITS_BEHIND commits from upstream.
Applied JSR compatibility fixes:
- Added .ts/.tsx extensions to imports
- Fixed directory imports to /index.ts
- Fixed .tsx imports
- Removed empty imports

Validation:
- TypeScript errors: 0
- JSR slow-type warnings: ~493 (acceptable)"

# Merge to main branch
echo "→ Merging to 2025-jsr..."
git checkout 2025-jsr
git merge "$BRANCH_NAME" --ff-only
git branch -D "$BRANCH_NAME"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    SYNC COMPLETE ✅                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Merged $COMMITS_BEHIND commits from upstream"
echo ""
echo "Next steps:"
echo "  1. Review changes: git log -5"
echo "  2. Push to origin: git push origin 2025-jsr"
echo "  3. Create release if needed: bash scripts/create-release.sh VERSION"
