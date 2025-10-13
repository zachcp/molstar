#!/bin/bash
# Find files with specific Deno error patterns for batch fixing
# Usage: ./scripts/find-deno-pattern.sh [pattern_type]

set -e

PATTERN_TYPE="${1:-help}"
ERROR_FILE="${2:-/tmp/deno_errors.txt}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_help() {
    echo -e "${BLUE}Usage: ./scripts/find-deno-pattern.sh [pattern_type]${NC}"
    echo ""
    echo "Available pattern types:"
    echo "  export-const    - Find export const arrow functions without types"
    echo "  method          - Find class methods without return types"
    echo "  getter          - Find getters without return types"
    echo "  export-function - Find exported functions without return types"
    echo "  all             - Show all patterns organized by file"
    echo ""
    echo "Examples:"
    echo "  ./scripts/find-deno-pattern.sh export-const"
    echo "  ./scripts/find-deno-pattern.sh method"
    echo ""
    echo "Note: Run 'deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt' first"
}

check_error_file() {
    if [ ! -f "$ERROR_FILE" ]; then
        echo -e "${RED}Error file not found: $ERROR_FILE${NC}"
        echo "Run: deno publish --dry-run 2>&1 | tee /tmp/deno_errors.txt"
        exit 1
    fi
}

# Strip ANSI color codes from error file
strip_ansi() {
    sed $'s/\033\[[0-9;]*m//g' "$ERROR_FILE"
}

find_export_const() {
    echo -e "${GREEN}=== EXPORT CONST PATTERNS ===${NC}"
    echo "Looking for: export const Name = (...) => ..."
    echo ""

    # Extract files with missing-explicit-type errors
    strip_ansi | grep -A3 "error\[missing-explicit-type\]" | \
        grep "export const" | \
        sed 's/^[^|]*|//' | \
        head -50

    echo ""
    echo -e "${YELLOW}Files to check:${NC}"
    strip_ansi | grep -B2 "export const.*=" | \
        grep "\.ts:" | \
        sed 's/.*molstar\///' | \
        sed 's/:.*//' | \
        sort -u | \
        head -30
}

find_methods() {
    echo -e "${GREEN}=== METHOD PATTERNS ===${NC}"
    echo "Looking for: methodName(...) { without return type"
    echo ""

    # Find method errors
    strip_ansi | grep -A3 "error\[missing-explicit-return-type\]" | \
        grep -E "^\s+[a-z][A-Za-z0-9]*\(" | \
        sed 's/^[^|]*|//' | \
        head -30

    echo ""
    echo -e "${YELLOW}Files with method errors:${NC}"
    strip_ansi | grep -B2 -E "^\s*[0-9]+\s*\|\s+[a-z][A-Za-z0-9]*\(" | \
        grep "\.ts:" | \
        sed 's/.*molstar\///' | \
        sed 's/:.*//' | \
        sort -u | \
        head -30
}

find_getters() {
    echo -e "${GREEN}=== GETTER PATTERNS ===${NC}"
    echo "Looking for: get propertyName() { without return type"
    echo ""

    # Find getter errors
    strip_ansi | grep -A3 "error\[missing-explicit-return-type\]" | \
        grep "get " | \
        sed 's/^[^|]*|//' | \
        head -30

    echo ""
    echo -e "${YELLOW}Files with getter errors:${NC}"
    strip_ansi | grep -B2 "get [a-z]" | \
        grep "\.ts:" | \
        sed 's/.*molstar\///' | \
        sed 's/:.*//' | \
        sort -u
}

find_export_functions() {
    echo -e "${GREEN}=== EXPORT FUNCTION PATTERNS ===${NC}"
    echo "Looking for: export function name(...) { without return type"
    echo ""

    # Find export function errors
    strip_ansi | grep -A3 "error\[missing-explicit-return-type\]" | \
        grep "export function" | \
        sed 's/^[^|]*|//' | \
        head -30

    echo ""
    echo -e "${YELLOW}Files with export function errors:${NC}"
    strip_ansi | grep -B2 "export function" | \
        grep "\.ts:" | \
        sed 's/.*molstar\///' | \
        sed 's/:.*//' | \
        sort -u | \
        head -30
}

show_all_by_file() {
    echo -e "${GREEN}=== ALL ERRORS BY FILE ===${NC}"
    echo ""

    # Get unique files with error counts
    strip_ansi | grep "\.ts:" | \
        sed 's/.*molstar\///' | \
        sed 's/:.*//' | \
        sort | uniq -c | \
        sort -rn | \
        head -50 | \
        while read count file; do
            echo -e "${YELLOW}$file${NC} (${RED}$count errors${NC})"
        done
}

# Main execution
case "$PATTERN_TYPE" in
    export-const)
        check_error_file
        find_export_const
        ;;
    method)
        check_error_file
        find_methods
        ;;
    getter)
        check_error_file
        find_getters
        ;;
    export-function)
        check_error_file
        find_export_functions
        ;;
    all)
        check_error_file
        show_all_by_file
        ;;
    help|--help|-h)
        print_help
        ;;
    *)
        echo -e "${RED}Unknown pattern type: $PATTERN_TYPE${NC}"
        echo ""
        print_help
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}Tip: Use this to inspect specific files:${NC}"
echo "  grep -A5 'filename.ts' /tmp/deno_errors.txt"
