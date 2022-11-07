import { useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import {
  IconGrid,
  IconGear,
  IconPersonCropCircleBadgeCheckmark,
  IconProfileFill,
  IconTag,
  IconVerified,
  IconBookmark,
} from "~/components/UI/Icons";
import { useDocumentTitle } from "~/hooks";
import FooterLayout from "~/layouts/FooterLayout";
import { selectFile } from "~/utils";
import Tabs from "./components/Tabs";

function PageUser() {
  const para = useParams();
  const { userId } = para;

  useDocumentTitle(`Sơn Tùng M-TP 💋 (@${userId}) • Reactgram photos`);

  const handleClickAvatar = async () => {
    let files = await selectFile("image/*");
    console.log(files);
    // contentElement.innerHTML = files
    //   .map(
    //     (file) =>
    //       `<img src="${URL.createObjectURL(
    //         file
    //       )}" style="width: 100px; height: 100px;">`
    //   )
    //   .join("");
  };

  const navigate = useNavigate();

  const handleActiveTabs = (id) => {
    setTabs(() =>
      tabs.map((tab) => {
        if (tab.id === id) tab.isActive = true;
        else tab.isActive = false;

        return tab;
      })
    );
  };

  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: "Bài viết",
      Icon: <IconGrid />,
      isActive: true,
      to: "",
      onClick: (id, to) => {
        navigate(to);
        handleActiveTabs(id);
      },
    },
    {
      id: 2,
      title: "Đã lưu",
      Icon: <IconBookmark />,
      isActive: false,
      to: "saved",
      onClick: (id, to) => {
        navigate(to);
        handleActiveTabs(id);
      },
    },
    {
      id: 3,
      title: "Được gắn thẻ",
      Icon: <IconTag />,
      isActive: false,
      to: "tagged",
      onClick: (id, to) => {
        navigate(to);
        handleActiveTabs(id);
      },
    },
  ]);

  return (
    <FooterLayout>
      <div className="pt-[30px] px-5 w-full">
        <div className="grid grid-cols-3 gap-[30px] pb-11 font-light">
          <div className="flex items-center justify-center">
            <button onClick={handleClickAvatar}>
              <div className="rounded-full overflow-hidden w-16 h-16 md:w-40 md:h-40 flex-shrink-0">
                {/* <img
                  src={images.avatarSonTung}
                  alt="avatar"
                /> */}
                <IconProfileFill className="text-[#dbdbdb]" />
              </div>
            </button>
          </div>

          <div className="col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-extralight">{userId}</h1>
                <div className="w-4 h-4">
                  <IconVerified />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="min-w-24 h-8 flex items-center justify-center border rounded">
                  {/* <span className="text-sm font-semibold">Nhắn tin</span> */}
                  <span className="text-sm font-semibold px-2">
                    Chỉnh sửa trang cá nhân
                  </span>
                </button>
                <button className="w-24 h-8 flex items-center justify-center border rounded">
                  <div className="w-5 h-4">
                    <IconPersonCropCircleBadgeCheckmark />
                  </div>
                </button>
                <button className="w-24 h-8 flex items-center justify-center border rounded bg-[#0095f6] ">
                  <span className="text-sm font-semibold text-white">
                    Theo dõi
                  </span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#3c3c43]/5 rounded-lg">
                  <div className="w-6 h-6">
                    {/* <MoreIcon /> */}
                    <IconGear />
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-9">
              <p className="">
                <span className="font-semibold">1,784</span>{" "}
                <span>bài viết</span>
              </p>
              <p className="">
                <span className="font-semibold">801K</span>{" "}
                <span>người theo dõi</span>
              </p>
              <p className="">
                <span>Đang theo dõi</span>{" "}
                <span className="font-semibold">979</span> <span>người</span>
              </p>
            </div>

            <div className="">
              <h5 className="font-semibold">Sơn Tùng M-TP 💋</h5>
              <p>Stream THERE'S NO ONE AT ALL 🍭</p>
            </div>
          </div>
        </div>

        <div className="border-t">
          <ul className="w-full flex items-center justify-center gap-12 uppercase text-sm font-semibold text-[#3c3c43]/60">
            {tabs.map((tab) => (
              <Tabs key={tab.id} item={tab} />
            ))}
          </ul>
        </div>

        <div className="py-1">
          <Outlet />
        </div>
      </div>
    </FooterLayout>
  );
}

export default PageUser;
