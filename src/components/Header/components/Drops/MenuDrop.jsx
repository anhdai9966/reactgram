import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoadingAccount, setLogOut } from "~/app/userSlice";
import { setShowLoginModal } from "~/app/appSlice";
import { IconBookmark, IconGear } from "~/components/UI/Icons";
import { logout } from "~/services/authenticationService";
import MenuItemDrop from "./components/MenuItemDrop";

function MenuDrop() {
  const dispatch = useDispatch();

  const handleClickItemSwitchUser = () => {
    dispatch(setShowLoginModal(true));
  };

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      dispatch(setLogOut())
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
        dispatch(setLoadingAccount(true));
        setTimeout(() => {
          handleLogout();
        }, 800);
      },
    },
  ]);

  return (
    <div className="py-1 w-[240px] overflow-y-auto rounded-lg bg-white border shadow-lg">
      <ul className="flex flex-col font-light text-[#262626] divide-y">
        {listMenuTop.current.map((item, index) => (
          <MenuItemDrop key={index} item={item} />
        ))}

        <div className="h-1 bg-gray-100"></div>

        {listMenuButton.current.map((item, index) => (
          <MenuItemDrop key={index} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default MenuDrop;
