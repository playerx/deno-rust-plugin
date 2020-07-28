const plugin = await Deno.openPlugin(
  './deno-plugin/target/debug/libdeno_plugin.dylib',
)

// @ts-ignore
const { customSyncOp, customAsyncOp } = Deno.core.ops()

console.log('Custom Ops')
console.table([
  ['custom plugin', 'customSyncOp', 'customAsyncOp'],
  [plugin, customSyncOp, customAsyncOp],
])
console.log('')
console.log('')

// Banch Sync Call
{
  const syncCallDuration = banchSyncOp(customSyncOp, 100000)

  console.log('Pure Sync Op call duration (ms)')
  console.table([
    ['Min', 'Avg', 'Max'],
    [syncCallDuration.min, syncCallDuration.avg, syncCallDuration.max],
  ])
  console.log('')
  console.log('')
}

// Test Async Call
{
  const textDecoder = new TextDecoder()

  // @ts-ignore
  Deno.core.setAsyncHandler(customAsyncOp, (response) => {
    console.log(`Plugin Async Response: "${textDecoder.decode(response)}"`)
  })

  // @ts-ignore
  Deno.core.dispatch(customAsyncOp, new Uint8Array([1, 2, 3, 4]))
}

// close custom plugin, like a dispose
Deno.close(plugin)

// helper functions
function banchSyncOp(op: number, sampleSize: number) {
  const data = new Uint8Array([1, 2, 3, 4])

  const results = new Array(sampleSize).fill(0).map(() => {
    const startedAt = performance.now()

    // @ts-ignore
    let response = Deno.core.dispatch(op, data)

    return performance.now() - startedAt
  })

  return {
    min: Math.min(...results),
    avg: results.reduce((a, b) => a + b, 0) / results.length,
    max: Math.max(...results),
  }
}
