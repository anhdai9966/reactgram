import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import {
  IconBookmark,
  IconBubbleRight,
  IconEmoji,
  IconHeart,
  IconLike,
  IconPaperplane,
  MoreIcon,
} from "~/components/UI/Icons";
import { setShownModalMenuThread } from "../../HomeSlice";

function CommentThread() {
  const dispatch = useDispatch();

  const handleClickMenuThread = () => {
    dispatch(setShownModalMenuThread());
  };

  return (
    <article className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="flex text-sm font-light">
        <div className="bg-black flex items-center">
          <img src={images.post2} alt="post" />
        </div>
        <div className="bg-white">
          <section className="w-full flex items-center px-3 h-14">
            <div className="w-full flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={images.avatar} alt="avatar" />
              </div>

              <Link to="/@ui_gradient" className="font-semibold">
                ui_gradient
              </Link>
            </div>

            <button
              className="flex-shrink-0 rounded-lg"
              onClick={handleClickMenuThread}
            >
              <MoreIcon className="w-6 h-6" />
            </button>
          </section>

          <section className="px-3">
            <p>
              <span className="font-semibold mr-2">ui_gradient</span>
              <span>
                Here is a recipe for a music player widget using CSS grids 😁
              </span>
            </p>

            <p>
              A clean advantage of using grid is for the overlap case, the song
              title element is laid over the same grid cell.
            </p>
            <div className="flex gap-2">
              ... <span className="text-[#939393]">Xem thêm</span>
            </div>

            <div className="text-[#939393] mt-2">Xem tất cả 4 bình luận</div>

            <div className="mt-2">
              <div className="flex justify-between items-center">
                <p>
                  <span className="font-semibold mr-2">aryanraj.code</span>
                  <span>Looks awesome🔥🔥🔥🔥</span>
                </p>
                <IconLike className="w-3 h-3" />
              </div>

              <div className="flex justify-between items-center">
                <p>
                  <span className="font-semibold mr-2">baby_wolf_codes</span>
                  <span>@aryanraj.code thanks 🙌🙌</span>
                </p>
                <IconLike className="w-3 h-3" />
              </div>
            </div>
          </section>

          <section className="p-3 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <IconHeart className="w-6 h-6" />
              <button>
                <IconBubbleRight className="w-6 h-6" />
              </button>
              <IconPaperplane className="w-6 h-6" />
            </div>

            <IconBookmark />
          </section>

          <section className="px-3 pb-2">
            <p className="font-semibold">369 likes</p>
          </section>

          <section className="px-3 py-2">
            <p className="font-normal uppercase text-[10px] text-[#939393]">
              1 giờ trước
            </p>
          </section>

          <section className="p-3 border-t hidden md:block">
            <form className="w-full flex">
              <div className="pr-2">
                <IconEmoji className="w-6 h-6" />
              </div>

              <textarea
                className="resize-none outline-none w-full"
                rows="1"
                placeholder="Thêm bình luận"
              ></textarea>

              <button className="pl-2 font-semibold opacity-30 text-[#0095f6]">
                Post
              </button>
            </form>
          </section>
        </div>
      </div>
    </article>
  );
}

export default CommentThread;
