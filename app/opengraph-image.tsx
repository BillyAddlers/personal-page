import { ImageResponse } from "next/og";

export const alt = "Riichi Rusdiana, web developer and designer";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(55% 45% at 82% 8%, rgba(54,61,117,0.45), transparent 70%), radial-gradient(45% 40% at 12% 0%, rgba(85,156,173,0.28), transparent 65%)",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#78b0be", letterSpacing: 2 }}>
            riichi.my.id
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 72,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            Riichi Rusdiana
          </div>
          <div style={{ marginTop: 16, fontSize: 36, color: "#bcd8df" }}>
            Web developer and designer
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9aa0ad" }}>
          Selected work, toolkit, and contact details
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
