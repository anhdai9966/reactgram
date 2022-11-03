import { Link, useParams } from "react-router-dom";
import images from "~/assets/images";
import {
  GridIcon,
  IconCommentFill,
  IconHeartFill,
  IconPersonCropCircleBadgeCheckmark,
  IconTag,
  IconVerified,
  MoreIcon,
  SaveIcon,
} from "~/components/Icons";
import { useDocumentTitle } from "~/hooks";
import { numberFormater } from "~/services";

function PageUser() {
  const para = useParams();
  const { userId } = para;

  useDocumentTitle(`Sơn Tùng M-TP 💋 (@${userId}) • Reactgram photos`);

  return (
    <>
      <div className="pt-[30px] px-5 w-full">
        <div className="grid grid-cols-3 gap-[30px] pb-11 font-light">
          <div className="flex items-center justify-center">
            <div className="rounded-full overflow-hidden w-16 h-16 md:w-40 md:h-40 flex-shrink-0">
              <img
                src={images.avatarSonTung}
                alt="avatar"
                className="w-full h-full"
              />
            </div>
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
                <button className="w-24 h-8 flex items-center justify-center border rounded">
                  <span className="text-sm font-semibold">Nhắn tin</span>
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
                    <MoreIcon />
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
          <div className="w-full flex items-center justify-center gap-12 uppercase text-xs font-semibold text-[#3c3c43]/60">
            <div className="py-3 text-[#3c3c43] border-t border-gray-600">
              <Link
                to={`/@${userId}`}
                className="relative py-2 flex items-center gap-2 h-full rounded-md group"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%_+_24px)] h-full rounded-lg group-hover:bg-[#3c3c43]/[3%]"></div>
                <div className="w-3 h-3">
                  <GridIcon />
                </div>
                <span>Bài viết</span>
              </Link>
            </div>
            <div className="py-3">
              <Link
                to={`/@${userId}/saved`}
                className="relative py-2 flex items-center gap-2 h-full rounded-md group"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%_+_24px)] h-full rounded-lg group-hover:bg-[#3c3c43]/[3%]"></div>
                <div className="w-3 h-3">
                  <SaveIcon />
                </div>
                <span>Đã lưu</span>
              </Link>
            </div>
            <div className="py-3">
              <Link
                to={`/@${userId}/tagged`}
                className="relative py-2 flex items-center gap-2 h-full rounded-md group"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%_+_24px)] h-full rounded-lg group-hover:bg-[#3c3c43]/[3%]"></div>
                <div className="w-3 h-3">
                  <IconTag />
                </div>
                <span>Được gắn thẻ</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-7">
          <button className="aspect-square overflow-hidden relative group">
            <div className="absolute inset-0 transition opacity-0 group-hover:opacity-100 group-hover:bg-black/60">
              <div className="w-full h-full flex items-center justify-center gap-6">
                <div className="text-white flex items-center gap-2">
                  <IconHeartFill className="w-5 h-5" />
                  <span>{numberFormater(12345, 1)}</span>
                </div>
                <div className="text-white flex items-center gap-2">
                  <IconCommentFill className="w-5 h-5" />
                  <span>{numberFormater(12345, 1)}</span>
                </div>
              </div>
            </div>
            <img src={images.post1} alt="post" />
          </button>
          <button className="aspect-square overflow-hidden relative group">
            <div className="absolute inset-0 transition-colors group-hover:bg-black/50">
              <div className="absolute inset-0 transition opacity-0 group-hover:opacity-100 group-hover:bg-black/60">
                <div className="w-full h-full flex items-center justify-center gap-6">
                  <div className="text-white flex items-center gap-2">
                    <IconHeartFill className="w-5 h-5" />
                    <span>{numberFormater(12345, 1)}</span>
                  </div>
                  <div className="text-white flex items-center gap-2">
                    <IconCommentFill className="w-5 h-5" />
                    <span>{numberFormater(12345, 1)}</span>
                  </div>
                </div>
              </div>
            </div>
            <img src={images.post2} alt="post" />
          </button>
          <button className="aspect-square overflow-hidden relative group">
            <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
            <img src={images.post3} alt="post" />
          </button>
          <button className="aspect-square overflow-hidden relative group">
            <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
            <img src={images.post4} alt="post" />
          </button>
          <button className="aspect-square overflow-hidden relative group">
            <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
            <img src={images.post5} alt="post" />
          </button>
          <button className="aspect-square overflow-hidden relative group">
            <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
            <img src={images.post6} alt="post" />
          </button>
        </div>
      </div>
    </>
  );
}

export default PageUser;
