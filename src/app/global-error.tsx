"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root Layout Error caught by global-error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "40px 20px",
          backgroundColor: "#FFFDF7",
          color: "#2C1810",
          fontFamily: "system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            padding: "32px",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #EADBCC",
            boxShadow: "0 10px 30px rgba(44, 24, 16, 0.08)",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎂</div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: "#2C1810",
            }}
          >
            Refreshing Bakery Oven...
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#5C473E",
              lineHeight: "1.6",
              marginBottom: "24px",
            }}
          >
            A fresh batch of bakery components is being prepared. If this doesn&apos;t load automatically, please click below.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              style={{
                backgroundColor: "#8B1528",
                color: "#FFFFFF",
                border: "none",
                padding: "12px 24px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Refresh Page
            </button>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                backgroundColor: "transparent",
                color: "#2C1810",
                border: "1px solid #EADBCC",
                padding: "12px 24px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
