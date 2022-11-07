import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  useBoolean,
  useLocationChange,
  useMediaQuery,
  useOnClickOutside,
  usePathName,
} from "~/hooks";
import {
  Icon3Line,
  Icon3LineFill,
  IconBell,
  IconBellFill,
  IconHouse,
  IconHouseFill,
  IconLocationCircle,
  IconLocationFill,
  IconMessage,
  IconMessageFill,
  IconPlusCircle,
  IconPlusCircleFill,
  IconProfile,
  IconProfileFill,
  IconReactgram,
  IconSearch,
  IconSearchFill,
} from "~/components/UI/Icons";
import { LogoReactgram } from "~/components/UI/Logos";
import ModalLayout from "~/layouts/ModalLayout";
import { ModalClearAllRecent, PostMediaModal } from "./components/Modals";
import { NotificationDrop, SearchDrop, MenuDrop } from "./components/Drops";
import NavigationItem from "./components/NavigationItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsShowClearAllRecentModal } from "./HeaderSlice";
import DropLayout from "~/layouts/DropLayout";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const { isShowClearAllRecentModal } = useSelector((state) => state.header);
  const dispatch = useDispatch();

  const {
    state: isShownModalPostMedia,
    setTrue: shownModalPostMedia,
    setFalse: closeModalPostMedia,
  } = useBoolean();

  const {
    state: isOpenDropMenuProfile,
    setFalse: closeDropMenuProfile,
    toggle: toggleDropMenuProfile,
  } = useBoolean();

  const {
    state: isOpenDropSearch,
    toggle: toggleDropSearch,
    setFalse: closeDropSearch,
  } = useBoolean();

  const {
    state: isOpenDropNotification,
    toggle: toggleDropNotification,
    setFalse: closeDropNotification,
  } = useBoolean();

  const pathname = usePathName();

  const matchesSideBar = useMediaQuery("min-width: 1280px");

  const [isShow, setIsShow] = useState({
    dropSidebar: false,
    modal: false,
    btnCloseModal: false,
  });

  useEffect(() => {
    setIsShow({
      dropSidebar: isOpenDropSearch || isOpenDropNotification,
      modal: isShownModalPostMedia || isShowClearAllRecentModal,
      btnCloseModal: isShownModalPostMedia,
    });
  }, [
    isOpenDropSearch,
    isOpenDropNotification,
    isShownModalPostMedia,
    isShowClearAllRecentModal,
  ]);

  const getIdNavigation = (pathname) => {
    const navCurrent = navList.find((nav) => nav?.to === pathname);
    return navCurrent?.id || null;
  };

  const handleActiveNavigation = (id) => {
    setNavList(() =>
      navList.map((nav) => {
        if (nav.id === id) nav.active = true;
        else nav.active = false;

        return nav;
      })
    );
  };

  const modalRef = useOnClickOutside(() => {
    closeModalPostMedia();
    dispatch(setIsShowClearAllRecentModal(false));
    handleActiveNavigation(getIdNavigation(pathname));
  });

  const headerRef = useOnClickOutside(() => {
    if (!isShowClearAllRecentModal) {
      closeDropSearch();
    }
    closeDropNotification();
    closeDropMenuProfile();
    handleActiveNavigation(getIdNavigation(pathname));
  });

  useLocationChange(() => {
    closeDropMenuProfile();
    closeDropSearch();
  });

  const [navList, setNavList] = useState([
    {
      id: 0,
      title: "Xem thêm",
      Icon: <Icon3Line />,
      IconActive: <Icon3LineFill />,
      active: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        toggleDropMenuProfile();
      },
    },
    {
      id: 1,
      title: "Trang chủ",
      Icon: <IconHouse />,
      IconActive: <IconHouseFill />,
      active: true,
      to: "/",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeDropSearch();
        closeDropNotification();
      },
    },
    {
      id: 2,
      title: "Tìm kiếm",
      Icon: <IconSearch />,
      IconActive: <IconSearchFill />,
      active: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        toggleDropSearch();
        closeDropNotification();
      },
    },

    {
      id: 3,
      title: "Khám phá",
      Icon: <IconLocationCircle />,
      IconActive: <IconLocationFill />,
      active: false,
      to: "/explore",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeDropSearch();
        closeDropNotification();
      },
    },
    {
      id: 4,
      title: "Tin nhắn",
      Icon: <IconMessage />,
      IconActive: <IconMessageFill />,
      active: false,
      to: "/direct/inbox",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeDropSearch();
        closeDropNotification();
      },
    },
    {
      id: 5,
      title: "Thông báo",
      Icon: <IconBell />,
      IconActive: <IconBellFill />,
      active: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        closeDropSearch();
        toggleDropNotification();
      },
    },
    {
      id: 6,
      title: "Tạo",
      Icon: <IconPlusCircle />,
      IconActive: <IconPlusCircleFill />,
      active: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        shownModalPostMedia();
      },
    },
    {
      id: 7,
      title: "Trang cá nhân",
      Icon: <IconProfile />,
      IconActive: <IconProfileFill />,
      active: false,
      to: "/@dailai3110",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeDropSearch();
        closeDropNotification();
      },
    },
  ]);

  return (
    <div
      ref={headerRef}
      className="sticky top-0 hidden sm:block h-[var(--window-height)] z-50 flex-shrink-0"
    >
      <header className="inline-block h-full w-auto relative">
        {/* modal */}
        <ModalLayout
          ref={modalRef}
          isShow={isShow.modal}
          isShowBtn={isShow.btnCloseModal}
        >
          {isShownModalPostMedia && <PostMediaModal />}

          {isShowClearAllRecentModal && <ModalClearAllRecent />}
        </ModalLayout>

        {/* sidebar */}
        <AnimatePresence>
          {isShow.dropSidebar && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              // ref={sideBarRef}
              className="absolute top-0 left-[73px] h-full bg-white border-r rounded-r-3xl shadow-2xl overflow-hidden"
            >
              <div className="w-96">
                {isOpenDropSearch && <SearchDrop />}
                {isOpenDropNotification && <NotificationDrop />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* navigation */}
        <div className="relative h-full w-fit flex flex-col justify-between px-3 py-5 bg-white border-r">
          <div className="px-3 py-5">
            <Link to="/" className="h-9 inline-block">
              {(isShow.dropSidebar || !matchesSideBar) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <IconReactgram className="w-6 h-6 transition-transform duration-300 hover:scale-105" />
                </motion.div>
              )}
              {!isShow.dropSidebar && matchesSideBar && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LogoReactgram className="w-24 h-8" />
                </motion.div>
              )}
            </Link>
          </div>

          <div className="overflow-y-auto flex-grow flex flex-col scrollbar:hidden">
            {navList.slice(1).map((nav, index) => (
              <NavigationItem
                key={index}
                item={nav}
                isSideBar={isShow.dropSidebar}
                matches={matchesSideBar}
              />
            ))}
          </div>

          <div className="relative">
            <NavigationItem
              item={navList[0]}
              isSideBar={isShow.dropSidebar}
              matches={matchesSideBar}
            />
            <DropLayout isShow={isOpenDropMenuProfile}>
              <MenuDrop />
            </DropLayout>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
