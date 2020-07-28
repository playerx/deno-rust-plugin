use deno_core::plugin_api::Buf;
use deno_core::plugin_api::Interface;
use deno_core::plugin_api::Op;
use deno_core::plugin_api::ZeroCopyBuf;
use futures::future::FutureExt;

#[no_mangle]
pub fn deno_plugin_init(interface: &mut dyn Interface) {
  interface.register_op("customSyncOp", op_test_sync);
  interface.register_op("customAsyncOp", op_test_async);
}

fn op_test_sync(_interface: &mut dyn Interface, _zero_copy: &mut [ZeroCopyBuf]) -> Op {
  let result = b"test";
  let result_box: Buf = Box::new(*result);
  Op::Sync(result_box)
}

fn op_test_async(_interface: &mut dyn Interface, _zero_copy: &mut [ZeroCopyBuf]) -> Op {
  let fut = async move {
    let result = b"async returned value from Rust plugin";
    let result_box: Buf = Box::new(*result);
    result_box
  };

  Op::Async(fut.boxed())
}
