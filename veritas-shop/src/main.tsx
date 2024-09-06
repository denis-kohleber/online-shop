import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/fonts.css";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <ScrollToTop />
        </BrowserRouter>
    </StrictMode>
);
