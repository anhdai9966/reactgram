import { useLayoutEffect } from "react";
import { useRoutes } from "react-router-dom";
import {
  useWindowSize,
  useScrollbarWidth,
  useCreateValiableCSS,
} from "~/hooks";
import routes from "~/routes";

function App() {
  const windowSize = useWindowSize();
  useCreateValiableCSS("--window-height", `${windowSize.height}px`);

  const scrollbarWidth = useScrollbarWidth();
  useCreateValiableCSS("--scrollbar-width", `${scrollbarWidth}px`);

  useLayoutEffect(() => {
    const doc = document.documentElement;
    doc.setAttribute("dir", "ltr");
  }, []);

  const isLoggedIn = true;

  const routing = useRoutes(routes(isLoggedIn));

  return routing;
}

export default App;
