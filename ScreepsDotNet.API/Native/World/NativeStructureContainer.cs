using ScreepsDotNet.API.World;
using ScreepsDotNet.Interop;

namespace ScreepsDotNet.Native.World {
	[System.Runtime.Versioning.SupportedOSPlatform("wasi")]
	internal partial class NativeStructureContainer : NativeOwnedStructureWithStore, IStructureContainer {
		private int? ticksToDecayCache;

		public int TicksToDecay => CachePerTick(ref ticksToDecayCache) ??= ProxyObject.GetPropertyAsInt32(Names.TicksToDecay);

		public NativeStructureContainer(INativeRoot nativeRoot, JSObject proxyObject)
			: base(nativeRoot, proxyObject) { }

		protected override void ClearNativeCache() {
			base.ClearNativeCache();
			ticksToDecayCache = null;
		}

		public override string ToString()
			=> $"StructureContainer[{Id}]";
	}
}
