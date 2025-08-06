import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn } from "./pages/auth";
import SingleBook from "./pages/single/SingleBook";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Users",
        path: "/users",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Books",
        path: "/books",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Orders",
        path: "/orders",
        element: <Notifications />,
      },
      {
        // icon: <InformationCircleIcon {...icon} />,
        name: "Books",
        path: "/books/:id",
        element: <SingleBook />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "admin",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "LOG OUT",
        path: "",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
