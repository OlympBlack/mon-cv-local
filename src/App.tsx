// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/index";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <ToastContainer position="bottom-right" theme="colored" />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
