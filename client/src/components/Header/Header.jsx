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
} from "~/components/UI/Icons";
import { LogoReactgram } from "~/components/UI/Logos";
import ModalLayout from "~/layouts/ModalLayout";
import { ModalClearAllRecent, ModalPostMedia } from "./components/Modals";
import DropMenuProfile from "./components/DropMenuProfile";
import { DropNotification, DropSearch } from "./components/Drops";
import NavigationItem from "./components/NavigationItem";

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

  const matchesSideBar = useMediaQuery("(min-width: 1280px)");

  const isOpenDrop = isOpenDropSearch || isOpenDropNotification;
  const isShowModal = isShownModalPostMedia || isShownModalClearAllRecent;
  const isShowBtnCloseModal = isShownModalPostMedia;

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
        if (!isOpenDropMenuProfile) {
          toggleDropMenuProfile();
        }
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
      Icon: <IconFindPeople />,
      IconActive: <IconFindPeopleFill />,
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
      Icon: <IconMessenger />,
      IconActive: <IconMessengerFill />,
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
      Icon: <IconHeart />,
      IconActive: <IconHeartFill />,
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
      className={`sticky top-0 hidden sm:block h-[var(--window-height)] z-50 flex-shrink-0 ${
        isOpenDropSearch && "w-[var(--header-width)]"
      }`}
    >
      <header className="inline-block h-full w-auto relative">
        {/* modal */}
        <ModalLayout
          ref={modalRef}
          isShow={isShowModal}
          isShownBtn={isShowBtnCloseModal}
        >
          {isShownModalPostMedia && <ModalPostMedia />}

          {isShownModalClearAllRecent && (
            <ModalClearAllRecent toggle={closeModalClearAllRecent} />
          )}
        </ModalLayout>

        {/* sidebar */}
        <AnimatePresence>
          {isOpenDrop && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              // ref={sideBarRef}
              className="absolute top-0 left-[73px] h-full bg-white border-r rounded-r-3xl shadow-2xl overflow-hidden"
            >
              <div className="w-96">
                {isOpenDropSearch && <DropSearch />}
                {isOpenDropNotification && <DropNotification />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* navigation */}
        <div className="relative h-full w-fit flex flex-col justify-between px-3 py-5 bg-white border-r">
          <div className="px-3 py-5">
            <Link to="/" className="h-9 inline-block">
              {(isOpenDrop || !matchesSideBar) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <IconReactgram className="w-6 h-6 transition-transform duration-300 hover:scale-105" />
                </motion.div>
              )}
              {!isOpenDrop && matchesSideBar && (
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
                isSideBar={isOpenDrop}
                matches={matchesSideBar}
              />
            ))}
          </div>

          <div className="relative">
            <NavigationItem
              item={navList[0]}
              isSideBar={isOpenDrop}
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
