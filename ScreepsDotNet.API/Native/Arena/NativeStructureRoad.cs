using ScreepsDotNet.API.Arena;
using ScreepsDotNet.Interop;

namespace ScreepsDotNet.Native.Arena {
	[System.Runtime.Versioning.SupportedOSPlatform("wasi")]
	internal partial class NativeStructureRoad : NativeStructure, IStructureRoad {
		public NativeStructureRoad(INativeRoot nativeRoot, JSObject proxyObject)
			: base(nativeRoot, proxyObject) { }

		public override string ToString()
			=> Exists ? $"StructureRoad({Id}, {Position})" : "StructureRoad(DEAD)";
	}
}
