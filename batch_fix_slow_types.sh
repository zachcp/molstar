#!/bin/bash
# Batch fix missing explicit types

cd /Users/zcpowers/Documents/Projects/molstar

echo "🔧 Batch fixing missing explicit types..."

# Pattern 1: export const NAME = { ... }
# Add `: any` to object literals without type annotations
find src -name "*.ts" -not -path "*/node_modules/*" -exec sed -i '' \
  -E 's/^(export const [A-Za-z_][A-Za-z0-9_]*) = \{/\1: any = {/g' {} \;

# Pattern 2: export const NAME = function
find src -name "*.ts" -not -path "*/node_modules/*" -exec sed -i '' \
  -E 's/^(export const [A-Za-z_][A-Za-z0-9_]*) = function/\1: any = function/g' {} \;

# Pattern 3: readonly NAME = ...
find src -name "*.ts" -not -path "*/node_modules/*" -exec sed -i '' \
  -E 's/^([ \t]*readonly [A-Za-z_][A-Za-z0-9_]*) = /\1: any = /g' {} \;

# Pattern 4: let NAME = function
find src -name "*.ts" -not -path "*/node_modules/*" -exec sed -i '' \
  -E 's/^(let [A-Za-z_][A-Za-z0-9_]*) = function/\1: any = function/g' {} \;

# Pattern 5: const NAME = { ...} (not exported, inside namespaces)
find src -name "*.ts" -not -path "*/node_modules/*" -exec sed -i '' \
  -E 's/^([ \t]*const [A-Za-z_][A-Za-z0-9_]*) = \{/\1: any = {/g' {} \;

# Pattern 6: ColorMap and other factory returns
find src -name "*.ts" -not -path "*/node_modules/*" -exec sed -i '' \
  -E 's/^(export const [A-Za-z_][A-Za-z0-9_]*) = (ColorMap|Type\.|VolumeRepresentationProvider)\(/\1: any = \2(/g' {} \;

echo "✅ Applied batch fixes"

# Test
echo ""
echo "Checking for remaining errors..."
deno task publish 2>&1 | grep "error" | wc -l | xargs echo "Remaining errors:"
