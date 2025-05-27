import { createRoot } from "react-dom/client";
import "./index.css";
import { Router } from "./Router.tsx";
// import "swiper/css";

createRoot(document.getElementById("root")!).render(<Router />);
