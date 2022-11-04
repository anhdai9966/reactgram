import { Navigate, Outlet } from "react-router-dom";
import PageHome from "~/pages/HomePage";
import PageUser from "~/pages/UserPage";
import PageLogin from "~/pages/LoginPage";
import SuggestionsForYou from "~/pages/SuggestionsForYou";
import Explore from "~/pages/ExplorePage";
import Inbox from "~/pages/InboxPage";
import Grid from "~/pages/UserPage/components/Grid";
import Saved from "~/pages/UserPage/components/Saved";
import DefaultLayout from "~/layouts/DefaultLayout";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <DefaultLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: "/app",
        element: <PageHome />,
      },
      {
        path: "/explore",
        element: <Outlet />,
        children: [
          { path: "", element: <Explore /> },
          { path: "people", element: <SuggestionsForYou /> },
        ],
      },
      {
        path: "/direct",
        element: <Outlet />,
        children: [{ path: "inbox", element: <Inbox /> }],
      },
      {
        path: "/@:userId",
        element: <PageUser />,
        children: [
          { path: "", element: <Grid /> },
          { path: "saved", element: <Saved /> },
        ],
      },
      { path: "/", element: <Navigate to="/app" /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <Outlet /> : <Navigate to="/app" />,
    children: [
      { path: "login", element: <PageLogin /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;
