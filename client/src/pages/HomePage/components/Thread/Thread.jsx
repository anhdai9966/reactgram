import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import images from "~/assets/images";
import {
  IconEmoji,
  IconLike,
  MoreIcon,
  IconBookmark,
  IconHeart,
  IconPaperplane,
  IconBubbleRight,
} from "~/components/UI/Icons";
import { useBoolean, useOnClickOutside } from "~/hooks";
import {
  setShownModalDetailThead,
  setShownModalMenuThread,
} from "../../HomeSlice";
import Emoji from "./Emoji";

function Thread() {
  const dispatch = useDispatch();

  const handleClickMenuThread = () => {
    dispatch(setShownModalMenuThread());
  };

  const handleClickIconComment = () => {
    dispatch(setShownModalDetailThead());
  };

  const {
    state: isShownEmoji,
    setFalse: closeEmoji,
    setTrue: shownEmoji,
  } = useBoolean();

  const emojiRef = useOnClickOutside(() => {
    closeEmoji();
  });
  
  const handleClickBtnEmoji = () => {
    shownEmoji();
  };

  // xử lý auto height
  const handleAutoElementHeight = (e) => {
    e.target.value
      ? (e.target.style.height = `${e.target.scrollHeight}px`)
      : (e.target.style.height = "36px"); // leading 1.5 * 16 + px 6 * 2
  };

  return (
    <article className="w-full bg-white rounded-lg overflow-hidden pb-1 border text-sm font-light">
      <div className="w-full flex items-center px-3 h-14">
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
      </div>

      <section>
        <img src={images.post7} alt="imagepost" />
      </section>

      <section className="p-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button className="hover:text-[#3c3c43]/70">
            <div className="w-6 h-6">
              <IconHeart />
            </div>
          </button>
          <button
            className="hover:text-[#3c3c43]/70"
            onClick={handleClickIconComment}
          >
            <div className="w-6 h-6">
              <IconBubbleRight />
            </div>
          </button>
          <button className="hover:text-[#3c3c43]/70">
            <div className="w-6 h-6">
              <IconPaperplane />
            </div>
          </button>
        </div>

        <button className="hover:text-[#3c3c43]/70">
          <div className="w-6 h-6">
            <IconBookmark />
          </div>
        </button>
      </section>

      <section className="px-3 pb-2">
        <p className="font-semibold">369 likes</p>
      </section>

      <div className="flex flex-col gap-2 px-3">
        <div className="">
          <p>
            <Link to="@ui_gradient" className="font-semibold mr-2">
              ui_gradient
            </Link>
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
        </div>

        <div>
          <button onClick={handleClickIconComment} className="text-[#939393]">
            Xem tất cả 4 bình luận
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p>
              <Link to="/@aryanraj.code" className="font-semibold mr-2">
                aryanraj.code
              </Link>
              <span>Looks awesome🔥🔥🔥🔥</span>
            </p>
            <IconLike className="w-3 h-3" />
          </div>

          <div className="flex justify-between items-center">
            <p>
              <Link to="/@baby_wolf_codes" className="font-semibold mr-2">
                baby_wolf_codes
              </Link>
              <span>@aryanraj.code thanks 🙌🙌</span>
            </p>
            <IconLike className="w-3 h-3" />
          </div>
        </div>
      </div>

      <section className="px-3 py-2">
        <p className="font-light uppercase text-[10px] text-[#939393]">
          1 giờ trước
        </p>
      </section>

      <section className="border-t hidden md:block">
        <div className="flex items-center">
          <div className="relative">
            <button onClick={handleClickBtnEmoji} className="flex-shrink-0 p-3">
              <div className="w-6 h-6">
                <IconEmoji />
              </div>
            </button>
            <AnimatePresence>
              {isShownEmoji && (
                <motion.div
                  initial={{ opacity: 1, scale: "20%", x: 0 }}
                  animate={{ opacity: 1, scale: "100%", x: 0 }}
                  exit={{ opacity: 0, scale: "20%", x: 0 }}
                  style={{ originX: 0, originY: 1 }}
                  ref={emojiRef}
                  className="absolute bottom-full left-0"
                >
                  <Emoji setFalse={closeEmoji} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <form className="w-full flex items-center flex-grow px-1">
            <textarea
              rows="1"
              placeholder="Thêm bình luận"
              className="resize-none outline-none w-full transition-all duration-300 ease-out overflow-hidden"
              onKeyUp={handleAutoElementHeight}
            ></textarea>

            <button className="px-3 py-1 font-semibold opacity-30 text-[#0095f6] hover:bg-black/5 rounded-lg">
              Đăng
            </button>
          </form>
        </div>
      </section>
    </article>
  );
}

export default Thread;
