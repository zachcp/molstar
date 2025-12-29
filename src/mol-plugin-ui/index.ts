/**
 * Copyright (c) 2018-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { createElement } from "react";
import { Plugin } from "./plugin.tsx";
import { PluginUIContext } from "./context.ts";
import { DefaultPluginUISpec, type PluginUISpec } from "./spec.ts";

export { DefaultPluginUISpec, type PluginUISpec } from "./spec.ts";
export { PluginUIContext } from "./context.ts";
export { renderReact18 } from "./react18.ts";

export async function createPluginUI(options: {
  target: HTMLElement;
  render: (component: any, container: Element) => any;
  spec?: PluginUISpec;
  onBeforeUIRender?: (ctx: PluginUIContext) => Promise<void> | void;
}): Promise<PluginUIContext> {
  const { spec, target, onBeforeUIRender, render } = options;
  const ctx = new PluginUIContext(spec || DefaultPluginUISpec());
  await ctx.init();
  if (onBeforeUIRender) {
    await onBeforeUIRender(ctx);
  }
  render(createElement(Plugin, { plugin: ctx }), target);
  try {
    await ctx.canvas3dInitialized;
  } catch {
    // Error reported in UI/console elsewhere.
  }
  return ctx;
}
