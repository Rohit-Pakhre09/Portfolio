import { ImageResponse } from "next/og";

export const alt = "Rohit Pakhre portfolio preview image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(52, 211, 153, 0.28), transparent 34%), linear-gradient(135deg, #020617 0%, #0b1120 100%)",
        color: "#e5e7eb",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "24px",
          borderRadius: "32px",
          border: "1px solid rgba(255,255,255,0.16)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "90px",
          top: "70px",
          width: "220px",
          height: "220px",
          borderRadius: "40px",
          background:
            "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(20,184,166,0.08))",
          border: "1px solid rgba(255,255,255,0.12)",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          fontSize: "150px",
          fontWeight: 800,
          color: "#f8fafc",
          boxShadow: "0 0 80px rgba(52,211,153,0.18)",
        }}
      >
        R
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "720px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              fontWeight: 600,
              color: "#34d399",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "74px",
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            Rohit Pakhre
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "36px",
              lineHeight: 1.3,
              color: "#cbd5e1",
            }}
          >
            Software Developer building modern, performant MERN web experiences.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "26px",
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex" }}>
            rohit-pakhre-portfolio.vercel.app
          </div>
          <div
            style={{
              display: "flex",
              width: "120px",
              height: "6px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #34d399, #14b8a6)",
            }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
