import { ReactElement } from "react";
import Home from "./views/Home";
import Faq from "./views/Faq";

export interface AppRoute{
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
    }
];

export default routes;