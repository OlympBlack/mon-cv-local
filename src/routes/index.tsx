import type { ReactElement } from "react";

import Home from "../views/Home";
import Faq from "../views/Faq";
import About from "../views/About";
import Modeles from "../views/modeles/Modeles";
import ModeleEditor from "../views/modeles/ModeleEditor"; 

export interface AppRoute {
    path: string;
    element: ReactElement;
}

const routes: AppRoute[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "faq",
        element: <Faq />,
    },
    {
        path: "about",
        element: <About />,
    },
    {
        path: "modeles",
        element: <Modeles />,
    },

    // ROUTE DYNAMIQUE POUR L'ÉDITEUR
    {
        path: "modeles/:modelId",
        element: <ModeleEditor />,
    },
];

export default routes;
