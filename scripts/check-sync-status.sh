#!/bin/bash
# Check how far behind 2025-jsr is from upstream

git fetch upstream --quiet

COMMITS_BEHIND=$(git log --oneline 2025-jsr..upstream/master | wc -l | xargs)
LAST_SYNC=$(git log -1 --format="%ci" 2025-jsr)
LAST_SYNC_MSG=$(git log -1 --format="%s" 2025-jsr)

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║              2025-jsr Sync Status                              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Commits behind upstream:  $COMMITS_BEHIND"
echo "Last sync:                $LAST_SYNC"
echo "Last commit:              $LAST_SYNC_MSG"
echo ""

if [ "$COMMITS_BEHIND" -eq 0 ]; then
    echo "✅ STATUS: Up-to-date with upstream"
    echo ""
    echo "No action needed."
elif [ "$COMMITS_BEHIND" -lt 5 ]; then
    echo "✅ STATUS: Nearly up-to-date ($COMMITS_BEHIND commits)"
    echo ""
    echo "Action: Consider syncing soon"
    echo "  bash scripts/sync-upstream.sh"
elif [ "$COMMITS_BEHIND" -lt 20 ]; then
    echo "⚠️  STATUS: Falling behind ($COMMITS_BEHIND commits)"
    echo ""
    echo "Action: Sync recommended"
    echo "  bash scripts/sync-upstream.sh"
elif [ "$COMMITS_BEHIND" -lt 50 ]; then
    echo "⚠️  STATUS: Moderately behind ($COMMITS_BEHIND commits)"
    echo ""
    echo "Action: Sync needed soon"
    echo "  bash scripts/sync-upstream.sh"
else
    echo "❌ STATUS: Significantly behind ($COMMITS_BEHIND commits)"
    echo ""
    echo "Action: Plan catch-up merge"
    echo "  1. Test upstream health first"
    echo "  2. Consider syncing in batches"
    echo "  3. See INCREMENTAL_SYNC_STRATEGY.md"
fi

echo ""
echo "Recent upstream commits:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git log --oneline upstream/master -5 | sed 's/^/  /'

echo ""
