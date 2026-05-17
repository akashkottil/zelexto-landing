/**
 * Atmosphere — lightweight, CSS-only ambient background.
 * Soft violet radial gradients + a faint dot grid. No canvas, no scroll listeners.
 */
export default function Atmosphere() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,149,168,0.5) 0.6px, transparent 0.6px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Violet radial — top-right */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.22] drift"
        style={{
          background:
            "radial-gradient(circle, rgba(108,92,231,0.55), transparent 65%)",
          filter: "blur(120px)",
        }}
      />

      {/* Violet deep — bottom-left */}
      <div
        className="absolute bottom-[-20%] left-[-15%] w-[600px] h-[600px] rounded-full opacity-[0.18] drift-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(74,61,201,0.6), transparent 65%)",
          filter: "blur(110px)",
        }}
      />

      {/* Tiny lime spark — mid-right (signature 2% accent) */}
      <div
        className="absolute top-[42%] right-[12%] w-[2px] h-[2px] rounded-full opacity-60"
        style={{
          background: "var(--lime)",
          boxShadow: "0 0 8px rgba(212,255,79,0.7)",
        }}
      />
    </div>
  );
}
