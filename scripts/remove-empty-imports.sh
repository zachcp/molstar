#!/bin/bash
# Remove empty import statements that Deno doesn't accept

echo "Removing empty import statements..."

find src -name "*.ts" -o -name "*.tsx" | while read file; do
  # Use Perl for multiline regex
  perl -i -0pe 's/import \{\s*\}\s*from\s*["\x27][^"\x27]+["\x27];?\s*\n//g' "$file"
done

echo "Done removing empty imports"
