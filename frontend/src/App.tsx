export default function App() {
  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          borderRadius: "16px",
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            color: "#F57C00",
            marginBottom: "12px",
          }}
        >
          OrangeERP
        </h1>

        <p
          style={{
            color: "#666",
            margin: 0,
          }}
        >
          Enterprise ISP Management Platform
        </p>

        <p
          style={{
            marginTop: "24px",
            fontSize: "14px",
            color: "#999",
          }}
        >
          Release 0.2.1 - Foundation
        </p>
      </div>
    </div>
  );
}