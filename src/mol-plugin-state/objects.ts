/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import type { Ccp4File } from "../mol-io/reader/ccp4/schema.ts";
import type { CifFile } from "../mol-io/reader/cif.ts";
import type { DcdFile } from "../mol-io/reader/dcd/parser.ts";
import type { Dsn6File } from "../mol-io/reader/dsn6/schema.ts";
import type { PlyFile } from "../mol-io/reader/ply/schema.ts";
import type { PsfFile } from "../mol-io/reader/psf/parser.ts";
import type { ShapeProvider } from "../mol-model/shape/provider.ts";
import type {
  Coordinates as _Coordinates,
  Model as _Model,
  Structure as _Structure,
  StructureElement,
  Topology as _Topology,
  Trajectory as _Trajectory,
} from "../mol-model/structure.ts";
import type { Volume as _Volume } from "../mol-model/volume.ts";
import type { PluginBehavior } from "../mol-plugin/behavior/behavior.ts";
import type { Representation } from "../mol-repr/representation.ts";
import type { ShapeRepresentation } from "../mol-repr/shape/representation.ts";
import type {
  StructureRepresentation,
  StructureRepresentationState,
} from "../mol-repr/structure/representation.ts";
import type { VolumeRepresentation } from "../mol-repr/volume/representation.ts";
import { StateObject, StateTransformer } from "../mol-state/index.ts";
import type { CubeFile } from "../mol-io/reader/cube/parser.ts";
import type { DxFile } from "../mol-io/reader/dx/parser.ts";
import type { Color } from "../mol-util/color/color.ts";
import type { Asset } from "../mol-util/assets.ts";
import type { PrmtopFile } from "../mol-io/reader/prmtop/parser.ts";
import type { TopFile } from "../mol-io/reader/top/parser.ts";
import type { StringLike } from "../mol-io/common/string-like.ts";

export type TypeClass = "root" | "data" | "prop";

export namespace PluginStateObject {
  export type Any = StateObject<any, TypeInfo>;

  export type TypeClass =
    | "Root"
    | "Group"
    | "Data"
    | "Object"
    | "Representation3D"
    | "Behavior";
  export interface TypeInfo {
    name: string;
    typeClass: TypeClass;
  }

  export const Create: <D = {}>(type: TypeInfo) => ReturnType<typeof StateObject.create<D, TypeInfo>> = StateObject.factory<TypeInfo>();

  export function isRepresentation3D(
    o?: Any,
  ): o is StateObject<Representation3DData<Representation.Any>, TypeInfo> {
    return !!o && o.type.typeClass === "Representation3D";
  }

  export function isBehavior(
    o?: Any,
  ): o is StateObject<PluginBehavior, TypeInfo> {
    return !!o && o.type.typeClass === "Behavior";
  }

  export interface Representation3DData<T extends Representation.Any, S = any> {
    repr: T;
    sourceData: S;
  }
  export function CreateRepresentation3D<
    T extends Representation.Any,
    S = any,
  >(type: {
    name: string;
  }): ReturnType<typeof Create<Representation3DData<T, S>>> {
    return Create<Representation3DData<T, S>>({
      ...type,
      typeClass: "Representation3D",
    });
  }

  export function CreateBehavior<T extends PluginBehavior>(type: {
    name: string;
  }): ReturnType<typeof Create<T>> {
    return Create<T>({ ...type, typeClass: "Behavior" });
  }

  const RootBase: ReturnType<typeof Create> = Create({
    name: "Root",
    typeClass: "Root",
  });
  export class Root extends RootBase {}
  const GroupBase: ReturnType<typeof Create> = Create({
    name: "Group",
    typeClass: "Group",
  });
  export class Group extends GroupBase {}

  export namespace Data {
    const StringBase: ReturnType<typeof Create<StringLike>> =
      Create<StringLike>({
        name: "String Data",
        typeClass: "Data",
      });
    export class String extends StringBase {}
    const BinaryBase: ReturnType<typeof Create<Uint8Array<ArrayBuffer>>> =
      Create<Uint8Array<ArrayBuffer>>({
        name: "Binary Data",
        typeClass: "Data",
      });
    export class Binary extends BinaryBase {}

    export type BlobEntry = { id: string } & (
      | { kind: "string"; data: string }
      | { kind: "binary"; data: Uint8Array<ArrayBuffer> }
    );
    export type BlobData = BlobEntry[];
    const BlobBase: ReturnType<typeof Create<BlobData>> = Create<BlobData>({
      name: "Data Blob",
      typeClass: "Data",
    });
    export class Blob extends BlobBase {}
  }

  export namespace Format {
    const JsonBase: ReturnType<typeof Create<any>> = Create<any>({
      name: "JSON Data",
      typeClass: "Data",
    });
    export class Json extends JsonBase {}
    const CifBase: ReturnType<typeof Create<CifFile>> = Create<CifFile>({
      name: "CIF File",
      typeClass: "Data",
    });
    export class Cif extends CifBase {}
    const CubeBase: ReturnType<typeof Create<CubeFile>> = Create<CubeFile>({
      name: "Cube File",
      typeClass: "Data",
    });
    export class Cube extends CubeBase {}
    const PsfBase: ReturnType<typeof Create<PsfFile>> = Create<PsfFile>({
      name: "PSF File",
      typeClass: "Data",
    });
    export class Psf extends PsfBase {}
    const PrmtopBase: ReturnType<typeof Create<PrmtopFile>> =
      Create<PrmtopFile>({
        name: "PRMTOP File",
        typeClass: "Data",
      });
    export class Prmtop extends PrmtopBase {}
    const TopBase: ReturnType<typeof Create<TopFile>> = Create<TopFile>({
      name: "TOP File",
      typeClass: "Data",
    });
    export class Top extends TopBase {}
    const PlyBase: ReturnType<typeof Create<PlyFile>> = Create<PlyFile>({
      name: "PLY File",
      typeClass: "Data",
    });
    export class Ply extends PlyBase {}
    const Ccp4Base: ReturnType<typeof Create<Ccp4File>> = Create<Ccp4File>({
      name: "CCP4/MRC/MAP File",
      typeClass: "Data",
    });
    export class Ccp4 extends Ccp4Base {}
    const Dsn6Base: ReturnType<typeof Create<Dsn6File>> = Create<Dsn6File>({
      name: "DSN6/BRIX File",
      typeClass: "Data",
    });
    export class Dsn6 extends Dsn6Base {}
    const DxBase: ReturnType<typeof Create<DxFile>> = Create<DxFile>({
      name: "DX File",
      typeClass: "Data",
    });
    export class Dx extends DxBase {}

    export type BlobEntry = { id: string } & (
      | { kind: "json"; data: unknown }
      | { kind: "string"; data: string }
      | { kind: "binary"; data: Uint8Array<ArrayBuffer> }
      | { kind: "cif"; data: CifFile }
      | { kind: "pdb"; data: CifFile }
      | { kind: "gro"; data: CifFile }
      | { kind: "dcd"; data: DcdFile }
      | { kind: "ccp4"; data: Ccp4File }
      | { kind: "dsn6"; data: Dsn6File }
      | { kind: "dx"; data: DxFile }
      | { kind: "ply"; data: PlyFile }
      // For non-build in extensions
      | { kind: "custom"; data: unknown; tag: string }
    );
    export type BlobData = BlobEntry[];
    const BlobBase: ReturnType<typeof Create<BlobData>> = Create<BlobData>({
      name: "Format Blob",
      typeClass: "Data",
    });
    export class Blob extends BlobBase {}
  }

  export namespace Molecule {
    const CoordinatesBase: ReturnType<typeof Create<_Coordinates>> =
      Create<_Coordinates>({
        name: "Coordinates",
        typeClass: "Object",
      });
    export class Coordinates extends CoordinatesBase {}
    const TopologyBase: ReturnType<typeof Create<_Topology>> =
      Create<_Topology>({
        name: "Topology",
        typeClass: "Object",
      });
    export class Topology extends TopologyBase {}
    const ModelBase: ReturnType<typeof Create<_Model>> = Create<_Model>({
      name: "Model",
      typeClass: "Object",
    });
    export class Model extends ModelBase {}
    const TrajectoryBase: ReturnType<typeof Create<_Trajectory>> =
      Create<_Trajectory>({
        name: "Trajectory",
        typeClass: "Object",
      });
    export class Trajectory extends TrajectoryBase {}
    const StructureBase: ReturnType<typeof Create<_Structure>> =
      Create<_Structure>({
        name: "Structure",
        typeClass: "Object",
      });
    export class Structure extends StructureBase {}

    export namespace Structure {
      const Representation3DBase: ReturnType<
        typeof CreateRepresentation3D<StructureRepresentation<any>, _Structure>
      > = CreateRepresentation3D<StructureRepresentation<any>, _Structure>({
        name: "Structure 3D",
      });
      export class Representation3D extends Representation3DBase {}

      export interface Representation3DStateData {
        repr: StructureRepresentation<any>;
        /** used to restore state when the obj is removed */
        initialState: Partial<StructureRepresentationState>;
        state: Partial<StructureRepresentationState>;
        info?: unknown;
      }
      const Representation3DStateBase: ReturnType<
        typeof Create<Representation3DStateData>
      > = Create<Representation3DStateData>({
        name: "Structure 3D State",
        typeClass: "Object",
      });
      export class Representation3DState extends Representation3DStateBase {}

      export interface SelectionEntry {
        key: string;
        structureRef: string;
        groupId?: string;
        loci: StructureElement.Loci;
      }
      const SelectionsBase: ReturnType<
        typeof Create<ReadonlyArray<SelectionEntry>>
      > = Create<ReadonlyArray<SelectionEntry>>({
        name: "Selections",
        typeClass: "Object",
      });
      export class Selections extends SelectionsBase {}
    }
  }

  export namespace Volume {
    export interface LazyInfo {
      url: string | Asset.Url;
      isBinary: boolean;
      format: string;
      entryId?: string | string[];
      isovalues: {
        type: "absolute" | "relative";
        value: number;
        color: Color;
        alpha?: number;
        volumeIndex?: number;
      }[];
    }

    const DataBase: ReturnType<typeof Create<_Volume>> = Create<_Volume>({
      name: "Volume",
      typeClass: "Object",
    });
    export class Data extends DataBase {}
    const LazyBase: ReturnType<typeof Create<LazyInfo>> = Create<LazyInfo>({
      name: "Lazy Volume",
      typeClass: "Object",
    });
    export class Lazy extends LazyBase {}
    const Representation3DBase: ReturnType<
      typeof CreateRepresentation3D<VolumeRepresentation<any>, _Volume>
    > = CreateRepresentation3D<VolumeRepresentation<any>, _Volume>({
      name: "Volume 3D",
    });
    export class Representation3D extends Representation3DBase {}
  }

  export namespace Shape {
    const ProviderBase: ReturnType<
      typeof Create<ShapeProvider<any, any, any>>
    > = Create<ShapeProvider<any, any, any>>({
      name: "Shape Provider",
      typeClass: "Object",
    });
    export class Provider extends ProviderBase {}
    const Representation3DBase: ReturnType<
      typeof CreateRepresentation3D<ShapeRepresentation<any, any, any>, unknown>
    > = CreateRepresentation3D<ShapeRepresentation<any, any, any>, unknown>({
      name: "Shape 3D",
    });
    export class Representation3D extends Representation3DBase {}
  }
}

export namespace PluginStateTransform {
  export const CreateBuiltIn: <A extends StateObject, B extends StateObject, P extends {} = {}>(definition: StateTransformer.Definition<A, B, P>) => StateTransformer<A, B, P> = StateTransformer.factory("ms-plugin");
  export const BuiltIn: StateTransformer.Builder.Root = StateTransformer.builderFactory("ms-plugin");
}
