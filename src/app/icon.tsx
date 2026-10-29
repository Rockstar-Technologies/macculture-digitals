import { ImageResponse } from "next/og";

// Placeholder favicon from the temporary "MD" mark. Replace with the real logo.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ff6a00",
          fontSize: 28,
          fontWeight: 800,
          borderRadius: 32,
          border: "3px solid #ff6a00",
        }}
      >
        MD
      </div>
    ),
    size,
  );
}
