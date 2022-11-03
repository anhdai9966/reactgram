import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  useBoolean,
  useCreateValiableCSS,
  useElementSize,
  useLocationChage,
  useMediaQuery,
  useOnClickOutside,
  usePathName,
} from "~/hooks";
import {
  Icon3Line,
  Icon3LineFill,
  IconFindPeople,
  IconFindPeopleFill,
  IconHeart,
  IconHeartFill,
  IconHouse,
  IconHouseFill,
  IconMessenger,
  IconMessengerFill,
  IconPlusCircle,
  IconPlusCircleFill,
  IconProfile,
  IconProfileFill,
  IconReactgram,
  IconSearch,
  IconSearchFill,
  IconXmark,
} from "~/components/Icons";
import { Logo } from "~/components/Logo";
import { ModalClearAllRecent, ModalPostMedia } from "./Modals";
import DropMenuProfile from "./DropMenuProfile";
import NavigationItem from "./NavigationItem";
import { DropSearch } from "./Drops";

function Header() {
  const navigate = useNavigate();

  const [headerSize, headerRef] = useElementSize();
  useCreateValiableCSS("--header-width", `${headerSize.width}px`);

  const {
    state: isShownModalClearAllRecent,
    setTrue: shownModalClearAllRecent,
    setFalse: closeModalClearAllRecent,
  } = useBoolean();

  const {
    state: isShownModalPostMedia,
    setTrue: shownModalPostMedia,
    setFalse: closeModalPostMedia,
  } = useBoolean();

  const {
    state: isOpenDropMenuProfile,
    setTrue: openDropMenuProfile,
    setFalse: closeDropMenuProfile,
  } = useBoolean();

  const {
    state: isOpenDropSideBar,
    toggle: toggleSideBar,
    setFalse: closeSideBar,
  } = useBoolean();

  const pathname = usePathName();

  const matchesSideBar = useMediaQuery("(min-width: 1280px)");

  const isShownModal = isShownModalPostMedia || isShownModalClearAllRecent;
  const isShownBtnClose = isShownModalPostMedia;

  const getIdNavigation = (pathname) => {
    const navCurrent = navList.find((nav) => nav?.to === pathname);
    return navCurrent.id;
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
    closeModalClearAllRecent();
    handleActiveNavigation(getIdNavigation(pathname));
  });

  const dropMenuProfileRef = useOnClickOutside(() => {
    closeDropMenuProfile();
    handleActiveNavigation(getIdNavigation(pathname));
  });

  // const sideBarRef = useOnClickOutside(() => {
  //   if (!isShownModalClearAllRecent) {
  //     closeSideBar();
  //     handleActiveNavigation(getIdNavigation(pathname));
  //   }
  // });

  useLocationChage(() => {
    closeDropMenuProfile();
    closeSideBar();
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
        openDropMenuProfile();
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
        closeSideBar();
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
        toggleSideBar();
      },
    },

    {
      id: 3,
      title: "Khám phá",
      Icon: <IconFindPeople />,
      IconActive: <IconFindPeopleFill />,
      active: false,
      to: "/explore",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeSideBar();
      },
    },
    {
      id: 4,
      title: "Tin nhắn",
      Icon: <IconMessenger />,
      IconActive: <IconMessengerFill />,
      active: false,
      to: "/inbox",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeSideBar();
      },
    },
    {
      id: 5,
      title: "Thông báo",
      Icon: <IconHeart />,
      IconActive: <IconHeartFill />,
      active: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        closeSideBar();
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
      to: "/@user",
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
        closeSideBar();
      },
    },
  ]);

  return (
    <div
      ref={headerRef}
      className={`sticky top-0 hidden sm:block h-[var(--window-height)] z-50 flex-shrink-0 ${
        isOpenDropSideBar && "w-[var(--header-width)]"
      }`}
    >
      <header className="inline-block h-full w-auto relative">
        {/* overlay */}
        {isShownModal && (
          <div className="fixed inset-0 z-50 bg-black/[65%]">
            {isShownBtnClose && (
              <button className="transition-transform duration-300 hover:scale-105 hover:bg-black/10 p-3 rounded-lg absolute right-3 top-3">
                <IconXmark className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        )}
        {/* modal */}
        <AnimatePresence>
          {isShownModal && (
            <motion.div
              initial={{
                opacity: 1,
                scale: 1.1,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                translateX: "-50%",
                translateY: "-50%",
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                translateX: "-50%",
                translateY: "-50%",
              }}
              ref={modalRef}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              {isShownModalPostMedia && <ModalPostMedia />}

              {isShownModalClearAllRecent && (
                <ModalClearAllRecent toggle={closeModalClearAllRecent} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* sidebar */}
        <AnimatePresence>
          {isOpenDropSideBar && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              // ref={sideBarRef}
              className="absolute top-0 left-[73px] h-full bg-white border-r rounded-r-3xl shadow-2xl overflow-hidden"
            >
              <DropSearch />
            </motion.div>
          )}
        </AnimatePresence>
        {/* navigation */}
        <div className="relative h-full w-fit flex flex-col justify-between px-3 py-5 bg-white border-r">
          <div className="px-3 py-5">
            <Link to="/" className="h-9 inline-block">
              {(isOpenDropSideBar || !matchesSideBar) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <IconReactgram className="w-6 h-6 transition-transform duration-300 hover:scale-105" />
                </motion.div>
              )}
              {!isOpenDropSideBar && matchesSideBar && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Logo className="w-24 h-8" />
                </motion.div>
              )}
            </Link>
          </div>

          <div className="overflow-y-auto flex-grow flex flex-col scrollbar:hidden">
            {navList.slice(1).map((nav, index) => (
              <NavigationItem
                key={index}
                item={nav}
                isSideBar={isOpenDropSideBar}
                matches={matchesSideBar}
              />
            ))}
          </div>

          <div className="relative">
            <NavigationItem
              item={navList[0]}
              isSideBar={isOpenDropSideBar}
              matches={matchesSideBar}
            />
            <AnimatePresence>
              {isOpenDropMenuProfile && (
                <motion.div
                  initial={{ opacity: 1, scale: "20%", x: 0 }}
                  animate={{ opacity: 1, scale: "100%", x: 0 }}
                  exit={{ opacity: 0, scale: "20%", x: 0 }}
                  style={{ originX: 0, originY: 1 }}
                  ref={dropMenuProfileRef}
                  className="absolute bottom-full left-0"
                >
                  <DropMenuProfile />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
