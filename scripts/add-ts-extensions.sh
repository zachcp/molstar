#!/bin/bash

# Script to add .ts extensions to relative imports in TypeScript files
# This is needed for Deno/JSR compatibility

set -e

echo "Adding .ts extensions to imports in src/ directory..."

# Find all .ts and .tsx files, excluding node_modules, build, lib, and test directories
find src -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/build/*" \
  ! -path "*/lib/*" \
  ! -path "*/_spec/*" \
  ! -path "*/test.ts" \
  ! -path "*.spec.ts" \
  -print0 | while IFS= read -r -d '' file; do

  # Create a temporary file
  temp_file=$(mktemp)

  # Process the file
  # Pattern 1: from './path' -> from './path.ts'
  # Pattern 2: from '../path' -> from '../path.ts'
  # Only if the path doesn't already end with .ts, .tsx, .js, .json, .scss, .html, etc.
  sed -E \
    -e "s|from ['\"](\./[^'\"]+)(['\"])|from '\1.ts\2|g" \
    -e "s|from ['\"](\.\./[^'\"]+)(['\"])|from '\1.ts\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.ts\.ts(['\"])|from '\1.ts\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.tsx\.ts(['\"])|from '\1.tsx\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.js\.ts(['\"])|from '\1.js\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.json\.ts(['\"])|from '\1.json\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.scss\.ts(['\"])|from '\1.scss\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.html\.ts(['\"])|from '\1.html\2|g" \
    -e "s|from ['\"](\.\.?/[^'\"]+)\.css\.ts(['\"])|from '\1.css\2|g" \
    "$file" > "$temp_file"

  # Replace original file if changes were made
  if ! cmp -s "$file" "$temp_file"; then
    mv "$temp_file" "$file"
    echo "Updated: $file"
  else
    rm "$temp_file"
  fi
done

echo ""
echo "Done! Now run 'deno task check' to verify the changes."
echo ""
echo "Note: This script may not handle all edge cases. You may need to:"
echo "  1. Fix imports that point to directories (add /index.ts)"
echo "  2. Handle special cases like .scss, .json imports"
echo "  3. Run 'deno task lint' for additional fixes"
