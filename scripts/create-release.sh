#!/bin/bash
# Create a JSR release branch from 2025-jsr

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <version> [commit]"
    echo ""
    echo "Examples:"
    echo "  $0 5.5.0              # Create release from current HEAD of 2025-jsr"
    echo "  $0 5.5.0 abc123      # Create release from specific commit"
    echo ""
    exit 1
fi

VERSION=$1
COMMIT=${2:-2025-jsr}
RELEASE_BRANCH="release/jsr-v${VERSION}"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              Creating JSR Release v${VERSION}                    "
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if release already exists
if git show-ref --verify --quiet refs/heads/$RELEASE_BRANCH; then
    echo "❌ Release branch $RELEASE_BRANCH already exists"
    echo ""
    echo "Actions:"
    echo "  1. Delete existing: git branch -D $RELEASE_BRANCH"
    echo "  2. Use different version number"
    exit 1
fi

# Ensure on 2025-jsr
echo "→ Ensuring 2025-jsr is up-to-date..."
git checkout 2025-jsr
git pull origin 2025-jsr 2>/dev/null || echo "  (No remote changes)"

# Create release branch
echo "→ Creating release branch from $COMMIT..."
git checkout -b "$RELEASE_BRANCH" "$COMMIT"

# Check current version in deno.json
CURRENT_VERSION=$(grep '"version"' deno.json | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+')
echo "  Current version in deno.json: $CURRENT_VERSION"

# Update deno.json version
echo "→ Updating deno.json to version $VERSION..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" deno.json
else
    # Linux
    sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" deno.json
fi

git add deno.json
git commit -m "Release: JSR v${VERSION}"

echo ""
echo "→ Running validation tests..."
echo ""

# Test TypeScript
echo "  1/3 Testing TypeScript compilation..."
TS_ERRORS=$(deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l | xargs)
if [ "$TS_ERRORS" -ne 0 ]; then
    echo "     ❌ $TS_ERRORS TypeScript errors found"
    echo ""
    echo "Release creation aborted. Fix errors and try again."
    git checkout 2025-jsr
    git branch -D "$RELEASE_BRANCH"
    exit 1
fi
echo "     ✅ 0 TypeScript errors"

# Test JSR publish
echo "  2/3 Testing JSR publish (dry run)..."
if deno publish --dry-run --allow-slow-types > /dev/null 2>&1; then
    echo "     ✅ JSR publish test passed"
else
    echo "     ❌ JSR publish test failed"
    echo ""
    deno publish --dry-run --allow-slow-types
    echo ""
    echo "Release creation aborted."
    git checkout 2025-jsr
    git branch -D "$RELEASE_BRANCH"
    exit 1
fi

# Check slow-type warnings
echo "  3/3 Checking slow-type warning count..."
WARNING_COUNT=$(deno publish --dry-run 2>&1 | grep "Found" | grep -o '[0-9]\+' | head -1)
echo "     ℹ  $WARNING_COUNT slow-type warnings (acceptable)"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              RELEASE READY ✅                                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Release branch: $RELEASE_BRANCH"
echo "Version: $VERSION"
echo "TypeScript errors: 0"
echo "Slow-type warnings: $WARNING_COUNT"
echo ""
echo "Next steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Review the release:"
echo "   git log -5"
echo "   git diff $COMMIT..HEAD deno.json"
echo ""
echo "2. Push release branch:"
echo "   git push origin $RELEASE_BRANCH"
echo ""
echo "3. Tag the release:"
echo "   git tag jsr-v${VERSION}"
echo "   git push origin jsr-v${VERSION}"
echo ""
echo "4. Publish to JSR:"
echo "   deno publish --allow-slow-types"
echo ""
echo "5. Return to development:"
echo "   git checkout 2025-jsr"
echo ""
