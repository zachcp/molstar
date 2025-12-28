#!/bin/bash
# Check upstream health for a specific commit or tag

COMMIT=${1:-upstream/master}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BRANCH_NAME="health-check-$TIMESTAMP"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║            Upstream Health Check                             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Checking: $COMMIT"
echo ""

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Create test branch
if ! git checkout -b "$BRANCH_NAME" "$COMMIT" 2>/dev/null; then
    echo "❌ Failed to checkout $COMMIT"
    echo ""
    echo "Possible issues:"
    echo "  - Invalid commit/tag reference"
    echo "  - Branch already exists"
    echo "  - Uncommitted changes"
    exit 1
fi

# Run type check
echo "→ Running TypeScript type check..."
ERROR_COUNT=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l | xargs)

# Log result
mkdir -p .logs
echo "$TIMESTAMP | $COMMIT | $ERROR_COUNT errors" >> .logs/upstream-health.log

# Clean up
git checkout "$CURRENT_BRANCH" 2>/dev/null
git branch -D "$BRANCH_NAME" 2>/dev/null

# Report
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Result: $ERROR_COUNT TypeScript errors"
echo ""

if [ "$ERROR_COUNT" -eq 0 ]; then
    echo "✅ HEALTHY - Safe to merge"
    echo ""
    echo "Actions:"
    echo "  1. Sync: bash scripts/sync-upstream.sh"
    echo "  2. Or merge specific version: git merge $COMMIT"
    exit 0
elif [ "$ERROR_COUNT" -lt 10 ]; then
    echo "⚠️  MINOR ISSUES - Review before merging"
    echo ""
    echo "Actions:"
    echo "  1. Review errors: git checkout -b test $COMMIT && deno check --all src/mod.ts"
    echo "  2. Fix if simple (< 10 errors)"
    echo "  3. Or wait for upstream fix"
    exit 0
elif [ "$ERROR_COUNT" -lt 50 ]; then
    echo "🔶 MODERATE ISSUES - High risk merge"
    echo ""
    echo "Actions:"
    echo "  1. Report to upstream"
    echo "  2. Wait for upstream fix"
    echo "  3. Only merge if absolutely necessary"
    exit 1
else
    echo "❌ UNHEALTHY - Do not merge"
    echo ""
    echo "Actions:"
    echo "  1. Log blocker: echo \"$(date): $COMMIT has $ERROR_COUNT errors\" >> SYNC_BLOCKERS.md"
    echo "  2. Report to upstream"
    echo "  3. Wait for upstream fix"
    echo "  4. Check daily for improvements"
    exit 1
fi
