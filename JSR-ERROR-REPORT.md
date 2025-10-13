# Molstar JSR Publication Error Report

Generated: 2025-10-13T17:35:33.977Z

## Summary

- **Total Errors**: 1714
- **Files with Errors**: 355

### By Error Type

- **Missing Explicit Return Type**: 1163 errors
- **Missing Explicit Type**: 517 errors
- **Unsupported Super Class Expression**: 34 errors

## Top 20 Files with Most Errors

| File | Total | Return Types | Types | Super Class |
|------|-------|--------------|-------|-------------|
| mol-math/linear-algebra/3d/vec3.ts | 61 | 61 | 0 | 0 |
| mol-model/structure/structure/structure.ts | 58 | 55 | 3 | 0 |
| mol-math/linear-algebra/3d/mat4.ts | 47 | 47 | 0 | 0 |
| mol-plugin-state/transforms/model.ts | 39 | 1 | 38 | 0 |
| mol-plugin-state/objects.ts | 34 | 2 | 3 | 29 |
| mol-math/linear-algebra/3d/quat.ts | 33 | 33 | 0 | 0 |
| mol-plugin/context.ts | 33 | 12 | 21 | 0 |
| mol-model/structure/structure/unit.ts | 31 | 31 | 0 | 0 |
| mol-math/linear-algebra/3d/mat3.ts | 28 | 28 | 0 | 0 |
| mol-state/state/selection.ts | 27 | 26 | 1 | 0 |
| mol-math/linear-algebra/3d/vec4.ts | 26 | 26 | 0 | 0 |
| mol-plugin-state/transforms/representation.ts | 26 | 1 | 25 | 0 |
| mol-math/linear-algebra/3d/vec2.ts | 25 | 25 | 0 | 0 |
| mol-model/volume/volume.ts | 25 | 22 | 3 | 0 |
| mol-script/language/symbol-table/structure-query.ts | 25 | 2 | 23 | 0 |
| mol-script/language/symbol-table/core.ts | 21 | 7 | 14 | 0 |
| mol-plugin-state/transforms/data.ts | 19 | 0 | 19 | 0 |
| mol-math/geometry/primitives/sphere3d.ts | 18 | 18 | 0 | 0 |
| mol-repr/shape/loci/dihedral.ts | 18 | 14 | 4 | 0 |
| mol-state/state.ts | 18 | 15 | 3 | 0 |

## Detailed Error List

### Directory: `src/mol-canvas3d`

#### `canvas3d.ts` (5 errors)

**Missing Explicit Types:**

- Line 103:14
  ```typescript
  103 | export const CameraFogParams = {
  ```
- Line 106:14
  ```typescript
  106 | export const Canvas3DParams = {
  ```
- Line 213:14
  ```typescript
  213 | export const DefaultCanvas3DParams = PD.getDefaultValues(Canvas3DParams);
  ```
- Line 266:16
  ```typescript
  266 |   export const Params = {
  ```
- Line 279:16
  ```typescript
  279 |   export const DefaultProps = PD.getDefaultValues(Params);
  ```

#### `camera.ts` (3 errors)

**Missing Explicit Types:**

- Line 52:12
  ```typescript
  52 |   readonly viewOffset = Camera.ViewOffset();
  ```
- Line 67:12
  ```typescript
  67 |   readonly stateChanged = new BehaviorSubject<Partial<Camera.Snapshot>>(
  ```
- Line 316:5
  ```typescript
  316 |     viewport = Viewport.create(0, 0, 128, 128),
  ```

### Directory: `src/mol-canvas3d/camera`

#### `stereo.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 36:7
  ```typescript
  36 |   get viewport() {
  ```
- Line 40:7
  ```typescript
  40 |   get viewOffset() {
  ```

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const StereoCameraParams = {
  ```

#### `util.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 18:10
  ```typescript
  18 | function Viewport() {
  ```
- Line 51:21
  ```typescript
  51 |     export function equals(a: Viewport, b: Viewport) {
  ```

### Directory: `src/mol-canvas3d/controls`

#### `trackball.ts` (2 errors)

**Missing Explicit Types:**

- Line 26:14
  ```typescript
  26 | export const DefaultTrackballBindings = {
  ```
- Line 67:14
  ```typescript
  67 | export const TrackballControlsParams = {
  ```

### Directory: `src/mol-canvas3d/helper`

#### `handle-helper.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 59:5
  ```typescript
  59 |     getBoundingSphere(out: Sphere3D, instanceId: number) {
  ```
- Line 90:9
  ```typescript
  90 |     get isEnabled() {
  ```
- Line 112:5
  ```typescript
  112 |     getLoci(pickingId: PickingId) {
  ```
- Line 131:5
  ```typescript
  131 |     mark(loci: Loci, action: MarkerAction) {
  ```

**Missing Explicit Types:**

- Line 28:7
  ```typescript
  28 | const HandleParams = {
  ```
- Line 40:14
  ```typescript
  40 | export const HandleHelperParams = {
  ```

#### `camera-helper.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 122:9
  ```typescript
  122 |     get isEnabled() {
  ```
- Line 126:5
  ```typescript
  126 |     getLoci(pickingId: PickingId) {
  ```
- Line 155:5
  ```typescript
  155 |     mark(loci: Loci, action: MarkerAction) {
  ```

**Missing Explicit Types:**

- Line 33:7
  ```typescript
  33 | const AxesParams = {
  ```
- Line 61:14
  ```typescript
  61 | export const CameraHelperParams = {
  ```

#### `bounding-sphere-helper.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 117:9
  ```typescript
  117 |     get isEnabled() {
  ```
- Line 123:9
  ```typescript
  123 |     get props() { return this._props as Readonly<DebugHelperProps>; }
  ```

**Missing Explicit Types:**

- Line 22:14
  ```typescript
  22 | export const DebugHelperParams = {
  ```

#### `pointer-helper.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 60:7
  ```typescript
  60 |   get isEnabled() {
  ```

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const PointerHelperParams = {
  ```

#### `interaction-events.ts` (2 errors)

**Missing Explicit Types:**

- Line 29:14
  ```typescript
  29 | export const Canvas3dInteractionHelperParams = {
  ```
- Line 40:14
  ```typescript
  40 |     readonly events = {
  ```

#### `xr-manager.ts` (2 errors)

**Missing Explicit Types:**

- Line 51:14
  ```typescript
  51 | export const DefaultXRManagerBindings = {
  ```
- Line 61:14
  ```typescript
  61 | export const XRManagerParams = {
  ```

#### `helper.ts` (1 errors)

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const HelperParams = {
  ```

### Directory: `src/mol-canvas3d/passes`

#### `illumination.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 103:9
  ```typescript
  103 |     get iteration() { return this._iteration; }
  ```
- Line 106:9
  ```typescript
  106 |     get colorTarget() { return this._colorTarget; }
  ```
- Line 109:9
  ```typescript
  109 |     get supported() {
  ```
- Line 113:5
  ```typescript
  113 |     getByteCount() {
  ```
- Line 125:5
  ```typescript
  125 |     getMaxIterations(props: IlluminationProps) {
  ```
- Line 129:12
  ```typescript
  129 |     static isSupported(webgl: WebGLContext) {
  ```
- Line 133:12
  ```typescript
  133 |     static isEnabled(webgl: WebGLContext, props: IlluminationProps) {
  ```
- Line 266:5
  ```typescript
  266 |     shouldRender(props: IlluminationProps) {
  ```

**Missing Explicit Types:**

- Line 76:14
  ```typescript
  76 | export const IlluminationParams = {
  ```

#### `postprocessing.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 159:12
  ```typescript
  159 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 163:12
  ```typescript
  163 |     static isTransparentDepthRequired(scene: Scene, props: PostprocessingProps) {
  ```
- Line 167:12
  ```typescript
  167 |     static isTransparentOutlineEnabled(props: PostprocessingProps) {
  ```
- Line 171:12
  ```typescript
  171 |     static isTransparentSsaoEnabled(scene: Scene, props: PostprocessingProps) {
  ```
- Line 175:12
  ```typescript
  175 |     static isSsaoEnabled(props: PostprocessingProps) {
  ```
- Line 205:5
  ```typescript
  205 |     getByteCount() {
  ```
- Line 366:12
  ```typescript
  366 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 386:5
  ```typescript
  386 |     getByteCount() {
  ```

**Missing Explicit Types:**

- Line 122:14
  ```typescript
  122 | export const PostprocessingParams = {
  ```

#### `background.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 307:5
  ```typescript
  307 |     isEnabled(props: PostprocessingProps) {
  ```

**Missing Explicit Types:**

- Line 31:7
  ```typescript
  31 | const SharedParams = {
  ```
- Line 37:7
  ```typescript
  37 | const SkyboxParams = {
  ```
- Line 66:7
  ```typescript
  66 | const ImageParams = {
  ```
- Line 77:7
  ```typescript
  77 | const HorizontalGradientParams = {
  ```
- Line 84:7
  ```typescript
  84 | const RadialGradientParams = {
  ```
- Line 91:14
  ```typescript
  91 | export const BackgroundParams = {
  ```

#### `image.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 49:9
  ```typescript
  49 |     get colorTarget() { return this._colorTarget; }
  ```
- Line 57:9
  ```typescript
  57 |     get width() { return this._width; }
  ```
- Line 58:9
  ```typescript
  58 |     get height() { return this._height; }
  ```
- Line 78:5
  ```typescript
  78 |     getByteCount() {
  ```
- Line 82:5
  ```typescript
  82 |     updateBackground() {
  ```
- Line 152:11
  ```typescript
  152 |     async getImageData(runtime: RuntimeContext, width: number, height: number, viewport?: Viewport) {
  ```

**Missing Explicit Types:**

- Line 28:14
  ```typescript
  28 | export const ImageParams = {
  ```

#### `dpoit.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 88:9
  ```typescript
  88 |     get supported() {
  ```
- Line 92:5
  ```typescript
  92 |     getByteCount() {
  ```
- Line 104:5
  ```typescript
  104 |     bind() {
  ```
- Line 137:5
  ```typescript
  137 |     bindDualDepthPeeling() {
  ```
- Line 236:12
  ```typescript
  236 |     static isSupported(webgl: WebGLContext) {
  ```

#### `multi-sample.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 77:12
  ```typescript
  77 |     static isEnabled(props: MultiSampleProps) {
  ```
- Line 99:5
  ```typescript
  99 |     getByteCount() {
  ```
- Line 116:5
  ```typescript
  116 |     render(sampleIndex: number, ctx: RenderContext, props: Props, toDrawingBuffer: boolean, forceOn: boolean) {
  ```

**Missing Explicit Types:**

- Line 53:14
  ```typescript
  53 | export const MultiSampleParams = {
  ```

#### `outline.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 38:12
  ```typescript
  38 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 50:5
  ```typescript
  50 |     getByteCount() {
  ```
- Line 62:5
  ```typescript
  62 |     update(camera: ICamera, props: OutlineProps, depthTextureTransparent: Texture, depthTextureOpaque: Texture) {
  ```

**Missing Explicit Types:**

- Line 28:14
  ```typescript
  28 | export const OutlineParams = {
  ```

#### `ssao.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 82:12
  ```typescript
  82 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 86:12
  ```typescript
  86 |     static isTransparentEnabled(scene: Scene, props: SsaoProps) {
  ```
- Line 215:5
  ```typescript
  215 |     getByteCount() {
  ```

**Missing Explicit Types:**

- Line 31:14
  ```typescript
  31 | export const SsaoParams = {
  ```

#### `bloom.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 40:12
  ```typescript
  40 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 78:5
  ```typescript
  78 |     getByteCount() {
  ```

**Missing Explicit Types:**

- Line 31:14
  ```typescript
  31 | export const BloomParams = {
  ```

#### `dof.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 39:12
  ```typescript
  39 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 53:5
  ```typescript
  53 |     getByteCount() {
  ```

**Missing Explicit Types:**

- Line 27:14
  ```typescript
  27 | export const DofParams = {
  ```

#### `marking.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 38:12
  ```typescript
  38 |     static isEnabled(props: MarkingProps) {
  ```
- Line 58:5
  ```typescript
  58 |     getByteCount() {
  ```

**Missing Explicit Types:**

- Line 25:14
  ```typescript
  25 | export const MarkingParams = {
  ```

#### `pick.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 120:5
  ```typescript
  120 |     getByteCount() {
  ```
- Line 162:9
  ```typescript
  162 |     get pickRatio() {
  ```
- Line 203:9
  ```typescript
  203 |     get drawingBufferHeight() {
  ```

#### `shadow.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 37:12
  ```typescript
  37 |     static isEnabled(props: PostprocessingProps) {
  ```
- Line 52:5
  ```typescript
  52 |     getByteCount() {
  ```

**Missing Explicit Types:**

- Line 28:14
  ```typescript
  28 | export const ShadowParams = {
  ```

#### `wboit.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 58:9
  ```typescript
  58 |     get supported() {
  ```
- Line 62:5
  ```typescript
  62 |     getByteCount() {
  ```
- Line 122:12
  ```typescript
  122 |     static isSupported(webgl: WebGLContext) {
  ```

#### `draw.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 87:9
  ```typescript
  87 |     get transparency() {
  ```
- Line 123:5
  ```typescript
  123 |     getByteCount() {
  ```

#### `passes.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 28:5
  ```typescript
  28 |     getByteCount() {
  ```

#### `cas.ts` (1 errors)

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const CasParams = {
  ```

#### `fxaa.ts` (1 errors)

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const FxaaParams = {
  ```

#### `hi-z.ts` (1 errors)

**Missing Explicit Types:**

- Line 106:14
  ```typescript
  106 | export const HiZParams = {
  ```

#### `smaa.ts` (1 errors)

**Missing Explicit Types:**

- Line 27:14
  ```typescript
  27 | export const SmaaParams = {
  ```

#### `tracing.ts` (1 errors)

**Missing Explicit Types:**

- Line 42:14
  ```typescript
  42 | export const TracingParams = {
  ```

### Directory: `src/mol-data/db`

#### `column.ts` (15 errors)

**Missing Explicit Return Types:**

- Line 144:21
  ```typescript
  144 |     export function ofIntArray(array: ArrayLike<number>) {
  ```
- Line 148:21
  ```typescript
  148 |     export function ofFloatArray(array: ArrayLike<number>) {
  ```
- Line 152:21
  ```typescript
  152 |     export function ofStringArray(array: ArrayLike<string>) {
  ```
- Line 156:21
  ```typescript
  156 |     export function ofStringAliasArray<T extends string>(array: ArrayLike<T>) {
  ```
- Line 160:21
  ```typescript
  160 |     export function ofStringListArray<T extends string>(array: ArrayLike<T[]>, separator = ',') {
  ```
- Line 164:21
  ```typescript
  164 |     export function ofIntTokens(tokens: Tokens) {
  ```
- Line 173:21
  ```typescript
  173 |     export function ofFloatTokens(tokens: Tokens) {
  ```
- Line 182:21
  ```typescript
  182 |     export function ofStringTokens(tokens: Tokens) {
  ```
- Line 195:21
  ```typescript
  195 |     export function window<T>(column: Column<T>, start: number, end: number) {
  ```
- Line 199:21
  ```typescript
  199 |     export function view<T>(column: Column<T>, indices: ArrayLike<number>, checkIndentity = true) {
  ```
- Line 204:21
  ```typescript
  204 |     export function createFirstIndexMap<T>(column: Column<T>) {
  ```
- Line 208:21
  ```typescript
  208 |     export function createIndexer<T, R extends number = number>(column: Column<T>) {
  ```
- Line 216:21
  ```typescript
  216 |     export function areEqual<T>(a: Column<T>, b: Column<T>) {
  ```
- Line 220:21
  ```typescript
  220 |     export function indicesOf<T>(c: Column<T>, test: (e: T) => boolean) {
  ```
- Line 241:21
  ```typescript
  241 |     export function isIdentity<T extends number>(c: Column<T>) {
  ```

#### `table.ts` (11 errors)

**Missing Explicit Return Types:**

- Line 111:21
  ```typescript
  111 |     export function view<S extends R, R extends Schema>(table: Table<S>, schema: R, view: ArrayLike<number>) {
  ```
- Line 123:21
  ```typescript
  123 |     export function pick<S extends R, R extends Schema>(table: Table<S>, schema: R, test: (i: number) => boolean) {
  ```
- Line 131:21
  ```typescript
  131 |     export function window<S extends R, R extends Schema>(table: Table<S>, schema: R, start: number, end: number) {
  ```
- Line 144:21
  ```typescript
  144 |     export function concat<S extends R, R extends Schema>(tables: Table<S>[], schema: R) {
  ```
- Line 175:21
  ```typescript
  175 |     export function sort<T extends Table>(table: T, cmp: (i: number, j: number) => number) {
  ```
- Line 199:21
  ```typescript
  199 |     export function areEqual<T extends Table<any>>(a: T, b: T) {
  ```
- Line 214:21
  ```typescript
  214 |     export function getRow<S extends Schema>(table: Table<S>, index: number) {
  ```
- Line 225:21
  ```typescript
  225 |     export function pickRow<S extends Schema>(table: Table<S>, test: (i: number) => boolean) {
  ```
- Line 231:21
  ```typescript
  231 |     export function getRows<S extends Schema>(table: Table<S>) {
  ```
- Line 240:21
  ```typescript
  240 |     export function toArrays<S extends Schema>(table: Table<S>) {
  ```
- Line 250:21
  ```typescript
  250 |     export function formatToString<S extends Schema>(table: Table<S>) {
  ```

#### `column-helpers.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 9:17
  ```typescript
  9 | export function getArrayBounds(rowCount: number, params?: Column.ToArrayParams<any>) {
  ```
- Line 15:17
  ```typescript
  15 | export function createArray(rowCount: number, params?: Column.ToArrayParams<any>) {
  ```
- Line 21:17
  ```typescript
  21 | export function fillArrayValues(value: (row: number) => any, target: any[], start: number) {
  ```
- Line 26:17
  ```typescript
  26 | export function createAndFillArray(rowCount: number, value: (row: number) => any, params?: Column.ToArrayParams<any>) {
  ```

#### `database.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 20:21
  ```typescript
  20 |     export function ofTables<S extends Schema>(name: string, schema: Schema, tables: Tables<S>) {
  ```
- Line 35:21
  ```typescript
  35 |     export function getTablesAsRows<S extends Schema>(database: Database<S>) {
  ```

### Directory: `src/mol-data/generic`

#### `unique-array.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 17:21
  ```typescript
  17 |     export function add<K, T>({ keys, array }: UniqueArray<K, T>, key: K, value: T) {
  ```
- Line 24:21
  ```typescript
  24 |     export function has<K, T>({ keys }: UniqueArray<K, T>, key: K) {
  ```

### Directory: `src/mol-data/int`

#### `sorted-ranges.ts` (16 errors)

**Missing Explicit Return Types:**

- Line 14:21
  ```typescript
  14 |     export function ofSortedRanges<T extends number = number>(array: ArrayLike<T>) { return SortedArray.ofSortedArray<T>(array); }
  ```
- Line 15:21
  ```typescript
  15 |     export function start<T extends number = number>(ranges: SortedRanges<T>) { return ranges[0]; }
  ```
- Line 16:21
  ```typescript
  16 |     export function end<T extends number = number>(ranges: SortedRanges<T>) { return ranges[ranges.length - 1] + 1; }
  ```
- Line 17:21
  ```typescript
  17 |     export function min<T extends number = number>(ranges: SortedRanges<T>) { return ranges[0]; }
  ```
- Line 18:21
  ```typescript
  18 |     export function max<T extends number = number>(ranges: SortedRanges<T>) { return ranges[ranges.length - 1]; }
  ```
- Line 19:21
  ```typescript
  19 |     export function size<T extends number = number>(ranges: SortedRanges<T>) {
  ```
- Line 26:21
  ```typescript
  26 |     export function count<T extends number = number>(ranges: SortedRanges<T>) { return ranges.length / 2; }
  ```
- Line 28:21
  ```typescript
  28 |     export function startAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 31:21
  ```typescript
  31 |     export function endAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 35:21
  ```typescript
  35 |     export function minAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 38:21
  ```typescript
  38 |     export function maxAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 42:21
  ```typescript
  42 |     export function areEqual<T extends number = number>(a: SortedRanges<T>, b: SortedRanges<T>) {
  ```
- Line 61:21
  ```typescript
  61 |     export function has<T extends number = number>(ranges: SortedRanges<T>, set: OrderedSet<T>) {
  ```
- Line 66:21
  ```typescript
  66 |     export function hasFrom<T extends number = number>(ranges: SortedRanges<T>, set: OrderedSet<T>, from: number) {
  ```
- Line 85:21
  ```typescript
  85 |     export function transientSegments<T extends number = number, I extends number = number>(ranges: SortedRanges<T>, set: OrderedSet<T>) {
  ```
- Line 102:9
  ```typescript
  102 |         move() {
  ```

#### `tuple.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 40:21
  ```typescript
  40 |     export function diff(t: IntTuple) {
  ```
- Line 56:21
  ```typescript
  56 |     export function areEqual(a: IntTuple, b: IntTuple) {
  ```
- Line 62:21
  ```typescript
  62 |     export function compare(a: IntTuple, b: IntTuple) {
  ```
- Line 70:21
  ```typescript
  70 |     export function compareInArray(xs: ArrayLike<IntTuple>, i: number, j: number) {
  ```
- Line 78:21
  ```typescript
  78 |     export function hashCode(t: IntTuple) {
  ```
- Line 83:21
  ```typescript
  83 |     export function toString(t: IntTuple) {
  ```

#### `map.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 50:21
  ```typescript
  50 |     export function addFrom<T>(map: Mutable<T>, src: IntMap<T>) {
  ```

### Directory: `src/mol-data/int/impl`

#### `segmentation.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 62:5
  ```typescript
  62 |     move() {
  ```

### Directory: `src/mol-data/util`

#### `hash-functions.ts` (10 errors)

**Missing Explicit Return Types:**

- Line 10:17
  ```typescript
  10 | export function hash1(i: number) {
  ```
- Line 17:17
  ```typescript
  17 | export function hash2(i: number, j: number) {
  ```
- Line 27:17
  ```typescript
  27 | export function hash3(i: number, j: number, k: number) {
  ```
- Line 38:17
  ```typescript
  38 | export function hash4(i: number, j: number, k: number, l: number) {
  ```
- Line 50:17
  ```typescript
  50 | export function hashString(s: string) {
  ```
- Line 62:17
  ```typescript
  62 | export function cantorPairing(a: number, b: number) {
  ```
- Line 70:17
  ```typescript
  70 | export function sortedCantorPairing(a: number, b: number) {
  ```
- Line 74:17
  ```typescript
  74 | export function invertCantorPairing(out: [number, number], z: number) {
  ```
- Line 86:17
  ```typescript
  86 | export function hashFnv32a(array: ArrayLike<number>) {
  ```
- Line 99:17
  ```typescript
  99 | export function hashFnv256a(array: ArrayLike<number>, out: Uint32Array) {
  ```

#### `chunked-array.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 47:21
  ```typescript
  47 |     export function add4<T>(array: ChunkedArray<T, 4>, x: T, y: T, z: T, w: T) {
  ```
- Line 59:21
  ```typescript
  59 |     export function add3<T>(array: ChunkedArray<T, 3>, x: T, y: T, z: T) {
  ```
- Line 70:21
  ```typescript
  70 |     export function add2<T>(array: ChunkedArray<T, 2>, x: T, y: T) {
  ```
- Line 80:21
  ```typescript
  80 |     export function add<T>(array: ChunkedArray<T, 1>, x: T) {
  ```
- Line 87:21
  ```typescript
  87 |     export function addRepeat<T>(array: ChunkedArray<T, 1>, n: number, x: T) {
  ```
- Line 96:21
  ```typescript
  96 |     export function addMany<T>(array: ChunkedArray<T, any>, data: ArrayLike<T>) {
  ```

#### `array.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 30:17
  ```typescript
  30 | export function createRangeArray(start: number, end: number, ctor?: ArrayCtor<number>) {
  ```
- Line 39:17
  ```typescript
  39 | export function arrayPickIndices<T>(array: ArrayLike<T>, indices: ArrayLike<number>) {
  ```

#### `equivalence-classes.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 21:5
  ```typescript
  21 |     add(key: K, a: V) {
  ```
- Line 45:17
  ```typescript
  45 | export function EquivalenceClasses<K, V>(getHash: (x: V) => any, areEqual: (a: V, b: V) => boolean) {
  ```

#### `grouping.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 40:17
  ```typescript
  40 | export function Grouper<V, K>(getKey: (x: V) => K) {
  ```
- Line 44:17
  ```typescript
  44 | export function groupBy<V, K>(values: ArrayLike<V> | Column<V>, getKey: (x: V) => K) {
  ```

#### `sort.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 12:17
  ```typescript
  12 | export function arrayLess(arr: ArrayLike<number>, i: number, j: number) {
  ```

### Directory: `src/mol-geo/geometry`

#### `base.ts` (3 errors)

**Missing Explicit Types:**

- Line 37:14
  ```typescript
  37 | export const VisualQualityOptions = PD.arrayToOptions(VisualQualityNames);
  ```
- Line 41:14
  ```typescript
  41 | export const ColorSmoothingParams = {
  ```
- Line 84:18
  ```typescript
  84 |     export const Params = {
  ```

#### `geometry.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 130:21
  ```typescript
  130 |     export function getGranularity<T extends ColorType | SizeType>(locationIt: LocationIterator, granularity: T) {
  ```

#### `picking.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 16:21
  ```typescript
  16 |     export function areSame(a: PickingId, b: PickingId) {
  ```

### Directory: `src/mol-geo/geometry/cylinders`

#### `cylinders.ts` (1 errors)

**Missing Explicit Types:**

- Line 165:18
  ```typescript
  165 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/direct-volume`

#### `direct-volume.ts` (1 errors)

**Missing Explicit Types:**

- Line 158:18
  ```typescript
  158 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/image`

#### `image.ts` (1 errors)

**Missing Explicit Types:**

- Line 169:18
  ```typescript
  169 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/lines`

#### `lines.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 74:21
  ```typescript
  74 |     export function fromMesh(mesh: Mesh, lines?: Lines) {
  ```

**Missing Explicit Types:**

- Line 167:18
  ```typescript
  167 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/mesh`

#### `mesh.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 154:21
  ```typescript
  154 |     export function checkForDuplicateVertices(mesh: Mesh, fractionDigits = 3) {
  ```
- Line 194:21
  ```typescript
  194 |     export function getOriginalData(x: Mesh | MeshValues) {
  ```
- Line 203:21
  ```typescript
  203 |     export function uniformTriangleGroup(mesh: Mesh, splitTriangles = true) {
  ```
- Line 602:21
  ```typescript
  602 |     export function smoothEdges(mesh: Mesh, options: { iterations: number, maxNewEdgeLength: number }) {
  ```

**Missing Explicit Types:**

- Line 625:18
  ```typescript
  625 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/points`

#### `points.ts` (1 errors)

**Missing Explicit Types:**

- Line 130:18
  ```typescript
  130 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/spheres`

#### `spheres.ts` (1 errors)

**Missing Explicit Types:**

- Line 245:18
  ```typescript
  245 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/text`

#### `font-atlas.ts` (1 errors)

**Missing Explicit Types:**

- Line 29:14
  ```typescript
  29 | export const FontAtlasParams = {
  ```

#### `text.ts` (1 errors)

**Missing Explicit Types:**

- Line 153:18
  ```typescript
  153 |     export const Params = {
  ```

### Directory: `src/mol-geo/geometry/texture-mesh`

#### `texture-mesh.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 62:9
  ```typescript
  62 |         get() {
  ```

**Missing Explicit Types:**

- Line 120:18
  ```typescript
  120 |     export const Params = {
  ```

### Directory: `src/mol-gl`

#### `renderer.ts` (1 errors)

**Missing Explicit Types:**

- Line 93:14
  ```typescript
  93 | export const RendererParams = {
  ```

### Directory: `src/mol-gl/renderable`

#### `schema.ts` (10 errors)

**Missing Explicit Types:**

- Line 201:14
  ```typescript
  201 | export const GlobalDefineSchema = {
  ```
- Line 215:14
  ```typescript
  215 | export const ColorSchema = {
  ```
- Line 232:14
  ```typescript
  232 | export const SizeSchema = {
  ```
- Line 243:14
  ```typescript
  243 | export const MarkerSchema = {
  ```
- Line 254:14
  ```typescript
  254 | export const OverpaintSchema = {
  ```
- Line 268:14
  ```typescript
  268 | export const TransparencySchema = {
  ```
- Line 284:14
  ```typescript
  284 | export const EmissiveSchema = {
  ```
- Line 299:14
  ```typescript
  299 | export const SubstanceSchema = {
  ```
- Line 313:14
  ```typescript
  313 | export const ClippingSchema = {
  ```
- Line 322:14
  ```typescript
  322 | export const BaseSchema = {
  ```

#### `cylinders.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const CylindersSchema = {
  ```

#### `direct-volume.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const DirectVolumeSchema = {
  ```

#### `image.ts` (1 errors)

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const ImageSchema = {
  ```

#### `lines.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const LinesSchema = {
  ```

#### `mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const MeshSchema = {
  ```

#### `points.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const PointsSchema = {
  ```

#### `spheres.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const SpheresSchema = {
  ```

#### `text.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const TextSchema = {
  ```

#### `texture-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:14
  ```typescript
  14 | export const TextureMeshSchema = {
  ```

### Directory: `src/mol-gl/webgl`

#### `context.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 226:10
  ```typescript
  226 | function getShaderPrecisionFormats(
  ```
- Line 244:10
  ```typescript
  244 | function createStats() {
  ```

### Directory: `src/mol-io/common`

#### `string-like.ts` (1 errors)

**Missing Explicit Types:**

- Line 77:14
  ```typescript
  77 | export const StringLike = {
  ```

### Directory: `src/mol-io/common/binary-cif`

#### `array-encoder.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 58:21
  ```typescript
  58 |     export function fromEncoding(encoding: Encoding[]) {
  ```

#### `encoding.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 90:21
  ```typescript
  90 |     export function isSignedIntegerDataType(data: TypedIntArray) {
  ```

### Directory: `src/mol-io/reader/cif`

#### `data-model.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 82:21
  ```typescript
  82 |     export function ofTable(name: string, table: Table<any>) {
  ```
- Line 116:21
  ```typescript
  116 |     export function ofString(value: string) {
  ```

### Directory: `src/mol-io/reader/cif/schema`

#### `mmcif-extras.ts` (1 errors)

**Missing Explicit Types:**

- Line 29:14
  ```typescript
  29 | export const mmCIF_chemComp_schema = {
  ```

#### `mmcif.ts` (1 errors)

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const mmCIF_Schema = {
  ```

### Directory: `src/mol-io/reader/ply`

#### `schema.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 33:17
  ```typescript
  33 | export function PlyType(str: string) {
  ```

### Directory: `src/mol-io/reader/top`

#### `parser.ts` (3 errors)

**Missing Explicit Types:**

- Line 18:7
  ```typescript
  18 | const AtomsSchema = {
  ```
- Line 29:7
  ```typescript
  29 | const BondsSchema = {
  ```
- Line 34:7
  ```typescript
  34 | const MoleculesSchema = {
  ```

### Directory: `src/mol-io/writer/cif`

#### `encoder.ts` (10 errors)

**Missing Explicit Return Types:**

- Line 73:21
  ```typescript
  73 |     export function index(name: string) {
  ```
- Line 80:9
  ```typescript
  80 |         index(name: N) {
  ```
- Line 85:9
  ```typescript
  85 |         str(name: N, value: (k: K, d: D, index: number) => string, params?: ParamsBase<K, D>) {
  ```
- Line 90:9
  ```typescript
  90 |         int(name: N, value: (k: K, d: D, index: number) => number, params?: ParamsBase<K, D> & { typedArray?: ArrayEncoding.TypedArrayCtor }) {
  ```
- Line 95:9
  ```typescript
  95 |         vec(name: N, values: ((k: K, d: D, index: number) => number)[], params?: ParamsBase<K, D> & { typedArray?: ArrayEncoding.TypedArrayCtor }) {
  ```
- Line 102:9
  ```typescript
  102 |         float(name: N, value: (k: K, d: D, index: number) => number, params?: ParamsBase<K, D> & { typedArray?: ArrayEncoding.TypedArrayCtor, digitCount?: number }) {
  ```
- Line 107:9
  ```typescript
  107 |         many(fields: ArrayLike<Field<K, D>>) {
  ```
- Line 112:9
  ```typescript
  112 |         add(field: Field<K, D>) {
  ```
- Line 117:9
  ```typescript
  117 |         getFields() { return this.fields; }
  ```
- Line 120:21
  ```typescript
  120 |     export function build<K = number, D = any, N extends string = string>() {
  ```

### Directory: `src/mol-math/geometry`

#### `symmetry-operator.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 113:21
  ```typescript
  113 |     export function checkIfRotationAndTranslation(rot: Mat3, offset: Vec3) {
  ```
- Line 124:21
  ```typescript
  124 |     export function ofRotationAndOffset(name: string, rot: Mat3, offset: Vec3, ncsId?: number) {
  ```
- Line 178:21
  ```typescript
  178 |     export function compose(first: SymmetryOperator, second: SymmetryOperator) {
  ```

#### `molecular-surface.ts` (1 errors)

**Missing Explicit Types:**

- Line 49:14
  ```typescript
  49 | export const MolecularSurfaceCalculationParams = {
  ```

### Directory: `src/mol-math/geometry/lookup3d`

#### `common.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 31:21
  ```typescript
  31 |     export function copy<T = number>(out: Result<T>, result: Result<T>) {
  ```

### Directory: `src/mol-math/geometry/primitives`

#### `sphere3d.ts` (18 errors)

**Missing Explicit Return Types:**

- Line 22:10
  ```typescript
  22 | function Sphere3D() {
  ```
- Line 40:21
  ```typescript
  40 |     export function set(out: Sphere3D, center: Vec3, radius: number) {
  ```
- Line 46:21
  ```typescript
  46 |     export function copy(out: Sphere3D, a: Sphere3D) {
  ```
- Line 104:21
  ```typescript
  104 |     export function translate(out: Sphere3D, sphere: Sphere3D, v: Vec3) {
  ```
- Line 113:21
  ```typescript
  113 |     export function scale(out: Sphere3D, sphere: Sphere3D, s: number) {
  ```
- Line 123:21
  ```typescript
  123 |     export function scaleNX(out: Sphere3D, sphere: Sphere3D, s: number) {
  ```
- Line 129:21
  ```typescript
  129 |     export function toArray<T extends NumberArray>(s: Sphere3D, out: T, offset: number) {
  ```
- Line 135:21
  ```typescript
  135 |     export function fromArray(out: Sphere3D, array: NumberArray, offset: number) {
  ```
- Line 141:21
  ```typescript
  141 |     export function fromBox3D(out: Sphere3D, box: Box3D) {
  ```
- Line 159:21
  ```typescript
  159 |     export function fromAxes3D(out: Sphere3D, axes: Axes3D) {
  ```
- Line 167:21
  ```typescript
  167 |     export function fromDimensionsAndTransform(out: Sphere3D, dimensions: Vec3, transform: Mat4) {
  ```
- Line 190:21
  ```typescript
  190 |     export function addVec3(out: Sphere3D, s: Sphere3D, v: Vec3) {
  ```
- Line 202:21
  ```typescript
  202 |     export function expandBySphere(out: Sphere3D, sphere: Sphere3D, by: Sphere3D) {
  ```
- Line 261:21
  ```typescript
  261 |     export function exactEquals(a: Sphere3D, b: Sphere3D) {
  ```
- Line 268:21
  ```typescript
  268 |     export function equals(a: Sphere3D, b: Sphere3D) {
  ```
- Line 278:21
  ```typescript
  278 |     export function includes(a: Sphere3D, b: Sphere3D) {
  ```
- Line 290:21
  ```typescript
  290 |     export function overlaps(a: Sphere3D, b: Sphere3D) {
  ```
- Line 295:21
  ```typescript
  295 |     export function distance(a: Sphere3D, b: Sphere3D) {
  ```

#### `plane3d.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 17:10
  ```typescript
  17 | function Plane3D() {
  ```
- Line 48:21
  ```typescript
  48 |     export function toArray<T extends NumberArray>(p: Plane3D, out: T, offset: number) {
  ```
- Line 54:21
  ```typescript
  54 |     export function fromArray(out: Plane3D, array: NumberArray, offset: number) {
  ```
- Line 60:21
  ```typescript
  60 |     export function fromNormalAndCoplanarPoint(out: Plane3D, normal: Vec3, point: Vec3) {
  ```
- Line 66:21
  ```typescript
  66 |     export function fromCoplanarPoints(out: Plane3D, a: Vec3, b: Vec3, c: Vec3) {
  ```
- Line 73:21
  ```typescript
  73 |     export function setUnnormalized(out: Plane3D, nx: number, ny: number, nz: number, constant: number) {
  ```
- Line 81:21
  ```typescript
  81 |     export function distanceToPoint(plane: Plane3D, point: Vec3) {
  ```
- Line 85:21
  ```typescript
  85 |     export function distanceToSphere3D(plane: Plane3D, sphere: Sphere3D) {
  ```
- Line 89:21
  ```typescript
  89 |     export function projectPoint(out: Vec3, plane: Plane3D, point: Vec3) {
  ```

#### `box3d.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 16:10
  ```typescript
  16 | function Box3D() {
  ```
- Line 81:21
  ```typescript
  81 |     export function intersectsSphere3D(box: Box3D, sphere: Sphere3D) {
  ```
- Line 144:21
  ```typescript
  144 |     export function scale(out: Box3D, box: Box3D, scale: number) {
  ```
- Line 167:21
  ```typescript
  167 |     export function containsVec3(box: Box3D, v: Vec3) {
  ```
- Line 175:21
  ```typescript
  175 |     export function overlaps(a: Box3D, b: Box3D) {
  ```
- Line 183:21
  ```typescript
  183 |     export function containsSphere3D(box: Box3D, s: Sphere3D) {
  ```
- Line 197:21
  ```typescript
  197 |     export function exactEquals(a: Box3D, b: Box3D) {
  ```
- Line 201:21
  ```typescript
  201 |     export function equals(a: Box3D, b: Box3D) {
  ```

#### `frustum3d.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 18:10
  ```typescript
  18 | function Frustum3D() {
  ```
- Line 45:21
  ```typescript
  45 |     export function fromProjectionMatrix(out: Frustum3D, m: Mat4) {
  ```
- Line 61:21
  ```typescript
  61 |     export function intersectsSphere3D(frustum: Frustum3D, sphere: Sphere3D) {
  ```
- Line 73:21
  ```typescript
  73 |     export function intersectsBox3D(frustum: Frustum3D, box: Box3D) {
  ```
- Line 89:21
  ```typescript
  89 |     export function containsPoint(frustum: Frustum3D, point: Vec3) {
  ```

#### `axes3d.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 11:10
  ```typescript
  11 | function Axes3D() {
  ```
- Line 43:21
  ```typescript
  43 |     export function normalize(out: Axes3D, a: Axes3D) {
  ```

#### `ray3d.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 15:10
  ```typescript
  15 | function Ray3D() {
  ```

### Directory: `src/mol-math/geometry/spacegroup`

#### `construction.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 38:21
  ```typescript
  38 |     export function isZero(cell?: SpacegroupCell) {
  ```
- Line 92:21
  ```typescript
  92 |     export function setOperatorMatrix(spacegroup: Spacegroup, index: number, i: number, j: number, k: number, target: Mat4) {
  ```
- Line 121:21
  ```typescript
  121 |     export function getSymmetryOperatorRef(spacegroup: Spacegroup, spgrOp: number, i: number, j: number, k: number, ref: Vec3) {
  ```
- Line 158:21
  ```typescript
  158 |     export function getOperatorXyz(op: Mat4) {
  ```

**Missing Explicit Types:**

- Line 81:18
  ```typescript
  81 |     export const ZeroP1 = create(SpacegroupCell.Zero);
  ```

#### `cell.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 16:10
  ```typescript
  16 | function Cell() {
  ```
- Line 29:21
  ```typescript
  29 |     export function fromBasis(x: Vec3, y: Vec3, z: Vec3) {
  ```

### Directory: `src/mol-math/graph`

#### `int-adjacency-graph.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 52:21
  ```typescript
  52 |     export function areEqual<VertexIndex extends number, EdgeProps extends IntAdjacencyGraph.EdgePropsBase>(a: IntAdjacencyGraph<VertexIndex, EdgeProps>, b: IntAdjacencyGraph<VertexIndex, EdgeProps>) {
  ```
- Line 135:9
  ```typescript
  135 |         createGraph<EdgeProps extends IntAdjacencyGraph.EdgePropsBase, Props>(edgeProps: EdgeProps, props?: Props) {
  ```
- Line 218:9
  ```typescript
  218 |         createGraph<EdgeProps extends IntAdjacencyGraph.EdgePropsBase, Props>(edgeProps: EdgeProps, props?: Props) {
  ```
- Line 280:9
  ```typescript
  280 |         addEdge(i: VertexIndex, j: VertexIndex) {
  ```
- Line 296:9
  ```typescript
  296 |         getEdgeBuiler() {
  ```
- Line 304:21
  ```typescript
  304 |     export function fromVertexPairs<VertexIndex extends number>(vertexCount: number, xs: VertexIndex[], ys: VertexIndex[]) {
  ```

#### `inter-unit-graph.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 91:9
  ```typescript
  91 |         hasEdges(indexA: VertexIndex) {
  ```
- Line 100:13
  ```typescript
  100 |         get areUnitsOrdered() {
  ```
- Line 126:21
  ```typescript
  126 |     export function getEdgeUnitKey<UnitId extends number>(unitA: UnitId, unitB: UnitId) {
  ```
- Line 130:21
  ```typescript
  130 |     export function getEdgeIndexKey<VertexIndex extends number>(indexA: VertexIndex, indexB: VertexIndex) {
  ```
- Line 134:21
  ```typescript
  134 |     export function getVertexKey<UnitId extends number, VertexIndex extends number>(index: VertexIndex, unit: UnitId) {
  ```

### Directory: `src/mol-math/linear-algebra`

#### `tensor.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 61:21
  ```typescript
  61 |     export function Vector(d: number, ctor?: ArrayCtor) { return Space([d], [0], ctor); }
  ```
- Line 62:21
  ```typescript
  62 |     export function ColumnMajorMatrix(rows: number, cols: number, ctor?: ArrayCtor) { return Space([rows, cols], [1, 0], ctor); }
  ```
- Line 63:21
  ```typescript
  63 |     export function RowMajorMatrix(rows: number, cols: number, ctor?: ArrayCtor) { return Space([rows, cols], [0, 1], ctor); }
  ```
- Line 97:21
  ```typescript
  97 |     export function areEqualExact(a: Tensor.Data, b: Tensor.Data) {
  ```
- Line 291:21
  ```typescript
  291 |     export function invertAxisOrder(v: number[]) {
  ```
- Line 305:21
  ```typescript
  305 |     export function convertToCanonicalAxisIndicesFastToSlow(order: number[]) {
  ```
- Line 311:21
  ```typescript
  311 |     export function convertToCanonicalAxisIndicesSlowToFast(order: number[]) {
  ```

### Directory: `src/mol-math/linear-algebra/3d`

#### `vec3.ts` (61 errors)

**Missing Explicit Return Types:**

- Line 32:17
  ```typescript
  32 | export function Vec3() {
  ```
- Line 55:21
  ```typescript
  55 |     export function hasNaN(a: Vec3) {
  ```
- Line 59:21
  ```typescript
  59 |     export function setNaN(out: Vec3) {
  ```
- Line 70:21
  ```typescript
  70 |     export function toObj(v: Vec3) {
  ```
- Line 74:21
  ```typescript
  74 |     export function fromArray(v: Vec3, array: ArrayLike<number>, offset: number) {
  ```
- Line 81:21
  ```typescript
  81 |     export function toArray<T extends NumberArray>(v: Vec3, out: T, offset: number) {
  ```
- Line 96:21
  ```typescript
  96 |     export function ofArray(array: ArrayLike<number>) {
  ```
- Line 111:21
  ```typescript
  111 |     export function copy(out: Vec3, a: Vec3) {
  ```
- Line 118:21
  ```typescript
  118 |     export function add(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 125:21
  ```typescript
  125 |     export function sub(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 132:21
  ```typescript
  132 |     export function mul(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 139:21
  ```typescript
  139 |     export function div(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 146:21
  ```typescript
  146 |     export function scale(out: Vec3, a: Vec3, b: number) {
  ```
- Line 154:21
  ```typescript
  154 |     export function scaleAndAdd(out: Vec3, a: Vec3, b: Vec3, scale: number) {
  ```
- Line 162:21
  ```typescript
  162 |     export function scaleAndSub(out: Vec3, a: Vec3, b: Vec3, scale: number) {
  ```
- Line 169:21
  ```typescript
  169 |     export function addScalar(out: Vec3, a: Vec3, b: number) {
  ```
- Line 176:21
  ```typescript
  176 |     export function subScalar(out: Vec3, a: Vec3, b: number) {
  ```
- Line 186:21
  ```typescript
  186 |     export function round(out: Vec3, a: Vec3) {
  ```
- Line 196:21
  ```typescript
  196 |     export function ceil(out: Vec3, a: Vec3) {
  ```
- Line 206:21
  ```typescript
  206 |     export function floor(out: Vec3, a: Vec3) {
  ```
- Line 216:21
  ```typescript
  216 |     export function trunc(out: Vec3, a: Vec3) {
  ```
- Line 226:21
  ```typescript
  226 |     export function abs(out: Vec3, a: Vec3) {
  ```
- Line 236:21
  ```typescript
  236 |     export function min(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 246:21
  ```typescript
  246 |     export function max(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 256:21
  ```typescript
  256 |     export function clamp(out: Vec3, a: Vec3, min: Vec3, max: Vec3) {
  ```
- Line 263:21
  ```typescript
  263 |     export function distance(a: Vec3, b: Vec3) {
  ```
- Line 270:21
  ```typescript
  270 |     export function squaredDistance(a: Vec3, b: Vec3) {
  ```
- Line 277:21
  ```typescript
  277 |     export function magnitude(a: Vec3) {
  ```
- Line 284:21
  ```typescript
  284 |     export function squaredMagnitude(a: Vec3) {
  ```
- Line 291:21
  ```typescript
  291 |     export function setMagnitude(out: Vec3, a: Vec3, l: number) {
  ```
- Line 298:21
  ```typescript
  298 |     export function negate(out: Vec3, a: Vec3) {
  ```
- Line 308:21
  ```typescript
  308 |     export function inverse(out: Vec3, a: Vec3) {
  ```
- Line 315:21
  ```typescript
  315 |     export function normalize(out: Vec3, a: Vec3) {
  ```
- Line 329:21
  ```typescript
  329 |     export function dot(a: Vec3, b: Vec3) {
  ```
- Line 333:21
  ```typescript
  333 |     export function cross(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 346:21
  ```typescript
  346 |     export function lerp(out: Vec3, a: Vec3, b: Vec3, t: number) {
  ```
- Line 357:21
  ```typescript
  357 |     export function slerp(out: Vec3, a: Vec3, b: Vec3, t: number) {
  ```
- Line 368:21
  ```typescript
  368 |     export function hermite(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number) {
  ```
- Line 385:21
  ```typescript
  385 |     export function bezier(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number) {
  ```
- Line 401:21
  ```typescript
  401 |     export function quadraticBezier(out: Vec3, a: Vec3, b: Vec3, c: Vec3, t: number) {
  ```
- Line 412:21
  ```typescript
  412 |     export function spline(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number, tension: number) {
  ```
- Line 423:21
  ```typescript
  423 |     export function random(out: Vec3, scale: number) {
  ```
- Line 437:21
  ```typescript
  437 |     export function transformMat4(out: Vec3, a: Vec3, m: Mat4) {
  ```
- Line 446:21
  ```typescript
  446 |     export function transformDirection(out: Vec3, a: Vec3, m: Mat4) {
  ```
- Line 457:21
  ```typescript
  457 |     export function transformMat4Offset(out: NumberArray, a: NumberArray, m: NumberArray, outO: number, aO: number, oM: number) {
  ```
- Line 471:21
  ```typescript
  471 |     export function transformDirectionOffset(out: NumberArray, a: NumberArray, m: NumberArray, outO: number, aO: number, oM: number) {
  ```
- Line 489:21
  ```typescript
  489 |     export function transformMat3(out: Vec3, a: Vec3, m: Mat3) {
  ```
- Line 498:21
  ```typescript
  498 |     export function transformQuat(out: Vec3, a: Vec3, q: Quat) {
  ```
- Line 518:21
  ```typescript
  518 |     export function angle(a: Vec3, b: Vec3) {
  ```
- Line 565:21
  ```typescript
  565 |     export function exactEquals(a: Vec3, b: Vec3) {
  ```
- Line 572:21
  ```typescript
  572 |     export function equals(a: Vec3, b: Vec3) {
  ```
- Line 592:21
  ```typescript
  592 |     export function isZero(v: Vec3) {
  ```
- Line 597:21
  ```typescript
  597 |     export function projectPointOnVector(out: Vec3, point: Vec3, vector: Vec3, origin: Vec3) {
  ```
- Line 605:21
  ```typescript
  605 |     export function projectPointOnPlane(out: Vec3, point: Vec3, normal: Vec3, origin: Vec3) {
  ```
- Line 611:21
  ```typescript
  611 |     export function projectOnVector(out: Vec3, p: Vec3, vector: Vec3) {
  ```
- Line 617:21
  ```typescript
  617 |     export function projectOnPlane(out: Vec3, p: Vec3, normal: Vec3) {
  ```
- Line 623:21
  ```typescript
  623 |     export function orthogonalize(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 631:21
  ```typescript
  631 |     export function matchDirection(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 640:21
  ```typescript
  640 |     export function orthogonalDirection(out: Vec3, dir: Vec3) {
  ```
- Line 668:21
  ```typescript
  668 |     export function triangleNormal(out: Vec3, a: Vec3, b: Vec3, c: Vec3) {
  ```
- Line 679:21
  ```typescript
  679 |     export function toString(a: Vec3, precision?: number) {
  ```

#### `mat4.ts` (47 errors)

**Missing Explicit Return Types:**

- Line 31:10
  ```typescript
  31 | function Mat4() {
  ```
- Line 109:21
  ```typescript
  109 |     export function isIdentity(m: Mat4, eps?: number) {
  ```
- Line 113:21
  ```typescript
  113 |     export function hasNaN(m: Mat4) {
  ```
- Line 118:21
  ```typescript
  118 |     export function areEqual(a: Mat4, b: Mat4, eps: number) {
  ```
- Line 129:21
  ```typescript
  129 |     export function getValue(a: Mat4, i: number, j: number) {
  ```
- Line 133:21
  ```typescript
  133 |     export function toArray<T extends NumberArray>(a: Mat4, out: T, offset: number) {
  ```
- Line 153:21
  ```typescript
  153 |     export function fromArray(a: Mat4, array: NumberArray, offset: number) {
  ```
- Line 173:21
  ```typescript
  173 |     export function fromBasis(a: Mat4, x: Vec3, y: Vec3, z: Vec3) {
  ```
- Line 188:21
  ```typescript
  188 |     export function copy(out: Mat4, a: Mat4) {
  ```
- Line 208:21
  ```typescript
  208 |     export function clone(a: Mat4) {
  ```
- Line 215:21
  ```typescript
  215 |     export function getTranslation(out: Vec3, mat: Mat4) {
  ```
- Line 225:21
  ```typescript
  225 |     export function getScaling(out: Vec3, mat: Mat4) {
  ```
- Line 244:21
  ```typescript
  244 |     export function getRotation(out: Quat, mat: Mat4) {
  ```
- Line 278:21
  ```typescript
  278 |     export function extractRotation(out: Mat4, mat: Mat4) {
  ```
- Line 303:21
  ```typescript
  303 |     export function transpose(out: Mat4, a: Mat4) {
  ```
- Line 342:21
  ```typescript
  342 |     export function tryInvert(out: Mat4, a: Mat4) {
  ```
- Line 389:21
  ```typescript
  389 |     export function invert(out: Mat4, a: Mat4) {
  ```
- Line 396:21
  ```typescript
  396 |     export function mul(out: Mat4, a: Mat4, b: Mat4) {
  ```
- Line 432:21
  ```typescript
  432 |     export function mulOffset(out: NumberArray, a: NumberArray, b: NumberArray, oOut: number, oA: number, oB: number) {
  ```
- Line 465:21
  ```typescript
  465 |     export function mul3(out: Mat4, a: Mat4, b: Mat4, c: Mat4) {
  ```
- Line 470:21
  ```typescript
  470 |     export function translate(out: Mat4, a: Mat4, v: Vec3) {
  ```
- Line 499:21
  ```typescript
  499 |     export function fromTranslation(out: Mat4, v: Vec3) {
  ```
- Line 519:21
  ```typescript
  519 |     export function setTranslation(out: Mat4, v: Vec3) {
  ```
- Line 531:21
  ```typescript
  531 |     export function setAxes(out: Mat4, view: Vec3, right: Vec3, up: Vec3) {
  ```
- Line 544:21
  ```typescript
  544 |     export function rotate(out: Mat4, a: Mat4, rad: number, axis: Vec3) {
  ```
- Line 593:21
  ```typescript
  593 |     export function fromRotation(out: Mat4, rad: number, axis: Vec3) {
  ```
- Line 628:21
  ```typescript
  628 |     export function scale(out: Mat4, a: Mat4, v: Vec3) {
  ```
- Line 650:21
  ```typescript
  650 |     export function scaleUniformly(out: Mat4, a: Mat4, scale: number) {
  ```
- Line 670:21
  ```typescript
  670 |     export function fromScaling(out: Mat4, v: Vec3) {
  ```
- Line 690:21
  ```typescript
  690 |     export function fromUniformScaling(out: Mat4, scale: number) {
  ```
- Line 715:21
  ```typescript
  715 |     export function fromPlane(out: Mat4, normal: Vec3, point: Vec3) {
  ```
- Line 737:21
  ```typescript
  737 |     export function fromMat3(out: Mat4, a: Mat3) {
  ```
- Line 750:21
  ```typescript
  750 |     export function compose(out: Mat4, position: Vec3, quaternion: Quat, scale: Vec3) {
  ```
- Line 784:21
  ```typescript
  784 |     export function decompose(m: Mat4, position: Vec3, quaternion: Quat, scale: Vec3) {
  ```
- Line 834:21
  ```typescript
  834 |     export function makeTable(m: Mat4) {
  ```
- Line 846:21
  ```typescript
  846 |     export function determinant(a: Mat4) {
  ```
- Line 876:21
  ```typescript
  876 |     export function isRotationAndTranslation(a: Mat4, eps?: number) {
  ```
- Line 905:21
  ```typescript
  905 |     export function isTranslationAndUniformScaling(a: Mat4, eps?: number) {
  ```
- Line 929:21
  ```typescript
  929 |     export function fromQuat(out: Mat4, q: Quat) {
  ```
- Line 968:21
  ```typescript
  968 |     export function fromEuler(out: Mat4, euler: Euler, order: Euler.Order) {
  ```
- Line 1059:21
  ```typescript
  1059 |     export function perspective(out: Mat4, left: number, right: number, top: number, bottom: number, near: number, far: number) {
  ```
- Line 1090:21
  ```typescript
  1090 |     export function ortho(out: Mat4, left: number, right: number, top: number, bottom: number, near: number, far: number) {
  ```
- Line 1121:21
  ```typescript
  1121 |     export function lookAt(out: Mat4, eye: Vec3, center: Vec3, up: Vec3) {
  ```
- Line 1203:21
  ```typescript
  1203 |     export function targetTo(out: Mat4, eye: Vec3, target: Vec3, up: Vec3) {
  ```
- Line 1257:21
  ```typescript
  1257 |     export function fromPermutation(out: Mat4, perm: number[]) {
  ```
- Line 1266:21
  ```typescript
  1266 |     export function getMaxScaleOnAxis(m: Mat4) {
  ```
- Line 1273:21
  ```typescript
  1273 |     export function extractBasis(m: Mat4) {
  ```

#### `quat.ts` (33 errors)

**Missing Explicit Return Types:**

- Line 36:10
  ```typescript
  36 | function Quat() {
  ```
- Line 61:21
  ```typescript
  61 |     export function hasNaN(q: Quat) {
  ```
- Line 65:21
  ```typescript
  65 |     export function create(x: number, y: number, z: number, w: number) {
  ```
- Line 74:21
  ```typescript
  74 |     export function setAxisAngle(out: Quat, axis: Vec3, rad: number) {
  ```
- Line 94:21
  ```typescript
  94 |     export function getAxisAngle(out_axis: Vec3, q: Quat) {
  ```
- Line 110:21
  ```typescript
  110 |     export function multiply(out: Quat, a: Quat, b: Quat) {
  ```
- Line 121:21
  ```typescript
  121 |     export function rotateX(out: Quat, a: Quat, rad: number) {
  ```
- Line 134:21
  ```typescript
  134 |     export function rotateY(out: Quat, a: Quat, rad: number) {
  ```
- Line 147:21
  ```typescript
  147 |     export function rotateZ(out: Quat, a: Quat, rad: number) {
  ```
- Line 165:21
  ```typescript
  165 |     export function calculateW(out: Quat, a: Quat) {
  ```
- Line 178:21
  ```typescript
  178 |     export function slerp(out: Quat, a: Quat, b: Quat, t: number) {
  ```
- Line 218:21
  ```typescript
  218 |     export function invert(out: Quat, a: Quat) {
  ```
- Line 236:21
  ```typescript
  236 |     export function conjugate(out: Quat, a: Quat) {
  ```
- Line 244:21
  ```typescript
  244 |     export function dot(a: Quat, b: Quat) {
  ```
- Line 254:21
  ```typescript
  254 |     export function fromMat3(out: Quat, m: Mat3) {
  ```
- Line 288:21
  ```typescript
  288 |     export function fromMat4(out: Quat, m: Mat4) {
  ```
- Line 293:21
  ```typescript
  293 |     export function fromEuler(out: Quat, euler: Euler, order: Euler.Order) {
  ```
- Line 352:21
  ```typescript
  352 |     export function fromUnitVec3(out: Quat, a: Vec3, b: Vec3) {
  ```
- Line 379:21
  ```typescript
  379 |     export function fromBasis(out: Quat, x: Vec3, y: Vec3, z: Vec3) {
  ```
- Line 384:21
  ```typescript
  384 |     export function clone(a: Quat) {
  ```
- Line 397:21
  ```typescript
  397 |     export function toObj(a: Quat) {
  ```
- Line 401:21
  ```typescript
  401 |     export function toArray<T extends NumberArray>(a: Quat, out: T, offset: number) {
  ```
- Line 409:21
  ```typescript
  409 |     export function fromArray(a: Quat, array: NumberArray, offset: number) {
  ```
- Line 417:21
  ```typescript
  417 |     export function copy(out: Quat, a: Quat) {
  ```
- Line 425:21
  ```typescript
  425 |     export function set(out: Quat, x: number, y: number, z: number, w: number) {
  ```
- Line 436:21
  ```typescript
  436 |     export function exactEquals(a: Quat, b: Quat) {
  ```
- Line 443:21
  ```typescript
  443 |     export function equals(a: Quat, b: Quat) {
  ```
- Line 452:21
  ```typescript
  452 |     export function add(out: Quat, a: Quat, b: Quat) {
  ```
- Line 474:21
  ```typescript
  474 |     export function normalize(out: Quat, a: Quat) {
  ```
- Line 499:21
  ```typescript
  499 |     export function rotationTo(out: Quat, a: Vec3, b: Vec3) {
  ```
- Line 529:21
  ```typescript
  529 |     export function sqlerp(out: Quat, a: Quat, b: Quat, c: Quat, d: Quat, t: number) {
  ```
- Line 542:21
  ```typescript
  542 |     export function setAxes(out: Quat, view: Vec3, right: Vec3, up: Vec3) {
  ```
- Line 558:21
  ```typescript
  558 |     export function toString(a: Quat, precision?: number) {
  ```

#### `mat3.ts` (28 errors)

**Missing Explicit Return Types:**

- Line 29:10
  ```typescript
  29 | function Mat3() {
  ```
- Line 68:21
  ```typescript
  68 |     export function toArray<T extends NumberArray>(a: Mat3, out: T, offset: number) {
  ```
- Line 81:21
  ```typescript
  81 |     export function fromArray(a: Mat3, array: NumberArray, offset: number) {
  ```
- Line 94:21
  ```typescript
  94 |     export function fromColumns(out: Mat3, left: Vec3, middle: Vec3, right: Vec3) {
  ```
- Line 110:21
  ```typescript
  110 |     export function fromMat4(out: Mat3, a: Mat4) {
  ```
- Line 124:21
  ```typescript
  124 |     export function fromEuler(out: Mat3, euler: Euler, order: Euler.Order) {
  ```
- Line 129:21
  ```typescript
  129 |     export function fromRotation(out: Mat3, rad: number, axis: Vec3) {
  ```
- Line 149:21
  ```typescript
  149 |     export function isIdentity(m: Mat3, eps?: number) {
  ```
- Line 153:21
  ```typescript
  153 |     export function hasNaN(m: Mat3) {
  ```
- Line 161:21
  ```typescript
  161 |     export function clone(a: Mat3) {
  ```
- Line 165:21
  ```typescript
  165 |     export function areEqual(a: Mat3, b: Mat3, eps: number) {
  ```
- Line 176:21
  ```typescript
  176 |     export function getValue(a: Mat3, i: number, j: number) {
  ```
- Line 183:21
  ```typescript
  183 |     export function copy(out: Mat3, a: Mat3) {
  ```
- Line 199:21
  ```typescript
  199 |     export function transpose(out: Mat3, a: Mat3) {
  ```
- Line 256:21
  ```typescript
  256 |     export function symmtricFromUpper(out: Mat3, a: Mat3) {
  ```
- Line 275:21
  ```typescript
  275 |     export function symmtricFromLower(out: Mat3, a: Mat3) {
  ```
- Line 294:21
  ```typescript
  294 |     export function determinant(a: Mat3) {
  ```
- Line 307:21
  ```typescript
  307 |     export function trace(a: Mat3) {
  ```
- Line 311:21
  ```typescript
  311 |     export function sub(out: Mat3, a: Mat3, b: Mat3) {
  ```
- Line 324:21
  ```typescript
  324 |     export function add(out: Mat3, a: Mat3, b: Mat3) {
  ```
- Line 337:21
  ```typescript
  337 |     export function mul(out: Mat3, a: Mat3, b: Mat3) {
  ```
- Line 360:21
  ```typescript
  360 |     export function subScalar(out: Mat3, a: Mat3, s: number) {
  ```
- Line 373:21
  ```typescript
  373 |     export function addScalar(out: Mat3, a: Mat3, s: number) {
  ```
- Line 386:21
  ```typescript
  386 |     export function mulScalar(out: Mat3, a: Mat3, s: number) {
  ```
- Line 406:21
  ```typescript
  406 |     export function symmetricEigenvalues(out: Vec3, a: Mat3) {
  ```
- Line 444:21
  ```typescript
  444 |     export function eigenvector(out: Vec3, a: Mat3, e: number) {
  ```
- Line 474:21
  ```typescript
  474 |     export function directionTransform(out: Mat3, t: Mat4) {
  ```
- Line 485:21
  ```typescript
  485 |     export function innerProduct(a: Mat3, b: Mat3) {
  ```

#### `vec4.ts` (26 errors)

**Missing Explicit Return Types:**

- Line 27:10
  ```typescript
  27 | function Vec4() {
  ```
- Line 39:21
  ```typescript
  39 |     export function clone(a: Vec4) {
  ```
- Line 48:21
  ```typescript
  48 |     export function create(x: number, y: number, z: number, w: number) {
  ```
- Line 57:21
  ```typescript
  57 |     export function fromSphere(out: Vec4, sphere: Sphere3D) {
  ```
- Line 65:21
  ```typescript
  65 |     export function ofSphere(sphere: Sphere3D) {
  ```
- Line 69:21
  ```typescript
  69 |     export function hasNaN(a: Vec4) {
  ```
- Line 73:21
  ```typescript
  73 |     export function toArray<T extends NumberArray>(a: Vec4, out: T, offset: number) {
  ```
- Line 81:21
  ```typescript
  81 |     export function fromArray(a: Vec4, array: NumberArray, offset: number) {
  ```
- Line 95:21
  ```typescript
  95 |     export function fromVec3Array(a: Vec4, array: NumberArray, offset: number) {
  ```
- Line 103:21
  ```typescript
  103 |     export function copy(out: Vec4, a: Vec4) {
  ```
- Line 111:21
  ```typescript
  111 |     export function set(out: Vec4, x: number, y: number, z: number, w: number) {
  ```
- Line 119:21
  ```typescript
  119 |     export function add(out: Vec4, a: Vec4, b: Vec4) {
  ```
- Line 127:21
  ```typescript
  127 |     export function distance(a: Vec4, b: Vec4) {
  ```
- Line 135:21
  ```typescript
  135 |     export function scale(out: Vec4, a: Vec4, b: number) {
  ```
- Line 146:21
  ```typescript
  146 |     export function round(out: Vec4, a: Vec4) {
  ```
- Line 157:21
  ```typescript
  157 |     export function ceil(out: Vec4, a: Vec4) {
  ```
- Line 168:21
  ```typescript
  168 |     export function floor(out: Vec4, a: Vec4) {
  ```
- Line 176:21
  ```typescript
  176 |     export function squaredDistance(a: Vec4, b: Vec4) {
  ```
- Line 184:21
  ```typescript
  184 |     export function norm(a: Vec4) {
  ```
- Line 192:21
  ```typescript
  192 |     export function squaredNorm(a: Vec4) {
  ```
- Line 200:21
  ```typescript
  200 |     export function transformMat4(out: Vec4, a: Vec4, m: Mat4) {
  ```
- Line 209:21
  ```typescript
  209 |     export function dot(a: Vec4, b: Vec4) {
  ```
- Line 216:21
  ```typescript
  216 |     export function inverse(out: Vec4, a: Vec4) {
  ```
- Line 227:21
  ```typescript
  227 |     export function exactEquals(a: Vec4, b: Vec4) {
  ```
- Line 234:21
  ```typescript
  234 |     export function equals(a: Vec4, b: Vec4) {
  ```
- Line 243:21
  ```typescript
  243 |     export function toString(a: Vec4, precision?: number) {
  ```

#### `vec2.ts` (25 errors)

**Missing Explicit Return Types:**

- Line 23:10
  ```typescript
  23 | function Vec2() {
  ```
- Line 35:21
  ```typescript
  35 |     export function clone(a: Vec2) {
  ```
- Line 42:21
  ```typescript
  42 |     export function create(x: number, y: number) {
  ```
- Line 49:21
  ```typescript
  49 |     export function hasNaN(a: Vec2) {
  ```
- Line 53:21
  ```typescript
  53 |     export function toArray<T extends NumberArray>(a: Vec2, out: T, offset: number) {
  ```
- Line 59:21
  ```typescript
  59 |     export function fromArray(a: Vec2, array: NumberArray, offset: number) {
  ```
- Line 65:21
  ```typescript
  65 |     export function copy(out: Vec2, a: Vec2) {
  ```
- Line 71:21
  ```typescript
  71 |     export function set(out: Vec2, x: number, y: number) {
  ```
- Line 77:21
  ```typescript
  77 |     export function add(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 83:21
  ```typescript
  83 |     export function sub(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 89:21
  ```typescript
  89 |     export function mul(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 95:21
  ```typescript
  95 |     export function div(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 101:21
  ```typescript
  101 |     export function scale(out: Vec2, a: Vec2, b: number) {
  ```
- Line 110:21
  ```typescript
  110 |     export function round(out: Vec2, a: Vec2) {
  ```
- Line 119:21
  ```typescript
  119 |     export function ceil(out: Vec2, a: Vec2) {
  ```
- Line 128:21
  ```typescript
  128 |     export function floor(out: Vec2, a: Vec2) {
  ```
- Line 134:21
  ```typescript
  134 |     export function distance(a: Vec2, b: Vec2) {
  ```
- Line 140:21
  ```typescript
  140 |     export function squaredDistance(a: Vec2, b: Vec2) {
  ```
- Line 146:21
  ```typescript
  146 |     export function magnitude(a: Vec2) {
  ```
- Line 152:21
  ```typescript
  152 |     export function squaredMagnitude(a: Vec2) {
  ```
- Line 158:21
  ```typescript
  158 |     export function setMagnitude(out: Vec2, a: Vec2, l: number) {
  ```
- Line 165:21
  ```typescript
  165 |     export function inverse(out: Vec2, a: Vec2) {
  ```
- Line 171:21
  ```typescript
  171 |     export function normalize(out: Vec2, a: Vec2) {
  ```
- Line 183:21
  ```typescript
  183 |     export function areEqual(a: Vec2, b: Vec2) {
  ```
- Line 187:21
  ```typescript
  187 |     export function toString(a: Vec2, precision?: number) {
  ```

#### `euler.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 18:10
  ```typescript
  18 | function Euler() {
  ```
- Line 40:21
  ```typescript
  40 |     export function set(out: Euler, x: number, y: number, z: number) {
  ```
- Line 55:21
  ```typescript
  55 |     export function copy(out: Euler, a: Euler) {
  ```
- Line 139:21
  ```typescript
  139 |     export function fromQuat(out: Euler, q: Quat, order: Order) {
  ```
- Line 144:21
  ```typescript
  144 |     export function fromVec3(out: Euler, v: Vec3) {
  ```
- Line 148:21
  ```typescript
  148 |     export function exactEquals(a: Euler, b: Euler) {
  ```
- Line 152:21
  ```typescript
  152 |     export function fromArray(e: Euler, array: ArrayLike<number>, offset: number) {
  ```
- Line 159:21
  ```typescript
  159 |     export function toArray<T extends NumberArray>(e: Euler, out: T, offset: number) {
  ```

### Directory: `src/mol-model`

#### `loci.ts` (16 errors)

**Missing Explicit Return Types:**

- Line 83:21
  ```typescript
  83 |     export function areEqual(lociA: Loci, lociB: Loci) {
  ```
- Line 123:21
  ```typescript
  123 |     export function isEmpty(loci: Loci) {
  ```
- Line 139:21
  ```typescript
  139 |     export function remap<T>(loci: Loci, data: T) {
  ```
- Line 224:20
  ```typescript
  224 |         'residue': (loci: Loci) => {
  ```
- Line 229:18
  ```typescript
  229 |         'chain': (loci: Loci) => {
  ```
- Line 234:19
  ```typescript
  234 |         'entity': (loci: Loci) => {
  ```
- Line 239:18
  ```typescript
  239 |         'model': (loci: Loci) => {
  ```
- Line 244:21
  ```typescript
  244 |         'operator': (loci: Loci) => {
  ```
- Line 249:22
  ```typescript
  249 |         'structure': (loci: Loci) => {
  ```
- Line 260:29
  ```typescript
  260 |         'elementInstances': (loci: Loci) => {
  ```
- Line 265:29
  ```typescript
  265 |         'residueInstances': (loci: Loci) => {
  ```
- Line 270:27
  ```typescript
  270 |         'chainInstances': (loci: Loci) => {
  ```
- Line 288:21
  ```typescript
  288 |     export function simpleGranularity(granularity: Granularity) {
  ```
- Line 292:21
  ```typescript
  292 |     export function applyGranularity(loci: Loci, granularity: Granularity) {
  ```
- Line 300:21
  ```typescript
  300 |     export function normalize(loci: Loci, granularity?: Granularity, alwaysConvertBonds = false) {
  ```

**Missing Explicit Types:**

- Line 277:18
  ```typescript
  277 |     export const GranularityOptions = ParamDefinition.objectToOptions(Granularity, k => {
  ```

#### `custom-property.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 29:10
  ```typescript
  29 | function CustomPropertyDescriptor<Ctx, Desc extends CustomPropertyDescriptor<Ctx>>(desc: Desc) {
  ```
- Line 70:5
  ```typescript
  70 |     hasReference(desc: CustomPropertyDescriptor<any>) {
  ```

### Directory: `src/mol-model-formats/structure/common`

#### `property.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 26:5
  ```typescript
  26 |     get(kind: ModelFormat['kind']) {
  ```
- Line 30:5
  ```typescript
  30 |     isApplicable(model: Model) {
  ```

### Directory: `src/mol-model-formats/structure/property`

#### `anisotropic.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 50:21
  ```typescript
  50 |     export function getElementToAnsiotrop(atomId: Column<number>, ansioId: Column<number>) {
  ```
- Line 67:21
  ```typescript
  67 |     export function getElementToAnsiotropFromLabel(atomLabel: Column<string>, ansioLabel: Column<string>) {
  ```

**Missing Explicit Types:**

- Line 48:18
  ```typescript
  48 |     export const Provider = FormatPropertyProvider.create<AtomSiteAnisotrop>(Descriptor);
  ```

#### `symmetry.ts` (1 errors)

**Missing Explicit Types:**

- Line 24:18
  ```typescript
  24 |     export const Provider = FormatPropertyProvider.create<Symmetry>(Descriptor);
  ```

### Directory: `src/mol-model-props/common`

#### `custom-property.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 51:9
  ```typescript
  51 |         getParams(data?: Data) {
  ```
- Line 86:9
  ```typescript
  86 |         get(name: string) {
  ```

#### `custom-model-property.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 88:21
  ```typescript
  88 |     export function createSimple<T>(name: string, type: 'static' | 'dynamic', defaultValue?: T) {
  ```

#### `custom-structure-property.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 91:21
  ```typescript
  91 |     export function createSimple<T>(name: string, type: 'root' | 'local', defaultValue?: T) {
  ```

### Directory: `src/mol-model-props/computed/interactions`

#### `interactions.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 65:21
  ```typescript
  65 |     export function areLocationsEqual(locA: Location, locB: Location) {
  ```
- Line 105:21
  ```typescript
  105 |     export function getBoundingSphere(interactions: Interactions, elements: ReadonlyArray<Element>, boundingSphere: Sphere3D) {
  ```
- Line 114:21
  ```typescript
  114 |     export function getLabel(structure: Structure, interactions: Interactions, elements: ReadonlyArray<Element>) {
  ```
- Line 152:10
  ```typescript
  152 | function getProvidersParams(defaultOn: string[] = []) {
  ```

**Missing Explicit Types:**

- Line 166:14
  ```typescript
  166 | export const ContactProviderParams = getProvidersParams([
  ```
- Line 177:14
  ```typescript
  177 | export const InteractionsParams = {
  ```

#### `features.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 45:21
  ```typescript
  45 |     export function setPosition(out: Vec3, unit: Unit, index: FeatureIndex, features: Features) {
  ```
- Line 173:21
  ```typescript
  173 |     export function position(out: Vec3, info: Info) {
  ```
- Line 181:21
  ```typescript
  181 |     export function distance(infoA: Info, infoB: Info) {
  ```

#### `common.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 36:21
  ```typescript
  36 |     export function createElementsIndex(contacts: IntAdjacencyGraph<Features.FeatureIndex, Props>, features: Features, elementsCount: number) {
  ```

#### `contacts.ts` (1 errors)

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const ContactsParams = {
  ```

### Directory: `src/mol-model/sequence`

#### `sequence.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 48:21
  ```typescript
  48 |     export function getSequenceString(seq: Sequence) {
  ```

### Directory: `src/mol-model/shape`

#### `shape.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 79:21
  ```typescript
  79 |     export function createTransform(transforms: Mat4[], invariantBoundingSphere: Sphere3D, cellSize: number, batchSize: number, transformData?: TransformData) {
  ```
- Line 87:21
  ```typescript
  87 |     export function createRenderObject<G extends Geometry>(shape: Shape<G>, props: PD.Values<Geometry.Params<G>>) {
  ```
- Line 104:21
  ```typescript
  104 |     export function areLociEqual(a: Loci, b: Loci) { return a.shape === b.shape; }
  ```
- Line 105:21
  ```typescript
  105 |     export function isLociEmpty(loci: Loci) { return loci.shape.groupCount === 0; }
  ```

### Directory: `src/mol-model/structure/coordinates`

#### `coordinates.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 55:10
  ```typescript
  55 | function Time(value: number, unit: Time.Unit) {
  ```

### Directory: `src/mol-model/structure/model`

#### `model.ts` (10 errors)

**Missing Explicit Return Types:**

- Line 171:21
  ```typescript
  171 |     export function getAtomicConformationFromFrame(model: Model, frame: Frame) {
  ```
- Line 237:21
  ```typescript
  237 |     export function getRoot(model: Model) {
  ```
- Line 241:21
  ```typescript
  241 |     export function areHierarchiesEqual(a: Model, b: Model) {
  ```

**Missing Explicit Types:**

- Line 208:18
  ```typescript
  208 |     export const TrajectoryInfo = {
  ```
- Line 219:18
  ```typescript
  219 |     export const AsymIdCount = {
  ```
- Line 229:18
  ```typescript
  229 |     export const AsymIdOffset = CustomModelProperty.createSimple<AsymIdOffset>('asym_id_offset', 'static');
  ```
- Line 232:18
  ```typescript
  232 |     export const Index = CustomModelProperty.createSimple<Index>('index', 'static');
  ```
- Line 235:18
  ```typescript
  235 |     export const MaxIndex = CustomModelProperty.createSimple<MaxIndex>('max_index', 'static');
  ```
- Line 249:18
  ```typescript
  249 |     export const CoordinatesHistory = {
  ```
- Line 259:18
  ```typescript
  259 |     export const CoarseGrained = {
  ```

#### `types.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 642:21
  ```typescript
  642 |     export function isCovalent(flags: BondType.Flag) {
  ```
- Line 646:21
  ```typescript
  646 |     export function isAll(flags: BondType.Flag) {
  ```

### Directory: `src/mol-model/structure/model/properties`

#### `symmetry.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 73:21
  ```typescript
  73 |     export function getUnitcellLabel(symmetry: Symmetry) {
  ```

#### `common.ts` (1 errors)

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const EntitySubtype = Column.Schema.Aliased<EntitySubtype>(Column.Schema.Str());
  ```

### Directory: `src/mol-model/structure/model/properties/atomic`

#### `hierarchy.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 254:21
  ```typescript
  254 |     export function chainStartResidueIndex(segs: AtomicSegments, cI: ChainIndex) {
  ```
- Line 259:21
  ```typescript
  259 |     export function chainEndResidueIndexExcl(segs: AtomicSegments, cI: ChainIndex) {
  ```
- Line 263:21
  ```typescript
  263 |     export function chainResidueCount(segs: AtomicSegments, cI: ChainIndex) {
  ```
- Line 267:21
  ```typescript
  267 |     export function residueFirstAtomIndex(hierarchy: AtomicHierarchy, rI: ResidueIndex) {
  ```
- Line 271:21
  ```typescript
  271 |     export function atomChainIndex(hierarchy: AtomicHierarchy, eI: ElementIndex) {
  ```
- Line 275:21
  ```typescript
  275 |     export function residueChainIndex(hierarchy: AtomicHierarchy, rI: ResidueIndex) {
  ```

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const AtomsSchema = {
  ```

### Directory: `src/mol-model/structure/query`

#### `context.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 50:5
  ```typescript
  50 |     pushCurrentBond() {
  ```
- Line 90:5
  ```typescript
  90 |     tryGetCurrentSelection() {
  ```
- Line 130:5
  ```typescript
  130 |     test(ctx: QueryContext, trySwap: boolean) {
  ```
- Line 157:9
  ```typescript
  157 |     get length() {
  ```

**Missing Explicit Types:**

- Line 35:14
  ```typescript
  35 |     readonly atomicBond = new QueryContextBondInfo<Unit.Atomic>();
  ```

#### `selection.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 25:21
  ```typescript
  25 |     export function isEmpty(s: StructureSelection) { return isSingleton(s) ? s.structure.units.length === 0 : s.structures.length === 0; }
  ```
- Line 27:21
  ```typescript
  27 |     export function structureCount(sel: StructureSelection) {
  ```
- Line 150:21
  ```typescript
  150 |     export function withInputStructure(selection: StructureSelection, structure: Structure) {
  ```

#### `query.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 13:21
  ```typescript
  13 |     export function run(query: StructureQuery, structure: Structure, options?: QueryContextOptions) {
  ```
- Line 17:21
  ```typescript
  17 |     export function loci(query: StructureQuery, structure: Structure, options?: QueryContextOptions) {
  ```

### Directory: `src/mol-model/structure/structure`

#### `structure.ts` (58 errors)

**Missing Explicit Return Types:**

- Line 77:5
  ```typescript
  77 |     subsetBuilder(isSorted: boolean) {
  ```
- Line 82:9
  ```typescript
  82 |     get elementCount() {
  ```
- Line 87:9
  ```typescript
  87 |     get bondCount() {
  ```
- Line 94:9
  ```typescript
  94 |     get hasCustomProperties() {
  ```
- Line 98:9
  ```typescript
  98 |     get customPropertyDescriptors() {
  ```
- Line 106:9
  ```typescript
  106 |     get currentPropertyData() {
  ```
- Line 114:9
  ```typescript
  114 |     get inheritedPropertyData() {
  ```
- Line 119:9
  ```typescript
  119 |     get polymerResidueCount() {
  ```
- Line 127:9
  ```typescript
  127 |     get polymerGapCount() {
  ```
- Line 134:9
  ```typescript
  134 |     get polymerUnitCount() {
  ```
- Line 141:9
  ```typescript
  141 |     get uniqueElementCount() {
  ```
- Line 148:9
  ```typescript
  148 |     get atomicResidueCount() {
  ```
- Line 159:9
  ```typescript
  159 |     get isCoarseGrained() {
  ```
- Line 163:9
  ```typescript
  163 |     get isEmpty() {
  ```
- Line 167:9
  ```typescript
  167 |     get hashCode() {
  ```
- Line 173:9
  ```typescript
  173 |     get transformHash() {
  ```
- Line 204:9
  ```typescript
  204 |     get parent() {
  ```
- Line 219:9
  ```typescript
  219 |     get label() {
  ```
- Line 223:9
  ```typescript
  223 |     get boundary() {
  ```
- Line 229:9
  ```typescript
  229 |     get lookup3d() {
  ```
- Line 235:9
  ```typescript
  235 |     get interUnitBonds() {
  ```
- Line 253:9
  ```typescript
  253 |     get dynamicBonds() {
  ```
- Line 257:9
  ```typescript
  257 |     get interBondsValidUnit() {
  ```
- Line 261:9
  ```typescript
  261 |     get interBondsValidUnitPair() {
  ```
- Line 290:9
  ```typescript
  290 |     get uniqueResidueNames() {
  ```
- Line 295:9
  ```typescript
  295 |     get uniqueElementSymbols() {
  ```
- Line 300:9
  ```typescript
  300 |     get entityIndices() {
  ```
- Line 305:9
  ```typescript
  305 |     get uniqueAtomicResidueIndices() {
  ```
- Line 311:9
  ```typescript
  311 |     get isAtomic() {
  ```
- Line 317:9
  ```typescript
  317 |     get hasAtomic() {
  ```
- Line 323:9
  ```typescript
  323 |     get isCoarse() {
  ```
- Line 329:9
  ```typescript
  329 |     get hasCoarse() {
  ```
- Line 341:9
  ```typescript
  341 |     get serialMapping() {
  ```
- Line 345:9
  ```typescript
  345 |     get intraUnitBondMapping() {
  ```
- Line 375:5
  ```typescript
  375 |     hasElement(e: StructureElement.Location) {
  ```
- Line 380:5
  ```typescript
  380 |     getModelIndex(m: Model) {
  ```
- Line 658:21
  ```typescript
  658 |     export function areLociEqual(a: Loci, b: Loci) {
  ```
- Line 662:21
  ```typescript
  662 |     export function isLociEmpty(loci: Loci) {
  ```
- Line 666:21
  ```typescript
  666 |     export function remapLoci(loci: Loci, structure: Structure) {
  ```
- Line 848:21
  ```typescript
  848 |     export function transform(s: Structure, transform: Mat4) {
  ```
- Line 864:22
  ```typescript
  864 |      export function instances(s: Structure, transforms: Mat4[]) {
  ```
- Line 948:13
  ```typescript
  948 |         get isEmpty() {
  ```
- Line 957:21
  ```typescript
  957 |     export function Builder(props: Props = {}) {
  ```
- Line 961:21
  ```typescript
  961 |     export function hashCode(s: Structure) {
  ```
- Line 966:21
  ```typescript
  966 |     export function conformationHash(s: Structure) {
  ```
- Line 971:21
  ```typescript
  971 |     export function areUnitIdsEqual(a: Structure, b: Structure) {
  ```
- Line 985:21
  ```typescript
  985 |     export function areUnitIdsAndIndicesEqual(a: Structure, b: Structure) {
  ```
- Line 995:21
  ```typescript
  995 |     export function areHierarchiesEqual(a: Structure, b: Structure) {
  ```
- Line 1007:21
  ```typescript
  1007 |     export function areEquivalent(a: Structure, b: Structure) {
  ```
- Line 1015:21
  ```typescript
  1015 |     export function areRootsEquivalent(a: Structure, b: Structure) {
  ```
- Line 1020:21
  ```typescript
  1020 |     export function areRootsEqual(a: Structure, b: Structure) {
  ```
- Line 1084:21
  ```typescript
  1084 |     export function minDistanceToPoint(s: Structure, point: Vec3, radius: number) {
  ```
- Line 1096:21
  ```typescript
  1096 |     export function distance(a: Structure, b: Structure) {
  ```
- Line 1114:21
  ```typescript
  1114 |     export function elementDescription(s: Structure) {
  ```
- Line 1118:21
  ```typescript
  1118 |     export function validUnitPair(s: Structure, a: Unit, b: Unit) {
  ```

**Missing Explicit Types:**

- Line 613:18
  ```typescript
  613 |     export const Empty = create([]);
  ```
- Line 1280:18
  ```typescript
  1280 |     export const Index = CustomStructureProperty.createSimple<Index>('index', 'root');
  ```
- Line 1283:18
  ```typescript
  1283 |     export const MaxIndex = CustomStructureProperty.createSimple<MaxIndex>('max_index', 'root');
  ```

#### `unit.ts` (31 errors)

**Missing Explicit Return Types:**

- Line 83:21
  ```typescript
  83 |     export function SymmetryGroup(units: Unit[]) {
  ```
- Line 102:25
  ```typescript
  102 |         export function areInvariantElementsEqual(a: SymmetryGroup, b: SymmetryGroup) {
  ```
- Line 119:21
  ```typescript
  119 |     export function conformationId(unit: Unit) {
  ```
- Line 123:21
  ```typescript
  123 |     export function hashUnit(u: Unit) {
  ```
- Line 225:13
  ```typescript
  225 |         get transientCache() {
  ```
- Line 248:9
  ```typescript
  248 |         remapModel(model: Model, dynamicBonds: boolean, props?: AtomicProperties) {
  ```
- Line 278:13
  ```typescript
  278 |         get boundary() {
  ```
- Line 287:13
  ```typescript
  287 |         get lookup3d() {
  ```
- Line 294:13
  ```typescript
  294 |         get principalAxes() {
  ```
- Line 300:13
  ```typescript
  300 |         get bonds() {
  ```
- Line 315:13
  ```typescript
  315 |         get rings() {
  ```
- Line 321:13
  ```typescript
  321 |         get resonance() {
  ```
- Line 327:13
  ```typescript
  327 |         get polymerElements() {
  ```
- Line 333:13
  ```typescript
  333 |         get gapElements() {
  ```
- Line 339:13
  ```typescript
  339 |         get nucleotideElements() {
  ```
- Line 345:13
  ```typescript
  345 |         get proteinElements() {
  ```
- Line 365:9
  ```typescript
  365 |         getResidueIndex(elementIndex: StructureElement.UnitIndex) {
  ```
- Line 415:13
  ```typescript
  415 |         get transientCache() {
  ```
- Line 457:13
  ```typescript
  457 |         get boundary() {
  ```
- Line 467:13
  ```typescript
  467 |         get lookup3d() {
  ```
- Line 475:13
  ```typescript
  475 |         get principalAxes() {
  ```
- Line 481:13
  ```typescript
  481 |         get polymerElements() {
  ```
- Line 487:13
  ```typescript
  487 |         get gapElements() {
  ```
- Line 530:21
  ```typescript
  530 |     export function areSameChainOperatorGroup(a: Unit, b: Unit) {
  ```
- Line 534:21
  ```typescript
  534 |     export function areOperatorsEqual(a: Unit, b: Unit) {
  ```
- Line 538:21
  ```typescript
  538 |     export function areConformationsEqual(a: Unit, b: Unit) {
  ```
- Line 564:21
  ```typescript
  564 |     export function isSameConformation(u: Unit, model: Model) {
  ```
- Line 580:21
  ```typescript
  580 |     export function getModelConformationOfKind(kind: Unit.Kind, model: Model) {
  ```
- Line 586:21
  ```typescript
  586 |     export function getConformation(u: Unit) {
  ```
- Line 590:21
  ```typescript
  590 |     export function getModelHierarchyOfKind(kind: Unit.Kind, model: Model) {
  ```
- Line 596:21
  ```typescript
  596 |     export function getHierarchy(u: Unit) {
  ```

### Directory: `src/mol-model/structure/structure/element`

#### `loci.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 61:21
  ```typescript
  61 |     export function areEqual(a: Loci, b: Loci) {
  ```
- Line 73:21
  ```typescript
  73 |     export function isEmpty(loci: Loci) {
  ```
- Line 80:21
  ```typescript
  80 |     export function isWholeStructure(loci: Loci) {
  ```
- Line 84:21
  ```typescript
  84 |     export function size(loci: Loci) {
  ```
- Line 614:21
  ```typescript
  614 |     export function toPositionsArray(loci: Loci, positions: NumberArray, offset = 0) {
  ```
- Line 657:21
  ```typescript
  657 |     export function toExpression(loci: Loci) {
  ```

#### `location.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 54:21
  ```typescript
  54 |     export function areEqual(a: Location, b: Location) {
  ```
- Line 59:21
  ```typescript
  59 |     export function distance(a: Location, b: Location) {
  ```
- Line 69:21
  ```typescript
  69 |     export function residueIndex(l: Location) {
  ```
- Line 73:21
  ```typescript
  73 |     export function chainIndex(l: Location) {
  ```

#### `bundle.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 40:21
  ```typescript
  40 |     export function fromSubStructure(parent: Structure, structure: Structure) {
  ```
- Line 44:21
  ```typescript
  44 |     export function fromSelection(selection: StructureSelection) {
  ```
- Line 251:21
  ```typescript
  251 |     export function areEqual(a: Bundle, b: Bundle) {
  ```

### Directory: `src/mol-model/structure/structure/unit`

#### `rings.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 40:9
  ```typescript
  40 |     get byFingerprint() {
  ```
- Line 47:9
  ```typescript
  47 |     get elementRingIndices() {
  ```
- Line 51:9
  ```typescript
  51 |     get elementAromaticRingIndices() {
  ```
- Line 56:9
  ```typescript
  56 |     get ringComponentIndex() {
  ```
- Line 60:9
  ```typescript
  60 |     get ringComponents() {
  ```
- Line 64:9
  ```typescript
  64 |     get aromaticRings() {
  ```
- Line 87:21
  ```typescript
  87 |     export function elementFingerprint(elements: ArrayLike<ElementSymbol>) {
  ```
- Line 134:21
  ```typescript
  134 |     export function getAltId(unit: Unit.Atomic, ring: UnitRing) {
  ```
- Line 162:21
  ```typescript
  162 |     export function byFingerprintAndResidue(rings: UnitRings, fingerprints: ReadonlyArray<UnitRing.Fingerprint>) {
  ```

### Directory: `src/mol-model/structure/structure/unit/bonds`

#### `data.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 36:5
  ```typescript
  36 |     getBondFromLocation(l: Bond.Location) {
  ```
- Line 41:5
  ```typescript
  41 |     getBondIndexFromLocation(l: Bond.Location) {
  ```

### Directory: `src/mol-model/structure/structure/util`

#### `lookup3d.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 35:21
  ```typescript
  35 |     export function copy(out: StructureResult, result: StructureResult) {
  ```
- Line 273:9
  ```typescript
  273 |     get boundary() {
  ```

#### `unique-subset-builder.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 36:5
  ```typescript
  36 |     has(parentId: number, e: number) {
  ```
- Line 96:9
  ```typescript
  96 |     get isEmpty() {
  ```

#### `unit-transforms.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 49:9
  ```typescript
  49 |     get isIdentity() {
  ```
- Line 69:5
  ```typescript
  69 |     getTransform(out: Mat4, unit: Unit) {
  ```

### Directory: `src/mol-model/volume`

#### `volume.ts` (25 errors)

**Missing Explicit Return Types:**

- Line 64:25
  ```typescript
  64 |         export function areSame(a: IsoValue, b: IsoValue, stats: Grid['stats']) {
  ```
- Line 87:25
  ```typescript
  87 |         export function toString(value: IsoValue) {
  ```
- Line 95:21
  ```typescript
  95 |     export function adjustedIsoValue(volume: Volume, value: number, kind: 'absolute' | 'relative') {
  ```
- Line 112:21
  ```typescript
  112 |     export function createIsoValueParam(defaultValue: Volume.IsoValue, stats?: Grid['stats']) {
  ```
- Line 161:21
  ```typescript
  161 |     export function areEquivalent(volA: Volume, volB: Volume) {
  ```
- Line 165:21
  ```typescript
  165 |     export function areInstanceTransformsEqual(volA: Volume, volB: Volume) {
  ```
- Line 173:21
  ```typescript
  173 |     export function isEmpty(vol: Volume) {
  ```
- Line 177:21
  ```typescript
  177 |     export function isOrbitals(volume: Volume) {
  ```
- Line 185:21
  ```typescript
  185 |     export function areLociEqual(a: Loci, b: Loci) { return a.volume === b.volume && OrderedSet.areEqual(a.instances, b.instances); }
  ```
- Line 186:21
  ```typescript
  186 |     export function isLociEmpty(loci: Loci) { return isEmpty(loci.volume) || OrderedSet.isEmpty(loci.instances); }
  ```
- Line 188:21
  ```typescript
  188 |     export function getBoundingSphere(volume: Volume, boundingSphere?: Sphere3D) {
  ```
- Line 196:25
  ```typescript
  196 |         export function areLociEqual(a: Loci, b: Loci) { return a.volume === b.volume && Volume.IsoValue.areSame(a.isoValue, b.isoValue, a.volume.grid.stats) && OrderedSet.areEqual(a.instances, b.instances); }
  ```
- Line 197:25
  ```typescript
  197 |         export function isLociEmpty(loci: Loci) { return isEmpty(loci.volume) || OrderedSet.isEmpty(loci.instances); }
  ```
- Line 200:25
  ```typescript
  200 |         export function getBoundingSphere(volume: Volume, isoValue: Volume.IsoValue, boundingSphere?: Sphere3D) {
  ```
- Line 246:25
  ```typescript
  246 |         export function areLociEqual(a: Loci, b: Loci) {
  ```
- Line 258:25
  ```typescript
  258 |         export function isLociEmpty(loci: Loci) {
  ```
- Line 264:25
  ```typescript
  264 |         export function getLociSize(loci: Loci) {
  ```
- Line 293:25
  ```typescript
  293 |         export function getBoundingSphere(volume: Volume, elements: Loci['elements'], boundingSphere?: Sphere3D) {
  ```
- Line 344:25
  ```typescript
  344 |         export function areLociEqual(a: Loci, b: Loci) {
  ```
- Line 356:25
  ```typescript
  356 |         export function isLociEmpty(loci: Loci) {
  ```
- Line 362:25
  ```typescript
  362 |         export function getLociSize(loci: Loci) {
  ```
- Line 373:25
  ```typescript
  373 |         export function getBoundingSphere(volume: Volume, elements: Loci['elements'], boundingSphere?: Sphere3D) {
  ```

**Missing Explicit Types:**

- Line 149:18
  ```typescript
  149 |     export const IsoValueParam = createIsoValueParam(Volume.IsoValue.relative(2));
  ```
- Line 419:18
  ```typescript
  419 |     export const PickingGranularity = {
  ```
- Line 434:18
  ```typescript
  434 |     export const Segmentation = {
  ```

#### `grid.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 35:21
  ```typescript
  35 |     export function getGridToCartesianTransform(grid: Grid) {
  ```
- Line 50:21
  ```typescript
  50 |     export function areEquivalent(gridA: Grid, gridB: Grid) {
  ```
- Line 54:21
  ```typescript
  54 |     export function isEmpty(grid: Grid) {
  ```
- Line 58:21
  ```typescript
  58 |     export function getBoundingSphere(grid: Grid, boundingSphere?: Sphere3D) {
  ```
- Line 70:21
  ```typescript
  70 |     export function getHistogram(grid: Grid, binCount: number) {
  ```
- Line 81:21
  ```typescript
  81 |     export function makeGetTrilinearlyInterpolated(grid: Grid, transform: 'none' | 'relative') {
  ```

### Directory: `src/mol-plugin`

#### `context.ts` (33 errors)

**Missing Explicit Return Types:**

- Line 86:3
  ```typescript
  86 |   runTask = <T>(task: Task<T>, params?: { useOverlay?: boolean }) =>
  ```
- Line 88:3
  ```typescript
  88 |   resolveTask = <T>(object: Task<T> | T | undefined) => {
  ```
- Line 173:7
  ```typescript
  173 |   get isInitialized() {
  ```
- Line 212:3
  ```typescript
  212 |   build() {
  ```
- Line 289:9
  ```typescript
  289 |   async initViewerAsync(
  ```
- Line 297:9
  ```typescript
  297 |   async initContainerAsync(options?: {
  ```
- Line 304:9
  ```typescript
  304 |   async mountAsync(
  ```
- Line 484:3
  ```typescript
  484 |   handleResize = () => {
  ```
- Line 510:7
  ```typescript
  510 |   get isBusy() {
  ```
- Line 517:7
  ```typescript
  517 |   get selectionMode() {
  ```
- Line 525:3
  ```typescript
  525 |   dataTransaction(
  ```
- Line 532:3
  ```typescript
  532 |   clear(resetViewportSettings = false) {
  ```

**Missing Explicit Types:**

- Line 110:12
  ```typescript
  110 |   readonly state = new PluginState(this);
  ```
- Line 111:12
  ```typescript
  111 |   readonly commands = new PluginCommandManager();
  ```
- Line 114:12
  ```typescript
  114 |   readonly behaviors = {
  ```
- Line 165:12
  ```typescript
  165 |   readonly canvas3dInitialized = new Promise<void>((res, rej) => {
  ```
- Line 169:12
  ```typescript
  169 |   readonly initialized = new Promise<void>((res, rej) => {
  ```
- Line 179:12
  ```typescript
  179 |   readonly layout = new PluginLayout(this);
  ```
- Line 180:12
  ```typescript
  180 |   readonly animationLoop = new PluginAnimationLoop(this);
  ```
- Line 182:12
  ```typescript
  182 |   readonly representation = {
  ```
- Line 199:12
  ```typescript
  199 |   readonly query = {
  ```
- Line 205:12
  ```typescript
  205 |   readonly dataFormats = new DataFormatRegistry();
  ```
- Line 207:12
  ```typescript
  207 |   readonly builders = {
  ```
- Line 216:12
  ```typescript
  216 |   readonly helpers = {
  ```
- Line 221:12
  ```typescript
  221 |   readonly managers = {
  ```
- Line 244:12
  ```typescript
  244 |   readonly events = {
  ```
- Line 252:12
  ```typescript
  252 |   readonly customModelProperties = new CustomProperty.Registry<Model>();
  ```
- Line 253:12
  ```typescript
  253 |   readonly customStructureProperties = new CustomProperty.Registry<Structure>();
  ```
- Line 255:12
  ```typescript
  255 |   readonly customStructureControls = new Map<
  ```
- Line 261:12
  ```typescript
  261 |   readonly customImportControls = new Map<
  ```
- Line 267:12
  ```typescript
  267 |   readonly genericRepresentationControls = new Map<
  ```
- Line 281:12
  ```typescript
  281 |   readonly errorContext = new ErrorContext();
  ```
- Line 494:12
  ```typescript
  494 |   readonly log = {
  ```

#### `state.ts` (11 errors)

**Missing Explicit Return Types:**

- Line 85:3
  ```typescript
  85 |   setSnapshotParams = (params?: PluginState.SnapshotParams) => {
  ```
- Line 256:3
  ```typescript
  256 |   updateTransform(
  ```
- Line 270:3
  ```typescript
  270 |   hasBehavior(behavior: StateTransformer) {
  ```
- Line 274:3
  ```typescript
  274 |   updateBehavior<T extends StateTransformer>(
  ```

**Missing Explicit Types:**

- Line 50:12
  ```typescript
  50 |   readonly events = {
  ```
- Line 81:12
  ```typescript
  81 |   readonly snapshotParams = this.ev.behavior<PluginState.SnapshotParams>(
  ```
- Line 330:16
  ```typescript
  330 |   export const SnapshotParams = {
  ```
- Line 368:16
  ```typescript
  368 |   export const DefaultSnapshotParams = PD.getDefaultValues(SnapshotParams);
  ```
- Line 412:16
  ```typescript
  412 |   export const getMinFrameDuration = memoizeLatest(
  ```
- Line 429:16
  ```typescript
  429 |   export const getStateTransitionDuration = memoizeLatest(
  ```
- Line 443:16
  ```typescript
  443 |   export const getStateTransitionFrameTime = memoizeLatest(
  ```

#### `config.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 18:5
  ```typescript
  18 |     toString() { return this.key; }
  ```
- Line 19:5
  ```typescript
  19 |     valueOf() { return this.key; }
  ```
- Line 23:10
  ```typescript
  23 | function item<T>(key: string, defaultValue?: T) { return new PluginConfigItem(key, defaultValue); }
  ```
- Line 83:5
  ```typescript
  83 |     get<T>(key: PluginConfigItem<T>) {
  ```

**Missing Explicit Types:**

- Line 25:14
  ```typescript
  25 | export const PluginConfig = {
  ```

#### `headless-plugin-context.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 49:9
  ```typescript
  49 |   async saveImage(
  ```
- Line 108:9
  ```typescript
  108 |   async getStateSnapshot() {
  ```
- Line 123:9
  ```typescript
  123 |   async getAnimation(options?: {
  ```

#### `layout.ts` (2 errors)

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const PluginLayoutStateParams = {
  ```
- Line 63:14
  ```typescript
  63 |     readonly events = {
  ```

#### `animation-loop.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 27:9
  ```typescript
  27 |     get isAnimating() {
  ```

#### `command.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 65:5
  ```typescript
  65 |     dispatch<T>(cmd: PluginCommand<T>, params: T) {
  ```

#### `commands.ts` (1 errors)

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const PluginCommands = {
  ```

#### `features.ts` (1 errors)

**Missing Explicit Types:**

- Line 10:14
  ```typescript
  10 | export const PluginFeatureDetection = {
  ```

### Directory: `src/mol-plugin-state`

#### `objects.ts` (34 errors)

**Missing Explicit Return Types:**

- Line 51:21
  ```typescript
  51 |     export function CreateRepresentation3D<T extends Representation.Any, S = any>(type: { name: string }) {
  ```
- Line 55:21
  ```typescript
  55 |     export function CreateBehavior<T extends PluginBehavior>(type: { name: string }) {
  ```

**Missing Explicit Types:**

- Line 40:18
  ```typescript
  40 |     export const Create = StateObject.factory<TypeInfo>();
  ```
- Line 156:18
  ```typescript
  156 |     export const CreateBuiltIn = StateTransformer.factory('ms-plugin');
  ```
- Line 157:18
  ```typescript
  157 |     export const BuiltIn = StateTransformer.builderFactory('ms-plugin');
  ```

**Unsupported Super Class Expressions:**

- Line 59:31
  ```typescript
  59 |     export class Root extends Create({ name: 'Root', typeClass: 'Root' }) { }
  ```
- Line 60:32
  ```typescript
  60 |     export class Group extends Create({ name: 'Group', typeClass: 'Group' }) { }
  ```
- Line 63:37
  ```typescript
  63 |         export class String extends Create<StringLike>({ name: 'String Data', typeClass: 'Data', }) { }
  ```
- Line 64:37
  ```typescript
  64 |         export class Binary extends Create<Uint8Array<ArrayBuffer>>({ name: 'Binary Data', typeClass: 'Data' }) { }
  ```
- Line 71:35
  ```typescript
  71 |         export class Blob extends Create<BlobData>({ name: 'Data Blob', typeClass: 'Data' }) { }
  ```
- Line 75:35
  ```typescript
  75 |         export class Json extends Create<any>({ name: 'JSON Data', typeClass: 'Data' }) { }
  ```
- Line 76:34
  ```typescript
  76 |         export class Cif extends Create<CifFile>({ name: 'CIF File', typeClass: 'Data' }) { }
  ```
- Line 77:35
  ```typescript
  77 |         export class Cube extends Create<CubeFile>({ name: 'Cube File', typeClass: 'Data' }) { }
  ```
- Line 78:34
  ```typescript
  78 |         export class Psf extends Create<PsfFile>({ name: 'PSF File', typeClass: 'Data' }) { }
  ```
- Line 79:37
  ```typescript
  79 |         export class Prmtop extends Create<PrmtopFile>({ name: 'PRMTOP File', typeClass: 'Data' }) { }
  ```
- Line 80:34
  ```typescript
  80 |         export class Top extends Create<TopFile>({ name: 'TOP File', typeClass: 'Data' }) { }
  ```
- Line 81:34
  ```typescript
  81 |         export class Ply extends Create<PlyFile>({ name: 'PLY File', typeClass: 'Data' }) { }
  ```
- Line 82:35
  ```typescript
  82 |         export class Ccp4 extends Create<Ccp4File>({ name: 'CCP4/MRC/MAP File', typeClass: 'Data' }) { }
  ```
- Line 83:35
  ```typescript
  83 |         export class Dsn6 extends Create<Dsn6File>({ name: 'DSN6/BRIX File', typeClass: 'Data' }) { }
  ```
- Line 84:33
  ```typescript
  84 |         export class Dx extends Create<DxFile>({ name: 'DX File', typeClass: 'Data' }) { }
  ```
- Line 102:35
  ```typescript
  102 |         export class Blob extends Create<BlobData>({ name: 'Format Blob', typeClass: 'Data' }) { }
  ```
- Line 106:42
  ```typescript
  106 |         export class Coordinates extends Create<_Coordinates>({ name: 'Coordinates', typeClass: 'Object' }) { }
  ```
- Line 107:39
  ```typescript
  107 |         export class Topology extends Create<_Topology>({ name: 'Topology', typeClass: 'Object' }) { }
  ```
- Line 108:36
  ```typescript
  108 |         export class Model extends Create<_Model>({ name: 'Model', typeClass: 'Object' }) { }
  ```
- Line 109:41
  ```typescript
  109 |         export class Trajectory extends Create<_Trajectory>({ name: 'Trajectory', typeClass: 'Object' }) { }
  ```
- Line 110:40
  ```typescript
  110 |         export class Structure extends Create<_Structure>({ name: 'Structure', typeClass: 'Object' }) { }
  ```
- Line 113:51
  ```typescript
  113 |             export class Representation3D extends CreateRepresentation3D<StructureRepresentation<any>, _Structure>({ name: 'Structure 3D' }) { }
  ```
- Line 122:56
  ```typescript
  122 |             export class Representation3DState extends Create<Representation3DStateData>({ name: 'Structure 3D State', typeClass: 'Object' }) { }
  ```
- Line 125:45
  ```typescript
  125 |             export class Selections extends Create<ReadonlyArray<SelectionEntry>>({ name: 'Selections', typeClass: 'Object' }) { }
  ```
- Line 144:35
  ```typescript
  144 |         export class Data extends Create<_Volume>({ name: 'Volume', typeClass: 'Object' }) { }
  ```
- Line 145:35
  ```typescript
  145 |         export class Lazy extends Create<LazyInfo>({ name: 'Lazy Volume', typeClass: 'Object' }) { }
  ```
- Line 146:47
  ```typescript
  146 |         export class Representation3D extends CreateRepresentation3D<VolumeRepresentation<any>, _Volume>({ name: 'Volume 3D' }) { }
  ```
- Line 150:39
  ```typescript
  150 |         export class Provider extends Create<ShapeProvider<any, any, any>>({ name: 'Shape Provider', typeClass: 'Object' }) { }
  ```
- Line 151:47
  ```typescript
  151 |         export class Representation3D extends CreateRepresentation3D<ShapeRepresentation<any, any, any>, unknown>({ name: 'Shape 3D' }) { }
  ```

#### `component.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 16:15
  ```typescript
  16 |     protected subscribe<T>(obs: Observable<T> | undefined, action: (v: T) => void) {
  ```
- Line 33:19
  ```typescript
  33 |     protected get ev() {
  ```
- Line 59:9
  ```typescript
  59 |     get state() {
  ```

### Directory: `src/mol-plugin-state/actions`

#### `structure.ts` (7 errors)

**Missing Explicit Types:**

- Line 38:14
  ```typescript
  38 | export const PdbDownloadProvider = {
  ```
- Line 51:7
  ```typescript
  51 | const DownloadStructure = StateAction.build({
  ```
- Line 248:14
  ```typescript
  248 | export const UpdateTrajectory = StateAction.build({
  ```
- Line 279:14
  ```typescript
  279 | export const EnableModelCustomProps = StateAction.build({
  ```
- Line 290:14
  ```typescript
  290 | export const EnableStructureCustomProps = StateAction.build({
  ```
- Line 301:14
  ```typescript
  301 | export const AddTrajectory = StateAction.build({
  ```
- Line 334:14
  ```typescript
  334 | export const LoadTrajectory = StateAction.build({
  ```

#### `file.ts` (2 errors)

**Missing Explicit Types:**

- Line 37:14
  ```typescript
  37 | export const OpenFiles = StateAction.build({
  ```
- Line 82:14
  ```typescript
  82 | export const DownloadFile = StateAction.build({
  ```

#### `volume.ts` (2 errors)

**Missing Explicit Types:**

- Line 24:7
  ```typescript
  24 | const DownloadDensity = StateAction.build({
  ```
- Line 139:14
  ```typescript
  139 | export const AssignColorVolume = StateAction.build({
  ```

### Directory: `src/mol-plugin-state/animation`

#### `model.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 66:21
  ```typescript
  66 |     export function create<P, S>(params: PluginStateAnimation<P, S>) {
  ```
- Line 70:21
  ```typescript
  70 |     export function getDuration<A extends PluginStateAnimation>(ctx: PluginContext, instance: Instance<A>) {
  ```

#### `helpers.ts` (1 errors)

**Missing Explicit Types:**

- Line 40:14
  ```typescript
  40 | export const SpinStructureParams = {
  ```

### Directory: `src/mol-plugin-state/builder`

#### `structure.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 94:3
  ```typescript
  94 |   createModel(
  ```
- Line 114:3
  ```typescript
  114 |   insertModelProperties(
  ```
- Line 131:3
  ```typescript
  131 |   tryCreateUnitcell(
  ```
- Line 153:3
  ```typescript
  153 |   createStructure(
  ```
- Line 182:3
  ```typescript
  182 |   insertStructureProperties(
  ```
- Line 196:3
  ```typescript
  196 |   isComponentTransform(cell: StateObjectCell) {
  ```
- Line 235:3
  ```typescript
  235 |   tryCreateComponentFromExpression(
  ```
- Line 253:3
  ```typescript
  253 |   tryCreateComponentStatic(
  ```

#### `data.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 17:5
  ```typescript
  17 |     rawData(params: StateTransformer.Params<RawData>, options?: Partial<StateTransform.Options>) {
  ```
- Line 22:5
  ```typescript
  22 |     download(params: StateTransformer.Params<Download>, options?: Partial<StateTransform.Options>) {
  ```
- Line 27:5
  ```typescript
  27 |     downloadBlob(params: StateTransformer.Params<DownloadBlob>, options?: Partial<StateTransform.Options>) {
  ```
- Line 32:11
  ```typescript
  32 |     async readFile(params: StateTransformer.Params<ReadFile>, options?: Partial<StateTransform.Options>) {
  ```

### Directory: `src/mol-plugin-state/builder/structure`

#### `representation-preset.ts` (14 errors)

**Missing Explicit Return Types:**

- Line 31:17
  ```typescript
  31 | export function StructureRepresentationPresetProvider<P, S extends _Result>(repr: StructureRepresentationPresetProvider<P, S>) { return repr; }
  ```
- Line 71:21
  ```typescript
  71 |     export function reprBuilder(plugin: PluginContext, params: CommonParams, structure?: Structure) {
  ```
- Line 98:21
  ```typescript
  98 |     export function updateFocusRepr<T extends ColorTheme.BuiltIn>(plugin: PluginContext, structure: Structure, themeName: T | undefined, themeParams: ColorTheme.BuiltInParams<T> | undefined) {
  ```

**Missing Explicit Types:**

- Line 40:18
  ```typescript
  40 |     export const CommonParams = {
  ```
- Line 116:7
  ```typescript
  116 | const auto = StructureRepresentationPresetProvider({
  ```
- Line 151:7
  ```typescript
  151 | const empty = StructureRepresentationPresetProvider({
  ```
- Line 161:7
  ```typescript
  161 | const polymerAndLigand = StructureRepresentationPresetProvider({
  ```
- Line 210:7
  ```typescript
  210 | const proteinAndNucleic = StructureRepresentationPresetProvider({
  ```
- Line 246:7
  ```typescript
  246 | const coarseSurface = StructureRepresentationPresetProvider({
  ```
- Line 299:7
  ```typescript
  299 | const polymerCartoon = StructureRepresentationPresetProvider({
  ```
- Line 329:7
  ```typescript
  329 | const atomicDetail = StructureRepresentationPresetProvider({
  ```
- Line 396:7
  ```typescript
  396 | const illustrative = StructureRepresentationPresetProvider({
  ```
- Line 431:7
  ```typescript
  431 | const molecularSurface = StructureRepresentationPresetProvider({
  ```
- Line 466:7
  ```typescript
  466 | const autoLod = StructureRepresentationPresetProvider({
  ```

#### `hierarchy-preset.ts` (11 errors)

**Missing Explicit Return Types:**

- Line 23:17
  ```typescript
  23 | export function TrajectoryHierarchyPresetProvider<P, S>(preset: TrajectoryHierarchyPresetProvider<P, S>) { return preset; }
  ```
- Line 28:18
  ```typescript
  28 |     export const CommonParams = (a: PluginStateObject.Molecule.Trajectory | undefined, plugin: PluginContext) => ({
  ```
- Line 37:7
  ```typescript
  37 | const DefaultParams = (a: PluginStateObject.Molecule.Trajectory | undefined, plugin: PluginContext) => ({
  ```
- Line 79:7
  ```typescript
  79 | const AllModelsParams = (a: PluginStateObject.Molecule.Trajectory | undefined, plugin: PluginContext) => ({
  ```
- Line 125:7
  ```typescript
  125 | const CrystalSymmetryParams = (a: PluginStateObject.Molecule.Trajectory | undefined, plugin: PluginContext) => ({
  ```
- Line 186:7
  ```typescript
  186 | const CrystalContactsParams = (a: PluginStateObject.Molecule.Trajectory | undefined, plugin: PluginContext) => ({
  ```

**Missing Explicit Types:**

- Line 45:7
  ```typescript
  45 | const defaultPreset = TrajectoryHierarchyPresetProvider({
  ```
- Line 85:7
  ```typescript
  85 | const allModels = TrajectoryHierarchyPresetProvider({
  ```
- Line 156:7
  ```typescript
  156 | const unitcell = TrajectoryHierarchyPresetProvider({
  ```
- Line 171:7
  ```typescript
  171 | const supercell = TrajectoryHierarchyPresetProvider({
  ```
- Line 191:7
  ```typescript
  191 | const crystalContacts = TrajectoryHierarchyPresetProvider({
  ```

#### `representation.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 32:5
  ```typescript
  32 |     resolveProvider(ref: StructureRepresentationPresetProviderRef) {
  ```
- Line 38:5
  ```typescript
  38 |     hasPreset(s: PluginStateObject.Molecule.Structure) {
  ```
- Line 47:5
  ```typescript
  47 |     getPresets(s?: PluginStateObject.Molecule.Structure) {
  ```
- Line 66:5
  ```typescript
  66 |     getPresetsWithOptions(s: PluginStateObject.Molecule.Structure) {
  ```

#### `hierarchy.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 35:5
  ```typescript
  35 |     hasPreset(t: PluginStateObject.Molecule.Trajectory) {
  ```
- Line 44:5
  ```typescript
  44 |     getPresets(t?: PluginStateObject.Molecule.Trajectory) {
  ```
- Line 63:5
  ```typescript
  63 |     getPresetsWithOptions(t: PluginStateObject.Molecule.Trajectory) {
  ```

### Directory: `src/mol-plugin-state/formats`

#### `registry.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 28:9
  ```typescript
  28 |     get extensions() {
  ```
- Line 39:9
  ```typescript
  39 |     get binaryExtensions() {
  ```
- Line 47:9
  ```typescript
  47 |     get options() {
  ```
- Line 81:5
  ```typescript
  81 |     auto(info: FileNameInfo, dataStateObject: PluginStateObject.Data.Binary | PluginStateObject.Data.String) {
  ```
- Line 101:9
  ```typescript
  101 |     get list() {
  ```

### Directory: `src/mol-plugin-state/helpers`

#### `root-structure.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 26:21
  ```typescript
  26 |     export function getParams(model?: Model, defaultValue?: 'auto' | 'model' | 'assembly' | 'symmetry' | 'symmetry-mates' | 'symmetry-assembly') {
  ```

#### `structure-component.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 38:14
  ```typescript
  38 | export const StructureComponentParams = () => ({
  ```

### Directory: `src/mol-plugin-state/manager`

#### `snapshots.ts` (10 errors)

**Missing Explicit Return Types:**

- Line 40:24
  ```typescript
  40 |     protected override updateState(state: Partial<StateManagerState>) {        if ('current' in state && !('currentAnimationTimeMs' in state)) {
  ```
- Line 52:9
  ```typescript
  52 |     get current() {
  ```
- Line 57:5
  ```typescript
  57 |     getIndex(e: PluginStateSnapshotManager.Entry) {
  ```
- Line 61:5
  ```typescript
  61 |     getEntry(id: string | undefined) {
  ```
- Line 160:5
  ```typescript
  160 |     setCurrent(id: string) {
  ```
- Line 170:5
  ```typescript
  170 |     setSnapshotAnimationFrame(currentAnimationTimeMs: number, load = false) {
  ```
- Line 189:5
  ```typescript
  189 |     getNextId(id: string | undefined, dir: -1 | 1) {
  ```
- Line 208:5
  ```typescript
  208 |     applyNext(dir: -1 | 1) {
  ```
- Line 281:11
  ```typescript
  281 |     async serialize(options?: { type: 'json' | 'molj' | 'zip' | 'molx', params?: PluginState.SnapshotParams }) {
  ```

**Missing Explicit Types:**

- Line 47:14
  ```typescript
  47 |     readonly events = {
  ```

#### `animation.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 31:9
  ```typescript
  31 |     get isEmpty() { return this._animations.length === 0; }
  ```
- Line 32:9
  ```typescript
  32 |     get current() { return this._current!; }
  ```
- Line 34:9
  ```typescript
  34 |     get animations() { return this._animations; }
  ```
- Line 36:9
  ```typescript
  36 |     get isAnimatingStateTransition() {
  ```
- Line 157:5
  ```typescript
  157 |     stopStateTransitionAnimation() {
  ```
- Line 162:9
  ```typescript
  162 |     get isAnimating() {
  ```

**Missing Explicit Types:**

- Line 26:14
  ```typescript
  26 |     readonly events = {
  ```

#### `markdown-extensions.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 382:9
  ```typescript
  382 |     get audioPlayer() {
  ```
- Line 387:15
  ```typescript
  387 |         play: async (src: string, options?: { toggle?: boolean }) => {
  ```
- Line 421:16
  ```typescript
  421 |         pause: () => {
  ```
- Line 429:18
  ```typescript
  429 |         dispose: () => {
  ```

**Missing Explicit Types:**

- Line 231:5
  ```typescript
  231 |     state = {
  ```

#### `interactivity.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 112:19
  ```typescript
  112 |         protected normalizedLoci(reprLoci: Representation.Loci, applyGranularity: boolean, alwaysConvertBonds = false) {
  ```
- Line 152:9
  ```typescript
  152 |         clearHighlights = (noRender = false) => {
  ```

**Missing Explicit Types:**

- Line 42:14
  ```typescript
  42 |     readonly events = {
  ```
- Line 73:18
  ```typescript
  73 |     export const Params = {
  ```

#### `camera.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 96:5
  ```typescript
  96 |     focusSpheres<T>(xs: ReadonlyArray<T>, sphere: (t: T) => Sphere3D | undefined, options?: Partial<CameraFocusOptions> & { principalAxes?: PrincipalAxes, positionToFlip?: Vec3 }) {
  ```

### Directory: `src/mol-plugin-state/manager/structure`

#### `component.ts` (15 errors)

**Missing Explicit Return Types:**

- Line 50:9
  ```typescript
  50 |     get currentStructures() {
  ```
- Line 64:11
  ```typescript
  64 |     async setOptions(options: StructureComponentManager.Options) {
  ```
- Line 186:5
  ```typescript
  186 |     clear(structures: ReadonlyArray<StructureRef>) {
  ```
- Line 199:5
  ```typescript
  199 |     canBeModified(ref: StructureHierarchyRef) {
  ```
- Line 203:5
  ```typescript
  203 |     modifyByCurrentSelection(components: ReadonlyArray<StructureComponentRef>, action: StructureComponentManager.ModifyAction) {
  ```
- Line 238:5
  ```typescript
  238 |     removeRepresentations(components: ReadonlyArray<StructureComponentRef>, pivot?: StructureRepresentationRef) {
  ```
- Line 260:5
  ```typescript
  260 |     updateRepresentations(components: ReadonlyArray<StructureComponentRef>, pivot: StructureRepresentationRef, params: StateTransformer.Params<StructureRepresentation3D>) {
  ```
- Line 321:5
  ```typescript
  321 |     addRepresentation(components: ReadonlyArray<StructureComponentRef>, type: string) {
  ```
- Line 357:11
  ```typescript
  357 |     async add(params: StructureComponentManager.AddParams, structures?: ReadonlyArray<StructureRef>) {
  ```
- Line 390:11
  ```typescript
  390 |     async applyTheme(params: StructureComponentManager.ThemeParams, structures?: ReadonlyArray<StructureRef>) {
  ```
- Line 489:21
  ```typescript
  489 |     export function getAddParams(plugin: PluginContext, params?: { pivot?: StructureRef, allowNone: boolean, hideSelection?: boolean, checkExisting?: boolean }) {
  ```
- Line 509:21
  ```typescript
  509 |     export function getThemeParams(plugin: PluginContext, pivot: StructureRef | StructureComponentRef | undefined) {
  ```
- Line 537:21
  ```typescript
  537 |     export function getRepresentationTypes(plugin: PluginContext, pivot: StructureRef | StructureComponentRef | undefined) {
  ```

**Missing Explicit Types:**

- Line 46:14
  ```typescript
  46 |     readonly events = {
  ```
- Line 475:18
  ```typescript
  475 |     export const OptionsParams = {
  ```

#### `selection.ts` (12 errors)

**Missing Explicit Return Types:**

- Line 60:9
  ```typescript
  60 |     get entries() { return this.state.entries; }
  ```
- Line 61:9
  ```typescript
  61 |     get additionsHistory() { return this.state.additionsHistory; }
  ```
- Line 62:9
  ```typescript
  62 |     get stats() {
  ```
- Line 306:5
  ```typescript
  306 |     clear() {
  ```
- Line 324:5
  ```typescript
  324 |     getLoci(structure: Structure) {
  ```
- Line 330:5
  ```typescript
  330 |     getStructure(structure: Structure) {
  ```
- Line 336:5
  ```typescript
  336 |     structureHasSelection(structure: StructureRef) {
  ```
- Line 343:5
  ```typescript
  343 |     has(loci: Loci) {
  ```
- Line 361:5
  ```typescript
  361 |     elementCount() {
  ```
- Line 369:5
  ```typescript
  369 |     getBoundary() {
  ```
- Line 522:9
  ```typescript
  522 |     get selection() { return this._selection; }
  ```

**Missing Explicit Types:**

- Line 47:14
  ```typescript
  47 |     readonly events = {
  ```

#### `measurement.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 101:11
  ```typescript
  101 |     async addDistance(a: StructureElement.Loci, b: StructureElement.Loci,
  ```
- Line 136:11
  ```typescript
  136 |     async addAngle(a: StructureElement.Loci, b: StructureElement.Loci, c: StructureElement.Loci,
  ```
- Line 173:11
  ```typescript
  173 |     async addDihedral(a: StructureElement.Loci, b: StructureElement.Loci, c: StructureElement.Loci, d: StructureElement.Loci,
  ```
- Line 212:11
  ```typescript
  212 |     async addLabel(a: StructureElement.Loci,
  ```
- Line 240:11
  ```typescript
  240 |     async addOrientation(locis: StructureElement.Loci[]) {
  ```
- Line 270:11
  ```typescript
  270 |     async addPlane(locis: StructureElement.Loci[]) {
  ```
- Line 301:11
  ```typescript
  301 |     async addOrderLabels(locis: StructureElement.Loci[]) {
  ```

**Missing Explicit Types:**

- Line 29:14
  ```typescript
  29 | export const StructureMeasurementParams = {
  ```
- Line 59:14
  ```typescript
  59 |     readonly behaviors = {
  ```

#### `hierarchy.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 47:9
  ```typescript
  47 |     get currentComponentGroups() {
  ```
- Line 54:9
  ```typescript
  54 |     get seletionSet() {
  ```
- Line 63:9
  ```typescript
  63 |     get current() {
  ```
- Line 68:9
  ```typescript
  68 |     get selection() {
  ```
- Line 73:5
  ```typescript
  73 |     getStructuresWithSelection() {
  ```
- Line 179:5
  ```typescript
  179 |     remove(refs: (StructureHierarchyRef | string)[], canUndo?: boolean) {
  ```
- Line 267:21
  ```typescript
  267 |     export function getSelectedStructuresDescription(plugin: PluginContext) {
  ```

**Missing Explicit Types:**

- Line 32:14
  ```typescript
  32 |     readonly behaviors = {
  ```

#### `focus.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 52:9
  ```typescript
  52 |     get current() { return this.state.current; }
  ```
- Line 53:9
  ```typescript
  53 |     get history() { return this.state.history; }
  ```

**Missing Explicit Types:**

- Line 44:14
  ```typescript
  44 |     readonly events = {
  ```
- Line 48:14
  ```typescript
  48 |     readonly behaviors = {
  ```

### Directory: `src/mol-plugin-state/manager/volume`

#### `hierarchy.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 34:9
  ```typescript
  34 |     get current() {
  ```
- Line 39:9
  ```typescript
  39 |     get selection() {
  ```
- Line 86:5
  ```typescript
  86 |     remove(refs: (VolumeHierarchyRef | string)[], canUndo?: boolean) {
  ```
- Line 105:5
  ```typescript
  105 |     addRepresentation(ref: VolumeRef, type: string) {
  ```
- Line 130:21
  ```typescript
  130 |     export function getRepresentationTypes(plugin: PluginContext, pivot: VolumeRef | undefined) {
  ```

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 |     readonly behaviors = {
  ```

### Directory: `src/mol-plugin-state/transforms`

#### `model.ts` (39 errors)

**Missing Explicit Return Types:**

- Line 228:23
  ```typescript
  228 | export async function getTrajectory(ctx: RuntimeContext, obj: StateObject, coordinates: Coordinates) {
  ```

**Missing Explicit Types:**

- Line 99:7
  ```typescript
  99 | const CoordinatesFromDcd = PluginStateTransform.BuiltIn({
  ```
- Line 116:7
  ```typescript
  116 | const CoordinatesFromXtc = PluginStateTransform.BuiltIn({
  ```
- Line 133:7
  ```typescript
  133 | const CoordinatesFromTrr = PluginStateTransform.BuiltIn({
  ```
- Line 150:7
  ```typescript
  150 | const CoordinatesFromNctraj = PluginStateTransform.BuiltIn({
  ```
- Line 167:7
  ```typescript
  167 | const CoordinatesFromLammpstraj = PluginStateTransform.BuiltIn({
  ```
- Line 184:7
  ```typescript
  184 | const TopologyFromPsf = PluginStateTransform.BuiltIn({
  ```
- Line 199:7
  ```typescript
  199 | const TopologyFromPrmtop = PluginStateTransform.BuiltIn({
  ```
- Line 214:7
  ```typescript
  214 | const TopologyFromTop = PluginStateTransform.BuiltIn({
  ```
- Line 240:7
  ```typescript
  240 | const TrajectoryFromModelAndCoordinates = PluginStateTransform.BuiltIn({
  ```
- Line 261:7
  ```typescript
  261 | const TrajectoryFromBlob = PluginStateTransform.BuiltIn({
  ```
- Line 298:7
  ```typescript
  298 | const TrajectoryFromMmCif = PluginStateTransform.BuiltIn({
  ```
- Line 352:7
  ```typescript
  352 | const TrajectoryFromPDB = PluginStateTransform.BuiltIn({
  ```
- Line 373:7
  ```typescript
  373 | const TrajectoryFromGRO = PluginStateTransform.BuiltIn({
  ```
- Line 391:7
  ```typescript
  391 | const TrajectoryFromXYZ = PluginStateTransform.BuiltIn({
  ```
- Line 409:7
  ```typescript
  409 | const TrajectoryFromLammpsData = PluginStateTransform.BuiltIn({
  ```
- Line 430:7
  ```typescript
  430 | const TrajectoryFromLammpsTrajData = PluginStateTransform.BuiltIn({
  ```
- Line 452:7
  ```typescript
  452 | const TrajectoryFromMOL = PluginStateTransform.BuiltIn({
  ```
- Line 470:7
  ```typescript
  470 | const TrajectoryFromSDF = PluginStateTransform.BuiltIn({
  ```
- Line 500:7
  ```typescript
  500 | const TrajectoryFromMOL2 = PluginStateTransform.BuiltIn({
  ```
- Line 518:7
  ```typescript
  518 | const TrajectoryFromCube = PluginStateTransform.BuiltIn({
  ```
- Line 534:7
  ```typescript
  534 | const TrajectoryFromCifCore = PluginStateTransform.BuiltIn({
  ```
- Line 566:7
  ```typescript
  566 | const ModelFromTrajectory = PluginStateTransform.BuiltIn({
  ```
- Line 599:7
  ```typescript
  599 | const StructureFromTrajectory = PluginStateTransform.BuiltIn({
  ```
- Line 618:7
  ```typescript
  618 | const StructureFromModel = PluginStateTransform.BuiltIn({
  ```
- Line 648:7
  ```typescript
  648 | const TransformStructureConformation = PluginStateTransform.BuiltIn({
  ```
- Line 687:7
  ```typescript
  687 | const StructureInstances = PluginStateTransform.BuiltIn({
  ```
- Line 716:7
  ```typescript
  716 | const ModelWithCoordinates = PluginStateTransform.BuiltIn({
  ```
- Line 751:7
  ```typescript
  751 | const StructureSelectionFromExpression = PluginStateTransform.BuiltIn({
  ```
- Line 791:7
  ```typescript
  791 | const MultiStructureSelectionFromExpression = PluginStateTransform.BuiltIn({
  ```
- Line 917:7
  ```typescript
  917 | const MultiStructureSelectionFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 1017:7
  ```typescript
  1017 | const StructureSelectionFromScript = PluginStateTransform.BuiltIn({
  ```
- Line 1056:7
  ```typescript
  1056 | const StructureSelectionFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 1126:7
  ```typescript
  1126 | const StructureComplexElementTypeTuples = PD.objectToOptions(StructureComplexElementTypes);
  ```
- Line 1129:7
  ```typescript
  1129 | const StructureComplexElement = PluginStateTransform.BuiltIn({
  ```
- Line 1173:7
  ```typescript
  1173 | const StructureComponent = PluginStateTransform.BuiltIn({
  ```
- Line 1192:7
  ```typescript
  1192 | const CustomModelProperties = PluginStateTransform.BuiltIn({
  ```
- Line 1245:7
  ```typescript
  1245 | const CustomStructureProperties = PluginStateTransform.BuiltIn({
  ```
- Line 1300:7
  ```typescript
  1300 | const ShapeFromPly = PluginStateTransform.BuiltIn({
  ```

#### `representation.ts` (26 errors)

**Missing Explicit Return Types:**

- Line 953:21
  ```typescript
  953 |     export function getDescription(props: any) {
  ```

**Missing Explicit Types:**

- Line 67:7
  ```typescript
  67 | const StructureRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 201:7
  ```typescript
  201 | const UnwindStructureAssemblyRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 237:7
  ```typescript
  237 | const ExplodeStructureRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 273:7
  ```typescript
  273 | const SpinStructureRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 316:7
  ```typescript
  316 | const OverpaintStructureRepresentation3DFromScript = PluginStateTransform.BuiltIn({
  ```
- Line 373:7
  ```typescript
  373 | const OverpaintStructureRepresentation3DFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 431:7
  ```typescript
  431 | const TransparencyStructureRepresentation3DFromScript = PluginStateTransform.BuiltIn({
  ```
- Line 486:7
  ```typescript
  486 | const TransparencyStructureRepresentation3DFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 543:7
  ```typescript
  543 | const EmissiveStructureRepresentation3DFromScript = PluginStateTransform.BuiltIn({
  ```
- Line 598:7
  ```typescript
  598 | const EmissiveStructureRepresentation3DFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 654:7
  ```typescript
  654 | const SubstanceStructureRepresentation3DFromScript = PluginStateTransform.BuiltIn({
  ```
- Line 711:7
  ```typescript
  711 | const SubstanceStructureRepresentation3DFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 769:7
  ```typescript
  769 | const ClippingStructureRepresentation3DFromScript = PluginStateTransform.BuiltIn({
  ```
- Line 817:7
  ```typescript
  817 | const ClippingStructureRepresentation3DFromBundle = PluginStateTransform.BuiltIn({
  ```
- Line 866:7
  ```typescript
  866 | const ThemeStrengthRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 962:7
  ```typescript
  962 | const VolumeRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 1046:7
  ```typescript
  1046 | const ShapeRepresentation3D = PluginStateTransform.BuiltIn({
  ```
- Line 1078:7
  ```typescript
  1078 | const ModelUnitcell3D = PluginStateTransform.BuiltIn({
  ```
- Line 1116:7
  ```typescript
  1116 | const StructureBoundingBox3D = PluginStateTransform.BuiltIn({
  ```
- Line 1151:7
  ```typescript
  1151 | const StructureSelectionsDistance3D = PluginStateTransform.BuiltIn({
  ```
- Line 1184:7
  ```typescript
  1184 | const StructureSelectionsAngle3D = PluginStateTransform.BuiltIn({
  ```
- Line 1217:7
  ```typescript
  1217 | const StructureSelectionsDihedral3D = PluginStateTransform.BuiltIn({
  ```
- Line 1250:7
  ```typescript
  1250 | const StructureSelectionsLabel3D = PluginStateTransform.BuiltIn({
  ```
- Line 1293:7
  ```typescript
  1293 | const StructureSelectionsOrientation3D = PluginStateTransform.BuiltIn({
  ```
- Line 1326:7
  ```typescript
  1326 | const StructureSelectionsPlane3D = PluginStateTransform.BuiltIn({
  ```

#### `data.ts` (19 errors)

**Missing Explicit Types:**

- Line 53:7
  ```typescript
  53 | const Download = PluginStateTransform.BuiltIn({
  ```
- Line 88:7
  ```typescript
  88 | const DownloadBlob = PluginStateTransform.BuiltIn({
  ```
- Line 144:7
  ```typescript
  144 | const DeflateData = PluginStateTransform.BuiltIn({
  ```
- Line 171:7
  ```typescript
  171 | const RawData = PluginStateTransform.BuiltIn({
  ```
- Line 226:7
  ```typescript
  226 | const ReadFile = PluginStateTransform.BuiltIn({
  ```
- Line 267:7
  ```typescript
  267 | const ParseBlob = PluginStateTransform.BuiltIn({
  ```
- Line 310:7
  ```typescript
  310 | const ParseCif = PluginStateTransform.BuiltIn({
  ```
- Line 327:7
  ```typescript
  327 | const ParseCube = PluginStateTransform.BuiltIn({
  ```
- Line 343:7
  ```typescript
  343 | const ParsePsf = PluginStateTransform.BuiltIn({
  ```
- Line 359:7
  ```typescript
  359 | const ParsePrmtop = PluginStateTransform.BuiltIn({
  ```
- Line 375:7
  ```typescript
  375 | const ParseTop = PluginStateTransform.BuiltIn({
  ```
- Line 391:7
  ```typescript
  391 | const ParsePly = PluginStateTransform.BuiltIn({
  ```
- Line 407:7
  ```typescript
  407 | const ParseCcp4 = PluginStateTransform.BuiltIn({
  ```
- Line 423:7
  ```typescript
  423 | const ParseDsn6 = PluginStateTransform.BuiltIn({
  ```
- Line 439:7
  ```typescript
  439 | const ParseDx = PluginStateTransform.BuiltIn({
  ```
- Line 455:7
  ```typescript
  455 | const ImportString = PluginStateTransform.BuiltIn({
  ```
- Line 480:7
  ```typescript
  480 | const ImportJson = PluginStateTransform.BuiltIn({
  ```
- Line 505:7
  ```typescript
  505 | const ParseJson = PluginStateTransform.BuiltIn({
  ```
- Line 520:7
  ```typescript
  520 | const LazyVolume = PluginStateTransform.BuiltIn({
  ```

#### `volume.ts` (9 errors)

**Missing Explicit Types:**

- Line 34:7
  ```typescript
  34 | const VolumeFromCcp4 = PluginStateTransform.BuiltIn({
  ```
- Line 60:7
  ```typescript
  60 | const VolumeFromDsn6 = PluginStateTransform.BuiltIn({
  ```
- Line 85:7
  ```typescript
  85 | const VolumeFromCube = PluginStateTransform.BuiltIn({
  ```
- Line 111:7
  ```typescript
  111 | const VolumeFromDx = PluginStateTransform.BuiltIn({
  ```
- Line 130:7
  ```typescript
  130 | const VolumeFromDensityServerCif = PluginStateTransform.BuiltIn({
  ```
- Line 168:7
  ```typescript
  168 | const VolumeFromSegmentationCif = PluginStateTransform.BuiltIn({
  ```
- Line 206:7
  ```typescript
  206 | const AssignColorVolume = PluginStateTransform.BuiltIn({
  ```
- Line 236:14
  ```typescript
  236 | export const VolumeTransform = PluginStateTransform.BuiltIn({
  ```
- Line 271:14
  ```typescript
  271 | export const VolumeInstances = PluginStateTransform.BuiltIn({
  ```

#### `shape.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 51:17
  ```typescript
  51 | export function getBoxMesh(box: Box3D, radius: number, oldMesh?: Mesh) {
  ```

**Missing Explicit Types:**

- Line 20:7
  ```typescript
  20 | const BoxShape3D = PluginStateTransform.BuiltIn({
  ```

#### `helpers.ts` (1 errors)

**Missing Explicit Types:**

- Line 98:14
  ```typescript
  98 | export const TransformParam = PD.MappedStatic(
  ```

#### `misc.ts` (1 errors)

**Missing Explicit Types:**

- Line 14:7
  ```typescript
  14 | const CreateGroup = PluginStateTransform.BuiltIn({
  ```

### Directory: `src/mol-plugin-ui`

#### `index.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 14:23
  ```typescript
  14 | export async function createPluginUI(options: { target: HTMLElement, render: (component: any, container: Element) => any, spec?: PluginUISpec, onBeforeUIRender?: (ctx: PluginUIContext) => (Promise<void> | void) }) {
  ```

#### `context.ts` (1 errors)

**Missing Explicit Types:**

- Line 12:12
  ```typescript
  12 |   readonly customParamEditors = new Map<
  ```

### Directory: `src/mol-plugin-ui/state`

#### `common.tsx` (3 errors)

**Missing Explicit Return Types:**

- Line 42:3
  ```typescript
  42 |   validate(params: any) {
  ```
- Line 47:3
  ```typescript
  47 |   areInitial(params: any) {
  ```
- Line 64:12
  ```typescript
  64 |   override render() {
  ```

### Directory: `src/mol-plugin/behavior`

#### `behavior.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 72:21
  ```typescript
  72 |     export function getCategoryId(t: StateTransformer) {
  ```
- Line 76:21
  ```typescript
  76 |     export function create<P extends {}>(params: CreateParams<P>) {
  ```
- Line 100:21
  ```typescript
  100 |     export function simpleCommandHandler<T>(cmd: PluginCommand<T>, action: (data: T, ctx: PluginContext) => void | Promise<void>) {
  ```

**Missing Explicit Types:**

- Line 57:18
  ```typescript
  57 |     export const CreateCategory = PluginStateTransform.BuiltIn({
  ```

**Unsupported Super Class Expressions:**

- Line 29:31
  ```typescript
  29 |     export class Root extends PluginStateObject.Create({ name: 'Root', typeClass: 'Root' }) { }
  ```
- Line 30:35
  ```typescript
  30 |     export class Category extends PluginStateObject.Create({ name: 'Category', typeClass: 'Object' }) { }
  ```
- Line 31:35
  ```typescript
  31 |     export class Behavior extends PluginStateObject.CreateBehavior<PluginBehavior>({ name: 'Behavior' }) { }
  ```

### Directory: `src/mol-plugin/behavior/dynamic`

#### `representation.ts` (10 errors)

**Missing Explicit Types:**

- Line 32:7
  ```typescript
  32 | const DefaultHighlightLociBindings = {
  ```
- Line 36:7
  ```typescript
  36 | const HighlightLociParams = {
  ```
- Line 44:14
  ```typescript
  44 | export const HighlightLoci = PluginBehavior.create({
  ```
- Line 97:14
  ```typescript
  97 | export const DefaultSelectLociBindings = {
  ```
- Line 105:7
  ```typescript
  105 | const SelectLociParams = {
  ```
- Line 113:14
  ```typescript
  113 | export const SelectLoci = PluginBehavior.create({
  ```
- Line 210:14
  ```typescript
  210 | export const DefaultLociLabelProvider = PluginBehavior.create({
  ```
- Line 241:14
  ```typescript
  241 | export const DefaultFocusLociBindings = {
  ```
- Line 263:7
  ```typescript
  263 | const FocusLociParams = {
  ```
- Line 268:14
  ```typescript
  268 | export const FocusLoci = PluginBehavior.create<FocusLociProps>({
  ```

#### `camera.ts` (8 errors)

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const DefaultClickResetCameraOnEmpty = Binding([
  ```
- Line 29:14
  ```typescript
  29 | export const DefaultClickResetCameraOnEmptySelectMode = Binding([
  ```
- Line 54:7
  ```typescript
  54 | const FocusLociParams = {
  ```
- Line 63:14
  ```typescript
  63 | export const FocusLoci = PluginBehavior.create<FocusLociProps>({
  ```
- Line 102:14
  ```typescript
  102 | export const CameraAxisHelper = PluginBehavior.create<{}>({
  ```
- Line 165:7
  ```typescript
  165 | const DefaultCameraControlsBindings = {
  ```
- Line 172:7
  ```typescript
  172 | const CameraControlsParams = {
  ```
- Line 177:14
  ```typescript
  177 | export const CameraControls = PluginBehavior.create<CameraControlsProps>({
  ```

#### `state.ts` (3 errors)

**Missing Explicit Types:**

- Line 15:7
  ```typescript
  15 | const DefaultSnapshotControlsBindings = {
  ```
- Line 31:7
  ```typescript
  31 | const SnapshotControlsParams = {
  ```
- Line 36:14
  ```typescript
  36 | export const SnapshotControls = PluginBehavior.create<SnapshotControlsProps>({
  ```

### Directory: `src/mol-plugin/behavior/dynamic/custom-props`

#### `structure-info.ts` (1 errors)

**Missing Explicit Types:**

- Line 12:14
  ```typescript
  12 | export const StructureInfo = PluginBehavior.create({
  ```

### Directory: `src/mol-plugin/behavior/dynamic/custom-props/computed`

#### `accessible-surface-area.ts` (1 errors)

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const AccessibleSurfaceArea = PluginBehavior.create<{ autoAttach: boolean, showTooltip: boolean }>({
  ```

#### `interactions.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const Interactions = PluginBehavior.create<{ autoAttach: boolean, showTooltip: boolean }>({
  ```

#### `secondary-structure.ts` (1 errors)

**Missing Explicit Types:**

- Line 11:14
  ```typescript
  11 | export const SecondaryStructure = PluginBehavior.create<{ autoAttach: boolean }>({
  ```

#### `valence-model.ts` (1 errors)

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const ValenceModel = PluginBehavior.create<{ autoAttach: boolean, showTooltip: boolean }>({
  ```

### Directory: `src/mol-plugin/behavior/dynamic/custom-props/integrative`

#### `cross-link-restraint.ts` (1 errors)

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const CrossLinkRestraint = PluginBehavior.create<{ }>({
  ```

### Directory: `src/mol-plugin/behavior/dynamic/custom-props/sequence`

#### `sifts-mapping.ts` (1 errors)

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const SIFTSMapping = PluginBehavior.create<{ autoAttach: boolean, showTooltip: boolean }>({
  ```

### Directory: `src/mol-plugin/behavior/dynamic/volume-streaming`

#### `behavior.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 91:19
  ```typescript
  91 |   export function createParams(
  ```
- Line 122:19
  ```typescript
  122 |   export function createEntryParams(options: {
  ```
- Line 380:16
  ```typescript
  380 |     public get info() {
  ```
- Line 696:11
  ```typescript
  696 |     async update(params: Params) {
  ```
- Line 832:5
  ```typescript
  832 |     getDescription() {
  ```

**Unsupported Super Class Expressions:**

- Line 42:38
  ```typescript
  42 | export class VolumeStreaming extends PluginStateObject.CreateBehavior<VolumeStreaming.Behavior>(
  ```

#### `transformers.ts` (1 errors)

**Missing Explicit Types:**

- Line 211:7
  ```typescript
  211 | const CreateVolumeStreamingBehavior = PluginStateTransform.BuiltIn({
  ```

#### `model.ts` (1 errors)

**Unsupported Super Class Expressions:**

- Line 12:39
  ```typescript
  12 | export class VolumeServerInfo extends PluginStateObject.Create<VolumeServerInfo.Data>({ name: 'Volume Streaming', typeClass: 'Object' }) { }
  ```

### Directory: `src/mol-plugin/util`

#### `viewport-screenshot.ts` (14 errors)

**Missing Explicit Return Types:**

- Line 95:9
  ```typescript
  95 |     get params() {
  ```
- Line 116:9
  ```typescript
  116 |     get values() {
  ```
- Line 120:9
  ```typescript
  120 |     get cropParams() {
  ```
- Line 124:9
  ```typescript
  124 |     get relativeCrop() {
  ```
- Line 195:9
  ```typescript
  195 |     get imagePass() {
  ```
- Line 210:5
  ```typescript
  210 |     getFilename(extension?: string) {
  ```
- Line 248:9
  ```typescript
  248 |     get isFullFrame() {
  ```
- Line 307:11
  ```typescript
  307 |     async getPreview(ctx: RuntimeContext, maxDim = 320) {
  ```
- Line 347:5
  ```typescript
  347 |     getSizeAndViewport() {
  ```
- Line 427:5
  ```typescript
  427 |     getImageDataUri() {
  ```
- Line 435:5
  ```typescript
  435 |     copyToClipboard() {
  ```
- Line 450:5
  ```typescript
  450 |     download(filename?: string) {
  ```

**Missing Explicit Types:**

- Line 100:14
  ```typescript
  100 |     readonly behaviors = {
  ```
- Line 112:14
  ```typescript
  112 |     readonly events = {
  ```

#### `task-manager.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 109:21
  ```typescript
  109 |     export function testTask(N: number) {
  ```

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 |     readonly events = {
  ```

#### `substructure-parent-helper.ts` (1 errors)

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 |     readonly events = {
  ```

#### `toast.ts` (1 errors)

**Missing Explicit Types:**

- Line 33:14
  ```typescript
  33 |     readonly events = {
  ```

### Directory: `src/mol-repr`

#### `representation.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 68:21
  ```typescript
  68 |     export function getDefaultParams<R extends RepresentationProvider<D, any, any>, D>(r: R, ctx: ThemeRegistryContext, data: D) {
  ```
- Line 96:9
  ```typescript
  96 |     get default() { return this._list[0]; }
  ```
- Line 131:9
  ```typescript
  131 |     get list() {
  ```
- Line 135:5
  ```typescript
  135 |     getApplicableList(data: D) {
  ```
- Line 139:5
  ```typescript
  139 |     getApplicableTypes(data: D) {
  ```
- Line 177:25
  ```typescript
  177 |         export function areEqual(a: Loci, b: Loci) {
  ```
- Line 181:25
  ```typescript
  181 |         export function isEmpty(a: Loci) {
  ```
- Line 288:13
  ```typescript
  288 |         get version() {
  ```

#### `visual.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 88:21
  ```typescript
  88 |     export function mark(renderObject: GraphicsRenderObject | undefined, loci: Loci, action: MarkerAction, lociApply: LociApply, previous?: PreviousMark) {
  ```

### Directory: `src/mol-repr/shape/loci`

#### `dihedral.ts` (18 errors)

**Missing Explicit Return Types:**

- Line 75:16
  ```typescript
  75 |     'vectors': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, VectorsParams>) => ShapeRepresentation(getVectorsShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 76:18
  ```typescript
  76 |     'extenders': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ExtendersParams>) => ShapeRepresentation(getExtendersShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 77:18
  ```typescript
  77 |     'connector': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ExtendersParams>) => ShapeRepresentation(getConnectorShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 78:13
  ```typescript
  78 |     'arms': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ArmsParams>) => ShapeRepresentation(getArmsShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 79:12
  ```typescript
  79 |     'arc': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ArcParams>) => ShapeRepresentation(getArcShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 80:15
  ```typescript
  80 |     'sector': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, SectorParams>) => ShapeRepresentation(getSectorShape, Mesh.Utils, { modifyProps: p => ({ ...p, alpha: p.sectorOpacity }), modifyState: s => ({ ...s, markerActions: MarkerActions.Highlighting }) }),
  ```
- Line 81:13
  ```typescript
  81 |     'text': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, LociLabelTextParams>) => ShapeRepresentation(getTextShape, Text.Utils, { modifyState: s => ({ ...s, markerActions: MarkerAction.None }) }),
  ```
- Line 206:10
  ```typescript
  206 | function getVectorsShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 223:10
  ```typescript
  223 | function getConnectorShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 241:10
  ```typescript
  241 | function getArmsShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 259:10
  ```typescript
  259 | function getExtendersShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 289:10
  ```typescript
  289 | function getArcShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 309:10
  ```typescript
  309 | function getSectorShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Mesh>) {
  ```
- Line 337:10
  ```typescript
  337 | function getTextShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Text>) {
  ```

**Missing Explicit Types:**

- Line 33:7
  ```typescript
  33 | const SharedParams = {
  ```
- Line 38:7
  ```typescript
  38 | const LinesParams = {
  ```
- Line 66:7
  ```typescript
  66 | const SectorParams = {
  ```
- Line 84:14
  ```typescript
  84 | export const DihedralParams = {
  ```

#### `angle.ts` (12 errors)

**Missing Explicit Return Types:**

- Line 65:16
  ```typescript
  65 |     'vectors': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<AngleData, VectorsParams>) => ShapeRepresentation(getVectorsShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 66:12
  ```typescript
  66 |     'arc': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<AngleData, ArcParams>) => ShapeRepresentation(getArcShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 67:15
  ```typescript
  67 |     'sector': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<AngleData, SectorParams>) => ShapeRepresentation(getSectorShape, Mesh.Utils, { modifyProps: p => ({ ...p, alpha: p.sectorOpacity }), modifyState: s => ({ ...s, markerActions: MarkerActions.Highlighting }) }),
  ```
- Line 68:13
  ```typescript
  68 |     'text': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<AngleData, LociLabelTextParams>) => ShapeRepresentation(getTextShape, Text.Utils, { modifyState: s => ({ ...s, markerActions: MarkerAction.None }) }),
  ```
- Line 154:10
  ```typescript
  154 | function getVectorsShape(ctx: RuntimeContext, data: AngleData, props: AngleProps, shape?: Shape<Lines>) {
  ```
- Line 184:10
  ```typescript
  184 | function getArcShape(ctx: RuntimeContext, data: AngleData, props: AngleProps, shape?: Shape<Lines>) {
  ```
- Line 204:10
  ```typescript
  204 | function getSectorShape(ctx: RuntimeContext, data: AngleData, props: AngleProps, shape?: Shape<Mesh>) {
  ```
- Line 231:10
  ```typescript
  231 | function getTextShape(ctx: RuntimeContext, data: AngleData, props: AngleProps, shape?: Shape<Text>) {
  ```

**Missing Explicit Types:**

- Line 33:7
  ```typescript
  33 | const SharedParams = {
  ```
- Line 38:7
  ```typescript
  38 | const LinesParams = {
  ```
- Line 56:7
  ```typescript
  56 | const SectorParams = {
  ```
- Line 71:14
  ```typescript
  71 | export const AngleParams = {
  ```

#### `orientation.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 53:13
  ```typescript
  53 |     'axes': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<OrientationData, AxesParams>) => ShapeRepresentation(getAxesShape, Mesh.Utils),
  ```
- Line 54:12
  ```typescript
  54 |     'box': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<OrientationData, BoxParams>) => ShapeRepresentation(getBoxShape, Mesh.Utils),
  ```
- Line 55:18
  ```typescript
  55 |     'ellipsoid': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<OrientationData, EllipsoidParams>) => ShapeRepresentation(getEllipsoidShape, Mesh.Utils),
  ```
- Line 84:10
  ```typescript
  84 | function getAxesShape(ctx: RuntimeContext, data: OrientationData, props: OrientationProps, shape?: Shape<Mesh>) {
  ```
- Line 107:10
  ```typescript
  107 | function getBoxShape(ctx: RuntimeContext, data: OrientationData, props: OrientationProps, shape?: Shape<Mesh>) {
  ```
- Line 135:10
  ```typescript
  135 | function getEllipsoidShape(ctx: RuntimeContext, data: OrientationData, props: OrientationProps, shape?: Shape<Mesh>) {
  ```

**Missing Explicit Types:**

- Line 28:7
  ```typescript
  28 | const SharedParams = {
  ```
- Line 58:14
  ```typescript
  58 | export const OrientationParams = {
  ```

#### `distance.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 49:14
  ```typescript
  49 |     'lines': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DistanceData, LineParams>) => ShapeRepresentation(getLinesShape, Lines.Utils, { modifyState: s => ({ ...s, markerActions: MarkerActions.Highlighting }) }),
  ```
- Line 50:13
  ```typescript
  50 |     'text': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DistanceData, TextParams>) => ShapeRepresentation(getTextShape, Text.Utils, { modifyState: s => ({ ...s, markerActions: MarkerAction.None }) }),
  ```
- Line 105:10
  ```typescript
  105 | function getLinesShape(ctx: RuntimeContext, data: DistanceData, props: DistanceProps, shape?: Shape<Lines>) {
  ```
- Line 127:10
  ```typescript
  127 | function getTextShape(ctx: RuntimeContext, data: DistanceData, props: DistanceProps, shape?: Shape<Text>) {
  ```

**Missing Explicit Types:**

- Line 28:7
  ```typescript
  28 | const SharedParams = {
  ```
- Line 32:7
  ```typescript
  32 | const LineParams = {
  ```
- Line 53:14
  ```typescript
  53 | export const DistanceParams = {
  ```

#### `plane.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 34:14
  ```typescript
  34 |     'plane': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<PlaneData, _PlaneParams>) => ShapeRepresentation(getPlaneShape, Mesh.Utils),
  ```
- Line 71:10
  ```typescript
  71 | function getPlaneShape(ctx: RuntimeContext, data: PlaneData, props: PlaneProps, shape?: Shape<Mesh>) {
  ```

**Missing Explicit Types:**

- Line 26:7
  ```typescript
  26 | const _PlaneParams = {
  ```
- Line 37:14
  ```typescript
  37 | export const PlaneParams = {
  ```

#### `label.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 30:13
  ```typescript
  30 |     'text': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<LabelData, TextParams>) => ShapeRepresentation(getTextShape, Text.Utils),
  ```
- Line 72:10
  ```typescript
  72 | function getTextShape(ctx: RuntimeContext, data: LabelData, props: LabelProps, shape?: Shape<Text>) {
  ```

**Missing Explicit Types:**

- Line 33:14
  ```typescript
  33 | export const LabelParams = {
  ```

#### `common.ts` (2 errors)

**Missing Explicit Types:**

- Line 12:14
  ```typescript
  12 | export const MeasurementRepresentationCommonTextParams = {
  ```
- Line 18:14
  ```typescript
  18 | export const LociLabelTextParams = {
  ```

### Directory: `src/mol-repr/shape/model`

#### `unitcell.ts` (1 errors)

**Missing Explicit Types:**

- Line 42:7
  ```typescript
  42 | const CellParams = {
  ```

### Directory: `src/mol-repr/structure`

#### `params.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 20:17
  ```typescript
  20 | export function getUnitKindsParam(defaultValue: UnitKind[]) {
  ```

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const StructureParams = {
  ```

### Directory: `src/mol-repr/structure/representation`

#### `cartoon.ts` (11 errors)

**Missing Explicit Return Types:**

- Line 28:22
  ```typescript
  28 |     'polymer-trace': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerTraceParams>) => UnitsRepresentation('Polymer trace mesh', ctx, getParams, PolymerTraceVisual),
  ```
- Line 29:20
  ```typescript
  29 |     'polymer-gap': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerGapParams>) => UnitsRepresentation('Polymer gap cylinder', ctx, getParams, PolymerGapVisual),
  ```
- Line 30:25
  ```typescript
  30 |     'nucleotide-block': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideBlockParams>) => UnitsRepresentation('Nucleotide block mesh', ctx, getParams, NucleotideBlockVisual),
  ```
- Line 31:24
  ```typescript
  31 |     'nucleotide-ring': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideRingParams>) => UnitsRepresentation('Nucleotide ring mesh', ctx, getParams, NucleotideRingVisual),
  ```
- Line 32:36
  ```typescript
  32 |     'nucleotide-atomic-ring-fill': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideAtomicRingFillParams>) => UnitsRepresentation('Nucleotide atomic ring fill', ctx, getParams, NucleotideAtomicRingFillVisual),
  ```
- Line 33:31
  ```typescript
  33 |     'nucleotide-atomic-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideAtomicBondParams>) => UnitsRepresentation('Nucleotide atomic bond', ctx, getParams, NucleotideAtomicBondVisual),
  ```
- Line 34:34
  ```typescript
  34 |     'nucleotide-atomic-element': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideAtomicElementParams>) => UnitsRepresentation('Nucleotide atomic element', ctx, getParams, NucleotideAtomicElementVisual),
  ```
- Line 35:24
  ```typescript
  35 |     'direction-wedge': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerDirectionParams>) => UnitsRepresentation('Polymer direction wedge', ctx, getParams, PolymerDirectionVisual),
  ```
- Line 55:17
  ```typescript
  55 | export function getCartoonParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 38:14
  ```typescript
  38 | export const CartoonParams = {
  ```
- Line 74:14
  ```typescript
  74 | export const CartoonRepresentationProvider = StructureRepresentationProvider({
  ```

#### `line.ts` (10 errors)

**Missing Explicit Return Types:**

- Line 23:19
  ```typescript
  23 |     'intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, IntraUnitBondLineParams>) => UnitsRepresentation('Intra-unit bond line', ctx, getParams, IntraUnitBondLineVisual),
  ```
- Line 24:19
  ```typescript
  24 |     'inter-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, InterUnitBondLineParams>) => ComplexRepresentation('Inter-unit bond line', ctx, getParams, InterUnitBondLineVisual),
  ```
- Line 25:22
  ```typescript
  25 |     'element-point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementPointParams>) => UnitsRepresentation('Points', ctx, getParams, ElementPointVisual),
  ```
- Line 26:22
  ```typescript
  26 |     'element-cross': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementCrossParams>) => UnitsRepresentation('Crosses', ctx, getParams, ElementCrossVisual),
  ```
- Line 27:29
  ```typescript
  27 |     'structure-intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureIntraUnitBondLineParams>) => ComplexRepresentation('Structure intra-unit bond line', ctx, getParams, StructureIntraUnitBondLineVisual),
  ```
- Line 28:32
  ```typescript
  28 |     'structure-element-point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureElementPointParams>) => ComplexRepresentation('Structure element points', ctx, getParams, StructureElementPointVisual),
  ```
- Line 29:32
  ```typescript
  29 |     'structure-element-cross': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureElementCrossParams>) => ComplexRepresentation('Structure element crosses', ctx, getParams, StructureElementCrossVisual),
  ```
- Line 46:17
  ```typescript
  46 | export function getLineParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 32:14
  ```typescript
  32 | export const LineParams = {
  ```
- Line 64:14
  ```typescript
  64 | export const LineRepresentationProvider = StructureRepresentationProvider({
  ```

#### `ball-and-stick.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 21:23
  ```typescript
  21 |     'element-sphere': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementSphereParams>) => UnitsRepresentation('Element sphere', ctx, getParams, ElementSphereVisual),
  ```
- Line 22:19
  ```typescript
  22 |     'intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, IntraUnitBondCylinderParams>) => UnitsRepresentation('Intra-unit bond cylinder', ctx, getParams, IntraUnitBondCylinderVisual),
  ```
- Line 23:19
  ```typescript
  23 |     'inter-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, InterUnitBondCylinderParams>) => ComplexRepresentation('Inter-unit bond cylinder', ctx, getParams, InterUnitBondCylinderVisual),
  ```
- Line 24:33
  ```typescript
  24 |     'structure-element-sphere': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementSphereParams>) => ComplexRepresentation('Structure element sphere', ctx, getParams, StructureElementSphereVisual),
  ```
- Line 25:29
  ```typescript
  25 |     'structure-intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureIntraUnitBondCylinderParams>) => ComplexRepresentation('Structure intra-unit bond cylinder', ctx, getParams, StructureIntraUnitBondCylinderVisual),
  ```
- Line 42:17
  ```typescript
  42 | export function getBallAndStickParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 28:14
  ```typescript
  28 | export const BallAndStickParams = {
  ```
- Line 60:14
  ```typescript
  60 | export const BallAndStickRepresentationProvider = StructureRepresentationProvider({
  ```

#### `ellipsoid.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 20:23
  ```typescript
  20 |     'ellipsoid-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, EllipsoidMeshParams>) => UnitsRepresentation('Ellipsoid Mesh', ctx, getParams, EllipsoidMeshVisual),
  ```
- Line 21:19
  ```typescript
  21 |     'intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, IntraUnitBondCylinderParams>) => UnitsRepresentation('Intra-unit bond cylinder', ctx, getParams, IntraUnitBondCylinderVisual),
  ```
- Line 22:19
  ```typescript
  22 |     'inter-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, InterUnitBondCylinderParams>) => ComplexRepresentation('Inter-unit bond cylinder', ctx, getParams, InterUnitBondCylinderVisual),
  ```
- Line 23:33
  ```typescript
  23 |     'structure-ellipsoid-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureEllipsoidMeshParams>) => ComplexRepresentation('Structure Ellipsoid Mesh', ctx, getParams, StructureEllipsoidMeshVisual),
  ```
- Line 24:29
  ```typescript
  24 |     'structure-intra-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureIntraUnitBondCylinderParams>) => ComplexRepresentation('Structure intra-unit bond cylinder', ctx, getParams, StructureIntraUnitBondCylinderVisual),
  ```
- Line 41:17
  ```typescript
  41 | export function getEllipsoidParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 27:14
  ```typescript
  27 | export const EllipsoidParams = {
  ```
- Line 59:14
  ```typescript
  59 | export const EllipsoidRepresentationProvider = StructureRepresentationProvider({
  ```

#### `backbone.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 19:34
  ```typescript
  19 |     'polymer-backbone-cylinder': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerBackboneCylinderParams>) => UnitsRepresentation('Polymer backbone cylinder', ctx, getParams, PolymerBackboneCylinderVisual),
  ```
- Line 20:32
  ```typescript
  20 |     'polymer-backbone-sphere': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerBackboneSphereParams>) => UnitsRepresentation('Polymer backbone sphere', ctx, getParams, PolymerBackboneSphereVisual),
  ```
- Line 21:20
  ```typescript
  21 |     'polymer-gap': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerGapParams>) => UnitsRepresentation('Polymer gap cylinder', ctx, getParams, PolymerGapVisual),
  ```
- Line 35:17
  ```typescript
  35 | export function getBackboneParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const BackboneParams = {
  ```
- Line 51:14
  ```typescript
  51 | export const BackboneRepresentationProvider = StructureRepresentationProvider({
  ```

#### `carbohydrate.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 19:28
  ```typescript
  19 |     'carbohydrate-symbol': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, CarbohydrateSymbolParams>) => ComplexRepresentation('Carbohydrate symbol mesh', ctx, getParams, CarbohydrateSymbolVisual),
  ```
- Line 20:26
  ```typescript
  20 |     'carbohydrate-link': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, CarbohydrateLinkParams>) => ComplexRepresentation('Carbohydrate link cylinder', ctx, getParams, CarbohydrateLinkVisual),
  ```
- Line 21:35
  ```typescript
  21 |     'carbohydrate-terminal-link': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, CarbohydrateTerminalLinkParams>) => ComplexRepresentation('Carbohydrate terminal link cylinder', ctx, getParams, CarbohydrateTerminalLinkVisual),
  ```
- Line 33:17
  ```typescript
  33 | export function getCarbohydrateParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const CarbohydrateParams = {
  ```
- Line 42:14
  ```typescript
  42 | export const CarbohydrateRepresentationProvider = StructureRepresentationProvider({
  ```

#### `gaussian-surface.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 18:30
  ```typescript
  18 |     'gaussian-surface-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, GaussianSurfaceMeshParams>) => UnitsRepresentation('Gaussian surface mesh', ctx, getParams, GaussianSurfaceVisual),
  ```
- Line 19:40
  ```typescript
  19 |     'structure-gaussian-surface-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureGaussianSurfaceMeshParams>) => ComplexRepresentation('Structure-Gaussian surface mesh', ctx, getParams, StructureGaussianSurfaceVisual),
  ```
- Line 20:35
  ```typescript
  20 |     'gaussian-surface-wireframe': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, GaussianWireframeParams>) => UnitsRepresentation('Gaussian surface wireframe', ctx, getParams, GaussianWireframeVisual),
  ```
- Line 31:17
  ```typescript
  31 | export function getGaussianSurfaceParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const GaussianSurfaceParams = {
  ```
- Line 40:14
  ```typescript
  40 | export const GaussianSurfaceRepresentationProvider = StructureRepresentationProvider({
  ```

#### `molecular-surface.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 18:31
  ```typescript
  18 |     'molecular-surface-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, MolecularSurfaceMeshParams>) => UnitsRepresentation('Molecular surface mesh', ctx, getParams, MolecularSurfaceMeshVisual),
  ```
- Line 19:41
  ```typescript
  19 |     'structure-molecular-surface-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, MolecularSurfaceMeshParams>) => ComplexRepresentation('Structure Molecular surface mesh', ctx, getParams, StructureMolecularSurfaceMeshVisual),
  ```
- Line 20:36
  ```typescript
  20 |     'molecular-surface-wireframe': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, MolecularSurfaceWireframeParams>) => UnitsRepresentation('Molecular surface wireframe', ctx, getParams, MolecularSurfaceWireframeVisual),
  ```
- Line 31:17
  ```typescript
  31 | export function getMolecularSurfaceParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const MolecularSurfaceParams = {
  ```
- Line 40:14
  ```typescript
  40 | export const MolecularSurfaceRepresentationProvider = StructureRepresentationProvider({
  ```

#### `gaussian-volume.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 15:24
  ```typescript
  15 |     'gaussian-volume': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, GaussianDensityVolumeParams>) => ComplexRepresentation('Gaussian volume', ctx, getParams, GaussianDensityVolumeVisual),
  ```
- Line 16:30
  ```typescript
  16 |     'units-gaussian-volume': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, UnitsGaussianDensityVolumeParams>) => UnitsRepresentation('Units-Gaussian volume', ctx, getParams, UnitsGaussianDensityVolumeVisual)
  ```
- Line 25:17
  ```typescript
  25 | export function getGaussianVolumeParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const GaussianVolumeParams = {
  ```
- Line 34:14
  ```typescript
  34 | export const GaussianVolumeRepresentationProvider = StructureRepresentationProvider({
  ```

#### `point.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 17:22
  ```typescript
  17 |     'element-point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementPointParams>) => UnitsRepresentation('Element points', ctx, getParams, ElementPointVisual),
  ```
- Line 18:32
  ```typescript
  18 |     'structure-element-point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, StructureElementPointParams>) => ComplexRepresentation('Structure element points', ctx, getParams, StructureElementPointVisual),
  ```
- Line 27:17
  ```typescript
  27 | export function getPointParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const PointParams = {
  ```
- Line 41:14
  ```typescript
  41 | export const PointRepresentationProvider = StructureRepresentationProvider({
  ```

#### `putty.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 18:21
  ```typescript
  18 |     'polymer-tube': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerTubeParams>) => UnitsRepresentation('Polymer tube mesh', ctx, getParams, PolymerTubeVisual),
  ```
- Line 19:20
  ```typescript
  19 |     'polymer-gap': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerGapParams>) => UnitsRepresentation('Polymer gap cylinder', ctx, getParams, PolymerGapVisual),
  ```
- Line 31:17
  ```typescript
  31 | export function getPuttyParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 22:14
  ```typescript
  22 | export const PuttyParams = {
  ```
- Line 49:14
  ```typescript
  49 | export const PuttyRepresentationProvider = StructureRepresentationProvider({
  ```

#### `spacefill.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 17:23
  ```typescript
  17 |     'element-sphere': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementSphereParams>) => UnitsRepresentation('Sphere mesh/impostor', ctx, getParams, ElementSphereVisual),
  ```
- Line 18:33
  ```typescript
  18 |     'structure-element-sphere': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, ElementSphereParams>) => ComplexRepresentation('Structure sphere mesh/impostor', ctx, getParams, StructureElementSphereVisual),
  ```
- Line 30:17
  ```typescript
  30 | export function getSpacefillParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const SpacefillParams = {
  ```
- Line 51:14
  ```typescript
  51 | export const SpacefillRepresentationProvider = StructureRepresentationProvider({
  ```

#### `label.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 16:19
  ```typescript
  16 |     'label-text': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, LabelTextParams>) => ComplexRepresentation('Label text', ctx, getParams, LabelTextVisual),
  ```
- Line 24:17
  ```typescript
  24 | export function getLabelParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const LabelParams = {
  ```
- Line 35:14
  ```typescript
  35 | export const LabelRepresentationProvider = StructureRepresentationProvider({
  ```

#### `orientation.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 17:35
  ```typescript
  17 |     'orientation-ellipsoid-mesh': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, OrientationEllipsoidMeshParams>) => UnitsRepresentation('Orientation ellipsoid mesh', ctx, getParams, OrientationEllipsoidMeshVisual),
  ```
- Line 26:17
  ```typescript
  26 | export function getOrientationParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const OrientationParams = {
  ```
- Line 35:14
  ```typescript
  35 | export const OrientationRepresentationProvider = StructureRepresentationProvider({
  ```

#### `plane.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 15:20
  ```typescript
  15 |     'plane-image': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PlaneImageParams>) => ComplexRepresentation('Plane image', ctx, getParams, PlaneImageVisual),
  ```
- Line 23:17
  ```typescript
  23 | export function getPlaneParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const PlaneParams = {
  ```
- Line 32:14
  ```typescript
  32 | export const PlaneRepresentationProvider = StructureRepresentationProvider({
  ```

### Directory: `src/mol-repr/structure/visual`

#### `bond-intra-unit-cylinder.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 230:17
  ```typescript
  230 | export function IntraUnitBondCylinderVisual(materialId: number, structure: Structure, props: PD.Values<IntraUnitBondCylinderParams>, webgl?: WebGLContext) {
  ```
- Line 442:17
  ```typescript
  442 | export function StructureIntraUnitBondCylinderVisual(materialId: number, structure: Structure, props: PD.Values<StructureIntraUnitBondCylinderParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 219:14
  ```typescript
  219 | export const IntraUnitBondCylinderParams = {
  ```
- Line 431:14
  ```typescript
  431 | export const StructureIntraUnitBondCylinderParams = {
  ```

#### `element-sphere.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 37:17
  ```typescript
  37 | export function ElementSphereVisual(materialId: number, structure: Structure, props: PD.Values<ElementSphereParams>, webgl?: WebGLContext) {
  ```
- Line 96:17
  ```typescript
  96 | export function StructureElementSphereVisual(materialId: number, structure: Structure, props: PD.Values<ElementSphereParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const CommonElementSphereParams = {
  ```

#### `gaussian-surface-mesh.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 72:17
  ```typescript
  72 | export function GaussianSurfaceVisual(materialId: number, structure: Structure, props: PD.Values<GaussianSurfaceMeshParams>, webgl?: WebGLContext) {
  ```
- Line 79:17
  ```typescript
  79 | export function StructureGaussianSurfaceVisual(materialId: number, structure: Structure, props: PD.Values<StructureGaussianSurfaceMeshParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 33:7
  ```typescript
  33 | const SharedParams = {
  ```

#### `bond-inter-unit-cylinder.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 212:17
  ```typescript
  212 | export function InterUnitBondCylinderVisual(materialId: number, structure: Structure, props: PD.Values<InterUnitBondCylinderParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 201:14
  ```typescript
  201 | export const InterUnitBondCylinderParams = {
  ```

#### `nucleotide-atomic-bond.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 61:17
  ```typescript
  61 | export function NucleotideAtomicBondVisual(materialId: number, structure: Structure, props: PD.Values<NucleotideAtomicBondParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 49:14
  ```typescript
  49 | export const NucleotideAtomicBondParams = {
  ```

#### `nucleotide-atomic-element.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 59:17
  ```typescript
  59 | export function NucleotideAtomicElementVisual(materialId: number, structure: Structure, props: PD.Values<NucleotideAtomicElementParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 47:14
  ```typescript
  47 | export const NucleotideAtomicElementParams = {
  ```

#### `polymer-backbone-cylinder.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 42:17
  ```typescript
  42 | export function PolymerBackboneCylinderVisual(materialId: number, structure: Structure, props: PD.Values<PolymerBackboneCylinderParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 33:14
  ```typescript
  33 | export const PolymerBackboneCylinderParams = {
  ```

#### `polymer-backbone-sphere.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 36:17
  ```typescript
  36 | export function PolymerBackboneSphereVisual(materialId: number, structure: Structure, props: PD.Values<PolymerBackboneSphereParams>, webgl?: WebGLContext) {
  ```

**Missing Explicit Types:**

- Line 27:14
  ```typescript
  27 | export const PolymerBackboneSphereParams = {
  ```

#### `bond-intra-unit-line.ts` (2 errors)

**Missing Explicit Types:**

- Line 151:14
  ```typescript
  151 | export const IntraUnitBondLineParams = {
  ```
- Line 268:14
  ```typescript
  268 | export const StructureIntraUnitBondLineParams = {
  ```

#### `element-cross.ts` (2 errors)

**Missing Explicit Types:**

- Line 29:14
  ```typescript
  29 | export const ElementCrossParams = {
  ```
- Line 182:14
  ```typescript
  182 | export const StructureElementCrossParams = {
  ```

#### `element-point.ts` (2 errors)

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const ElementPointParams = {
  ```
- Line 172:14
  ```typescript
  172 | export const StructureElementPointParams = {
  ```

#### `ellipsoid-mesh.ts` (2 errors)

**Missing Explicit Types:**

- Line 116:14
  ```typescript
  116 | export const EllipsoidMeshParams = {
  ```
- Line 251:14
  ```typescript
  251 | export const StructureEllipsoidMeshParams = {
  ```

#### `gaussian-density-volume.ts` (2 errors)

**Missing Explicit Types:**

- Line 55:14
  ```typescript
  55 | export const GaussianDensityVolumeParams = {
  ```
- Line 122:14
  ```typescript
  122 | export const UnitsGaussianDensityVolumeParams = {
  ```

#### `bond-inter-unit-line.ts` (1 errors)

**Missing Explicit Types:**

- Line 125:14
  ```typescript
  125 | export const InterUnitBondLineParams = {
  ```

#### `carbohydrate-link-cylinder.ts` (1 errors)

**Missing Explicit Types:**

- Line 59:14
  ```typescript
  59 | export const CarbohydrateLinkParams = {
  ```

#### `carbohydrate-symbol-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 164:14
  ```typescript
  164 | export const CarbohydrateSymbolParams = {
  ```

#### `carbohydrate-terminal-link-cylinder.ts` (1 errors)

**Missing Explicit Types:**

- Line 76:14
  ```typescript
  76 | export const CarbohydrateTerminalLinkParams = {
  ```

#### `gaussian-surface-wireframe.ts` (1 errors)

**Missing Explicit Types:**

- Line 38:14
  ```typescript
  38 | export const GaussianWireframeParams = {
  ```

#### `label-text.ts` (1 errors)

**Missing Explicit Types:**

- Line 22:14
  ```typescript
  22 | export const LabelTextParams = {
  ```

#### `molecular-surface-wireframe.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const MolecularSurfaceWireframeParams = {
  ```

#### `nucleotide-atomic-ring-fill.ts` (1 errors)

**Missing Explicit Types:**

- Line 45:14
  ```typescript
  45 | export const NucleotideAtomicRingFillMeshParams = {
  ```

#### `nucleotide-block-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 41:14
  ```typescript
  41 | export const NucleotideBlockMeshParams = {
  ```

#### `nucleotide-ring-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 40:14
  ```typescript
  40 | export const NucleotideRingMeshParams = {
  ```

#### `orientation-ellipsoid-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 27:14
  ```typescript
  27 | export const OrientationEllipsoidMeshParams = {
  ```

#### `plane-image.ts` (1 errors)

**Missing Explicit Types:**

- Line 33:14
  ```typescript
  33 | export const PlaneImageParams = {
  ```

#### `polymer-direction-wedge.ts` (1 errors)

**Missing Explicit Types:**

- Line 34:14
  ```typescript
  34 | export const PolymerDirectionWedgeParams = {
  ```

#### `polymer-gap-cylinder.ts` (1 errors)

**Missing Explicit Types:**

- Line 27:14
  ```typescript
  27 | export const PolymerGapCylinderParams = {
  ```

#### `polymer-trace-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 28:14
  ```typescript
  28 | export const PolymerTraceMeshParams = {
  ```

#### `polymer-tube-mesh.ts` (1 errors)

**Missing Explicit Types:**

- Line 26:14
  ```typescript
  26 | export const PolymerTubeMeshParams = {
  ```

### Directory: `src/mol-repr/structure/visual/util`

#### `bond.ts` (2 errors)

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const BondParams = {
  ```
- Line 31:14
  ```typescript
  31 | export const BondCylinderParams = {
  ```

#### `link.ts` (2 errors)

**Missing Explicit Types:**

- Line 25:14
  ```typescript
  25 | export const LinkCylinderParams = {
  ```
- Line 42:14
  ```typescript
  42 | export const LinkLineParams = {
  ```

#### `common.ts` (1 errors)

**Missing Explicit Types:**

- Line 192:14
  ```typescript
  192 | export const CommonSurfaceParams = {
  ```

#### `gaussian.ts` (1 errors)

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const GaussianDensityParams = {
  ```

### Directory: `src/mol-repr/volume`

#### `dot.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 51:17
  ```typescript
  51 | export function VolumeSphereVisual(materialId: number, volume: Volume, key: number, props: PD.Values<VolumeSphereParams>, webgl?: WebGLContext) {
  ```
- Line 282:10
  ```typescript
  282 | function getLoci(volume: Volume, props: VolumeDotProps) {
  ```
- Line 312:15
  ```typescript
  312 |     'sphere': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Volume, VolumeSphereParams>) => VolumeRepresentation('Dot sphere', ctx, getParams, VolumeSphereVisual, getLoci),
  ```
- Line 313:14
  ```typescript
  313 |     'point': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Volume, VolumePointParams>) => VolumeRepresentation('Dot point', ctx, getParams, VolumePointVisual, getLoci),
  ```
- Line 323:17
  ```typescript
  323 | export function getDotParams(ctx: ThemeRegistryContext, volume: Volume) {
  ```

**Missing Explicit Types:**

- Line 32:14
  ```typescript
  32 | export const VolumeDotParams = {
  ```
- Line 41:14
  ```typescript
  41 | export const VolumeSphereParams = {
  ```
- Line 316:14
  ```typescript
  316 | export const DotParams = {
  ```
- Line 334:14
  ```typescript
  334 | export const DotRepresentationProvider = VolumeRepresentationProvider({
  ```

#### `isosurface.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 62:17
  ```typescript
  62 | export function IsosurfaceVisual(materialId: number, volume: Volume, key: number, props: PD.Values<IsosurfaceMeshParams>, webgl?: WebGLContext) {
  ```
- Line 69:10
  ```typescript
  69 | function getLoci(volume: Volume, props: VolumeIsosurfaceProps) {
  ```
- Line 305:14
  ```typescript
  305 |     'solid': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Volume, IsosurfaceMeshParams>) => VolumeRepresentation('Isosurface mesh', ctx, getParams, IsosurfaceVisual, getLoci),
  ```
- Line 306:18
  ```typescript
  306 |     'wireframe': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Volume, IsosurfaceWireframeParams>) => VolumeRepresentation('Isosurface wireframe', ctx, getParams, IsosurfaceWireframeVisual, getLoci),
  ```
- Line 316:17
  ```typescript
  316 | export function getIsosurfaceParams(ctx: ThemeRegistryContext, volume: Volume) {
  ```

**Missing Explicit Types:**

- Line 38:14
  ```typescript
  38 | export const VolumeIsosurfaceTextureParams = {
  ```
- Line 280:14
  ```typescript
  280 | export const IsosurfaceWireframeParams = {
  ```
- Line 309:14
  ```typescript
  309 | export const IsosurfaceParams = {
  ```
- Line 327:14
  ```typescript
  327 | export const IsosurfaceRepresentationProvider = VolumeRepresentationProvider({
  ```

#### `segment.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 65:17
  ```typescript
  65 | export function SegmentVisual(materialId: number, volume: Volume, key: number, props: PD.Values<SegmentMeshParams>, webgl?: WebGLContext) {
  ```
- Line 72:10
  ```typescript
  72 | function getLoci(volume: Volume, props: VolumeSegmentProps) {
  ```
- Line 308:16
  ```typescript
  308 |     'segment': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Volume, SegmentMeshParams>) => VolumeRepresentation('Segment mesh', ctx, getParams, SegmentVisual, getLoci, getSegments),
  ```
- Line 317:17
  ```typescript
  317 | export function getSegmentParams(ctx: ThemeRegistryContext, volume: Volume) {
  ```

**Missing Explicit Types:**

- Line 30:14
  ```typescript
  30 | export const VolumeSegmentParams = {
  ```
- Line 180:14
  ```typescript
  180 | export const SegmentMeshParams = {
  ```
- Line 311:14
  ```typescript
  311 | export const SegmentParams = {
  ```
- Line 339:14
  ```typescript
  339 | export const SegmentRepresentationProvider = VolumeRepresentationProvider({
  ```

#### `direct-volume.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 156:17
  ```typescript
  156 | export function getDirectVolumeParams(ctx: ThemeRegistryContext, volume: Volume) {
  ```

**Missing Explicit Types:**

- Line 150:14
  ```typescript
  150 | export const DirectVolumeParams = {
  ```
- Line 184:14
  ```typescript
  184 | export const DirectVolumeRepresentationProvider = VolumeRepresentationProvider({
  ```

#### `slice.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 58:17
  ```typescript
  58 | export function getSliceParams(ctx: ThemeRegistryContext, volume: Volume) {
  ```

**Missing Explicit Types:**

- Line 31:14
  ```typescript
  31 | export const SliceParams = {
  ```
- Line 545:14
  ```typescript
  545 | export const SliceRepresentationProvider = VolumeRepresentationProvider({
  ```

### Directory: `src/mol-script`

#### `script.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 37:21
  ```typescript
  37 |     export function areEqual(a: Script, b: Script) {
  ```
- Line 67:21
  ```typescript
  67 |     export function getStructureSelection(expr: Expression | ((builder: typeof MolScriptBuilder) => Expression), structure: Structure, options?: QueryContextOptions) {
  ```

### Directory: `src/mol-script/language`

#### `builder.ts` (13 errors)

**Missing Explicit Return Types:**

- Line 17:21
  ```typescript
  17 |     export function atomName(s: string) { return struct.type.atomName([s]); }
  ```
- Line 19:21
  ```typescript
  19 |     export function es(s: string) { return struct.type.elementSymbol([s]); }
  ```
- Line 21:21
  ```typescript
  21 |     export function list(...xs: Expression[]) { return core.type.list(xs); }
  ```
- Line 23:21
  ```typescript
  23 |     export function set(...xs: Expression[]) { return core.type.set(xs); }
  ```
- Line 25:21
  ```typescript
  25 |     export function re(pattern: string, flags?: string) { return core.type.regex([pattern, flags]); }
  ```
- Line 27:21
  ```typescript
  27 |     export function fn(x: Expression) { return core.ctrl.fn([x]); }
  ```
- Line 28:21
  ```typescript
  28 |     export function evaluate(x: Expression) { return core.ctrl.eval([x]); }
  ```
- Line 33:21
  ```typescript
  33 |     export function acp(p: keyof typeof _acp) { return (_acp[p] as MSymbol<any>)(); };
  ```
- Line 36:21
  ```typescript
  36 |     export function atp(p: keyof typeof _atp) { return (_atp[p] as MSymbol<any>)(); };
  ```
- Line 39:21
  ```typescript
  39 |     export function ammp(p: keyof typeof _ammp) { return (_ammp[p] as MSymbol<any>)(); };
  ```
- Line 43:21
  ```typescript
  43 |     export function acpSet(p: keyof typeof _acp) { return _aps([acp(p)]); };
  ```
- Line 45:21
  ```typescript
  45 |     export function atpSet(p: keyof typeof _atp) { return _aps([atp(p)]); };
  ```
- Line 47:21
  ```typescript
  47 |     export function ammpSet(p: keyof typeof _ammp) { return _aps([ammp(p)]); };
  ```

#### `type.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 37:21
  ```typescript
  37 |     export function oneOfValues({ values }: OneOf<any>) { return Object.keys(values).sort(); }
  ```

**Missing Explicit Types:**

- Line 33:18
  ```typescript
  33 |     export const Num = Value<number>('', 'Number');
  ```
- Line 34:18
  ```typescript
  34 |     export const Str = Value<string>('', 'String');
  ```
- Line 35:18
  ```typescript
  35 |     export const Bool = OneOf<boolean>('', 'Bool', Str as any, ['true', 'false']);
  ```

#### `helpers.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 10:17
  ```typescript
  10 | export function symbol<A extends Arguments, T extends Type<S>, S>(args: A, type: T, description?: string) {
  ```

#### `symbol.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 66:17
  ```typescript
  66 | export function MSymbol<A extends Arguments, T extends Type>(name: string, args: A, type: T, description?: string) {
  ```

### Directory: `src/mol-script/language/symbol-table`

#### `structure-query.ts` (25 errors)

**Missing Explicit Return Types:**

- Line 350:10
  ```typescript
  350 | function atomProp(type: Type, description?: string) {
  ```
- Line 354:10
  ```typescript
  354 | function bondProp(type: Type, description?: string) {
  ```

**Missing Explicit Types:**

- Line 14:18
  ```typescript
  14 |     export const ElementSymbol = Type.Value('Structure', 'ElementSymbol');
  ```
- Line 15:18
  ```typescript
  15 |     export const AtomName = Type.Value('Structure', 'AtomName');
  ```
- Line 17:18
  ```typescript
  17 |     export const BondFlag = Type.OneOf('Structure', 'BondFlag', Type.Str, ['covalent', 'metallic', 'ion', 'hydrogen', 'sulfide', 'computed', 'aromatic']);
  ```
- Line 18:18
  ```typescript
  18 |     export const BondFlags = Core.Types.Flags(BondFlag, 'BondFlags');
  ```
- Line 20:18
  ```typescript
  20 |     export const SecondaryStructureFlag = Type.OneOf('Structure', 'SecondaryStructureFlag', Type.Str, ['alpha', 'beta', '3-10', 'pi', 'sheet', 'strand', 'helix', 'turn', 'none']);
  ```
- Line 21:18
  ```typescript
  21 |     export const SecondaryStructureFlags = Core.Types.Flags(SecondaryStructureFlag, 'SecondaryStructureFlag');
  ```
- Line 23:18
  ```typescript
  23 |     export const RingFingerprint = Type.Value('Structure', 'RingFingerprint');
  ```
- Line 24:18
  ```typescript
  24 |     export const EntityType = Type.OneOf('Structure', 'EntityType', Type.Str, ['polymer', 'non-polymer', 'water', 'branched']);
  ```
- Line 25:18
  ```typescript
  25 |     export const EntitySubtype = Type.OneOf('Structure', 'EntitySubtype', Type.Str, ['other', 'polypeptide(D)', 'polypeptide(L)', 'polydeoxyribonucleotide', 'polyribonucleotide', 'polydeoxyribonucleotide/polyribonucleotide hybrid', 'cyclic-pseudo-peptide', 'peptide nucleic acid', 'oligosaccharide']);
  ```
- Line 26:18
  ```typescript
  26 |     export const ObjectPrimitive = Type.OneOf('Structure', 'ObjectPrimitive', Type.Str, ['atomistic', 'sphere', 'gaussian', 'other']);
  ```
- Line 27:18
  ```typescript
  27 |     export const ResidueId = Type.Value('Structure', 'ResidueId');
  ```
- Line 30:18
  ```typescript
  30 |     export const ElementSelection = Type.Value('Structure', 'ElementSelection');
  ```
- Line 31:18
  ```typescript
  31 |     export const ElementReference = Type.Value('Structure', 'ElementReference');
  ```
- Line 33:18
  ```typescript
  33 |     export const ElementSelectionQuery = Core.Types.Fn(ElementSelection, 'ElementSelectionQuery');
  ```
- Line 36:7
  ```typescript
  36 | const type = {
  ```
- Line 78:7
  ```typescript
  78 | const slot = {
  ```
- Line 84:7
  ```typescript
  84 | const generator = {
  ```
- Line 116:7
  ```typescript
  116 | const modifier = {
  ```
- Line 182:7
  ```typescript
  182 | const filter = {
  ```
- Line 222:7
  ```typescript
  222 | const combinator = {
  ```
- Line 232:7
  ```typescript
  232 | const atomSet = {
  ```
- Line 251:7
  ```typescript
  251 | const atomProperty = {
  ```
- Line 339:7
  ```typescript
  339 | const bondProperty = {
  ```

#### `core.ts` (21 errors)

**Missing Explicit Return Types:**

- Line 21:18
  ```typescript
  21 |     export const Set = <T extends Type>(t?: T) => Type.Container<Set<T['@type']>>('Core', 'Set', t || AnyValueVar);
  ```
- Line 22:18
  ```typescript
  22 |     export const List = <T extends Type>(t?: T) => Type.Container<List<T['@type']>>('Core', 'List', t || AnyVar);
  ```
- Line 23:18
  ```typescript
  23 |     export const Fn = <T extends Type>(t?: T, alias?: string) => Type.Container<(env: any) => T['@type']>('Core', 'Fn', t || AnyVar, alias);
  ```
- Line 24:18
  ```typescript
  24 |     export const Flags = <T extends Type>(t: T, alias?: string) => Type.Container<number>('Core', 'Flags', t, alias);
  ```
- Line 29:10
  ```typescript
  29 | function unaryOp<T extends Type>(type: T, description?: string) {
  ```
- Line 33:10
  ```typescript
  33 | function binOp<T extends Type>(type: T, description?: string) {
  ```
- Line 37:10
  ```typescript
  37 | function binRel<A extends Type, T extends Type>(src: A, target: T, description?: string) {
  ```

**Missing Explicit Types:**

- Line 15:18
  ```typescript
  15 |     export const AnyVar = Type.Variable('a', Type.Any);
  ```
- Line 16:18
  ```typescript
  16 |     export const AnyValueVar = Type.Variable('a', Type.Any);
  ```
- Line 17:18
  ```typescript
  17 |     export const ConstrainedVar = Type.Variable('a', Type.Any, true);
  ```
- Line 19:18
  ```typescript
  19 |     export const Regex = Type.Value<RegExp>('Core', 'Regex');
  ```
- Line 26:18
  ```typescript
  26 |     export const BitFlags = Flags(Type.Num, 'BitFlags');
  ```
- Line 49:7
  ```typescript
  49 | const type = {
  ```
- Line 66:7
  ```typescript
  66 | const logic = {
  ```
- Line 73:7
  ```typescript
  73 | const ctrl = {
  ```
- Line 88:7
  ```typescript
  88 | const rel = {
  ```
- Line 103:7
  ```typescript
  103 | const math = {
  ```
- Line 142:7
  ```typescript
  142 | const str = {
  ```
- Line 148:7
  ```typescript
  148 | const list = {
  ```
- Line 154:7
  ```typescript
  154 | const set = {
  ```
- Line 160:7
  ```typescript
  160 | const flags = {
  ```

#### `internal.ts` (1 errors)

**Missing Explicit Types:**

- Line 12:7
  ```typescript
  12 | const generator = {
  ```

### Directory: `src/mol-script/runtime/query`

#### `base.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 42:5
  ```typescript
  42 |     getRuntime(id: string) {
  ```

### Directory: `src/mol-state`

#### `state.ts` (18 errors)

**Missing Explicit Return Types:**

- Line 63:9
  ```typescript
  63 |     get transforms() { return (this._tree as StateTree).transforms; }
  ```
- Line 64:9
  ```typescript
  64 |     get current() { return this.behaviors.currentObject.value.ref; }
  ```
- Line 65:9
  ```typescript
  65 |     get root() { return this.cells.get((this._tree as StateTree).root.ref)!; }
  ```
- Line 67:5
  ```typescript
  67 |     build() { return new StateBuilder.Root(this.tree, this); }
  ```
- Line 72:5
  ```typescript
  72 |     tryGetCellData = <T extends StateObject>(ref: StateTransform.Ref) => {
  ```
- Line 96:9
  ```typescript
  96 |     get latestUndoLabel() {
  ```
- Line 100:9
  ```typescript
  100 |     get canUndo() {
  ```
- Line 106:5
  ```typescript
  106 |     undo() {
  ```
- Line 124:5
  ```typescript
  124 |     setSnapshot(snapshot: State.Snapshot) {
  ```
- Line 155:5
  ```typescript
  155 |     select<C extends StateObjectCell>(selector: StateSelection.Selector<C>) {
  ```
- Line 163:5
  ```typescript
  163 |     selectQ<C extends StateObjectCell>(selector: (q: typeof StateSelection.Generators) => StateSelection.Selector<C>) {
  ```
- Line 186:5
  ```typescript
  186 |     transaction(edits: (ctx: RuntimeContext) => Promise<void> | void, options?: { canUndo?: string | boolean, rethrowErrors?: boolean }) {
  ```
- Line 241:9
  ```typescript
  241 |     get inUpdate() { return this._inUpdate; }
  ```
- Line 400:21
  ```typescript
  400 |     export function create(rootObject: StateObject, params: Params) {
  ```
- Line 415:25
  ```typescript
  415 |         export function isCell(e: ObjectEvent, cell?: StateObjectCell) {
  ```

**Missing Explicit Types:**

- Line 37:14
  ```typescript
  37 |     readonly events = {
  ```
- Line 53:14
  ```typescript
  53 |     readonly behaviors = {
  ```
- Line 58:14
  ```typescript
  58 |     readonly actions = new StateActionManager();
  ```

#### `object.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 27:21
  ```typescript
  27 |     export function factory<T extends Type>() {
  ```
- Line 35:21
  ```typescript
  35 |     export function create<Data, T extends Type>(type: T) {
  ```
- Line 50:21
  ```typescript
  50 |     export function hasTag(o: StateObject, t: string) {
  ```
- Line 108:21
  ```typescript
  108 |     export function resolve(state: State, refOrCellOrSelector: StateTransform.Ref | StateObjectCell | StateObjectSelector) {
  ```
- Line 129:5
  ```typescript
  129 |     update() {
  ```
- Line 166:5
  ```typescript
  166 |     checkValid() {
  ```
- Line 180:9
  ```typescript
  180 |     get isOk() {
  ```

#### `transformer.ts` (5 errors)

**Missing Explicit Return Types:**

- Line 152:21
  ```typescript
  152 |     export function getAll() {
  ```
- Line 168:21
  ```typescript
  168 |     export function create<A extends StateObject, B extends StateObject, P extends {} = {}>(namespace: string, definition: Definition<A, B, P>) {
  ```
- Line 190:21
  ```typescript
  190 |     export function factory(namespace: string) {
  ```
- Line 194:21
  ```typescript
  194 |     export function builderFactory(namespace: string) {
  ```

**Missing Explicit Types:**

- Line 246:18
  ```typescript
  246 |     export const ROOT = create<any, any, {}>('build-in', {
  ```

#### `transform.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 45:21
  ```typescript
  45 |     export function isStateChange(a: State, b?: Partial<State>) {
  ```
- Line 159:21
  ```typescript
  159 |     export function hasTag(t: Transform, tag: string) {
  ```
- Line 164:21
  ```typescript
  164 |     export function hasTags(t: Transform, tags: string | string[]) {
  ```

#### `action.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 70:21
  ```typescript
  70 |     export function fromTransformer<T extends StateTransformer>(transformer: T) {
  ```

### Directory: `src/mol-state/action`

#### `manager.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 26:5
  ```typescript
  26 |     add(actionOrTransformer: StateAction | StateTransformer) {
  ```
- Line 46:5
  ```typescript
  46 |     remove(actionOrTransformer: StateAction | StateTransformer | UUID) {
  ```

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 |     readonly events = {
  ```

### Directory: `src/mol-state/state`

#### `selection.ts` (27 errors)

**Missing Explicit Return Types:**

- Line 18:21
  ```typescript
  18 |     export function select<C extends StateObjectCell>(s: Selector<C>, state: State) {
  ```
- Line 86:25
  ```typescript
  86 |         export function byRef<T extends StateObject.Ctor>(...refs: StateTransform.Ref[]) {
  ```
- Line 98:25
  ```typescript
  98 |         export function byValue<T extends StateObjectCell>(...objects: T[]) { return build(() => (state: State) => objects); }
  ```
- Line 100:25
  ```typescript
  100 |         export function rootsOfType<T extends StateObject.Ctor>(type: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 108:25
  ```typescript
  108 |         export function ofType<T extends StateObject.Ctor>(type: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 116:25
  ```typescript
  116 |         export function ofTransformer<T extends StateTransformer<any, A, any>, A extends StateObject>(t: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 124:25
  ```typescript
  124 |         export function ofTransformerWithError<T extends StateTransformer<any, A, any>, A extends StateObject>(t: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 167:21
  ```typescript
  167 |     export function flatMap(b: Selector, f: (obj: StateObjectCell, state: State) => CellSeq) {
  ```
- Line 181:21
  ```typescript
  181 |     export function mapObject(b: Selector, f: (n: StateObjectCell, state: State) => StateObjectCell | undefined) {
  ```
- Line 194:21
  ```typescript
  194 |     export function unique(b: Selector) {
  ```
- Line 211:21
  ```typescript
  211 |     export function first(b: Selector) {
  ```
- Line 220:21
  ```typescript
  220 |     export function filter(b: Selector, p: (n: StateObjectCell) => boolean) { return flatMap(b, n => p(n) ? [n] : []); }
  ```
- Line 223:21
  ```typescript
  223 |     export function withStatus(b: Selector, s: StateObjectCell.Status) { return filter(b, n => n.status === s); }
  ```
- Line 226:21
  ```typescript
  226 |     export function withTag(b: Selector, tag: string) { return filter(b, n => !!n.transform.tags && n.transform.tags.indexOf(tag) >= 0); }
  ```
- Line 229:21
  ```typescript
  229 |     export function subtree(b: Selector) {
  ```
- Line 238:21
  ```typescript
  238 |     export function children(b: Selector) {
  ```
- Line 247:21
  ```typescript
  247 |     export function ofType(b: Selector, t: StateObject.Ctor) { return filter(b, n => n.obj ? n.obj.type === t.type : false); }
  ```
- Line 250:21
  ```typescript
  250 |     export function ancestor(b: Selector, test: (c: StateObjectCell) => (boolean | void | undefined)) { return unique(mapObject(b, (n, s) => findAncestor(s.tree, s.cells, n.transform.ref, test))); }
  ```
- Line 253:21
  ```typescript
  253 |     export function ancestorOfType(b: Selector, types: StateObject.Ctor[]) { return unique(mapObject(b, (n, s) => findAncestorOfType(s.tree, s.cells, n.transform.ref, types))); }
  ```
- Line 256:21
  ```typescript
  256 |     export function ancestorWithTransformer(b: Selector, transfomers: StateTransformer[]) { return unique(mapObject(b, (n, s) => findAncestorWithTransformer(s.tree, s.cells, n.transform.ref, transfomers))); }
  ```
- Line 259:21
  ```typescript
  259 |     export function withTransformer(b: Selector, t: StateTransformer) { return filter(b, o => o.transform.transformer === t); }
  ```
- Line 262:21
  ```typescript
  262 |     export function root(b: Selector, test: (c: StateObjectCell) => (boolean | void | undefined)) { return unique(mapObject(b, (n, s) => findRoot(s.tree, s.cells, n.transform.ref, test))); }
  ```
- Line 265:21
  ```typescript
  265 |     export function rootOfType(b: Selector, types: StateObject.Ctor | StateObject.Ctor[]) { return unique(mapObject(b, (n, s) => findRootOfType(s.tree, s.cells, n.transform.ref, types))); }
  ```
- Line 268:21
  ```typescript
  268 |     export function parent(b: Selector) { return unique(mapObject(b, (n, s) => s.cells.get(s.tree.transforms.get(n.transform.ref)!.parent))); }
  ```
- Line 287:21
  ```typescript
  287 |     export function findAncestor<T extends StateObject.Ctor>(tree: StateTree, cells: State.Cells, root: StateTransform.Ref, test: (c: StateObjectCell) => (boolean | void | undefined)) {
  ```
- Line 292:21
  ```typescript
  292 |     export function findRoot<T extends StateObject.Ctor>(tree: StateTree, cells: State.Cells, root: StateTransform.Ref, test: (c: StateObjectCell) => (boolean | void | undefined)) {
  ```

**Missing Explicit Types:**

- Line 84:22
  ```typescript
  84 |         export const root = build(() => (state: State) => [state.cells.get(state.tree.root.ref)!]);
  ```

#### `builder.ts` (10 errors)

**Missing Explicit Return Types:**

- Line 111:13
  ```typescript
  111 |         get editInfo() { return this.state.editInfo; }
  ```
- Line 112:13
  ```typescript
  112 |         get currentTree() { return this.state.tree; }
  ```
- Line 126:9
  ```typescript
  126 |         toRoot<A extends StateObject>() { return new To<A>(this.state, this.state.tree.root.ref, this); }
  ```
- Line 127:9
  ```typescript
  127 |         delete(obj: StateObjectRef) {
  ```
- Line 137:9
  ```typescript
  137 |         commit(options?: Partial<State.UpdateOptions>) {
  ```
- Line 146:13
  ```typescript
  146 |         get editInfo() { return this.state.editInfo; }
  ```
- Line 147:13
  ```typescript
  147 |         get selector() { return new StateObjectSelector<A, T>(this.ref, this.state.state); }
  ```
- Line 296:9
  ```typescript
  296 |         tag(tags: string | string[]) {
  ```
- Line 316:9
  ```typescript
  316 |         toRoot<A extends StateObject>() { return this.root.toRoot<A>(); }
  ```
- Line 317:9
  ```typescript
  317 |         delete(ref: StateObjectRef) { return this.root.delete(ref); }
  ```

### Directory: `src/mol-state/tree`

#### `transient.ts` (8 errors)

**Missing Explicit Return Types:**

- Line 63:7
  ```typescript
  63 |   get root() {
  ```
- Line 67:3
  ```typescript
  67 |   asTransient() {
  ```
- Line 146:3
  ```typescript
  146 |   add(transform: StateTransform) {
  ```
- Line 182:3
  ```typescript
  182 |   setParams(ref: StateTransform.Ref, params: any) {
  ```
- Line 204:3
  ```typescript
  204 |   setTags(ref: StateTransform.Ref, tags: string | string[] | undefined) {
  ```
- Line 224:3
  ```typescript
  224 |   setDependsOn(
  ```
- Line 246:3
  ```typescript
  246 |   assignState(ref: StateTransform.Ref, state?: Partial<StateTransform.State>) {
  ```
- Line 314:3
  ```typescript
  314 |   asImmutable() {
  ```

#### `immutable.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 139:21
  ```typescript
  139 |     export function subtreePostOrder(tree: StateTree, root: StateTransform) {
  ```

#### `spine.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 23:13
  ```typescript
  23 |         get current() { return this._current; }
  ```

### Directory: `src/mol-task`

#### `task.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 74:21
  ```typescript
  74 |     export function resolveInContext<T>(object: Task<T> | T, ctx?: RuntimeContext) {
  ```

### Directory: `src/mol-task/execution`

#### `progress.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 36:21
  ```typescript
  36 |     export function format(p: Progress) { return _format(p.root); }
  ```

#### `synchronous.ts` (1 errors)

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const SyncRuntimeContext = new SynchronousRuntimeContext();
  ```

### Directory: `src/mol-task/util`

#### `scheduler.ts` (2 errors)

**Missing Explicit Types:**

- Line 180:7
  ```typescript
  180 | const immediateActions = (function () {
  ```
- Line 198:7
  ```typescript
  198 | const Scheduler = {
  ```

#### `multistep.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 13:10
  ```typescript
  13 | function MultistepTask<P, T>(name: string, steps: string[], f: MultistepFn<P, T>, onAbort?: () => void) {
  ```

### Directory: `src/mol-theme`

#### `theme.ts` (6 errors)

**Missing Explicit Return Types:**

- Line 43:21
  ```typescript
  43 |     export function create(ctx: ThemeRegistryContext, data: ThemeDataContext, props: Props, theme?: Theme) {
  ```
- Line 95:9
  ```typescript
  95 |     get default() { return this._list[0]; }
  ```
- Line 96:9
  ```typescript
  96 |     get list() { return this._list; }
  ```
- Line 150:5
  ```typescript
  150 |     create(name: string, ctx: ThemeDataContext, props = {}) {
  ```
- Line 155:5
  ```typescript
  155 |     getApplicableList(ctx: ThemeDataContext) {
  ```
- Line 159:5
  ```typescript
  159 |     getApplicableTypes(ctx: ThemeDataContext) {
  ```

#### `clipping.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 89:21
  ```typescript
  89 |     export function areEqual(cA: Clipping, cB: Clipping) {
  ```
- Line 99:21
  ```typescript
  99 |     export function isEmpty(clipping: Clipping) {
  ```
- Line 194:21
  ```typescript
  194 |     export function toBundle(clipping: Clipping<StructureElement.Loci>) {
  ```

#### `emissive.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 26:21
  ```typescript
  26 |     export function areEqual(eA: Emissive, eB: Emissive) {
  ```
- Line 36:21
  ```typescript
  36 |     export function isEmpty(emissive: Emissive) {
  ```
- Line 128:21
  ```typescript
  128 |     export function toBundle(emissive: Emissive<StructureElement.Loci>) {
  ```

#### `overpaint.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 27:21
  ```typescript
  27 |     export function areEqual(oA: Overpaint, oB: Overpaint) {
  ```
- Line 38:21
  ```typescript
  38 |     export function isEmpty(overpaint: Overpaint) {
  ```
- Line 133:21
  ```typescript
  133 |     export function toBundle(overpaint: Overpaint<StructureElement.Loci>) {
  ```

#### `substance.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 28:21
  ```typescript
  28 |     export function areEqual(sA: Substance, sB: Substance) {
  ```
- Line 39:21
  ```typescript
  39 |     export function isEmpty(substance: Substance) {
  ```
- Line 141:21
  ```typescript
  141 |     export function toBundle(overpaint: Substance<StructureElement.Loci>) {
  ```

#### `transparency.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 26:21
  ```typescript
  26 |     export function areEqual(tA: Transparency, tB: Transparency) {
  ```
- Line 36:21
  ```typescript
  36 |     export function isEmpty(transparency: Transparency) {
  ```
- Line 127:21
  ```typescript
  127 |     export function toBundle(transparency: Transparency<StructureElement.Loci>) {
  ```

#### `color.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 168:21
  ```typescript
  168 |     export function areEqual(themeA: ColorTheme<any, any>, themeB: ColorTheme<any, any>) {
  ```
- Line 176:21
  ```typescript
  176 |     export function createRegistry() {
  ```

#### `size.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 32:21
  ```typescript
  32 |     export function areEqual(themeA: SizeTheme<any>, themeB: SizeTheme<any>) {
  ```
- Line 40:21
  ```typescript
  40 |     export function createRegistry() {
  ```

### Directory: `src/mol-theme/color`

#### `element-symbol.ts` (2 errors)

**Missing Explicit Types:**

- Line 31:14
  ```typescript
  31 | export const ElementSymbolColors = ColorMap({
  ```
- Line 39:14
  ```typescript
  39 | export const ElementSymbolColorThemeParams = {
  ```

#### `entity-id.ts` (2 errors)

**Missing Explicit Types:**

- Line 22:7
  ```typescript
  22 | const DefaultWaterColor = Color(0xFF0D0D);
  ```
- Line 25:14
  ```typescript
  25 | export const EntityIdColorThemeParams = {
  ```

#### `molecule-type.ts` (2 errors)

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const MoleculeTypeColors = ColorMap({
  ```
- Line 34:14
  ```typescript
  34 | export const MoleculeTypeColorThemeParams = {
  ```

#### `residue-name.ts` (2 errors)

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const ResidueNameColors = ColorMap({
  ```
- Line 69:14
  ```typescript
  69 | export const ResidueNameColorThemeParams = {
  ```

#### `secondary-structure.ts` (2 errors)

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const SecondaryStructureColors = ColorMap({
  ```
- Line 44:14
  ```typescript
  44 | export const SecondaryStructureColorThemeParams = {
  ```

#### `uniform.ts` (2 errors)

**Missing Explicit Types:**

- Line 15:7
  ```typescript
  15 | const DefaultColor = Color(0xCCCCCC);
  ```
- Line 18:14
  ```typescript
  18 | export const UniformColorThemeParams = {
  ```

#### `atom-id.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const AtomIdColorThemeParams = {
  ```

#### `cartoon.ts` (1 errors)

**Missing Explicit Types:**

- Line 35:14
  ```typescript
  35 | export const CartoonColorThemeParams = {
  ```

#### `chain-id.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const ChainIdColorThemeParams = {
  ```

#### `element-index.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const ElementIndexColorThemeParams = {
  ```

#### `entity-source.ts` (1 errors)

**Missing Explicit Types:**

- Line 26:14
  ```typescript
  26 | export const EntitySourceColorThemeParams = {
  ```

#### `external-structure.ts` (1 errors)

**Missing Explicit Types:**

- Line 32:14
  ```typescript
  32 | export const ExternalStructureColorThemeParams = {
  ```

#### `external-volume.ts` (1 errors)

**Missing Explicit Types:**

- Line 23:14
  ```typescript
  23 | export const ExternalVolumeColorThemeParams = {
  ```

#### `formal-charge.ts` (1 errors)

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const FormalChargeColorThemeParams = {
  ```

#### `hydrophobicity.ts` (1 errors)

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const HydrophobicityColorThemeParams = {
  ```

#### `illustrative.ts` (1 errors)

**Missing Explicit Types:**

- Line 28:14
  ```typescript
  28 | export const IllustrativeColorThemeParams = {
  ```

#### `model-index.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const ModelIndexColorThemeParams = {
  ```

#### `occupancy.ts` (1 errors)

**Missing Explicit Types:**

- Line 18:14
  ```typescript
  18 | export const OccupancyColorThemeParams = {
  ```

#### `operator-hkl.ts` (1 errors)

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const OperatorHklColorThemeParams = {
  ```

#### `operator-name.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const OperatorNameColorThemeParams = {
  ```

#### `partial-charge.ts` (1 errors)

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const PartialChargeColorThemeParams = {
  ```

#### `polymer-id.ts` (1 errors)

**Missing Explicit Types:**

- Line 24:14
  ```typescript
  24 | export const PolymerIdColorThemeParams = {
  ```

#### `polymer-index.ts` (1 errors)

**Missing Explicit Types:**

- Line 22:14
  ```typescript
  22 | export const PolymerIndexColorThemeParams = {
  ```

#### `sequence-id.ts` (1 errors)

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const SequenceIdColorThemeParams = {
  ```

#### `structure-index.ts` (1 errors)

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const StructureIndexColorThemeParams = {
  ```

#### `trajectory-index.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const TrajectoryIndexColorThemeParams = {
  ```

#### `uncertainty.ts` (1 errors)

**Missing Explicit Types:**

- Line 19:14
  ```typescript
  19 | export const UncertaintyColorThemeParams = {
  ```

#### `unit-index.ts` (1 errors)

**Missing Explicit Types:**

- Line 22:14
  ```typescript
  22 | export const UnitIndexColorThemeParams = {
  ```

#### `volume-instance.ts` (1 errors)

**Missing Explicit Types:**

- Line 22:14
  ```typescript
  22 | export const VolumeInstanceColorThemeParams = {
  ```

#### `volume-segment.ts` (1 errors)

**Missing Explicit Types:**

- Line 20:14
  ```typescript
  20 | export const VolumeSegmentColorThemeParams = {
  ```

#### `volume-value.ts` (1 errors)

**Missing Explicit Types:**

- Line 21:14
  ```typescript
  21 | export const VolumeValueColorThemeParams = {
  ```

### Directory: `src/mol-theme/size`

#### `physical.ts` (1 errors)

**Missing Explicit Types:**

- Line 17:14
  ```typescript
  17 | export const PhysicalSizeThemeParams = {
  ```

#### `uncertainty.ts` (1 errors)

**Missing Explicit Types:**

- Line 15:14
  ```typescript
  15 | export const UncertaintySizeThemeParams = {
  ```

#### `uniform.ts` (1 errors)

**Missing Explicit Types:**

- Line 13:14
  ```typescript
  13 | export const UniformSizeThemeParams = {
  ```

#### `volume-value.ts` (1 errors)

**Missing Explicit Types:**

- Line 17:14
  ```typescript
  17 | export const VolumeValueSizeThemeParams = {
  ```

### Directory: `src/mol-util`

#### `binding.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 18:10
  ```typescript
  18 | function Binding(triggers: Binding.Trigger[], action = '', description = '') {
  ```
- Line 32:21
  ```typescript
  32 |     export function isEmpty(binding: Binding) {
  ```
- Line 37:21
  ```typescript
  37 |     export function match(binding: Binding, buttons: ButtonsType, modifiers: ModifiersKeys) {
  ```
- Line 41:21
  ```typescript
  41 |     export function matchKey(binding: Binding, code: KeyCode, modifiers: ModifiersKeys, key: string) {
  ```
- Line 45:21
  ```typescript
  45 |     export function formatTriggers(binding: Binding) {
  ```
- Line 49:21
  ```typescript
  49 |     export function format(binding: Binding, name = '') {
  ```
- Line 60:21
  ```typescript
  60 |     export function Trigger(buttons?: ButtonsType, modifiers?: ModifiersKeys) {
  ```
- Line 64:21
  ```typescript
  64 |     export function TriggerKey(code?: KeyCode, modifiers?: ModifiersKeys) {
  ```
- Line 94:25
  ```typescript
  94 |         export function format(trigger: Trigger) {
  ```

#### `index.ts` (9 errors)

**Missing Explicit Return Types:**

- Line 19:17
  ```typescript
  19 | export function round(n: number, d: number) {
  ```
- Line 24:17
  ```typescript
  24 | export function arrayEqual<T>(arr1: T[], arr2: T[]) {
  ```
- Line 37:17
  ```typescript
  37 | export function deepEqual(a: any, b: any) {
  ```
- Line 82:17
  ```typescript
  82 | export function shallowEqual(a: any, b: any) {
  ```
- Line 94:17
  ```typescript
  94 | export function shallowEqualObjects(a: {}, b: {}) {
  ```
- Line 105:17
  ```typescript
  105 | export function shallowEqualArrays(a: any[], b: any[]) {
  ```
- Line 195:17
  ```typescript
  195 | export function formatTime(d: Date) {
  ```
- Line 200:17
  ```typescript
  200 | export function formatProgress(p: Progress) {
  ```
- Line 207:17
  ```typescript
  207 | export function formatBytes(count: number) {
  ```

#### `assets.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 44:21
  ```typescript
  44 |     export function Wrapper<T extends DataType = DataType>(data: DataResponse<T>, asset: Asset, manager: AssetManager) {
  ```
- Line 53:21
  ```typescript
  53 |     export function getUrl(url: string | Url) {
  ```
- Line 57:21
  ```typescript
  57 |     export function getUrlAsset(manager: AssetManager, url: string | Url, body?: string) {
  ```
- Line 72:9
  ```typescript
  72 |     get assets() {
  ```
- Line 99:5
  ```typescript
  99 |     get(asset: Asset) {
  ```
- Line 103:5
  ```typescript
  103 |     delete(asset: Asset) {
  ```
- Line 107:5
  ```typescript
  107 |     has(asset: Asset) {
  ```

#### `mask.ts` (7 errors)

**Missing Explicit Return Types:**

- Line 31:9
  ```typescript
  31 |         has(i: number) { return false; }
  ```
- Line 32:9
  ```typescript
  32 |         forEach<Ctx>(f: (i: number, ctx?: Ctx) => void, ctx: Ctx) { return ctx; }
  ```
- Line 105:21
  ```typescript
  105 |     export function always(size: number) { return new AllMask(size); }
  ```
- Line 112:21
  ```typescript
  112 |     export function singleton(i: number) {
  ```
- Line 145:21
  ```typescript
  145 |     export function hasAny(mask: Mask, xs: number[]) {
  ```
- Line 152:21
  ```typescript
  152 |     export function complement(mask: Mask, against: Mask) {
  ```

**Missing Explicit Types:**

- Line 106:18
  ```typescript
  106 |     export const never = new EmptyMask();
  ```

#### `material.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 19:17
  ```typescript
  19 | export function Material(values?: Partial<Material>) {
  ```
- Line 26:21
  ```typescript
  26 |     export function toArray<T extends NumberArray>(material: Material, array: T, offset: number) {
  ```
- Line 33:21
  ```typescript
  33 |     export function toString({ metalness, roughness, bumpiness }: Material) {
  ```
- Line 37:21
  ```typescript
  37 |     export function getParam(info?: { isExpanded?: boolean, isFlat?: boolean }) {
  ```

#### `param-definition.ts` (4 errors)

**Missing Explicit Return Types:**

- Line 258:21
  ```typescript
  258 |     export function EmptyGroup(info?: Info) {
  ```
- Line 314:21
  ```typescript
  314 |     export function ValueRef<T>(getOptions: ValueRef['getOptions'], resolveRef: ValueRef<T>['resolveRef'], info?: Info & { defaultRef?: string }) {
  ```
- Line 321:21
  ```typescript
  321 |     export function DataRef<T>(info?: Info & { defaultRef?: string }) {
  ```
- Line 376:21
  ```typescript
  376 |     export function getDefaultValues<T extends Params>(params: T) {
  ```

#### `bit-flags.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 12:21
  ```typescript
  12 |     export function has<F>(flags: BitFlags<F>, flag: F) { return ((flags as any) & (flag as any)) !== 0; }
  ```
- Line 14:21
  ```typescript
  14 |     export function hasAll<F>(flags: BitFlags<F>, toCheck: BitFlags<F>) { return !!toCheck && ((flags as any) & (toCheck as any)) === (toCheck as any); }
  ```

#### `browser.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 17:17
  ```typescript
  17 | export function is_iOS() {
  ```

#### `marker-action.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 39:21
  ```typescript
  39 |     export function isReverse(a: MarkerAction, b: MarkerAction) {
  ```

#### `string-builder.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 26:21
  ```typescript
  26 |     export function getString(builder: StringBuilder) {
  ```

#### `string.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 56:17
  ```typescript
  56 | export function stringToWords(str: string) {
  ```

#### `type-helpers.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 25:17
  ```typescript
  25 | export function ObjectKeys<T extends object>(o: T) {
  ```

#### `value-cell.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 15:21
  ```typescript
  15 |     export function set<T>(ref: ValueRef<T>, value: T) { ref.ref = value; return ref; }
  ```

#### `clip.ts` (1 errors)

**Missing Explicit Types:**

- Line 45:18
  ```typescript
  45 |     export const Params = {
  ```

#### `nodejs-shims.ts` (1 errors)

**Missing Explicit Types:**

- Line 17:14
  ```typescript
  17 | export const File_ = getFile();
  ```

### Directory: `src/mol-util/color`

#### `color.ts` (2 errors)

**Missing Explicit Return Types:**

- Line 16:17
  ```typescript
  16 | export function Color(hex: number) { return hex as Color; }
  ```
- Line 227:17
  ```typescript
  227 | export function ColorMap<T extends { [k: string]: number }>(o: T) { return o as unknown as ColorMap<T>; }
  ```

#### `palette.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 23:17
  ```typescript
  23 | export function getPaletteParams(props: Partial<GetPaletteProps> = {}) {
  ```

#### `params.ts` (1 errors)

**Missing Explicit Return Types:**

- Line 11:17
  ```typescript
  11 | export function getColorMapParams<T extends { [k: string]: number }>(map: ColorMap<T>) {
  ```

#### `lists.ts` (1 errors)

**Missing Explicit Types:**

- Line 12:14
  ```typescript
  12 | export const ColorLists = {
  ```

#### `names.ts` (1 errors)

**Missing Explicit Types:**

- Line 10:14
  ```typescript
  10 | export const ColorNames = ColorMap({
  ```

### Directory: `src/mol-util/input`

#### `input-observer.ts` (3 errors)

**Missing Explicit Return Types:**

- Line 81:21
  ```typescript
  81 |     export function areEqual(a: ModifiersKeys, b: ModifiersKeys) {
  ```
- Line 85:21
  ```typescript
  85 |     export function areNone(a: ModifiersKeys) {
  ```
- Line 89:21
  ```typescript
  89 |     export function size(a?: ModifiersKeys) {
  ```

