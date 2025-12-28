# JSR Compatibility Scripts

These scripts automate the process of making Molstar code compatible with JSR/Deno after merging upstream releases.

## Quick Start

After merging an upstream release, run these scripts in order:

```bash
# 1. Add .ts extensions to imports
python3 scripts/add-ts-extensions.py

# 2. Fix directory imports (./foo.ts -> ./foo/index.ts)
python3 scripts/fix-directory-imports.py

# 3. Fix .tsx imports (./bar.ts -> ./bar.tsx where needed)
python3 scripts/fix-tsx-imports.py

# 4. Remove empty imports
bash scripts/remove-empty-imports.sh

# 5. Validate (must be 0 errors)
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
```

## Script Descriptions

### add-ts-extensions.py

**Purpose:** Adds `.ts` extensions to all relative imports

**What it does:**
- Scans all `.ts` and `.tsx` files in `src/`
- Finds imports like `from './module'` or `from '../path'`
- Adds `.ts` extension: `from './module.ts'`
- Skips imports that already have `.ts` or `.tsx`
- Skips absolute imports and npm packages

**Example:**
```typescript
// Before
import { foo } from './bar'
import { baz } from '../util'

// After
import { foo } from './bar.ts'
import { baz } from '../util.ts'
```

**Usage:**
```bash
python3 scripts/add-ts-extensions.py
```

### fix-directory-imports.py

**Purpose:** Fixes imports pointing to directories with `index.ts`

**What it does:**
- Runs after `add-ts-extensions.py`
- Finds imports like `from './components.ts'`
- Checks if `./components/` is a directory with `index.ts`
- Changes to `from './components/index.ts'`

**Example:**
```typescript
// Before (after add-ts-extensions.py)
import { Button } from './components.ts'

// After (if ./components/ is a directory)
import { Button } from './components/index.ts'
```

**Usage:**
```bash
python3 scripts/fix-directory-imports.py
```

### fix-tsx-imports.py

**Purpose:** Changes `.ts` to `.tsx` for React component imports

**What it does:**
- Runs after previous scripts
- Finds imports ending in `.ts`
- Checks if target file is actually `.tsx`
- Changes extension if needed

**Example:**
```typescript
// Before
import { MyComponent } from './MyComponent.ts'

// After (if MyComponent.tsx exists)
import { MyComponent } from './MyComponent.tsx'
```

**Usage:**
```bash
python3 scripts/fix-tsx-imports.py
```

### remove-empty-imports.sh

**Purpose:** Removes empty import statements rejected by Deno

**What it does:**
- Finds patterns like `import {} from 'module'`
- Removes entire import statement
- Uses Perl regex for multiline matching

**Example:**
```typescript
// Before
import {} from './types.ts'
import { foo } from './bar.ts'

// After
import { foo } from './bar.ts'
```

**Why:** Deno's parser is stricter than TypeScript and rejects empty imports

**Usage:**
```bash
bash scripts/remove-empty-imports.sh
```

## Testing

After running all scripts:

```bash
# 1. No module resolution errors (TS2307)
deno check --all src/mod.ts 2>&1 | grep "TS2307" | wc -l
# Expected: 0

# 2. No TypeScript errors
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
# Expected: 0

# 3. JSR publish test
deno publish --dry-run --allow-slow-types
# Expected: "Dry run complete"
```

## Troubleshooting

### Script reports "Fixed: 0 files"

**Possible causes:**
1. Extensions already added (scripts are idempotent)
2. Working directory not in project root
3. No `src/` directory found

**Solution:**
```bash
# Ensure you're in project root
cd /path/to/molstar
ls src/  # Should list TypeScript files

# Try running again
python3 scripts/add-ts-extensions.py
```

### TypeScript errors after running scripts

**Check for upstream errors:**
```bash
# Test clean upstream branch
git checkout -b test-upstream upstream/vX.X.X
deno check --all src/mod.ts 2>&1 | grep "TS[0-9]" | wc -l
```

If upstream has errors, see CLAUDE.md section "Strategy for Handling TypeScript Errors"

### "Module not found" errors persist

**Common causes:**
1. Import points to non-existent file
2. Circular dependency
3. Case sensitivity issue

**Debug:**
```bash
# Find specific error
deno check --all src/mod.ts 2>&1 | grep "TS2307" | head -5

# Check if file exists
ls src/path/to/module.ts
ls src/path/to/module/index.ts
```

## Script Implementation Details

### Python Scripts

All Python scripts follow this pattern:
1. Use `pathlib.Path` for cross-platform paths
2. Use UTF-8 encoding for file I/O
3. Use regex for pattern matching
4. Skip `.d.ts` declaration files
5. Print progress to stdout
6. Process both `.ts` and `.tsx` files

### Bash Scripts

- Use `find` for file discovery
- Use `perl -i` for in-place editing
- Use `-0pe` for multiline regex
- Print progress messages

## Related Documentation

- **CLAUDE.md**: Comprehensive guide for AI assistants
- **NEXT_SESSION_QUICKSTART.md**: Guide for fixing slow-type warnings
- **SESSION_SUMMARY.md**: Historical session notes
- **COMMANDS.md**: Command reference

## Version History

- **2025-12-28**: Created scripts based on v5.5.0 merge attempt
- Tested on: macOS, Python 3.x, Bash 5.x
- Status: Production ready

## License

Same as Molstar project
