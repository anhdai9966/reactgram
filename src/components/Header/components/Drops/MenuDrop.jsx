import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, setLoadingAccount } from "~/app/accountSlice";
import { setShowLoginModal } from "~/app/appSlice";
import { IconBookmark, IconGear, IconSpinner8Spins } from "~/components/UI/Icons";
import { logout } from "~/services/accountService";
import DropMenuItem from "./components/MenuItem";

function MenuDrop() {
  const dispatch = useDispatch();

  const handleClickItemSwitchUser = () => {
    dispatch(setShowLoginModal(true));
  };

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.log(error);
    }
  }

  const listMenuTop = useRef([
    {
      title: "Cài đặt",
      Icon: <IconGear />,
      to: "/accounts/edit",
      onClick: (to) => {
        navigate(to);
      },
    },
    {
      title: "Đã lưu",
      Icon: <IconBookmark />,
      to: "/@dailai3110/saved",
      onClick: (to) => {
        navigate(to);
      },
    },
  ]);

  const listMenuButton = useRef([
    {
      title: "Chuyển tài khoản",
      onClick: (to) => {
        handleClickItemSwitchUser();
      },
    },
    {
      title: "Đăng xuất",
      iconAction: true,
      onClick: (to) => {
        dispatch(setLoadingAccount(true))
        setTimeout(() => {
          handleLogout();
          dispatch(setIsLoggedIn(false))
          dispatch(setLoadingAccount(false))
        }, 600);
      },
    },
  ]);

  return (
    <div className="py-1 w-[240px] overflow-y-auto rounded-lg bg-white border shadow-lg">
      <ul className="flex flex-col font-light text-[#262626] divide-y">
        {listMenuTop.current.map((item, index) => (
          <DropMenuItem key={index} item={item} />
        ))}

        <div className="h-1 bg-gray-100"></div>

        {listMenuButton.current.map((item, index) => (
          <DropMenuItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default MenuDrop;
