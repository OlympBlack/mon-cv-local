import { ReactElement } from "react";
import Home from "./views/Home";

export interface AppRoute{
    path: string;
    element: ReactElement;
}

const routes: AppRoute[] = [
    {
        path: "/",
        element: <Home />
    }
];

export default routes;