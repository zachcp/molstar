# Slow Types Analysis Report

**Total Errors:** 1163

## By Category

### exported-function (675 errors)

- `src/mol-canvas3d/camera/util.ts:51` - `equals()`
  ```typescript
  export function equals(a: Viewport, b: Viewport) {
  ```
- `src/mol-data/db/column-helpers.ts:9` - `getArrayBounds()`
  ```typescript
  export function getArrayBounds(rowCount: number, params?: Column.ToArrayParams<any>) {
  ```
- `src/mol-data/db/column-helpers.ts:15` - `createArray()`
  ```typescript
  export function createArray(rowCount: number, params?: Column.ToArrayParams<any>) {
  ```
- `src/mol-data/db/column-helpers.ts:21` - `fillArrayValues()`
  ```typescript
  export function fillArrayValues(value: (row: number) => any, target: any[], start: number) {
  ```
- `src/mol-data/db/column-helpers.ts:26` - `createAndFillArray()`
  ```typescript
  export function createAndFillArray(rowCount: number, value: (row: number) => any, params?: Column.ToArrayParams<any>) {
  ```
- `src/mol-data/db/column.ts:144` - `ofIntArray()`
  ```typescript
  export function ofIntArray(array: ArrayLike<number>) {
  ```
- `src/mol-data/db/column.ts:148` - `ofFloatArray()`
  ```typescript
  export function ofFloatArray(array: ArrayLike<number>) {
  ```
- `src/mol-data/db/column.ts:152` - `ofStringArray()`
  ```typescript
  export function ofStringArray(array: ArrayLike<string>) {
  ```
- `src/mol-data/db/column.ts:156` - `unknown()`
  ```typescript
  export function ofStringAliasArray<T extends string>(array: ArrayLike<T>) {
  ```
- `src/mol-data/db/column.ts:160` - `unknown()`
  ```typescript
  export function ofStringListArray<T extends string>(array: ArrayLike<T[]>, separator = ',') {
  ```
  ... and 665 more

### method (261 errors)

- `src/mol-canvas3d/helper/camera-helper.ts:126` - `Loci()`
  ```typescript
  getLoci(pickingId: PickingId) {
  ```
- `src/mol-canvas3d/helper/camera-helper.ts:155` - `mark()`
  ```typescript
  mark(loci: Loci, action: MarkerAction) {
  ```
- `src/mol-canvas3d/helper/handle-helper.ts:59` - `BoundingSphere()`
  ```typescript
  getBoundingSphere(out: Sphere3D, instanceId: number) {
  ```
- `src/mol-canvas3d/helper/handle-helper.ts:112` - `Loci()`
  ```typescript
  getLoci(pickingId: PickingId) {
  ```
- `src/mol-canvas3d/helper/handle-helper.ts:131` - `mark()`
  ```typescript
  mark(loci: Loci, action: MarkerAction) {
  ```
- `src/mol-canvas3d/passes/background.ts:307` - `isEnabled()`
  ```typescript
  isEnabled(props: PostprocessingProps) {
  ```
- `src/mol-canvas3d/passes/bloom.ts:78` - `ByteCount()`
  ```typescript
  getByteCount() {
  ```
- `src/mol-canvas3d/passes/dof.ts:53` - `ByteCount()`
  ```typescript
  getByteCount() {
  ```
- `src/mol-canvas3d/passes/dpoit.ts:92` - `ByteCount()`
  ```typescript
  getByteCount() {
  ```
- `src/mol-canvas3d/passes/dpoit.ts:104` - `bind()`
  ```typescript
  bind() {
  ```
  ... and 251 more

### getter (136 errors)

- `src/mol-canvas3d/camera/stereo.ts:36` - `viewport()`
  ```typescript
  get viewport() {
  ```
- `src/mol-canvas3d/camera/stereo.ts:40` - `viewOffset()`
  ```typescript
  get viewOffset() {
  ```
- `src/mol-canvas3d/helper/bounding-sphere-helper.ts:117` - `isEnabled()`
  ```typescript
  get isEnabled() {
  ```
- `src/mol-canvas3d/helper/bounding-sphere-helper.ts:123` - `props()`
  ```typescript
  get props() { return this._props as Readonly<DebugHelperProps>; }
  ```
- `src/mol-canvas3d/helper/camera-helper.ts:122` - `isEnabled()`
  ```typescript
  get isEnabled() {
  ```
- `src/mol-canvas3d/helper/handle-helper.ts:90` - `isEnabled()`
  ```typescript
  get isEnabled() {
  ```
- `src/mol-canvas3d/helper/pointer-helper.ts:60` - `isEnabled()`
  ```typescript
  get isEnabled() {
  ```
- `src/mol-canvas3d/passes/dpoit.ts:88` - `supported()`
  ```typescript
  get supported() {
  ```
- `src/mol-canvas3d/passes/draw.ts:87` - `transparency()`
  ```typescript
  get transparency() {
  ```
- `src/mol-canvas3d/passes/illumination.ts:103` - `iteration()`
  ```typescript
  get iteration() { return this._iteration; }
  ```
  ... and 126 more

### function (50 errors)

- `src/mol-canvas3d/camera/util.ts:18` - `Viewport()`
  ```typescript
  function Viewport() {
  ```
- `src/mol-gl/webgl/context.ts:226` - `getShaderPrecisionFormats()`
  ```typescript
  function getShaderPrecisionFormats(
  ```
- `src/mol-gl/webgl/context.ts:244` - `createStats()`
  ```typescript
  function createStats() {
  ```
- `src/mol-math/geometry/primitives/axes3d.ts:11` - `Axes3D()`
  ```typescript
  function Axes3D() {
  ```
- `src/mol-math/geometry/primitives/box3d.ts:16` - `Box3D()`
  ```typescript
  function Box3D() {
  ```
- `src/mol-math/geometry/primitives/frustum3d.ts:18` - `Frustum3D()`
  ```typescript
  function Frustum3D() {
  ```
- `src/mol-math/geometry/primitives/plane3d.ts:17` - `Plane3D()`
  ```typescript
  function Plane3D() {
  ```
- `src/mol-math/geometry/primitives/ray3d.ts:15` - `Ray3D()`
  ```typescript
  function Ray3D() {
  ```
- `src/mol-math/geometry/primitives/sphere3d.ts:22` - `Sphere3D()`
  ```typescript
  function Sphere3D() {
  ```
- `src/mol-math/geometry/spacegroup/cell.ts:16` - `Cell()`
  ```typescript
  function Cell() {
  ```
  ... and 40 more

### async-method (22 errors)

- `src/mol-canvas3d/passes/image.ts:152` - `getImageData()`
  ```typescript
  async getImageData(runtime: RuntimeContext, width: number, height: number, viewport?: Viewport) {
  ```
- `src/mol-plugin-state/builder/data.ts:32` - `readFile()`
  ```typescript
  async readFile(params: StateTransformer.Params<ReadFile>, options?: Partial<StateTransform.Options>) {
  ```
- `src/mol-plugin-state/manager/markdown-extensions.ts:387` - `async()`
  ```typescript
  play: async (src: string, options?: { toggle?: boolean }) => {
  ```
- `src/mol-plugin-state/manager/snapshots.ts:281` - `serialize()`
  ```typescript
  async serialize(options?: { type: 'json' | 'molj' | 'zip' | 'molx', params?: PluginState.SnapshotParams }) {
  ```
- `src/mol-plugin-state/manager/structure/component.ts:64` - `setOptions()`
  ```typescript
  async setOptions(options: StructureComponentManager.Options) {
  ```
- `src/mol-plugin-state/manager/structure/component.ts:357` - `add()`
  ```typescript
  async add(params: StructureComponentManager.AddParams, structures?: ReadonlyArray<StructureRef>) {
  ```
- `src/mol-plugin-state/manager/structure/component.ts:390` - `applyTheme()`
  ```typescript
  async applyTheme(params: StructureComponentManager.ThemeParams, structures?: ReadonlyArray<StructureRef>) {
  ```
- `src/mol-plugin-state/manager/structure/measurement.ts:101` - `addDistance()`
  ```typescript
  async addDistance(a: StructureElement.Loci, b: StructureElement.Loci,
  ```
- `src/mol-plugin-state/manager/structure/measurement.ts:136` - `addAngle()`
  ```typescript
  async addAngle(a: StructureElement.Loci, b: StructureElement.Loci, c: StructureElement.Loci,
  ```
- `src/mol-plugin-state/manager/structure/measurement.ts:173` - `addDihedral()`
  ```typescript
  async addDihedral(a: StructureElement.Loci, b: StructureElement.Loci, c: StructureElement.Loci, d: StructureElement.Loci,
  ```
  ... and 12 more

### static-method (18 errors)

- `src/mol-canvas3d/passes/bloom.ts:40` - `isEnabled()`
  ```typescript
  static isEnabled(props: PostprocessingProps) {
  ```
- `src/mol-canvas3d/passes/dof.ts:39` - `isEnabled()`
  ```typescript
  static isEnabled(props: PostprocessingProps) {
  ```
- `src/mol-canvas3d/passes/dpoit.ts:236` - `isSupported()`
  ```typescript
  static isSupported(webgl: WebGLContext) {
  ```
- `src/mol-canvas3d/passes/illumination.ts:129` - `isSupported()`
  ```typescript
  static isSupported(webgl: WebGLContext) {
  ```
- `src/mol-canvas3d/passes/illumination.ts:133` - `isEnabled()`
  ```typescript
  static isEnabled(webgl: WebGLContext, props: IlluminationProps) {
  ```
- `src/mol-canvas3d/passes/marking.ts:38` - `isEnabled()`
  ```typescript
  static isEnabled(props: MarkingProps) {
  ```
- `src/mol-canvas3d/passes/multi-sample.ts:77` - `isEnabled()`
  ```typescript
  static isEnabled(props: MultiSampleProps) {
  ```
- `src/mol-canvas3d/passes/outline.ts:38` - `isEnabled()`
  ```typescript
  static isEnabled(props: PostprocessingProps) {
  ```
- `src/mol-canvas3d/passes/postprocessing.ts:159` - `isEnabled()`
  ```typescript
  static isEnabled(props: PostprocessingProps) {
  ```
- `src/mol-canvas3d/passes/postprocessing.ts:163` - `isTransparentDepthRequired()`
  ```typescript
  static isTransparentDepthRequired(scene: Scene, props: PostprocessingProps) {
  ```
  ... and 8 more

### setter (1 errors)

- `src/mol-model/structure/structure/element/loci.ts:614` - `toPositionsArray()`
  ```typescript
  export function toPositionsArray(loci: Loci, positions: NumberArray, offset = 0) {
  ```

## By File (Top 30)

### src/mol-math/linear-algebra/3d/vec3.ts (61 errors)

- Line 32: `Vec3()` - exported-function
  ```typescript
  export function Vec3() {
  ```
- Line 55: `hasNaN()` - exported-function
  ```typescript
  export function hasNaN(a: Vec3) {
  ```
- Line 59: `setNaN()` - exported-function
  ```typescript
  export function setNaN(out: Vec3) {
  ```
- Line 70: `toObj()` - exported-function
  ```typescript
  export function toObj(v: Vec3) {
  ```
- Line 74: `fromArray()` - exported-function
  ```typescript
  export function fromArray(v: Vec3, array: ArrayLike<number>, offset: number) {
  ```
- Line 81: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(v: Vec3, out: T, offset: number) {
  ```
- Line 96: `ofArray()` - exported-function
  ```typescript
  export function ofArray(array: ArrayLike<number>) {
  ```
- Line 111: `copy()` - exported-function
  ```typescript
  export function copy(out: Vec3, a: Vec3) {
  ```
- Line 118: `add()` - exported-function
  ```typescript
  export function add(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 125: `sub()` - exported-function
  ```typescript
  export function sub(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 132: `mul()` - exported-function
  ```typescript
  export function mul(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 139: `div()` - exported-function
  ```typescript
  export function div(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 146: `scale()` - exported-function
  ```typescript
  export function scale(out: Vec3, a: Vec3, b: number) {
  ```
- Line 154: `scaleAndAdd()` - exported-function
  ```typescript
  export function scaleAndAdd(out: Vec3, a: Vec3, b: Vec3, scale: number) {
  ```
- Line 162: `scaleAndSub()` - exported-function
  ```typescript
  export function scaleAndSub(out: Vec3, a: Vec3, b: Vec3, scale: number) {
  ```
- Line 169: `addScalar()` - exported-function
  ```typescript
  export function addScalar(out: Vec3, a: Vec3, b: number) {
  ```
- Line 176: `subScalar()` - exported-function
  ```typescript
  export function subScalar(out: Vec3, a: Vec3, b: number) {
  ```
- Line 186: `round()` - exported-function
  ```typescript
  export function round(out: Vec3, a: Vec3) {
  ```
- Line 196: `ceil()` - exported-function
  ```typescript
  export function ceil(out: Vec3, a: Vec3) {
  ```
- Line 206: `floor()` - exported-function
  ```typescript
  export function floor(out: Vec3, a: Vec3) {
  ```
- Line 216: `trunc()` - exported-function
  ```typescript
  export function trunc(out: Vec3, a: Vec3) {
  ```
- Line 226: `abs()` - exported-function
  ```typescript
  export function abs(out: Vec3, a: Vec3) {
  ```
- Line 236: `min()` - exported-function
  ```typescript
  export function min(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 246: `max()` - exported-function
  ```typescript
  export function max(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 256: `clamp()` - exported-function
  ```typescript
  export function clamp(out: Vec3, a: Vec3, min: Vec3, max: Vec3) {
  ```
- Line 263: `distance()` - exported-function
  ```typescript
  export function distance(a: Vec3, b: Vec3) {
  ```
- Line 270: `squaredDistance()` - exported-function
  ```typescript
  export function squaredDistance(a: Vec3, b: Vec3) {
  ```
- Line 277: `magnitude()` - exported-function
  ```typescript
  export function magnitude(a: Vec3) {
  ```
- Line 284: `squaredMagnitude()` - exported-function
  ```typescript
  export function squaredMagnitude(a: Vec3) {
  ```
- Line 291: `setMagnitude()` - exported-function
  ```typescript
  export function setMagnitude(out: Vec3, a: Vec3, l: number) {
  ```
- Line 298: `negate()` - exported-function
  ```typescript
  export function negate(out: Vec3, a: Vec3) {
  ```
- Line 308: `inverse()` - exported-function
  ```typescript
  export function inverse(out: Vec3, a: Vec3) {
  ```
- Line 315: `normalize()` - exported-function
  ```typescript
  export function normalize(out: Vec3, a: Vec3) {
  ```
- Line 329: `dot()` - exported-function
  ```typescript
  export function dot(a: Vec3, b: Vec3) {
  ```
- Line 333: `cross()` - exported-function
  ```typescript
  export function cross(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 346: `lerp()` - exported-function
  ```typescript
  export function lerp(out: Vec3, a: Vec3, b: Vec3, t: number) {
  ```
- Line 357: `slerp()` - exported-function
  ```typescript
  export function slerp(out: Vec3, a: Vec3, b: Vec3, t: number) {
  ```
- Line 368: `hermite()` - exported-function
  ```typescript
  export function hermite(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number) {
  ```
- Line 385: `bezier()` - exported-function
  ```typescript
  export function bezier(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number) {
  ```
- Line 401: `quadraticBezier()` - exported-function
  ```typescript
  export function quadraticBezier(out: Vec3, a: Vec3, b: Vec3, c: Vec3, t: number) {
  ```
- Line 412: `spline()` - exported-function
  ```typescript
  export function spline(out: Vec3, a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number, tension: number) {
  ```
- Line 423: `random()` - exported-function
  ```typescript
  export function random(out: Vec3, scale: number) {
  ```
- Line 437: `transformMat4()` - exported-function
  ```typescript
  export function transformMat4(out: Vec3, a: Vec3, m: Mat4) {
  ```
- Line 446: `transformDirection()` - exported-function
  ```typescript
  export function transformDirection(out: Vec3, a: Vec3, m: Mat4) {
  ```
- Line 457: `transformMat4Offset()` - exported-function
  ```typescript
  export function transformMat4Offset(out: NumberArray, a: NumberArray, m: NumberArray, outO: number, aO: number, oM: number) {
  ```
- Line 471: `transformDirectionOffset()` - exported-function
  ```typescript
  export function transformDirectionOffset(out: NumberArray, a: NumberArray, m: NumberArray, outO: number, aO: number, oM: number) {
  ```
- Line 489: `transformMat3()` - exported-function
  ```typescript
  export function transformMat3(out: Vec3, a: Vec3, m: Mat3) {
  ```
- Line 498: `transformQuat()` - exported-function
  ```typescript
  export function transformQuat(out: Vec3, a: Vec3, q: Quat) {
  ```
- Line 518: `angle()` - exported-function
  ```typescript
  export function angle(a: Vec3, b: Vec3) {
  ```
- Line 565: `exactEquals()` - exported-function
  ```typescript
  export function exactEquals(a: Vec3, b: Vec3) {
  ```
- Line 572: `equals()` - exported-function
  ```typescript
  export function equals(a: Vec3, b: Vec3) {
  ```
- Line 592: `isZero()` - exported-function
  ```typescript
  export function isZero(v: Vec3) {
  ```
- Line 597: `projectPointOnVector()` - exported-function
  ```typescript
  export function projectPointOnVector(out: Vec3, point: Vec3, vector: Vec3, origin: Vec3) {
  ```
- Line 605: `projectPointOnPlane()` - exported-function
  ```typescript
  export function projectPointOnPlane(out: Vec3, point: Vec3, normal: Vec3, origin: Vec3) {
  ```
- Line 611: `projectOnVector()` - exported-function
  ```typescript
  export function projectOnVector(out: Vec3, p: Vec3, vector: Vec3) {
  ```
- Line 617: `projectOnPlane()` - exported-function
  ```typescript
  export function projectOnPlane(out: Vec3, p: Vec3, normal: Vec3) {
  ```
- Line 623: `orthogonalize()` - exported-function
  ```typescript
  export function orthogonalize(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 631: `matchDirection()` - exported-function
  ```typescript
  export function matchDirection(out: Vec3, a: Vec3, b: Vec3) {
  ```
- Line 640: `orthogonalDirection()` - exported-function
  ```typescript
  export function orthogonalDirection(out: Vec3, dir: Vec3) {
  ```
- Line 668: `triangleNormal()` - exported-function
  ```typescript
  export function triangleNormal(out: Vec3, a: Vec3, b: Vec3, c: Vec3) {
  ```
- Line 679: `toString()` - exported-function
  ```typescript
  export function toString(a: Vec3, precision?: number) {
  ```

### src/mol-model/structure/structure/structure.ts (55 errors)

- Line 77: `subsetBuilder()` - method
  ```typescript
  subsetBuilder(isSorted: boolean) {
  ```
- Line 82: `elementCount()` - getter
  ```typescript
  get elementCount() {
  ```
- Line 87: `bondCount()` - getter
  ```typescript
  get bondCount() {
  ```
- Line 94: `hasCustomProperties()` - getter
  ```typescript
  get hasCustomProperties() {
  ```
- Line 98: `customPropertyDescriptors()` - getter
  ```typescript
  get customPropertyDescriptors() {
  ```
- Line 106: `currentPropertyData()` - getter
  ```typescript
  get currentPropertyData() {
  ```
- Line 114: `inheritedPropertyData()` - getter
  ```typescript
  get inheritedPropertyData() {
  ```
- Line 119: `polymerResidueCount()` - getter
  ```typescript
  get polymerResidueCount() {
  ```
- Line 127: `polymerGapCount()` - getter
  ```typescript
  get polymerGapCount() {
  ```
- Line 134: `polymerUnitCount()` - getter
  ```typescript
  get polymerUnitCount() {
  ```
- Line 141: `uniqueElementCount()` - getter
  ```typescript
  get uniqueElementCount() {
  ```
- Line 148: `atomicResidueCount()` - getter
  ```typescript
  get atomicResidueCount() {
  ```
- Line 159: `isCoarseGrained()` - getter
  ```typescript
  get isCoarseGrained() {
  ```
- Line 163: `isEmpty()` - getter
  ```typescript
  get isEmpty() {
  ```
- Line 167: `hashCode()` - getter
  ```typescript
  get hashCode() {
  ```
- Line 173: `transformHash()` - getter
  ```typescript
  get transformHash() {
  ```
- Line 204: `parent()` - getter
  ```typescript
  get parent() {
  ```
- Line 219: `label()` - getter
  ```typescript
  get label() {
  ```
- Line 223: `boundary()` - getter
  ```typescript
  get boundary() {
  ```
- Line 229: `lookup3d()` - getter
  ```typescript
  get lookup3d() {
  ```
- Line 235: `interUnitBonds()` - getter
  ```typescript
  get interUnitBonds() {
  ```
- Line 253: `dynamicBonds()` - getter
  ```typescript
  get dynamicBonds() {
  ```
- Line 257: `interBondsValidUnit()` - getter
  ```typescript
  get interBondsValidUnit() {
  ```
- Line 261: `interBondsValidUnitPair()` - getter
  ```typescript
  get interBondsValidUnitPair() {
  ```
- Line 290: `uniqueResidueNames()` - getter
  ```typescript
  get uniqueResidueNames() {
  ```
- Line 295: `uniqueElementSymbols()` - getter
  ```typescript
  get uniqueElementSymbols() {
  ```
- Line 300: `entityIndices()` - getter
  ```typescript
  get entityIndices() {
  ```
- Line 305: `uniqueAtomicResidueIndices()` - getter
  ```typescript
  get uniqueAtomicResidueIndices() {
  ```
- Line 311: `isAtomic()` - getter
  ```typescript
  get isAtomic() {
  ```
- Line 317: `hasAtomic()` - getter
  ```typescript
  get hasAtomic() {
  ```
- Line 323: `isCoarse()` - getter
  ```typescript
  get isCoarse() {
  ```
- Line 329: `hasCoarse()` - getter
  ```typescript
  get hasCoarse() {
  ```
- Line 341: `serialMapping()` - getter
  ```typescript
  get serialMapping() {
  ```
- Line 345: `intraUnitBondMapping()` - getter
  ```typescript
  get intraUnitBondMapping() {
  ```
- Line 375: `hasElement()` - method
  ```typescript
  hasElement(e: StructureElement.Location) {
  ```
- Line 380: `ModelIndex()` - method
  ```typescript
  getModelIndex(m: Model) {
  ```
- Line 658: `areLociEqual()` - exported-function
  ```typescript
  export function areLociEqual(a: Loci, b: Loci) {
  ```
- Line 662: `isLociEmpty()` - exported-function
  ```typescript
  export function isLociEmpty(loci: Loci) {
  ```
- Line 666: `remapLoci()` - exported-function
  ```typescript
  export function remapLoci(loci: Loci, structure: Structure) {
  ```
- Line 848: `transform()` - exported-function
  ```typescript
  export function transform(s: Structure, transform: Mat4) {
  ```
- Line 864: `instances()` - exported-function
  ```typescript
  export function instances(s: Structure, transforms: Mat4[]) {
  ```
- Line 948: `isEmpty()` - getter
  ```typescript
  get isEmpty() {
  ```
- Line 957: `Builder()` - exported-function
  ```typescript
  export function Builder(props: Props = {}) {
  ```
- Line 961: `hashCode()` - exported-function
  ```typescript
  export function hashCode(s: Structure) {
  ```
- Line 966: `conformationHash()` - exported-function
  ```typescript
  export function conformationHash(s: Structure) {
  ```
- Line 971: `areUnitIdsEqual()` - exported-function
  ```typescript
  export function areUnitIdsEqual(a: Structure, b: Structure) {
  ```
- Line 985: `areUnitIdsAndIndicesEqual()` - exported-function
  ```typescript
  export function areUnitIdsAndIndicesEqual(a: Structure, b: Structure) {
  ```
- Line 995: `areHierarchiesEqual()` - exported-function
  ```typescript
  export function areHierarchiesEqual(a: Structure, b: Structure) {
  ```
- Line 1007: `areEquivalent()` - exported-function
  ```typescript
  export function areEquivalent(a: Structure, b: Structure) {
  ```
- Line 1015: `areRootsEquivalent()` - exported-function
  ```typescript
  export function areRootsEquivalent(a: Structure, b: Structure) {
  ```
- Line 1020: `areRootsEqual()` - exported-function
  ```typescript
  export function areRootsEqual(a: Structure, b: Structure) {
  ```
- Line 1084: `minDistanceToPoint()` - exported-function
  ```typescript
  export function minDistanceToPoint(s: Structure, point: Vec3, radius: number) {
  ```
- Line 1096: `distance()` - exported-function
  ```typescript
  export function distance(a: Structure, b: Structure) {
  ```
- Line 1114: `elementDescription()` - exported-function
  ```typescript
  export function elementDescription(s: Structure) {
  ```
- Line 1118: `validUnitPair()` - exported-function
  ```typescript
  export function validUnitPair(s: Structure, a: Unit, b: Unit) {
  ```

### src/mol-math/linear-algebra/3d/mat4.ts (47 errors)

- Line 31: `Mat4()` - function
  ```typescript
  function Mat4() {
  ```
- Line 109: `isIdentity()` - exported-function
  ```typescript
  export function isIdentity(m: Mat4, eps?: number) {
  ```
- Line 113: `hasNaN()` - exported-function
  ```typescript
  export function hasNaN(m: Mat4) {
  ```
- Line 118: `areEqual()` - exported-function
  ```typescript
  export function areEqual(a: Mat4, b: Mat4, eps: number) {
  ```
- Line 129: `getValue()` - exported-function
  ```typescript
  export function getValue(a: Mat4, i: number, j: number) {
  ```
- Line 133: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(a: Mat4, out: T, offset: number) {
  ```
- Line 153: `fromArray()` - exported-function
  ```typescript
  export function fromArray(a: Mat4, array: NumberArray, offset: number) {
  ```
- Line 173: `fromBasis()` - exported-function
  ```typescript
  export function fromBasis(a: Mat4, x: Vec3, y: Vec3, z: Vec3) {
  ```
- Line 188: `copy()` - exported-function
  ```typescript
  export function copy(out: Mat4, a: Mat4) {
  ```
- Line 208: `clone()` - exported-function
  ```typescript
  export function clone(a: Mat4) {
  ```
- Line 215: `getTranslation()` - exported-function
  ```typescript
  export function getTranslation(out: Vec3, mat: Mat4) {
  ```
- Line 225: `getScaling()` - exported-function
  ```typescript
  export function getScaling(out: Vec3, mat: Mat4) {
  ```
- Line 244: `getRotation()` - exported-function
  ```typescript
  export function getRotation(out: Quat, mat: Mat4) {
  ```
- Line 278: `extractRotation()` - exported-function
  ```typescript
  export function extractRotation(out: Mat4, mat: Mat4) {
  ```
- Line 303: `transpose()` - exported-function
  ```typescript
  export function transpose(out: Mat4, a: Mat4) {
  ```
- Line 342: `tryInvert()` - exported-function
  ```typescript
  export function tryInvert(out: Mat4, a: Mat4) {
  ```
- Line 389: `invert()` - exported-function
  ```typescript
  export function invert(out: Mat4, a: Mat4) {
  ```
- Line 396: `mul()` - exported-function
  ```typescript
  export function mul(out: Mat4, a: Mat4, b: Mat4) {
  ```
- Line 432: `mulOffset()` - exported-function
  ```typescript
  export function mulOffset(out: NumberArray, a: NumberArray, b: NumberArray, oOut: number, oA: number, oB: number) {
  ```
- Line 465: `mul3()` - exported-function
  ```typescript
  export function mul3(out: Mat4, a: Mat4, b: Mat4, c: Mat4) {
  ```
- Line 470: `translate()` - exported-function
  ```typescript
  export function translate(out: Mat4, a: Mat4, v: Vec3) {
  ```
- Line 499: `fromTranslation()` - exported-function
  ```typescript
  export function fromTranslation(out: Mat4, v: Vec3) {
  ```
- Line 519: `setTranslation()` - exported-function
  ```typescript
  export function setTranslation(out: Mat4, v: Vec3) {
  ```
- Line 531: `setAxes()` - exported-function
  ```typescript
  export function setAxes(out: Mat4, view: Vec3, right: Vec3, up: Vec3) {
  ```
- Line 544: `rotate()` - exported-function
  ```typescript
  export function rotate(out: Mat4, a: Mat4, rad: number, axis: Vec3) {
  ```
- Line 593: `fromRotation()` - exported-function
  ```typescript
  export function fromRotation(out: Mat4, rad: number, axis: Vec3) {
  ```
- Line 628: `scale()` - exported-function
  ```typescript
  export function scale(out: Mat4, a: Mat4, v: Vec3) {
  ```
- Line 650: `scaleUniformly()` - exported-function
  ```typescript
  export function scaleUniformly(out: Mat4, a: Mat4, scale: number) {
  ```
- Line 670: `fromScaling()` - exported-function
  ```typescript
  export function fromScaling(out: Mat4, v: Vec3) {
  ```
- Line 690: `fromUniformScaling()` - exported-function
  ```typescript
  export function fromUniformScaling(out: Mat4, scale: number) {
  ```
- Line 715: `fromPlane()` - exported-function
  ```typescript
  export function fromPlane(out: Mat4, normal: Vec3, point: Vec3) {
  ```
- Line 737: `fromMat3()` - exported-function
  ```typescript
  export function fromMat3(out: Mat4, a: Mat3) {
  ```
- Line 750: `compose()` - exported-function
  ```typescript
  export function compose(out: Mat4, position: Vec3, quaternion: Quat, scale: Vec3) {
  ```
- Line 784: `decompose()` - exported-function
  ```typescript
  export function decompose(m: Mat4, position: Vec3, quaternion: Quat, scale: Vec3) {
  ```
- Line 834: `makeTable()` - exported-function
  ```typescript
  export function makeTable(m: Mat4) {
  ```
- Line 846: `determinant()` - exported-function
  ```typescript
  export function determinant(a: Mat4) {
  ```
- Line 876: `isRotationAndTranslation()` - exported-function
  ```typescript
  export function isRotationAndTranslation(a: Mat4, eps?: number) {
  ```
- Line 905: `isTranslationAndUniformScaling()` - exported-function
  ```typescript
  export function isTranslationAndUniformScaling(a: Mat4, eps?: number) {
  ```
- Line 929: `fromQuat()` - exported-function
  ```typescript
  export function fromQuat(out: Mat4, q: Quat) {
  ```
- Line 968: `fromEuler()` - exported-function
  ```typescript
  export function fromEuler(out: Mat4, euler: Euler, order: Euler.Order) {
  ```
- Line 1059: `perspective()` - exported-function
  ```typescript
  export function perspective(out: Mat4, left: number, right: number, top: number, bottom: number, near: number, far: number) {
  ```
- Line 1090: `ortho()` - exported-function
  ```typescript
  export function ortho(out: Mat4, left: number, right: number, top: number, bottom: number, near: number, far: number) {
  ```
- Line 1121: `lookAt()` - exported-function
  ```typescript
  export function lookAt(out: Mat4, eye: Vec3, center: Vec3, up: Vec3) {
  ```
- Line 1203: `targetTo()` - exported-function
  ```typescript
  export function targetTo(out: Mat4, eye: Vec3, target: Vec3, up: Vec3) {
  ```
- Line 1257: `fromPermutation()` - exported-function
  ```typescript
  export function fromPermutation(out: Mat4, perm: number[]) {
  ```
- Line 1266: `getMaxScaleOnAxis()` - exported-function
  ```typescript
  export function getMaxScaleOnAxis(m: Mat4) {
  ```
- Line 1273: `extractBasis()` - exported-function
  ```typescript
  export function extractBasis(m: Mat4) {
  ```

### src/mol-math/linear-algebra/3d/quat.ts (33 errors)

- Line 36: `Quat()` - function
  ```typescript
  function Quat() {
  ```
- Line 61: `hasNaN()` - exported-function
  ```typescript
  export function hasNaN(q: Quat) {
  ```
- Line 65: `create()` - exported-function
  ```typescript
  export function create(x: number, y: number, z: number, w: number) {
  ```
- Line 74: `setAxisAngle()` - exported-function
  ```typescript
  export function setAxisAngle(out: Quat, axis: Vec3, rad: number) {
  ```
- Line 94: `getAxisAngle()` - exported-function
  ```typescript
  export function getAxisAngle(out_axis: Vec3, q: Quat) {
  ```
- Line 110: `multiply()` - exported-function
  ```typescript
  export function multiply(out: Quat, a: Quat, b: Quat) {
  ```
- Line 121: `rotateX()` - exported-function
  ```typescript
  export function rotateX(out: Quat, a: Quat, rad: number) {
  ```
- Line 134: `rotateY()` - exported-function
  ```typescript
  export function rotateY(out: Quat, a: Quat, rad: number) {
  ```
- Line 147: `rotateZ()` - exported-function
  ```typescript
  export function rotateZ(out: Quat, a: Quat, rad: number) {
  ```
- Line 165: `calculateW()` - exported-function
  ```typescript
  export function calculateW(out: Quat, a: Quat) {
  ```
- Line 178: `slerp()` - exported-function
  ```typescript
  export function slerp(out: Quat, a: Quat, b: Quat, t: number) {
  ```
- Line 218: `invert()` - exported-function
  ```typescript
  export function invert(out: Quat, a: Quat) {
  ```
- Line 236: `conjugate()` - exported-function
  ```typescript
  export function conjugate(out: Quat, a: Quat) {
  ```
- Line 244: `dot()` - exported-function
  ```typescript
  export function dot(a: Quat, b: Quat) {
  ```
- Line 254: `fromMat3()` - exported-function
  ```typescript
  export function fromMat3(out: Quat, m: Mat3) {
  ```
- Line 288: `fromMat4()` - exported-function
  ```typescript
  export function fromMat4(out: Quat, m: Mat4) {
  ```
- Line 293: `fromEuler()` - exported-function
  ```typescript
  export function fromEuler(out: Quat, euler: Euler, order: Euler.Order) {
  ```
- Line 352: `fromUnitVec3()` - exported-function
  ```typescript
  export function fromUnitVec3(out: Quat, a: Vec3, b: Vec3) {
  ```
- Line 379: `fromBasis()` - exported-function
  ```typescript
  export function fromBasis(out: Quat, x: Vec3, y: Vec3, z: Vec3) {
  ```
- Line 384: `clone()` - exported-function
  ```typescript
  export function clone(a: Quat) {
  ```
- Line 397: `toObj()` - exported-function
  ```typescript
  export function toObj(a: Quat) {
  ```
- Line 401: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(a: Quat, out: T, offset: number) {
  ```
- Line 409: `fromArray()` - exported-function
  ```typescript
  export function fromArray(a: Quat, array: NumberArray, offset: number) {
  ```
- Line 417: `copy()` - exported-function
  ```typescript
  export function copy(out: Quat, a: Quat) {
  ```
- Line 425: `set()` - exported-function
  ```typescript
  export function set(out: Quat, x: number, y: number, z: number, w: number) {
  ```
- Line 436: `exactEquals()` - exported-function
  ```typescript
  export function exactEquals(a: Quat, b: Quat) {
  ```
- Line 443: `equals()` - exported-function
  ```typescript
  export function equals(a: Quat, b: Quat) {
  ```
- Line 452: `add()` - exported-function
  ```typescript
  export function add(out: Quat, a: Quat, b: Quat) {
  ```
- Line 474: `normalize()` - exported-function
  ```typescript
  export function normalize(out: Quat, a: Quat) {
  ```
- Line 499: `rotationTo()` - exported-function
  ```typescript
  export function rotationTo(out: Quat, a: Vec3, b: Vec3) {
  ```
- Line 529: `sqlerp()` - exported-function
  ```typescript
  export function sqlerp(out: Quat, a: Quat, b: Quat, c: Quat, d: Quat, t: number) {
  ```
- Line 542: `setAxes()` - exported-function
  ```typescript
  export function setAxes(out: Quat, view: Vec3, right: Vec3, up: Vec3) {
  ```
- Line 558: `toString()` - exported-function
  ```typescript
  export function toString(a: Quat, precision?: number) {
  ```

### src/mol-model/structure/structure/unit.ts (31 errors)

- Line 83: `SymmetryGroup()` - exported-function
  ```typescript
  export function SymmetryGroup(units: Unit[]) {
  ```
- Line 102: `areInvariantElementsEqual()` - exported-function
  ```typescript
  export function areInvariantElementsEqual(a: SymmetryGroup, b: SymmetryGroup) {
  ```
- Line 119: `conformationId()` - exported-function
  ```typescript
  export function conformationId(unit: Unit) {
  ```
- Line 123: `hashUnit()` - exported-function
  ```typescript
  export function hashUnit(u: Unit) {
  ```
- Line 225: `transientCache()` - getter
  ```typescript
  get transientCache() {
  ```
- Line 248: `remapModel()` - method
  ```typescript
  remapModel(model: Model, dynamicBonds: boolean, props?: AtomicProperties) {
  ```
- Line 278: `boundary()` - getter
  ```typescript
  get boundary() {
  ```
- Line 287: `lookup3d()` - getter
  ```typescript
  get lookup3d() {
  ```
- Line 294: `principalAxes()` - getter
  ```typescript
  get principalAxes() {
  ```
- Line 300: `bonds()` - getter
  ```typescript
  get bonds() {
  ```
- Line 315: `rings()` - getter
  ```typescript
  get rings() {
  ```
- Line 321: `resonance()` - getter
  ```typescript
  get resonance() {
  ```
- Line 327: `polymerElements()` - getter
  ```typescript
  get polymerElements() {
  ```
- Line 333: `gapElements()` - getter
  ```typescript
  get gapElements() {
  ```
- Line 339: `nucleotideElements()` - getter
  ```typescript
  get nucleotideElements() {
  ```
- Line 345: `proteinElements()` - getter
  ```typescript
  get proteinElements() {
  ```
- Line 365: `ResidueIndex()` - method
  ```typescript
  getResidueIndex(elementIndex: StructureElement.UnitIndex) {
  ```
- Line 415: `transientCache()` - getter
  ```typescript
  get transientCache() {
  ```
- Line 457: `boundary()` - getter
  ```typescript
  get boundary() {
  ```
- Line 467: `lookup3d()` - getter
  ```typescript
  get lookup3d() {
  ```
- Line 475: `principalAxes()` - getter
  ```typescript
  get principalAxes() {
  ```
- Line 481: `polymerElements()` - getter
  ```typescript
  get polymerElements() {
  ```
- Line 487: `gapElements()` - getter
  ```typescript
  get gapElements() {
  ```
- Line 530: `areSameChainOperatorGroup()` - exported-function
  ```typescript
  export function areSameChainOperatorGroup(a: Unit, b: Unit) {
  ```
- Line 534: `areOperatorsEqual()` - exported-function
  ```typescript
  export function areOperatorsEqual(a: Unit, b: Unit) {
  ```
- Line 538: `areConformationsEqual()` - exported-function
  ```typescript
  export function areConformationsEqual(a: Unit, b: Unit) {
  ```
- Line 564: `isSameConformation()` - exported-function
  ```typescript
  export function isSameConformation(u: Unit, model: Model) {
  ```
- Line 580: `getModelConformationOfKind()` - exported-function
  ```typescript
  export function getModelConformationOfKind(kind: Unit.Kind, model: Model) {
  ```
- Line 586: `getConformation()` - exported-function
  ```typescript
  export function getConformation(u: Unit) {
  ```
- Line 590: `getModelHierarchyOfKind()` - exported-function
  ```typescript
  export function getModelHierarchyOfKind(kind: Unit.Kind, model: Model) {
  ```
- Line 596: `getHierarchy()` - exported-function
  ```typescript
  export function getHierarchy(u: Unit) {
  ```

### src/mol-math/linear-algebra/3d/mat3.ts (28 errors)

- Line 29: `Mat3()` - function
  ```typescript
  function Mat3() {
  ```
- Line 68: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(a: Mat3, out: T, offset: number) {
  ```
- Line 81: `fromArray()` - exported-function
  ```typescript
  export function fromArray(a: Mat3, array: NumberArray, offset: number) {
  ```
- Line 94: `fromColumns()` - exported-function
  ```typescript
  export function fromColumns(out: Mat3, left: Vec3, middle: Vec3, right: Vec3) {
  ```
- Line 110: `fromMat4()` - exported-function
  ```typescript
  export function fromMat4(out: Mat3, a: Mat4) {
  ```
- Line 124: `fromEuler()` - exported-function
  ```typescript
  export function fromEuler(out: Mat3, euler: Euler, order: Euler.Order) {
  ```
- Line 129: `fromRotation()` - exported-function
  ```typescript
  export function fromRotation(out: Mat3, rad: number, axis: Vec3) {
  ```
- Line 149: `isIdentity()` - exported-function
  ```typescript
  export function isIdentity(m: Mat3, eps?: number) {
  ```
- Line 153: `hasNaN()` - exported-function
  ```typescript
  export function hasNaN(m: Mat3) {
  ```
- Line 161: `clone()` - exported-function
  ```typescript
  export function clone(a: Mat3) {
  ```
- Line 165: `areEqual()` - exported-function
  ```typescript
  export function areEqual(a: Mat3, b: Mat3, eps: number) {
  ```
- Line 176: `getValue()` - exported-function
  ```typescript
  export function getValue(a: Mat3, i: number, j: number) {
  ```
- Line 183: `copy()` - exported-function
  ```typescript
  export function copy(out: Mat3, a: Mat3) {
  ```
- Line 199: `transpose()` - exported-function
  ```typescript
  export function transpose(out: Mat3, a: Mat3) {
  ```
- Line 256: `symmtricFromUpper()` - exported-function
  ```typescript
  export function symmtricFromUpper(out: Mat3, a: Mat3) {
  ```
- Line 275: `symmtricFromLower()` - exported-function
  ```typescript
  export function symmtricFromLower(out: Mat3, a: Mat3) {
  ```
- Line 294: `determinant()` - exported-function
  ```typescript
  export function determinant(a: Mat3) {
  ```
- Line 307: `trace()` - exported-function
  ```typescript
  export function trace(a: Mat3) {
  ```
- Line 311: `sub()` - exported-function
  ```typescript
  export function sub(out: Mat3, a: Mat3, b: Mat3) {
  ```
- Line 324: `add()` - exported-function
  ```typescript
  export function add(out: Mat3, a: Mat3, b: Mat3) {
  ```
- Line 337: `mul()` - exported-function
  ```typescript
  export function mul(out: Mat3, a: Mat3, b: Mat3) {
  ```
- Line 360: `subScalar()` - exported-function
  ```typescript
  export function subScalar(out: Mat3, a: Mat3, s: number) {
  ```
- Line 373: `addScalar()` - exported-function
  ```typescript
  export function addScalar(out: Mat3, a: Mat3, s: number) {
  ```
- Line 386: `mulScalar()` - exported-function
  ```typescript
  export function mulScalar(out: Mat3, a: Mat3, s: number) {
  ```
- Line 406: `symmetricEigenvalues()` - exported-function
  ```typescript
  export function symmetricEigenvalues(out: Vec3, a: Mat3) {
  ```
- Line 444: `eigenvector()` - exported-function
  ```typescript
  export function eigenvector(out: Vec3, a: Mat3, e: number) {
  ```
- Line 474: `directionTransform()` - exported-function
  ```typescript
  export function directionTransform(out: Mat3, t: Mat4) {
  ```
- Line 485: `innerProduct()` - exported-function
  ```typescript
  export function innerProduct(a: Mat3, b: Mat3) {
  ```

### src/mol-math/linear-algebra/3d/vec4.ts (26 errors)

- Line 27: `Vec4()` - function
  ```typescript
  function Vec4() {
  ```
- Line 39: `clone()` - exported-function
  ```typescript
  export function clone(a: Vec4) {
  ```
- Line 48: `create()` - exported-function
  ```typescript
  export function create(x: number, y: number, z: number, w: number) {
  ```
- Line 57: `fromSphere()` - exported-function
  ```typescript
  export function fromSphere(out: Vec4, sphere: Sphere3D) {
  ```
- Line 65: `ofSphere()` - exported-function
  ```typescript
  export function ofSphere(sphere: Sphere3D) {
  ```
- Line 69: `hasNaN()` - exported-function
  ```typescript
  export function hasNaN(a: Vec4) {
  ```
- Line 73: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(a: Vec4, out: T, offset: number) {
  ```
- Line 81: `fromArray()` - exported-function
  ```typescript
  export function fromArray(a: Vec4, array: NumberArray, offset: number) {
  ```
- Line 95: `fromVec3Array()` - exported-function
  ```typescript
  export function fromVec3Array(a: Vec4, array: NumberArray, offset: number) {
  ```
- Line 103: `copy()` - exported-function
  ```typescript
  export function copy(out: Vec4, a: Vec4) {
  ```
- Line 111: `set()` - exported-function
  ```typescript
  export function set(out: Vec4, x: number, y: number, z: number, w: number) {
  ```
- Line 119: `add()` - exported-function
  ```typescript
  export function add(out: Vec4, a: Vec4, b: Vec4) {
  ```
- Line 127: `distance()` - exported-function
  ```typescript
  export function distance(a: Vec4, b: Vec4) {
  ```
- Line 135: `scale()` - exported-function
  ```typescript
  export function scale(out: Vec4, a: Vec4, b: number) {
  ```
- Line 146: `round()` - exported-function
  ```typescript
  export function round(out: Vec4, a: Vec4) {
  ```
- Line 157: `ceil()` - exported-function
  ```typescript
  export function ceil(out: Vec4, a: Vec4) {
  ```
- Line 168: `floor()` - exported-function
  ```typescript
  export function floor(out: Vec4, a: Vec4) {
  ```
- Line 176: `squaredDistance()` - exported-function
  ```typescript
  export function squaredDistance(a: Vec4, b: Vec4) {
  ```
- Line 184: `norm()` - exported-function
  ```typescript
  export function norm(a: Vec4) {
  ```
- Line 192: `squaredNorm()` - exported-function
  ```typescript
  export function squaredNorm(a: Vec4) {
  ```
- Line 200: `transformMat4()` - exported-function
  ```typescript
  export function transformMat4(out: Vec4, a: Vec4, m: Mat4) {
  ```
- Line 209: `dot()` - exported-function
  ```typescript
  export function dot(a: Vec4, b: Vec4) {
  ```
- Line 216: `inverse()` - exported-function
  ```typescript
  export function inverse(out: Vec4, a: Vec4) {
  ```
- Line 227: `exactEquals()` - exported-function
  ```typescript
  export function exactEquals(a: Vec4, b: Vec4) {
  ```
- Line 234: `equals()` - exported-function
  ```typescript
  export function equals(a: Vec4, b: Vec4) {
  ```
- Line 243: `toString()` - exported-function
  ```typescript
  export function toString(a: Vec4, precision?: number) {
  ```

### src/mol-state/state/selection.ts (26 errors)

- Line 18: `unknown()` - exported-function
  ```typescript
  export function select<C extends StateObjectCell>(s: Selector<C>, state: State) {
  ```
- Line 86: `unknown()` - exported-function
  ```typescript
  export function byRef<T extends StateObject.Ctor>(...refs: StateTransform.Ref[]) {
  ```
- Line 98: `build()` - exported-function
  ```typescript
  export function byValue<T extends StateObjectCell>(...objects: T[]) { return build(() => (state: State) => objects); }
  ```
- Line 100: `unknown()` - exported-function
  ```typescript
  export function rootsOfType<T extends StateObject.Ctor>(type: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 108: `unknown()` - exported-function
  ```typescript
  export function ofType<T extends StateObject.Ctor>(type: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 116: `unknown()` - exported-function
  ```typescript
  export function ofTransformer<T extends StateTransformer<any, A, any>, A extends StateObject>(t: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 124: `unknown()` - exported-function
  ```typescript
  export function ofTransformerWithError<T extends StateTransformer<any, A, any>, A extends StateObject>(t: T, root: StateTransform.Ref = StateTransform.RootRef) {
  ```
- Line 167: `flatMap()` - exported-function
  ```typescript
  export function flatMap(b: Selector, f: (obj: StateObjectCell, state: State) => CellSeq) {
  ```
- Line 181: `mapObject()` - exported-function
  ```typescript
  export function mapObject(b: Selector, f: (n: StateObjectCell, state: State) => StateObjectCell | undefined) {
  ```
- Line 194: `unique()` - exported-function
  ```typescript
  export function unique(b: Selector) {
  ```
- Line 211: `first()` - exported-function
  ```typescript
  export function first(b: Selector) {
  ```
- Line 220: `filter()` - exported-function
  ```typescript
  export function filter(b: Selector, p: (n: StateObjectCell) => boolean) { return flatMap(b, n => p(n) ? [n] : []); }
  ```
- Line 223: `withStatus()` - exported-function
  ```typescript
  export function withStatus(b: Selector, s: StateObjectCell.Status) { return filter(b, n => n.status === s); }
  ```
- Line 226: `withTag()` - exported-function
  ```typescript
  export function withTag(b: Selector, tag: string) { return filter(b, n => !!n.transform.tags && n.transform.tags.indexOf(tag) >= 0); }
  ```
- Line 229: `subtree()` - exported-function
  ```typescript
  export function subtree(b: Selector) {
  ```
- Line 238: `children()` - exported-function
  ```typescript
  export function children(b: Selector) {
  ```
- Line 247: `ofType()` - exported-function
  ```typescript
  export function ofType(b: Selector, t: StateObject.Ctor) { return filter(b, n => n.obj ? n.obj.type === t.type : false); }
  ```
- Line 250: `ancestor()` - exported-function
  ```typescript
  export function ancestor(b: Selector, test: (c: StateObjectCell) => (boolean | void | undefined)) { return unique(mapObject(b, (n, s) => findAncestor(s.tree, s.cells, n.transform.ref, test))); }
  ```
- Line 253: `ancestorOfType()` - exported-function
  ```typescript
  export function ancestorOfType(b: Selector, types: StateObject.Ctor[]) { return unique(mapObject(b, (n, s) => findAncestorOfType(s.tree, s.cells, n.transform.ref, types))); }
  ```
- Line 256: `ancestorWithTransformer()` - exported-function
  ```typescript
  export function ancestorWithTransformer(b: Selector, transfomers: StateTransformer[]) { return unique(mapObject(b, (n, s) => findAncestorWithTransformer(s.tree, s.cells, n.transform.ref, transfomers))); }
  ```
- Line 259: `withTransformer()` - exported-function
  ```typescript
  export function withTransformer(b: Selector, t: StateTransformer) { return filter(b, o => o.transform.transformer === t); }
  ```
- Line 262: `root()` - exported-function
  ```typescript
  export function root(b: Selector, test: (c: StateObjectCell) => (boolean | void | undefined)) { return unique(mapObject(b, (n, s) => findRoot(s.tree, s.cells, n.transform.ref, test))); }
  ```
- Line 265: `rootOfType()` - exported-function
  ```typescript
  export function rootOfType(b: Selector, types: StateObject.Ctor | StateObject.Ctor[]) { return unique(mapObject(b, (n, s) => findRootOfType(s.tree, s.cells, n.transform.ref, types))); }
  ```
- Line 268: `parent()` - exported-function
  ```typescript
  export function parent(b: Selector) { return unique(mapObject(b, (n, s) => s.cells.get(s.tree.transforms.get(n.transform.ref)!.parent))); }
  ```
- Line 287: `unknown()` - exported-function
  ```typescript
  export function findAncestor<T extends StateObject.Ctor>(tree: StateTree, cells: State.Cells, root: StateTransform.Ref, test: (c: StateObjectCell) => (boolean | void | undefined)) {
  ```
- Line 292: `unknown()` - exported-function
  ```typescript
  export function findRoot<T extends StateObject.Ctor>(tree: StateTree, cells: State.Cells, root: StateTransform.Ref, test: (c: StateObjectCell) => (boolean | void | undefined)) {
  ```

### src/mol-math/linear-algebra/3d/vec2.ts (25 errors)

- Line 23: `Vec2()` - function
  ```typescript
  function Vec2() {
  ```
- Line 35: `clone()` - exported-function
  ```typescript
  export function clone(a: Vec2) {
  ```
- Line 42: `create()` - exported-function
  ```typescript
  export function create(x: number, y: number) {
  ```
- Line 49: `hasNaN()` - exported-function
  ```typescript
  export function hasNaN(a: Vec2) {
  ```
- Line 53: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(a: Vec2, out: T, offset: number) {
  ```
- Line 59: `fromArray()` - exported-function
  ```typescript
  export function fromArray(a: Vec2, array: NumberArray, offset: number) {
  ```
- Line 65: `copy()` - exported-function
  ```typescript
  export function copy(out: Vec2, a: Vec2) {
  ```
- Line 71: `set()` - exported-function
  ```typescript
  export function set(out: Vec2, x: number, y: number) {
  ```
- Line 77: `add()` - exported-function
  ```typescript
  export function add(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 83: `sub()` - exported-function
  ```typescript
  export function sub(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 89: `mul()` - exported-function
  ```typescript
  export function mul(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 95: `div()` - exported-function
  ```typescript
  export function div(out: Vec2, a: Vec2, b: Vec2) {
  ```
- Line 101: `scale()` - exported-function
  ```typescript
  export function scale(out: Vec2, a: Vec2, b: number) {
  ```
- Line 110: `round()` - exported-function
  ```typescript
  export function round(out: Vec2, a: Vec2) {
  ```
- Line 119: `ceil()` - exported-function
  ```typescript
  export function ceil(out: Vec2, a: Vec2) {
  ```
- Line 128: `floor()` - exported-function
  ```typescript
  export function floor(out: Vec2, a: Vec2) {
  ```
- Line 134: `distance()` - exported-function
  ```typescript
  export function distance(a: Vec2, b: Vec2) {
  ```
- Line 140: `squaredDistance()` - exported-function
  ```typescript
  export function squaredDistance(a: Vec2, b: Vec2) {
  ```
- Line 146: `magnitude()` - exported-function
  ```typescript
  export function magnitude(a: Vec2) {
  ```
- Line 152: `squaredMagnitude()` - exported-function
  ```typescript
  export function squaredMagnitude(a: Vec2) {
  ```
- Line 158: `setMagnitude()` - exported-function
  ```typescript
  export function setMagnitude(out: Vec2, a: Vec2, l: number) {
  ```
- Line 165: `inverse()` - exported-function
  ```typescript
  export function inverse(out: Vec2, a: Vec2) {
  ```
- Line 171: `normalize()` - exported-function
  ```typescript
  export function normalize(out: Vec2, a: Vec2) {
  ```
- Line 183: `areEqual()` - exported-function
  ```typescript
  export function areEqual(a: Vec2, b: Vec2) {
  ```
- Line 187: `toString()` - exported-function
  ```typescript
  export function toString(a: Vec2, precision?: number) {
  ```

### src/mol-model/volume/volume.ts (22 errors)

- Line 64: `areSame()` - exported-function
  ```typescript
  export function areSame(a: IsoValue, b: IsoValue, stats: Grid['stats']) {
  ```
- Line 87: `toString()` - exported-function
  ```typescript
  export function toString(value: IsoValue) {
  ```
- Line 95: `adjustedIsoValue()` - exported-function
  ```typescript
  export function adjustedIsoValue(volume: Volume, value: number, kind: 'absolute' | 'relative') {
  ```
- Line 112: `createIsoValueParam()` - exported-function
  ```typescript
  export function createIsoValueParam(defaultValue: Volume.IsoValue, stats?: Grid['stats']) {
  ```
- Line 161: `areEquivalent()` - exported-function
  ```typescript
  export function areEquivalent(volA: Volume, volB: Volume) {
  ```
- Line 165: `areInstanceTransformsEqual()` - exported-function
  ```typescript
  export function areInstanceTransformsEqual(volA: Volume, volB: Volume) {
  ```
- Line 173: `isEmpty()` - exported-function
  ```typescript
  export function isEmpty(vol: Volume) {
  ```
- Line 177: `isOrbitals()` - exported-function
  ```typescript
  export function isOrbitals(volume: Volume) {
  ```
- Line 185: `areLociEqual()` - exported-function
  ```typescript
  export function areLociEqual(a: Loci, b: Loci) { return a.volume === b.volume && OrderedSet.areEqual(a.instances, b.instances); }
  ```
- Line 186: `isLociEmpty()` - exported-function
  ```typescript
  export function isLociEmpty(loci: Loci) { return isEmpty(loci.volume) || OrderedSet.isEmpty(loci.instances); }
  ```
- Line 188: `getBoundingSphere()` - exported-function
  ```typescript
  export function getBoundingSphere(volume: Volume, boundingSphere?: Sphere3D) {
  ```
- Line 196: `areLociEqual()` - exported-function
  ```typescript
  export function areLociEqual(a: Loci, b: Loci) { return a.volume === b.volume && Volume.IsoValue.areSame(a.isoValue, b.isoValue, a.volume.grid.stats) && OrderedSet.areEqual(a.instances, b.instances); }
  ```
- Line 197: `isLociEmpty()` - exported-function
  ```typescript
  export function isLociEmpty(loci: Loci) { return isEmpty(loci.volume) || OrderedSet.isEmpty(loci.instances); }
  ```
- Line 200: `getBoundingSphere()` - exported-function
  ```typescript
  export function getBoundingSphere(volume: Volume, isoValue: Volume.IsoValue, boundingSphere?: Sphere3D) {
  ```
- Line 246: `areLociEqual()` - exported-function
  ```typescript
  export function areLociEqual(a: Loci, b: Loci) {
  ```
- Line 258: `isLociEmpty()` - exported-function
  ```typescript
  export function isLociEmpty(loci: Loci) {
  ```
- Line 264: `getLociSize()` - exported-function
  ```typescript
  export function getLociSize(loci: Loci) {
  ```
- Line 293: `getBoundingSphere()` - exported-function
  ```typescript
  export function getBoundingSphere(volume: Volume, elements: Loci['elements'], boundingSphere?: Sphere3D) {
  ```
- Line 344: `areLociEqual()` - exported-function
  ```typescript
  export function areLociEqual(a: Loci, b: Loci) {
  ```
- Line 356: `isLociEmpty()` - exported-function
  ```typescript
  export function isLociEmpty(loci: Loci) {
  ```
- Line 362: `getLociSize()` - exported-function
  ```typescript
  export function getLociSize(loci: Loci) {
  ```
- Line 373: `getBoundingSphere()` - exported-function
  ```typescript
  export function getBoundingSphere(volume: Volume, elements: Loci['elements'], boundingSphere?: Sphere3D) {
  ```

### src/mol-math/geometry/primitives/sphere3d.ts (18 errors)

- Line 22: `Sphere3D()` - function
  ```typescript
  function Sphere3D() {
  ```
- Line 40: `set()` - exported-function
  ```typescript
  export function set(out: Sphere3D, center: Vec3, radius: number) {
  ```
- Line 46: `copy()` - exported-function
  ```typescript
  export function copy(out: Sphere3D, a: Sphere3D) {
  ```
- Line 104: `translate()` - exported-function
  ```typescript
  export function translate(out: Sphere3D, sphere: Sphere3D, v: Vec3) {
  ```
- Line 113: `scale()` - exported-function
  ```typescript
  export function scale(out: Sphere3D, sphere: Sphere3D, s: number) {
  ```
- Line 123: `scaleNX()` - exported-function
  ```typescript
  export function scaleNX(out: Sphere3D, sphere: Sphere3D, s: number) {
  ```
- Line 129: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(s: Sphere3D, out: T, offset: number) {
  ```
- Line 135: `fromArray()` - exported-function
  ```typescript
  export function fromArray(out: Sphere3D, array: NumberArray, offset: number) {
  ```
- Line 141: `fromBox3D()` - exported-function
  ```typescript
  export function fromBox3D(out: Sphere3D, box: Box3D) {
  ```
- Line 159: `fromAxes3D()` - exported-function
  ```typescript
  export function fromAxes3D(out: Sphere3D, axes: Axes3D) {
  ```
- Line 167: `fromDimensionsAndTransform()` - exported-function
  ```typescript
  export function fromDimensionsAndTransform(out: Sphere3D, dimensions: Vec3, transform: Mat4) {
  ```
- Line 190: `addVec3()` - exported-function
  ```typescript
  export function addVec3(out: Sphere3D, s: Sphere3D, v: Vec3) {
  ```
- Line 202: `expandBySphere()` - exported-function
  ```typescript
  export function expandBySphere(out: Sphere3D, sphere: Sphere3D, by: Sphere3D) {
  ```
- Line 261: `exactEquals()` - exported-function
  ```typescript
  export function exactEquals(a: Sphere3D, b: Sphere3D) {
  ```
- Line 268: `equals()` - exported-function
  ```typescript
  export function equals(a: Sphere3D, b: Sphere3D) {
  ```
- Line 278: `includes()` - exported-function
  ```typescript
  export function includes(a: Sphere3D, b: Sphere3D) {
  ```
- Line 290: `overlaps()` - exported-function
  ```typescript
  export function overlaps(a: Sphere3D, b: Sphere3D) {
  ```
- Line 295: `distance()` - exported-function
  ```typescript
  export function distance(a: Sphere3D, b: Sphere3D) {
  ```

### src/mol-data/int/sorted-ranges.ts (16 errors)

- Line 14: `unknown()` - exported-function
  ```typescript
  export function ofSortedRanges<T extends number = number>(array: ArrayLike<T>) { return SortedArray.ofSortedArray<T>(array); }
  ```
- Line 15: `unknown()` - exported-function
  ```typescript
  export function start<T extends number = number>(ranges: SortedRanges<T>) { return ranges[0]; }
  ```
- Line 16: `unknown()` - exported-function
  ```typescript
  export function end<T extends number = number>(ranges: SortedRanges<T>) { return ranges[ranges.length - 1] + 1; }
  ```
- Line 17: `unknown()` - exported-function
  ```typescript
  export function min<T extends number = number>(ranges: SortedRanges<T>) { return ranges[0]; }
  ```
- Line 18: `unknown()` - exported-function
  ```typescript
  export function max<T extends number = number>(ranges: SortedRanges<T>) { return ranges[ranges.length - 1]; }
  ```
- Line 19: `unknown()` - exported-function
  ```typescript
  export function size<T extends number = number>(ranges: SortedRanges<T>) {
  ```
- Line 26: `unknown()` - exported-function
  ```typescript
  export function count<T extends number = number>(ranges: SortedRanges<T>) { return ranges.length / 2; }
  ```
- Line 28: `unknown()` - exported-function
  ```typescript
  export function startAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 31: `unknown()` - exported-function
  ```typescript
  export function endAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 35: `unknown()` - exported-function
  ```typescript
  export function minAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 38: `unknown()` - exported-function
  ```typescript
  export function maxAt<T extends number = number>(ranges: SortedRanges<T>, index: number) {
  ```
- Line 42: `unknown()` - exported-function
  ```typescript
  export function areEqual<T extends number = number>(a: SortedRanges<T>, b: SortedRanges<T>) {
  ```
- Line 61: `unknown()` - exported-function
  ```typescript
  export function has<T extends number = number>(ranges: SortedRanges<T>, set: OrderedSet<T>) {
  ```
- Line 66: `unknown()` - exported-function
  ```typescript
  export function hasFrom<T extends number = number>(ranges: SortedRanges<T>, set: OrderedSet<T>, from: number) {
  ```
- Line 85: `unknown()` - exported-function
  ```typescript
  export function transientSegments<T extends number = number, I extends number = number>(ranges: SortedRanges<T>, set: OrderedSet<T>) {
  ```
- Line 102: `move()` - method
  ```typescript
  move() {
  ```

### src/mol-data/db/column.ts (15 errors)

- Line 144: `ofIntArray()` - exported-function
  ```typescript
  export function ofIntArray(array: ArrayLike<number>) {
  ```
- Line 148: `ofFloatArray()` - exported-function
  ```typescript
  export function ofFloatArray(array: ArrayLike<number>) {
  ```
- Line 152: `ofStringArray()` - exported-function
  ```typescript
  export function ofStringArray(array: ArrayLike<string>) {
  ```
- Line 156: `unknown()` - exported-function
  ```typescript
  export function ofStringAliasArray<T extends string>(array: ArrayLike<T>) {
  ```
- Line 160: `unknown()` - exported-function
  ```typescript
  export function ofStringListArray<T extends string>(array: ArrayLike<T[]>, separator = ',') {
  ```
- Line 164: `ofIntTokens()` - exported-function
  ```typescript
  export function ofIntTokens(tokens: Tokens) {
  ```
- Line 173: `ofFloatTokens()` - exported-function
  ```typescript
  export function ofFloatTokens(tokens: Tokens) {
  ```
- Line 182: `ofStringTokens()` - exported-function
  ```typescript
  export function ofStringTokens(tokens: Tokens) {
  ```
- Line 195: `unknown()` - exported-function
  ```typescript
  export function window<T>(column: Column<T>, start: number, end: number) {
  ```
- Line 199: `unknown()` - exported-function
  ```typescript
  export function view<T>(column: Column<T>, indices: ArrayLike<number>, checkIndentity = true) {
  ```
- Line 204: `unknown()` - exported-function
  ```typescript
  export function createFirstIndexMap<T>(column: Column<T>) {
  ```
- Line 208: `unknown()` - exported-function
  ```typescript
  export function createIndexer<T, R extends number = number>(column: Column<T>) {
  ```
- Line 216: `unknown()` - exported-function
  ```typescript
  export function areEqual<T>(a: Column<T>, b: Column<T>) {
  ```
- Line 220: `unknown()` - exported-function
  ```typescript
  export function indicesOf<T>(c: Column<T>, test: (e: T) => boolean) {
  ```
- Line 241: `unknown()` - exported-function
  ```typescript
  export function isIdentity<T extends number>(c: Column<T>) {
  ```

### src/mol-model/loci.ts (15 errors)

- Line 83: `areEqual()` - exported-function
  ```typescript
  export function areEqual(lociA: Loci, lociB: Loci) {
  ```
- Line 123: `isEmpty()` - exported-function
  ```typescript
  export function isEmpty(loci: Loci) {
  ```
- Line 139: `unknown()` - exported-function
  ```typescript
  export function remap<T>(loci: Loci, data: T) {
  ```
- Line 224: `unknown()` - method
  ```typescript
  'residue': (loci: Loci) => {
  ```
- Line 229: `unknown()` - method
  ```typescript
  'chain': (loci: Loci) => {
  ```
- Line 234: `unknown()` - method
  ```typescript
  'entity': (loci: Loci) => {
  ```
- Line 239: `unknown()` - method
  ```typescript
  'model': (loci: Loci) => {
  ```
- Line 244: `unknown()` - method
  ```typescript
  'operator': (loci: Loci) => {
  ```
- Line 249: `unknown()` - method
  ```typescript
  'structure': (loci: Loci) => {
  ```
- Line 260: `unknown()` - method
  ```typescript
  'elementInstances': (loci: Loci) => {
  ```
- Line 265: `unknown()` - method
  ```typescript
  'residueInstances': (loci: Loci) => {
  ```
- Line 270: `unknown()` - method
  ```typescript
  'chainInstances': (loci: Loci) => {
  ```
- Line 288: `simpleGranularity()` - exported-function
  ```typescript
  export function simpleGranularity(granularity: Granularity) {
  ```
- Line 292: `applyGranularity()` - exported-function
  ```typescript
  export function applyGranularity(loci: Loci, granularity: Granularity) {
  ```
- Line 300: `normalize()` - exported-function
  ```typescript
  export function normalize(loci: Loci, granularity?: Granularity, alwaysConvertBonds = false) {
  ```

### src/mol-state/state.ts (15 errors)

- Line 63: `transforms()` - getter
  ```typescript
  get transforms() { return (this._tree as StateTree).transforms; }
  ```
- Line 64: `current()` - getter
  ```typescript
  get current() { return this.behaviors.currentObject.value.ref; }
  ```
- Line 65: `root()` - getter
  ```typescript
  get root() { return this.cells.get((this._tree as StateTree).root.ref)!; }
  ```
- Line 67: `build()` - method
  ```typescript
  build() { return new StateBuilder.Root(this.tree, this); }
  ```
- Line 72: `unknown()` - method
  ```typescript
  tryGetCellData = <T extends StateObject>(ref: StateTransform.Ref) => {
  ```
- Line 96: `latestUndoLabel()` - getter
  ```typescript
  get latestUndoLabel() {
  ```
- Line 100: `canUndo()` - getter
  ```typescript
  get canUndo() {
  ```
- Line 106: `undo()` - method
  ```typescript
  undo() {
  ```
- Line 124: `Snapshot()` - method
  ```typescript
  setSnapshot(snapshot: State.Snapshot) {
  ```
- Line 155: `unknown()` - method
  ```typescript
  select<C extends StateObjectCell>(selector: StateSelection.Selector<C>) {
  ```
- Line 163: `unknown()` - method
  ```typescript
  selectQ<C extends StateObjectCell>(selector: (q: typeof StateSelection.Generators) => StateSelection.Selector<C>) {
  ```
- Line 186: `transaction()` - method
  ```typescript
  transaction(edits: (ctx: RuntimeContext) => Promise<void> | void, options?: { canUndo?: string | boolean, rethrowErrors?: boolean }) {
  ```
- Line 241: `inUpdate()` - getter
  ```typescript
  get inUpdate() { return this._inUpdate; }
  ```
- Line 400: `create()` - exported-function
  ```typescript
  export function create(rootObject: StateObject, params: Params) {
  ```
- Line 415: `isCell()` - exported-function
  ```typescript
  export function isCell(e: ObjectEvent, cell?: StateObjectCell) {
  ```

### src/mol-repr/shape/loci/dihedral.ts (14 errors)

- Line 75: `ShapeRepresentation()` - method
  ```typescript
  'vectors': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, VectorsParams>) => ShapeRepresentation(getVectorsShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 76: `ShapeRepresentation()` - method
  ```typescript
  'extenders': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ExtendersParams>) => ShapeRepresentation(getExtendersShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 77: `ShapeRepresentation()` - method
  ```typescript
  'connector': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ExtendersParams>) => ShapeRepresentation(getConnectorShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 78: `ShapeRepresentation()` - method
  ```typescript
  'arms': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ArmsParams>) => ShapeRepresentation(getArmsShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 79: `ShapeRepresentation()` - method
  ```typescript
  'arc': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, ArcParams>) => ShapeRepresentation(getArcShape, Lines.Utils, { modifyState: s => ({ ...s, pickable: false }) }),
  ```
- Line 80: `ShapeRepresentation()` - method
  ```typescript
  'sector': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, SectorParams>) => ShapeRepresentation(getSectorShape, Mesh.Utils, { modifyProps: p => ({ ...p, alpha: p.sectorOpacity }), modifyState: s => ({ ...s, markerActions: MarkerActions.Highlighting }) }),
  ```
- Line 81: `ShapeRepresentation()` - method
  ```typescript
  'text': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<DihedralData, LociLabelTextParams>) => ShapeRepresentation(getTextShape, Text.Utils, { modifyState: s => ({ ...s, markerActions: MarkerAction.None }) }),
  ```
- Line 206: `getVectorsShape()` - function
  ```typescript
  function getVectorsShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 223: `getConnectorShape()` - function
  ```typescript
  function getConnectorShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 241: `getArmsShape()` - function
  ```typescript
  function getArmsShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 259: `getExtendersShape()` - function
  ```typescript
  function getExtendersShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 289: `getArcShape()` - function
  ```typescript
  function getArcShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Lines>) {
  ```
- Line 309: `getSectorShape()` - function
  ```typescript
  function getSectorShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Mesh>) {
  ```
- Line 337: `getTextShape()` - function
  ```typescript
  function getTextShape(ctx: RuntimeContext, data: DihedralData, props: DihedralProps, shape?: Shape<Text>) {
  ```

### src/mol-plugin-state/manager/structure/component.ts (13 errors)

- Line 50: `currentStructures()` - getter
  ```typescript
  get currentStructures() {
  ```
- Line 64: `setOptions()` - async-method
  ```typescript
  async setOptions(options: StructureComponentManager.Options) {
  ```
- Line 186: `clear()` - method
  ```typescript
  clear(structures: ReadonlyArray<StructureRef>) {
  ```
- Line 199: `canBeModified()` - method
  ```typescript
  canBeModified(ref: StructureHierarchyRef) {
  ```
- Line 203: `modifyByCurrentSelection()` - method
  ```typescript
  modifyByCurrentSelection(components: ReadonlyArray<StructureComponentRef>, action: StructureComponentManager.ModifyAction) {
  ```
- Line 238: `removeRepresentations()` - method
  ```typescript
  removeRepresentations(components: ReadonlyArray<StructureComponentRef>, pivot?: StructureRepresentationRef) {
  ```
- Line 260: `updateRepresentations()` - method
  ```typescript
  updateRepresentations(components: ReadonlyArray<StructureComponentRef>, pivot: StructureRepresentationRef, params: StateTransformer.Params<StructureRepresentation3D>) {
  ```
- Line 321: `addRepresentation()` - method
  ```typescript
  addRepresentation(components: ReadonlyArray<StructureComponentRef>, type: string) {
  ```
- Line 357: `add()` - async-method
  ```typescript
  async add(params: StructureComponentManager.AddParams, structures?: ReadonlyArray<StructureRef>) {
  ```
- Line 390: `applyTheme()` - async-method
  ```typescript
  async applyTheme(params: StructureComponentManager.ThemeParams, structures?: ReadonlyArray<StructureRef>) {
  ```
- Line 489: `getAddParams()` - exported-function
  ```typescript
  export function getAddParams(plugin: PluginContext, params?: { pivot?: StructureRef, allowNone: boolean, hideSelection?: boolean, checkExisting?: boolean }) {
  ```
- Line 509: `getThemeParams()` - exported-function
  ```typescript
  export function getThemeParams(plugin: PluginContext, pivot: StructureRef | StructureComponentRef | undefined) {
  ```
- Line 537: `getRepresentationTypes()` - exported-function
  ```typescript
  export function getRepresentationTypes(plugin: PluginContext, pivot: StructureRef | StructureComponentRef | undefined) {
  ```

### src/mol-script/language/builder.ts (13 errors)

- Line 17: `atomName()` - exported-function
  ```typescript
  export function atomName(s: string) { return struct.type.atomName([s]); }
  ```
- Line 19: `es()` - exported-function
  ```typescript
  export function es(s: string) { return struct.type.elementSymbol([s]); }
  ```
- Line 21: `list()` - exported-function
  ```typescript
  export function list(...xs: Expression[]) { return core.type.list(xs); }
  ```
- Line 23: `set()` - exported-function
  ```typescript
  export function set(...xs: Expression[]) { return core.type.set(xs); }
  ```
- Line 25: `re()` - exported-function
  ```typescript
  export function re(pattern: string, flags?: string) { return core.type.regex([pattern, flags]); }
  ```
- Line 27: `fn()` - exported-function
  ```typescript
  export function fn(x: Expression) { return core.ctrl.fn([x]); }
  ```
- Line 28: `evaluate()` - exported-function
  ```typescript
  export function evaluate(x: Expression) { return core.ctrl.eval([x]); }
  ```
- Line 33: `acp()` - exported-function
  ```typescript
  export function acp(p: keyof typeof _acp) { return (_acp[p] as MSymbol<any>)(); };
  ```
- Line 36: `atp()` - exported-function
  ```typescript
  export function atp(p: keyof typeof _atp) { return (_atp[p] as MSymbol<any>)(); };
  ```
- Line 39: `ammp()` - exported-function
  ```typescript
  export function ammp(p: keyof typeof _ammp) { return (_ammp[p] as MSymbol<any>)(); };
  ```
- Line 43: `acpSet()` - exported-function
  ```typescript
  export function acpSet(p: keyof typeof _acp) { return _aps([acp(p)]); };
  ```
- Line 45: `atpSet()` - exported-function
  ```typescript
  export function atpSet(p: keyof typeof _atp) { return _aps([atp(p)]); };
  ```
- Line 47: `ammpSet()` - exported-function
  ```typescript
  export function ammpSet(p: keyof typeof _ammp) { return _aps([ammp(p)]); };
  ```

### src/mol-plugin/context.ts (12 errors)

- Line 86: `unknown()` - method
  ```typescript
  runTask = <T>(task: Task<T>, params?: { useOverlay?: boolean }) =>
  ```
- Line 88: `unknown()` - method
  ```typescript
  resolveTask = <T>(object: Task<T> | T | undefined) => {
  ```
- Line 173: `isInitialized()` - getter
  ```typescript
  get isInitialized() {
  ```
- Line 212: `build()` - method
  ```typescript
  build() {
  ```
- Line 289: `initViewerAsync()` - async-method
  ```typescript
  async initViewerAsync(
  ```
- Line 297: `initContainerAsync()` - async-method
  ```typescript
  async initContainerAsync(options?: {
  ```
- Line 304: `mountAsync()` - async-method
  ```typescript
  async mountAsync(
  ```
- Line 484: `unknown()` - method
  ```typescript
  handleResize = () => {
  ```
- Line 510: `isBusy()` - getter
  ```typescript
  get isBusy() {
  ```
- Line 517: `selectionMode()` - getter
  ```typescript
  get selectionMode() {
  ```
- Line 525: `dataTransaction()` - method
  ```typescript
  dataTransaction(
  ```
- Line 532: `clear()` - method
  ```typescript
  clear(resetViewportSettings = false) {
  ```

### src/mol-plugin/util/viewport-screenshot.ts (12 errors)

- Line 95: `params()` - getter
  ```typescript
  get params() {
  ```
- Line 116: `values()` - getter
  ```typescript
  get values() {
  ```
- Line 120: `cropParams()` - getter
  ```typescript
  get cropParams() {
  ```
- Line 124: `relativeCrop()` - getter
  ```typescript
  get relativeCrop() {
  ```
- Line 195: `imagePass()` - getter
  ```typescript
  get imagePass() {
  ```
- Line 210: `Filename()` - method
  ```typescript
  getFilename(extension?: string) {
  ```
- Line 248: `isFullFrame()` - getter
  ```typescript
  get isFullFrame() {
  ```
- Line 307: `getPreview()` - async-method
  ```typescript
  async getPreview(ctx: RuntimeContext, maxDim = 320) {
  ```
- Line 347: `SizeAndViewport()` - method
  ```typescript
  getSizeAndViewport() {
  ```
- Line 427: `ImageDataUri()` - method
  ```typescript
  getImageDataUri() {
  ```
- Line 435: `copyToClipboard()` - method
  ```typescript
  copyToClipboard() {
  ```
- Line 450: `download()` - method
  ```typescript
  download(filename?: string) {
  ```

### src/mol-data/db/table.ts (11 errors)

- Line 111: `unknown()` - exported-function
  ```typescript
  export function view<S extends R, R extends Schema>(table: Table<S>, schema: R, view: ArrayLike<number>) {
  ```
- Line 123: `unknown()` - exported-function
  ```typescript
  export function pick<S extends R, R extends Schema>(table: Table<S>, schema: R, test: (i: number) => boolean) {
  ```
- Line 131: `unknown()` - exported-function
  ```typescript
  export function window<S extends R, R extends Schema>(table: Table<S>, schema: R, start: number, end: number) {
  ```
- Line 144: `unknown()` - exported-function
  ```typescript
  export function concat<S extends R, R extends Schema>(tables: Table<S>[], schema: R) {
  ```
- Line 175: `unknown()` - exported-function
  ```typescript
  export function sort<T extends Table>(table: T, cmp: (i: number, j: number) => number) {
  ```
- Line 199: `unknown()` - exported-function
  ```typescript
  export function areEqual<T extends Table<any>>(a: T, b: T) {
  ```
- Line 214: `unknown()` - exported-function
  ```typescript
  export function getRow<S extends Schema>(table: Table<S>, index: number) {
  ```
- Line 225: `unknown()` - exported-function
  ```typescript
  export function pickRow<S extends Schema>(table: Table<S>, test: (i: number) => boolean) {
  ```
- Line 231: `unknown()` - exported-function
  ```typescript
  export function getRows<S extends Schema>(table: Table<S>) {
  ```
- Line 240: `unknown()` - exported-function
  ```typescript
  export function toArrays<S extends Schema>(table: Table<S>) {
  ```
- Line 250: `unknown()` - exported-function
  ```typescript
  export function formatToString<S extends Schema>(table: Table<S>) {
  ```

### src/mol-plugin-state/manager/structure/selection.ts (11 errors)

- Line 60: `entries()` - getter
  ```typescript
  get entries() { return this.state.entries; }
  ```
- Line 61: `additionsHistory()` - getter
  ```typescript
  get additionsHistory() { return this.state.additionsHistory; }
  ```
- Line 62: `stats()` - getter
  ```typescript
  get stats() {
  ```
- Line 306: `clear()` - method
  ```typescript
  clear() {
  ```
- Line 324: `Loci()` - method
  ```typescript
  getLoci(structure: Structure) {
  ```
- Line 330: `Structure()` - method
  ```typescript
  getStructure(structure: Structure) {
  ```
- Line 336: `structureHasSelection()` - method
  ```typescript
  structureHasSelection(structure: StructureRef) {
  ```
- Line 343: `has()` - method
  ```typescript
  has(loci: Loci) {
  ```
- Line 361: `elementCount()` - method
  ```typescript
  elementCount() {
  ```
- Line 369: `Boundary()` - method
  ```typescript
  getBoundary() {
  ```
- Line 522: `selection()` - getter
  ```typescript
  get selection() { return this._selection; }
  ```

### src/mol-data/util/hash-functions.ts (10 errors)

- Line 10: `hash1()` - exported-function
  ```typescript
  export function hash1(i: number) {
  ```
- Line 17: `hash2()` - exported-function
  ```typescript
  export function hash2(i: number, j: number) {
  ```
- Line 27: `hash3()` - exported-function
  ```typescript
  export function hash3(i: number, j: number, k: number) {
  ```
- Line 38: `hash4()` - exported-function
  ```typescript
  export function hash4(i: number, j: number, k: number, l: number) {
  ```
- Line 50: `hashString()` - exported-function
  ```typescript
  export function hashString(s: string) {
  ```
- Line 62: `cantorPairing()` - exported-function
  ```typescript
  export function cantorPairing(a: number, b: number) {
  ```
- Line 70: `sortedCantorPairing()` - exported-function
  ```typescript
  export function sortedCantorPairing(a: number, b: number) {
  ```
- Line 74: `invertCantorPairing()` - exported-function
  ```typescript
  export function invertCantorPairing(out: [number, number], z: number) {
  ```
- Line 86: `hashFnv32a()` - exported-function
  ```typescript
  export function hashFnv32a(array: ArrayLike<number>) {
  ```
- Line 99: `hashFnv256a()` - exported-function
  ```typescript
  export function hashFnv256a(array: ArrayLike<number>, out: Uint32Array) {
  ```

### src/mol-io/writer/cif/encoder.ts (10 errors)

- Line 73: `index()` - exported-function
  ```typescript
  export function index(name: string) {
  ```
- Line 80: `index()` - method
  ```typescript
  index(name: N) {
  ```
- Line 85: `str()` - method
  ```typescript
  str(name: N, value: (k: K, d: D, index: number) => string, params?: ParamsBase<K, D>) {
  ```
- Line 90: `int()` - method
  ```typescript
  int(name: N, value: (k: K, d: D, index: number) => number, params?: ParamsBase<K, D> & { typedArray?: ArrayEncoding.TypedArrayCtor }) {
  ```
- Line 95: `vec()` - method
  ```typescript
  vec(name: N, values: ((k: K, d: D, index: number) => number)[], params?: ParamsBase<K, D> & { typedArray?: ArrayEncoding.TypedArrayCtor }) {
  ```
- Line 102: `float()` - method
  ```typescript
  float(name: N, value: (k: K, d: D, index: number) => number, params?: ParamsBase<K, D> & { typedArray?: ArrayEncoding.TypedArrayCtor, digitCount?: number }) {
  ```
- Line 107: `many()` - method
  ```typescript
  many(fields: ArrayLike<Field<K, D>>) {
  ```
- Line 112: `add()` - method
  ```typescript
  add(field: Field<K, D>) {
  ```
- Line 117: `Fields()` - method
  ```typescript
  getFields() { return this.fields; }
  ```
- Line 120: `unknown()` - exported-function
  ```typescript
  export function build<K = number, D = any, N extends string = string>() {
  ```

### src/mol-state/state/builder.ts (10 errors)

- Line 111: `editInfo()` - getter
  ```typescript
  get editInfo() { return this.state.editInfo; }
  ```
- Line 112: `currentTree()` - getter
  ```typescript
  get currentTree() { return this.state.tree; }
  ```
- Line 126: `unknown()` - method
  ```typescript
  toRoot<A extends StateObject>() { return new To<A>(this.state, this.state.tree.root.ref, this); }
  ```
- Line 127: `delete()` - method
  ```typescript
  delete(obj: StateObjectRef) {
  ```
- Line 137: `commit()` - method
  ```typescript
  commit(options?: Partial<State.UpdateOptions>) {
  ```
- Line 146: `editInfo()` - getter
  ```typescript
  get editInfo() { return this.state.editInfo; }
  ```
- Line 147: `selector()` - getter
  ```typescript
  get selector() { return new StateObjectSelector<A, T>(this.ref, this.state.state); }
  ```
- Line 296: `tag()` - method
  ```typescript
  tag(tags: string | string[]) {
  ```
- Line 316: `unknown()` - method
  ```typescript
  toRoot<A extends StateObject>() { return this.root.toRoot<A>(); }
  ```
- Line 317: `delete()` - method
  ```typescript
  delete(ref: StateObjectRef) { return this.root.delete(ref); }
  ```

### src/mol-math/geometry/primitives/plane3d.ts (9 errors)

- Line 17: `Plane3D()` - function
  ```typescript
  function Plane3D() {
  ```
- Line 48: `unknown()` - exported-function
  ```typescript
  export function toArray<T extends NumberArray>(p: Plane3D, out: T, offset: number) {
  ```
- Line 54: `fromArray()` - exported-function
  ```typescript
  export function fromArray(out: Plane3D, array: NumberArray, offset: number) {
  ```
- Line 60: `fromNormalAndCoplanarPoint()` - exported-function
  ```typescript
  export function fromNormalAndCoplanarPoint(out: Plane3D, normal: Vec3, point: Vec3) {
  ```
- Line 66: `fromCoplanarPoints()` - exported-function
  ```typescript
  export function fromCoplanarPoints(out: Plane3D, a: Vec3, b: Vec3, c: Vec3) {
  ```
- Line 73: `setUnnormalized()` - exported-function
  ```typescript
  export function setUnnormalized(out: Plane3D, nx: number, ny: number, nz: number, constant: number) {
  ```
- Line 81: `distanceToPoint()` - exported-function
  ```typescript
  export function distanceToPoint(plane: Plane3D, point: Vec3) {
  ```
- Line 85: `distanceToSphere3D()` - exported-function
  ```typescript
  export function distanceToSphere3D(plane: Plane3D, sphere: Sphere3D) {
  ```
- Line 89: `projectPoint()` - exported-function
  ```typescript
  export function projectPoint(out: Vec3, plane: Plane3D, point: Vec3) {
  ```

### src/mol-model/structure/structure/unit/rings.ts (9 errors)

- Line 40: `byFingerprint()` - getter
  ```typescript
  get byFingerprint() {
  ```
- Line 47: `elementRingIndices()` - getter
  ```typescript
  get elementRingIndices() {
  ```
- Line 51: `elementAromaticRingIndices()` - getter
  ```typescript
  get elementAromaticRingIndices() {
  ```
- Line 56: `ringComponentIndex()` - getter
  ```typescript
  get ringComponentIndex() {
  ```
- Line 60: `ringComponents()` - getter
  ```typescript
  get ringComponents() {
  ```
- Line 64: `aromaticRings()` - getter
  ```typescript
  get aromaticRings() {
  ```
- Line 87: `elementFingerprint()` - exported-function
  ```typescript
  export function elementFingerprint(elements: ArrayLike<ElementSymbol>) {
  ```
- Line 134: `getAltId()` - exported-function
  ```typescript
  export function getAltId(unit: Unit.Atomic, ring: UnitRing) {
  ```
- Line 162: `byFingerprintAndResidue()` - exported-function
  ```typescript
  export function byFingerprintAndResidue(rings: UnitRings, fingerprints: ReadonlyArray<UnitRing.Fingerprint>) {
  ```

### src/mol-plugin-state/manager/snapshots.ts (9 errors)

- Line 40: `updateState()` - method
  ```typescript
  protected override updateState(state: Partial<StateManagerState>) {        if ('current' in state && !('currentAnimationTimeMs' in state)) {
  ```
- Line 52: `current()` - getter
  ```typescript
  get current() {
  ```
- Line 57: `Index()` - method
  ```typescript
  getIndex(e: PluginStateSnapshotManager.Entry) {
  ```
- Line 61: `Entry()` - method
  ```typescript
  getEntry(id: string | undefined) {
  ```
- Line 160: `Current()` - method
  ```typescript
  setCurrent(id: string) {
  ```
- Line 170: `SnapshotAnimationFrame()` - method
  ```typescript
  setSnapshotAnimationFrame(currentAnimationTimeMs: number, load = false) {
  ```
- Line 189: `NextId()` - method
  ```typescript
  getNextId(id: string | undefined, dir: -1 | 1) {
  ```
- Line 208: `applyNext()` - method
  ```typescript
  applyNext(dir: -1 | 1) {
  ```
- Line 281: `serialize()` - async-method
  ```typescript
  async serialize(options?: { type: 'json' | 'molj' | 'zip' | 'molx', params?: PluginState.SnapshotParams }) {
  ```

### src/mol-repr/structure/representation/cartoon.ts (9 errors)

- Line 28: `UnitsRepresentation()` - method
  ```typescript
  'polymer-trace': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerTraceParams>) => UnitsRepresentation('Polymer trace mesh', ctx, getParams, PolymerTraceVisual),
  ```
- Line 29: `UnitsRepresentation()` - method
  ```typescript
  'polymer-gap': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerGapParams>) => UnitsRepresentation('Polymer gap cylinder', ctx, getParams, PolymerGapVisual),
  ```
- Line 30: `UnitsRepresentation()` - method
  ```typescript
  'nucleotide-block': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideBlockParams>) => UnitsRepresentation('Nucleotide block mesh', ctx, getParams, NucleotideBlockVisual),
  ```
- Line 31: `UnitsRepresentation()` - method
  ```typescript
  'nucleotide-ring': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideRingParams>) => UnitsRepresentation('Nucleotide ring mesh', ctx, getParams, NucleotideRingVisual),
  ```
- Line 32: `UnitsRepresentation()` - method
  ```typescript
  'nucleotide-atomic-ring-fill': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideAtomicRingFillParams>) => UnitsRepresentation('Nucleotide atomic ring fill', ctx, getParams, NucleotideAtomicRingFillVisual),
  ```
- Line 33: `UnitsRepresentation()` - method
  ```typescript
  'nucleotide-atomic-bond': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideAtomicBondParams>) => UnitsRepresentation('Nucleotide atomic bond', ctx, getParams, NucleotideAtomicBondVisual),
  ```
- Line 34: `UnitsRepresentation()` - method
  ```typescript
  'nucleotide-atomic-element': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, NucleotideAtomicElementParams>) => UnitsRepresentation('Nucleotide atomic element', ctx, getParams, NucleotideAtomicElementVisual),
  ```
- Line 35: `UnitsRepresentation()` - method
  ```typescript
  'direction-wedge': (ctx: RepresentationContext, getParams: RepresentationParamsGetter<Structure, PolymerDirectionParams>) => UnitsRepresentation('Polymer direction wedge', ctx, getParams, PolymerDirectionVisual),
  ```
- Line 55: `getCartoonParams()` - exported-function
  ```typescript
  export function getCartoonParams(ctx: ThemeRegistryContext, structure: Structure) {
  ```

### src/mol-util/binding.ts (9 errors)

- Line 18: `Binding()` - function
  ```typescript
  function Binding(triggers: Binding.Trigger[], action = '', description = '') {
  ```
- Line 32: `isEmpty()` - exported-function
  ```typescript
  export function isEmpty(binding: Binding) {
  ```
- Line 37: `match()` - exported-function
  ```typescript
  export function match(binding: Binding, buttons: ButtonsType, modifiers: ModifiersKeys) {
  ```
- Line 41: `matchKey()` - exported-function
  ```typescript
  export function matchKey(binding: Binding, code: KeyCode, modifiers: ModifiersKeys, key: string) {
  ```
- Line 45: `formatTriggers()` - exported-function
  ```typescript
  export function formatTriggers(binding: Binding) {
  ```
- Line 49: `format()` - exported-function
  ```typescript
  export function format(binding: Binding, name = '') {
  ```
- Line 60: `Trigger()` - exported-function
  ```typescript
  export function Trigger(buttons?: ButtonsType, modifiers?: ModifiersKeys) {
  ```
- Line 64: `TriggerKey()` - exported-function
  ```typescript
  export function TriggerKey(code?: KeyCode, modifiers?: ModifiersKeys) {
  ```
- Line 94: `format()` - exported-function
  ```typescript
  export function format(trigger: Trigger) {
  ```
