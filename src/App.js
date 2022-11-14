import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import {
  useWindowSize,
  useScrollbarWidth,
  useCreateValiableCSS,
  useBoolean,
} from "~/hooks";
import routes from "~/routes";
import { fetchUser, setIsLoggedIn } from "./app/accountSlice";
import LoadingScreen from "./components/LoadingScreen";
import { authentication } from "./services";

function App() {
  const windowSize = useWindowSize();
  useCreateValiableCSS("--window-height", `${windowSize.height}px`);

  const scrollbarWidth = useScrollbarWidth();
  useCreateValiableCSS("--scrollbar-width", `${scrollbarWidth}px`);

  useLayoutEffect(() => {
    const doc = document.documentElement;
    doc.setAttribute("dir", "ltr");
  }, []);

  const { isLoggedIn } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const {
    state: isLoadingScreen,
    setFalse: hiddenIsLoadingScreen,
    setTrue: showIsLoadingScreeen,
  } = useBoolean(true);

  useEffect(() => {
    (async () => {
      try {
        showIsLoadingScreeen();
        const user = await authentication.checkLogin((isState) => {
          dispatch(setIsLoggedIn(isState));
        });

        dispatch(fetchUser(user.uid));
      } catch (error) {
        // không làm gì
      }
      hiddenIsLoadingScreen();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const routing = useRoutes(routes(isLoggedIn));

  if (isLoadingScreen) {
    return <LoadingScreen />;
  }

  return routing;
}

export default App;
