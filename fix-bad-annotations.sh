#!/bin/bash
# Fix the bad type annotations from the broken script

# Fix async function that should return Promise<ImageData>
sed -i '' 's/async getImageData(runtime: RuntimeContext, width: number, height: number, viewport?: Viewport): void/async getImageData(runtime: RuntimeContext, width: number, height: number, viewport?: Viewport): Promise<ImageData>/' src/mol-canvas3d/passes/image.ts

# Fix outline function that returns object
sed -i '' 's/getOutlineProps(props: PostprocessingProps): void/getOutlineProps(props: PostprocessingProps): { transparentOutline: boolean, outlineScale: number }/' src/mol-canvas3d/passes/outline.ts

# Fix column-helpers functions that return objects
sed -i '' 's/getArrayBounds(rowCount: number, params?: Column.ToArrayParams<any>): object/getArrayBounds(rowCount: number, params?: Column.ToArrayParams<any>): { start: number, end: number }/' src/mol-data/db/column-helpers.ts

sed -i '' 's/createArray(rowCount: number, params?: Column.ToArrayParams<any>): object/createArray(rowCount: number, params?: Column.ToArrayParams<any>): { array: any[], start: number, end: number }/' src/mol-data/db/column-helpers.ts

echo "Fixed bad type annotations"
