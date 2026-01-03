// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/index";
import ScrollToTop from "./components/ui/ScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
