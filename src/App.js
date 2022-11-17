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
import { fetchUser, setIsLoggedIn } from "./app/userSlice";
import LoadingScreen from "./components/LoadingScreen";
import { authentication, users } from "./services";

function App() {
  const windowSize = useWindowSize();
  useCreateValiableCSS("--window-height", `${windowSize.height}px`);

  const scrollbarWidth = useScrollbarWidth();
  useCreateValiableCSS("--scrollbar-width", `${scrollbarWidth}px`);

  useLayoutEffect(() => {
    const doc = document.documentElement;
    doc.setAttribute("dir", "ltr");
  }, []);

  const { isLoggedIn } = useSelector((state) => state.user);
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
        // kiểm tra user với firestore
        const checkUser = await users.checkUserById(user.uid);
        //  nếu chưa có thì tạo thông tin với firestore không thì lấy thông tin
        if (!checkUser.data.check_id) {
          const newResUser = await users.createUser(user);
          dispatch(fetchUser(newResUser.data.data.user.uid));
        } else {
          dispatch(fetchUser(user.uid));
        }
      } catch (error) {
        console.log(error);
        // không làm gì
      }
      hiddenIsLoadingScreen();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routing = useRoutes(routes(isLoggedIn));

  if (isLoadingScreen) {
    return <LoadingScreen />;
  }

  return routing;
}

export default App;
