import images from "~/assets/images";
import { IconVerified } from "~/components/UI/Icons";
import HasFooterLayout from "~/layouts/FooterLayout";
import user from "~/assets/json/junvu95.json";
import { numberFormater } from "~/services";
import { Link } from "react-router-dom";

function PageSuggestionsForYou() {
  return (
    <HasFooterLayout>
      <div className="container max-w-[468px] py-4">
        <div className="flex flex-col gap-4">
          <h1 className="">Gợi ý cho bạn</h1>
          <div className="bg-white border rounded-lg">
            <ul className="py-2">
              <li className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full shrink-0 overflow-hidden">
                    <img src={images.avatarSonTung} alt="avatar" />
                  </div>
                  <div className="w-full flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <h6 className="font-semibold">sontungmtp</h6>
                      <div className="w-3 h-3">
                        <IconVerified />
                      </div>
                    </div>
                    <h5 className="text-[#828282]">Sơn Tùng M-TP</h5>
                    <p className="text-xs text-[#828282]">Phổ biến</p>
                  </div>
                  <button className="w-28 h-8 flex items-center justify-center shrink-0 border rounded bg-[#0095f6] ">
                    <span className="text-sm font-semibold text-white">
                      Theo dõi
                    </span>
                    {/* <div className="w-4 h-4 animate-spinner8Spins">
                      <IconSpinner8SpinsWhite />
                    </div> */}
                  </button>
                  {/* <button className="w-36 h-8 flex items-center justify-center border rounded shrink-0">
                    <span className="text-sm font-semibold">Đang theo dõi</span>
                  </button> */}
                </div>
              </li>
            </ul>
                <div className="p-4">
                  <button className="w-full h-8 flex items-center justify-center shrink-0 border rounded bg-[#0095f6] ">
                      <span className="text-sm font-semibold text-white">
                        Bắt đầu
                      </span>
                      {/* <div className="w-4 h-4 animate-spinner8Spins">
                        <IconSpinner8SpinsWhite />
                      </div> */}
                    </button>
                </div>
          </div>
          <div className="w-96 bg-white border rounded-xl divide-y shadow-lg hidden sm:block">
            <div className="p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Link to={`/@${user.username}`}>
                  <img src={images.avatarJunvu95} alt={user.username} />
                </Link>
              </div>
              <div class="flex flex-col text-sm">
                <div className="flex items-center gap-1">
                  <Link to={`/@${user.username}`} className="font-semibold">
                    {user.username}
                  </Link>
                  <div className="w-3 h-3">
                    <IconVerified />
                  </div>
                </div>
                <p className="text-[#8e8e8e]">{user.full_name}</p>
              </div>
            </div>
            <div className="py-4">
              <div className="grid grid-cols-3 text-sm text-center">
                <div className="px-2">
                  <p className="font-semibold">
                    {numberFormater(user.media_count, 1)}
                  </p>
                  <p className="text-[#8e8e8e]">bài viết</p>
                </div>
                <div className="px-2">
                  <p className="font-semibold">
                    {numberFormater(user.follower_count, 1)}
                  </p>
                  <p className="text-[#8e8e8e]">người theo dõi</p>
                </div>
                <div className="px-2">
                  <p className="text-[#8e8e8e]">Đang theo dõi</p>
                  <p className="font-semibold">
                    {numberFormater(user.following_count, 1)}
                  </p>
                  <p className="text-[#8e8e8e]">người</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="aspect-square overflow-hidden">
                <Link to="/" className="hover:opacity-80">
                  <img src={images.junvu95Post1} alt="junvu" />
                </Link>
              </div>
              <div className="aspect-square overflow-hidden">
                <Link to="/" className="hover:opacity-80">
                  <img src={images.junvu95Post2} alt="junvu" />
                </Link>
              </div>
              <div className="aspect-square overflow-hidden">
                <Link to="/" className="hover:opacity-80">
                  <img src={images.junvu95Post3} alt="junvu" />
                </Link>
              </div>
            </div>
            <div className="p-4">
              <button className="w-full h-8 flex items-center justify-center shrink-0 border rounded-md bg-[#0095f6] ">
                <span className="text-sm font-semibold text-white">
                  Theo dõi
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </HasFooterLayout>
  );
}

export default PageSuggestionsForYou;
