import { Route, Routes } from "react-router-dom";
import DefaultLayout from "~/layouts/DefaultLayout";
import PageHome from "~/pages/Home";
import PageUser from "~/pages/User";
import PageSignin from "~/pages/Signin";
import PageSuggestionsForYou from "~/pages/SuggestionsForYou";
import {
  useWindowSize,
  useScrollbarWidth,
  useCreateValiableCSS,
} from "~/hooks";
import { useEffect } from "react";
import PrivateRoutes from "./components/private/PrivateRoutes";
import { privateRoutes } from "./routes";

function App() {
  const windowSize = useWindowSize();
  useCreateValiableCSS("--window-height", `${windowSize.height}px`);

  const scrollbarWidth = useScrollbarWidth();
  useCreateValiableCSS("--scrollbar-width", `${scrollbarWidth}px`);

  useEffect(() => {
    const doc = document.documentElement;
    doc.setAttribute("dir", "ltr");
  }, []);

  return (
    <Routes>
      <Route path="/signin" element={<PageSignin />} />
      
      <Route element={<PrivateRoutes />}>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
