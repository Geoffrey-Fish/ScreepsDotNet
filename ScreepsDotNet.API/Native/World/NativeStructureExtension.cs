using ScreepsDotNet.API.World;
using ScreepsDotNet.Interop;

namespace ScreepsDotNet.Native.World {
	[System.Runtime.Versioning.SupportedOSPlatform("wasi")]
	internal partial class NativeStructureExtension : NativeOwnedStructureWithStore, IStructureExtension {
		public NativeStructureExtension(INativeRoot nativeRoot, JSObject proxyObject)
			: base(nativeRoot, proxyObject) { }

		public override string ToString()
			=> $"StructureExtension[{Id}]";
	}
}
