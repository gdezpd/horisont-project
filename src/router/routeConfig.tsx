import { RouteProps } from 'react-router-dom';
import { AboutPageAsync } from "../pages/AboutPage/AboutPage.async";
import { HomePageAsync } from "../pages/HomePage/HomePage.async";
import { UserPageAsync } from "../pages/UserPage/UserPage.async";

export enum AppRoutes {
    HOME = 'home',
    USER = 'user',
    ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.USER]: '/user/:userId',
    [AppRoutes.ABOUT]: '/about',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePageAsync/>,
    },
    [AppRoutes.USER]: {
        path: RoutePath.user,
        element: <UserPageAsync/>,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPageAsync/>,
    },
};
