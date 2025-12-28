import type { ReactElement } from "react";
import Home from "./views/Home";
import Faq from "./views/Faq";

import About from "./views/About";

export interface AppRoute {
    path: string;
    element: ReactElement;
}

const routes: AppRoute[] = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "faq",
        element: <Faq />
    },
    {
        path: "about",
        element: <About />
    }
];

export default routes;