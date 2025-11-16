using ScreepsDotNet.API.Arena;
using ScreepsDotNet.Interop;

namespace ScreepsDotNet.Native.Arena {
	[System.Runtime.Versioning.SupportedOSPlatform("wasi")]
	internal partial class NativeStructureWall : NativeStructure, IStructureWall {
		public NativeStructureWall(INativeRoot nativeRoot, JSObject proxyObject)
			: base(nativeRoot, proxyObject) { }

		public override string ToString()
			=> Exists ? $"StructureWall({Id}, {Position})" : "StructureWall(DEAD)";
	}
}
