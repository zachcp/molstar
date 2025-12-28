/**
 * Copyright (c) 2018-2025 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @author Adam Midlik <midlik@gmail.com>
 */

import { ANVILMembraneOrientation } from '../../extensions/anvil/behavior.ts';
import { AssemblySymmetry } from '../../extensions/assembly-symmetry.ts';
import { Backgrounds } from '../../extensions/backgrounds.ts';
import { DnatcoNtCs } from '../../extensions/dnatco.ts';
import { G3DFormat } from '../../extensions/g3d/format.ts';
import { GeometryExport } from '../../extensions/geo-export.ts';
import { MAQualityAssessment, MAQualityAssessmentConfig } from '../../extensions/model-archive/quality-assessment/behavior.ts';
import { ModelExport } from '../../extensions/model-export.ts';
import { Mp4Export } from '../../extensions/mp4-export.ts';
import { loadMVS } from '../../extensions/mvs.ts';
import { MolViewSpec } from '../../extensions/mvs/behavior.ts';
import { loadMVSData } from '../../extensions/mvs/components/formats.ts';
import { PDBeStructureQualityReport } from '../../extensions/pdbe.ts';
import { RCSBValidationReport } from '../../extensions/rcsb.ts';
import { SbNcbrPartialCharges, SbNcbrTunnels } from '../../extensions/sb-ncbr.ts';
import { wwPDBChemicalComponentDictionary } from '../../extensions/wwpdb/ccd/behavior.ts';
import { wwPDBStructConnExtensionFunctions } from '../../extensions/wwpdb/struct-conn.ts';
import { ZenodoImport } from '../../extensions/zenodo.ts';
import { PluginSpec } from '../../mol-plugin/spec.ts';
import { MVSData } from '../../extensions/mvs/mvs-data.ts';
import * as MVSUtil from '../../extensions/mvs/util.ts';

export const ExtensionMap = {
    // Mol* built-in extensions
    'mvs': PluginSpec.Behavior(MolViewSpec),
    'backgrounds': PluginSpec.Behavior(Backgrounds),
    'model-export': PluginSpec.Behavior(ModelExport),
    'mp4-export': PluginSpec.Behavior(Mp4Export),
    'geo-export': PluginSpec.Behavior(GeometryExport),
    'zenodo-import': PluginSpec.Behavior(ZenodoImport),
    'wwpdb-chemical-component-dictionary': PluginSpec.Behavior(wwPDBChemicalComponentDictionary),

    // 3rd party extensions
    'pdbe-structure-quality-report': PluginSpec.Behavior(PDBeStructureQualityReport),
    'dnatco-ntcs': PluginSpec.Behavior(DnatcoNtCs),
    'assembly-symmetry': PluginSpec.Behavior(AssemblySymmetry),
    'rcsb-validation-report': PluginSpec.Behavior(RCSBValidationReport),
    'anvil-membrane-orientation': PluginSpec.Behavior(ANVILMembraneOrientation),
    'g3d': PluginSpec.Behavior(G3DFormat), // TODO: consider removing this for Mol* 6.0
    'ma-quality-assessment': PluginSpec.Behavior(MAQualityAssessment),
    'sb-ncbr-partial-charges': PluginSpec.Behavior(SbNcbrPartialCharges),
    'tunnels': PluginSpec.Behavior(SbNcbrTunnels),
};

export const PluginExtensions = {
    wwPDBStructConn: wwPDBStructConnExtensionFunctions,
    mvs: {
        MVSData,
        createBuilder: MVSData.createBuilder,
        loadMVS,
        loadMVSData,
        util: {
            ...MVSUtil
        }
    },
    modelArchive: {
        qualityAssessment: {
            config: MAQualityAssessmentConfig
        }
    }
};
