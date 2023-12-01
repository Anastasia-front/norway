import { Route, Routes } from "react-router-dom";

import { Home, NotFound } from "./pages";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
