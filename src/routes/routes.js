import { Navigate, Outlet } from "react-router-dom";
import DefaultLayout from "~/layouts/DefaultLayout";
import HomePage from "~/pages/HomePage";
import UserPage from "~/pages/UserPage";
import Grid from "~/pages/UserPage/components/Grid";
import Saved from "~/pages/UserPage/components/Saved";
import Tagged from "~/pages/UserPage/components/Tagged";
import LoginPage from "~/pages/LoginPage";
import ExplorePage from "~/pages/ExplorePage";
import InboxPage from "~/pages/InboxPage";
import SuggestionsForYou from "~/pages/SuggestionsForYou";
import { ModalCommentThread } from "~/pages/HomePage/components/Modals";
import AccountsPage from "~/pages/AccountsPage";
import EditAccount from "~/pages/AccountsPage/components/EditAccount";
import ChangePassword from "~/pages/AccountsPage/components/ChangePassword";
import SignupPage from "~/pages/SignupPage";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <DefaultLayout /> : <Navigate to="/accounts/login" />,
    children: [
      {
        path: "/app",
        element: <HomePage />,
      },
      {
        path: "/post",
        element: <Outlet />,
        children: [{ path: ":postId", element: <ModalCommentThread /> }],
      },
      {
        path: "/explore",
        element: <Outlet />,
        children: [
          { path: "", element: <ExplorePage /> },
          { path: "people", element: <SuggestionsForYou /> },
        ],
      },
      {
        path: "/direct",
        element: <Outlet />,
        children: [{ path: "inbox", element: <InboxPage /> }],
      },
      {
        path: "/accounts",
        element: <AccountsPage />,
        children: [
          { path: "edit", element: <EditAccount /> },
          { path: "password/change", element: <ChangePassword /> },
        ],
      },
      {
        path: "/@:userId",
        element: <UserPage />,
        children: [
          { path: "", element: <Grid /> },
          { path: "saved", element: <Saved /> },
          { path: "tagged", element: <Tagged /> },
        ],
      },
      { path: "/", element: <Navigate to="/app" /> },
    ],
  },
  {
    path: "/",
    element: !isLoggedIn ? <Outlet /> : <Navigate to="/app" />,
    children: [
      {
        path: "accounts",
        element: <Outlet />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "emailsignup", element: <SignupPage /> },
        ],
      },
      { path: "/", element: <Navigate to="/accounts/login" /> },
    ],
  },
];

export default routes;
