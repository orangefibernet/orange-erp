import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                padding: 40,
                fontFamily: "sans-serif",
              }}
            >
              <h1>OrangeERP</h1>

              <p>Enterprise ISP Management Platform</p>

              <p>Routing is working.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}