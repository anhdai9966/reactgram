import { Navigate, Outlet } from "react-router-dom";
import DefaultLayout from "~/layouts/DefaultLayout";

function PrivateRoutes() {
  const isAuth = true;

  return isAuth ? (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoutes;
