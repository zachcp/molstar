# Dependency Comparison: deno.json vs upstream package.json

## Summary

- **Total packages in upstream:** 29
- **Total packages in deno.json:** 23
- **Matches:** 18
- **Version mismatches:** 2
- **Missing in deno.json:** 9
- **Extra in deno.json:** 3

## ⚠️ Version Mismatches

| Package | Upstream | deno.json |
|---------|----------|-----------|
| `react` | `>=16.14.0` | `^18.3.1/jsx-runtime` |
| `react-dom` | `>=16.14.0` | `^18.3.1` |

## ❌ Missing in deno.json

| Package | Upstream Version | Type |
|---------|------------------|------|
| `@google-cloud/storage` | `^7.14.0` | peer |
| `@types/argparse` | `^2.0.17` | regular |
| `@types/benchmark` | `^2.1.5` | regular |
| `@types/compression` | `1.8.1` | regular |
| `@types/express` | `^5.0.3` | regular |
| `@types/node` | `^20.19.17` | regular |
| `@types/node-fetch` | `^2.6.13` | regular |
| `@types/swagger-ui-dist` | `3.30.6` | regular |
| `canvas` | `^2.11.2` | peer |

## ➕ Extra in deno.json

| Package | Version |
|---------|---------|
| `@types/react` | `^18.3.26` |
| `@types/react-dom` | `^18.3.7` |
| `@types/webxr` | `^0.5.24` |

## ✅ Matching Versions

<details>
<summary>Click to expand</summary>

| Package | Version |
|---------|---------|
| `argparse` | `^2.0.1` |
| `compression` | `^1.8.1` |
| `cors` | `^2.8.5` |
| `express` | `^5.1.0` |
| `gl` | `^6.0.2` |
| `h264-mp4-encoder` | `^1.0.12` |
| `immutable` | `^5.1.3` |
| `io-ts` | `^2.2.22` |
| `jpeg-js` | `^0.4.4` |
| `mutative` | `^1.3.0` |
| `node-fetch` | `^2.7.0` |
| `pngjs` | `^6.0.0` |
| `react-markdown` | `^10.1.0` |
| `remark-gfm` | `^4.0.1` |
| `rxjs` | `^7.8.2` |
| `swagger-ui-dist` | `^5.29.0` |
| `tslib` | `^2.8.1` |
| `util.promisify` | `^1.1.3` |

</details>

## 🔧 Recommendations

### Update Version Mismatches

```bash
# Update deno.json to match upstream versions:
# react: >=16.14.0
# react-dom: >=16.14.0
```

### Missing Dependencies

**Regular dependencies** - Should probably add:

- `@types/argparse@^2.0.17`
- `@types/benchmark@^2.1.5`
- `@types/compression@1.8.1`
- `@types/express@^5.0.3`
- `@types/node@^20.19.17`
- `@types/node-fetch@^2.6.13`
- `@types/swagger-ui-dist@3.30.6`

**Peer dependencies** - Optional (already in deno.json if needed):

- `@google-cloud/storage@^7.14.0` (optional)
- `canvas@^2.11.2` (optional)

