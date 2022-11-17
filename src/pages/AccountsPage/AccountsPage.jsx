import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavItem from "./components/NavItem";
import SourceCode from "./components/SourceCode";

function AccountsPage() {
  const navigate = useNavigate();

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
        handleActiveNavigation(id);
        navigate(to);
      },
    },
    {
      id: 2,
      title: "Đổi mật khẩu",
      to: "password/change",
      isActive: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
      },
    },
    {
      id: 3,
      title: "Themes",
      to: "",
      isActive: false,
      onClick: (id, to) => {
        handleActiveNavigation(id);
        navigate(to);
      },
    },
  ]);
  return (
    <div className="container min-h-[var(--window-height)] h-full py-5">
      <div className="h-full min-h-[calc(var(--window-height)_-_40px)] border divide-x grid lg:grid-cols-[222px_1fr] bg-white rounded-xl overflow-hidden">
        <div className="hidden lg:block">
          <div className="h-full divide-y flex flex-col justify-between py-2">
            <ul className="font-light">
              {navList.map((nav) => (
                <NavItem key={nav.id} item={nav} />
              ))}
            </ul>
            <div className="shrink-0">
              <SourceCode />
            </div>
          </div>
        </div>
        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
