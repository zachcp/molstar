# Mol* JSR Migration - Command Reference

Quick reference for common commands used during the JSR migration process.

## Error Analysis

### Check Total Error Count
```bash
deno publish --dry-run 2>&1 | grep "Found" | head -5
```

### Count Errors by Type
```bash
# Count all errors
deno publish --dry-run 2>&1 | grep "ERROR" | wc -l

# Count specific error type (e.g., TS2307)
deno publish --dry-run 2>&1 | grep "TS2307" | wc -l
```

### Analyze Error Patterns
```bash
# Top 20 most common errors
deno publish --dry-run 2>&1 | grep "ERROR]:" | sed 's/.*\[ERROR\]://' | sort | uniq -c | sort -rn | head -20

# Get all error codes with counts
deno publish --dry-run 2>&1 | grep -o "TS[0-9]\+" | sort | uniq -c | sort -rn
```

### View Specific Error Details
```bash
# See all instances of a specific error
deno publish --dry-run 2>&1 | grep "TS4114" -A 2

# See first 10 instances
deno publish --dry-run 2>&1 | grep "TS2564" -A 1 | head -20
```

### Save Full Error Output
```bash
# Save to file for detailed analysis
deno publish --dry-run 2>&1 > errors.txt

# Save only errors
deno publish --dry-run 2>&1 | grep "ERROR" > errors-only.txt
```

## File Searching

### Find Import Patterns
```bash
# Find all imports from a specific module
grep -r "from './color.ts'" src/ --include="*.ts" --include="*.tsx"

# Find imports without .ts extension
grep -r "from '\./[^']*[^ts]'" src/ --include="*.ts"

# Find type-only imports
grep -r "import type.*from" src/ --include="*.ts" | head -20
```

### Find Files by Name
```bash
# Find specific filename
find src/ -name "schema.d.ts"

# Find all .d.ts files
find src/ -name "*.d.ts"

# Find files matching pattern
find src/ -path "*/mol-util/color/*" -name "*.ts"
```

### Find Specific Code Patterns
```bash
# Find classes with missing override
grep -r "^\s*\w\+(" src/ --include="*.ts" | grep -v "override"

# Find catch blocks without type
grep -r "catch (e)" src/ --include="*.ts" --include="*.tsx"

# Find uninitialized properties
grep -r "private.*: [A-Z]" src/ --include="*.ts" | grep -v "="
```

## Code Modification

### Bulk Find and Replace
```bash
# Replace in single file (macOS)
sed -i '' 's/old-pattern/new-pattern/g' path/to/file.ts

# Replace in single file (Linux)
sed -i 's/old-pattern/new-pattern/g' path/to/file.ts

# Replace across multiple files
find src/ -name "*.ts" -exec sed -i '' 's/old-pattern/new-pattern/g' {} \;
```

### Count Lines of Code
```bash
# Count all TypeScript files
find src/ -name "*.ts" -o -name "*.tsx" | wc -l

# Count total lines
find src/ -name "*.ts" -o -name "*.tsx" | xargs wc -l | tail -1
```

## Deno Tasks

### Run Defined Tasks
```bash
# Type check
deno task check

# Lint
deno task lint

# Format
deno task fmt

# Format check only
deno task fmt-check

# Dry-run publish
deno task publish
```

### Direct Deno Commands
```bash
# Check specific file
deno check src/mol-plugin-ui/index.ts

# Run script
deno run --allow-read --allow-write scripts/fix-critical-imports.ts

# Type check without running
deno check --all src/mod.ts
```

## Git Operations

### Track Changes
```bash
# See modified files
git status

# See diff of specific file
git diff src/mol-util/legend.ts

# See all changes
git diff

# See staged changes
git diff --cached
```

### Commit Progress
```bash
# Stage specific files
git add src/mol-util/legend.ts src/mol-util/color/palette.ts

# Stage all changes
git add .

# Commit with message
git commit -m "fix: resolve import path errors in mol-util"

# Amend last commit
git commit --amend
```

## Progress Tracking

### Compare Error Counts
```bash
# Save current count
echo "$(date): $(deno publish --dry-run 2>&1 | grep 'Found' | grep -o '[0-9]\+ errors')" >> progress.log

# View progress
cat progress.log
```

### Generate Error Report
```bash
# Create timestamped error report
date_str=$(date +%Y%m%d_%H%M%S)
deno publish --dry-run 2>&1 > "reports/errors_${date_str}.txt"
```

## Useful Combinations

### Find and Fix Import Errors
```bash
# Find all files with import errors
deno publish --dry-run 2>&1 | grep "TS2307" | grep "at file" | awk -F: '{print $1}' | sort -u

# Count import errors by file
deno publish --dry-run 2>&1 | grep "TS2307" | grep "at file" | awk -F: '{print $1}' | sort | uniq -c | sort -rn
```

### Find Files Needing Override Keyword
```bash
# List all files with TS4114 errors
deno publish --dry-run 2>&1 | grep "TS4114" -A 2 | grep "at file" | awk -F: '{print $1 ":" $2}' | sort -u

# Extract method names needing override
deno publish --dry-run 2>&1 | grep "TS4114" -B 1 | grep "^\s*\w" | sed 's/^[[:space:]]*//'
```

### Analyze JSX Errors
```bash
# Count JSX-related errors
deno publish --dry-run 2>&1 | grep -i "jsx" | wc -l

# List files with JSX errors
deno publish --dry-run 2>&1 | grep -i "jsx" | grep "at file" | awk -F: '{print $1}' | sort -u | wc -l

# See all JSX error types
deno publish --dry-run 2>&1 | grep -i "jsx" | grep "ERROR]:" | sort | uniq -c | sort -rn
```

## Testing After Fixes

### Quick Validation
```bash
# Check if error count decreased
before=$(deno publish --dry-run 2>&1 | grep 'Found' | grep -o '[0-9]\+')
# ... make changes ...
after=$(deno publish --dry-run 2>&1 | grep 'Found' | grep -o '[0-9]\+')
echo "Before: $before, After: $after, Difference: $((before - after))"
```

### Verify Specific Error Type Fixed
```bash
# Before fix
deno publish --dry-run 2>&1 | grep "TS2307" | wc -l
# ... apply fix ...
# After fix
deno publish --dry-run 2>&1 | grep "TS2307" | wc -l
```

## Performance

### Time the Dry-Run
```bash
time deno publish --dry-run 2>&1 > /dev/null
```

### Monitor Memory Usage
```bash
# Run in background and monitor
deno publish --dry-run 2>&1 > errors.txt &
pid=$!
while kill -0 $pid 2>/dev/null; do
    ps -p $pid -o rss=,vsz=
    sleep 1
done
```

## Cleanup

### Remove Generated Files
```bash
# Remove error logs
rm errors*.txt

# Remove reports
rm reports/*.txt

# Clean Deno cache (if needed)
deno cache --reload src/mod.ts
```

## Aliases (Add to .bashrc or .zshrc)

```bash
# Quick error count
alias deno-errors='deno publish --dry-run 2>&1 | grep "Found"'

# Top errors
alias deno-top-errors='deno publish --dry-run 2>&1 | grep "ERROR]:" | sed "s/.*\[ERROR\]://" | sort | uniq -c | sort -rn | head -20'

# Check specific error type
deno-check-error() {
    deno publish --dry-run 2>&1 | grep "$1" | wc -l
}

# Usage: deno-check-error TS2307
```

## Notes

- Most commands assume you're in the project root (`/Users/zcpowers/Documents/Projects/molstar`)
- The `--dry-run` flag doesn't publish, just validates
- Error output can be large (2500+ errors), pipe to `less` for viewing: `deno publish --dry-run 2>&1 | less`
- Use `2>&1` to capture both stdout and stderr
- macOS uses `sed -i ''`, Linux uses `sed -i`
- Progress should be tracked in version control commits

## Quick Reference Card

```
┌─────────────────────────────────────────────┐
│ MOST COMMON COMMANDS                        │
├─────────────────────────────────────────────┤
│ Error count:                                │
│   deno publish --dry-run 2>&1 | grep Found  │
│                                             │
│ Top errors:                                 │
│   deno task publish 2>&1 | grep ERROR       │
│   | sort | uniq -c | sort -rn | head -20   │
│                                             │
│ Run fix script:                             │
│   deno run --allow-read --allow-write       │
│   scripts/fix-critical-imports.ts           │
│                                             │
│ Check specific file:                        │
│   deno check src/path/to/file.ts            │
└─────────────────────────────────────────────┘
```
