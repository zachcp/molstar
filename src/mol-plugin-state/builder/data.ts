/**
 * Copyright (c) 2019 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { StateTransform, StateTransformer } from '../../mol-state/index.ts';
import { PluginContext } from '../../mol-plugin/context.ts';
import { Download, DownloadBlob, RawData, ReadFile } from '../transforms/data.ts';
import { getFileNameInfo } from '../../mol-util/file-info.ts';

export class DataBuilder {
    private get dataState() {
        return this.plugin.state.data;
    }

    rawData(params: StateTransformer.Params<RawData>, options?: Partial<StateTransform.Options>) {
        const data = this.dataState.build().toRoot().apply(RawData, params, options);
        return data.commit({ revertOnError: true });
    }

    download(params: StateTransformer.Params<Download>, options?: Partial<StateTransform.Options>) {
        const data = this.dataState.build().toRoot().apply(Download, params, options);
        return data.commit({ revertOnError: true });
    }

    downloadBlob(
        params: StateTransformer.Params<DownloadBlob>,
        options?: Partial<StateTransform.Options>,
    ) {
        const data = this.dataState.build().toRoot().apply(DownloadBlob, params, options);
        return data.commit({ revertOnError: true });
    }

    async readFile(
        params: StateTransformer.Params<ReadFile>,
        options?: Partial<StateTransform.Options>,
    ) {
        const data = await this.dataState.build().toRoot().apply(ReadFile, params, options).commit({
            revertOnError: true,
        });
        const fileInfo = getFileNameInfo(params.file?.file?.name ?? '');
        return { data: data, fileInfo };
    }

    constructor(public plugin: PluginContext) {
    }
}
