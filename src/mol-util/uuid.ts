/**
 * Copyright (c) 2017 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author David Sehnal <david.sehnal@gmail.com>
 */

import { now } from "./now";

/** A UUID, either standard 36 characters or 22 characters base64 encoded. */
type UUID = string & { "@type": "uuid" };

namespace UUID {
  // Polyfill for btoa in environments that don't have it (like Deno/Node.js)
  function toBase64(s: string): string {
    if (typeof btoa !== "undefined") {
      return btoa(s);
    }
    // Convert string to Uint8Array
    const encoder = new TextEncoder();
    const bytes = encoder.encode(s);
    // Convert to base64 using Deno/browser compatible approach
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    // Use btoa if available in this context, otherwise use our polyfill
    if (typeof btoa !== "undefined") return btoa(binary);
    // Fallback: manual base64 encoding
    const base64chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let result = "";
    let i = 0;
    while (i < binary.length) {
      const a = binary.charCodeAt(i++);
      const b = i < binary.length ? binary.charCodeAt(i++) : 0;
      const c = i < binary.length ? binary.charCodeAt(i++) : 0;
      const bitmap = (a << 16) | (b << 8) | c;
      result += base64chars.charAt((bitmap >> 18) & 63);
      result += base64chars.charAt((bitmap >> 12) & 63);
      result +=
        i - 1 < binary.length ? base64chars.charAt((bitmap >> 6) & 63) : "=";
      result += i < binary.length ? base64chars.charAt(bitmap & 63) : "=";
    }
    return result;
  }

  const _btoa = toBase64;

  const chars: string[] = [];
  /** Creates a 22 characters 'base64' encoded UUID */
  export function create22(): UUID {
    let d = +new Date() + now();
    for (let i = 0; i < 16; i++) {
      chars[i] = String.fromCharCode((d + Math.random() * 0xff) % 0xff | 0);
      d = Math.floor(d / 0xff);
    }
    return _btoa(chars.join(""))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .substr(0, 22) as UUID;
  }

  export function createv4(): UUID {
    let d = +new Date() + now();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
    return uuid as any;
  }

  export function is(x: any): x is UUID {
    return typeof x === "string";
  }
}

export { UUID };
