import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogoCdai } from "~/components/UI/Logos";
import NavItem from "./components/NavItem";

function AccountsPage() {
  const navigate = useNavigate()

  const handleActiveNavigation = (id) => {
    setNavList(() =>
      navList.map((nav) => {
        if (nav.id === id) nav.isActive = true;
        else nav.isActive = false;

        return nav;
      })
    );
  };

  const [navList, setNavList] = useState([
    {
      id: 1,
      title: "Chỉnh sửa trang cá nhân",
      to: "edit",
      isActive: true,
      onClick: (id, to) => {
        handleActiveNavigation(id)
        navigate(to);
      },
    },
    {
      id: 2,
      title: "Đổi mật khẩu",
      to: "password/change",
      isActive: false,
      onClick: (id, to) => {
        handleActiveNavigation(id)
        navigate(to);
      },
    },
    {
      id: 3,
      title: "Themes",
      to: "",
      isActive: false,
      onClick: (id, to) => {
        handleActiveNavigation(id)
        navigate(to);
      },
    },
  ]);
  return (
    <div className="container min-h-[var(--window-height)] h-full py-5">
      <div className="h-full border divide-x flex bg-white rounded-xl overflow-hidden">
        <div className="h-full divide-y flex flex-col justify-between py-2">
          <ul className="font-light">
            {navList.map((nav) => (
              <NavItem key={nav.id} item={nav} />
            ))}
          </ul>
          <div className="py-4 pl-7 pr-4 space-y-2 shrink-0">
            <a
              href="https://github.com/anhdai9966/reactgram"
              target="blank"
              className="block"
            >
              <LogoCdai className="h-5 w-12" />
            </a>
            <a
              href="https://github.com/anhdai9966/reactgram"
              target="blank"
              className="text-[#007AFF] block text-sm"
            >
              Code Source
            </a>
            <p className="text-xs text-[#8c8c8c] font-light">
              Logo by dailai9966
            </p>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
