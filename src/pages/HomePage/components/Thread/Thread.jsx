import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  IconEmoji,
  MoreIcon,
  IconBookmark,
  IconHeart,
  IconPaperplane,
  IconBubbleRight,
  IconProfile,
} from "~/components/UI/Icons";
import { useBoolean, useOnClickOutside } from "~/hooks";
import {
  setShownModalDetailThead,
  setShownModalMenuThread,
} from "../../HomeSlice";
import DropLayout from "~/layouts/DropLayout";
import Emoji from "~/components/Emoji";
import { addEmojiCommentPost, setChangeCommentPost } from "~/app/postSlice";

import moment from "moment";
import "moment/locale/vi";
import CommentItem from "../CommentItem";
moment.locale("vi");

function Thread({ item }) {
  const dispatch = useDispatch();

  const handleClickMenuThread = () => {
    dispatch(setShownModalMenuThread());
  };

  const handleClickIconComment = () => {
    // navigate('/post/123')
    window.history.replaceState(null, "test", "/post/123");
    // window.history.back()
    dispatch(setShownModalDetailThead());
  };

  const {
    state: isShownEmoji,
    setFalse: closeEmoji,
    toggle: toggleEmoji,
  } = useBoolean();

  const emojiRef = useOnClickOutside(() => {
    closeEmoji();
  });

  const handleClickBtnEmoji = () => {
    toggleEmoji();
  };

  const handleClickEmoji = (id, emoji) => {
    dispatch(addEmojiCommentPost({ id, emoji }));
  };

  // xử lý auto height
  const handleAutoElementHeight = (e) => {
    e.target.value
      ? (e.target.style.height = `${e.target.scrollHeight}px`)
      : (e.target.style.height = "36px"); // leading 1.5 * 16 + px 6 * 2
  };

  const handleChangeCommentValue = (id, ev) => {
    dispatch(setChangeCommentPost({ id, value: ev.target.value }));
  };

  const handleClickPostComment = (id, uid, commentText) => {
    console.log(id, uid, commentText)
  };

  return (
    <article className="w-full bg-white rounded-lg overflow-hidden pb-1 border text-sm font-light">
      <div className="w-full flex items-center px-3 h-14">
        <div className="w-full flex items-center gap-3">
          <Link to={`/${item.user.username}`}>
            <div className="w-8 h-8 rounded-full overflow-hidden">
              {!!item.user.profile_pic_url && (
                <img src={item.user.profile_pic_url} alt="avatar" />
              )}
              {!item.user.profile_pic_url && (
                <IconProfile className="text-[#8c8c8c]" />
              )}
            </div>
          </Link>

          <Link to={`/${item.user.username}`} className="font-semibold">
            {item.user.username}
          </Link>
        </div>

        <button
          className="flex-shrink-0 rounded-lg"
          onClick={handleClickMenuThread}
        >
          <MoreIcon className="w-6 h-6" />
        </button>
      </div>

      <section className="aspect-square w-full bg-slate-50">
        <img src={item.image.url} alt="imagepost" loading="lazy" />
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
        <p className="font-semibold">{item.like_count} likes</p>
      </section>

      <div className="flex flex-col gap-2 px-3">
        <div className="">
          <Link to="@ui_gradient" className="font-semibold mr-2">
            {item.user.username}
          </Link>
          <span>{item.caption}</span>
          <div className="flex gap-2">
            ... <button className="text-[#939393]">Xem thêm</button>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleClickIconComment}
            className="text-[#939393] hover:text-[#8E8E93]"
          >
            Xem tất cả {item.comment_count} bình luận
          </button>
        </div>
      </div>

      <div className="">
        {item.comments.map((comm) => (
          <CommentItem item={comm} />
        ))}
      </div>

      <section className="px-3 py-2">
        <p className="font-light uppercase text-[10px] text-[#939393]">
          {moment(item.created_at).fromNow()}
        </p>
      </section>

      <section className="border-t hidden md:block">
        <div className="flex items-center">
          <div className="relative" ref={emojiRef}>
            <button onClick={handleClickBtnEmoji} className="flex-shrink-0 p-3">
              <div className="w-6 h-6">
                <IconEmoji />
              </div>
            </button>
            <DropLayout isShow={isShownEmoji} className="left-3">
              <div className="w-[330px] h-[330px]">
                <Emoji
                  handleClick={(emoji) => handleClickEmoji(item.id, emoji)}
                />
              </div>
            </DropLayout>
          </div>
          <div className="w-full flex items-center flex-grow px-1">
            <textarea
              rows="1"
              placeholder="Thêm bình luận"
              className="resize-none outline-none w-full h-9 transition-all duration-300 ease-out overflow-hidden pt-2"
              onKeyUp={handleAutoElementHeight}
              onChange={(ev) => handleChangeCommentValue(item.id, ev)}
              value={item.inputComment}
            ></textarea>

            <button
              onClick={() =>
                handleClickPostComment(item.id, item.uid, item.inputComment)
              }
              className={`px-3 py-1 font-semibold text-[#0095f6] hover:bg-black/5 rounded-lg ${
                !item.inputComment && "opacity-30"
              }`}
            >
              Đăng
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Thread;
