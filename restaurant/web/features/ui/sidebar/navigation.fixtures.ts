import { Routes } from "@constants";

type Route = {
  path: Routes;
  label: string;
};

export const routes: Route[] = [
  {
    path: Routes.ORDERS,
    label: "Orders",
  },
  {
    path: Routes.MENU,
    label: "Menu",
  },
];
