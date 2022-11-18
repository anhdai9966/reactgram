import { isEmpty } from "@firebase/util";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { numberFormater } from "~/utils";
import {
  IconBookmark,
  IconBubbleRight,
  IconEmoji,
  IconHeart,
  IconMore,
  IconPaperplane,
  IconProfile,
  IconSpinner12Spins,
  IconVerified,
} from "../UI/Icons";

import "moment/locale/vi";
import {
  useBoolean,
  useDidMountEffect,
  useOnClickOutside,
  useWindowSize,
} from "~/hooks";
import { addEmojiCommentPost, setChangeCommentPost } from "~/app/postSlice";
import DropLayout from "~/layouts/DropLayout";
import Emoji from "../Emoji";
import { useState, useEffect } from "react";

moment.locale("vi");

function PostModal() {
  const { post } = useSelector((state) => state.posts);
  const [postView, setPostView] = useState({});

  const { height } = useWindowSize();

  useDidMountEffect(() => {
    setPostView({ ...post, inputComment: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const dispatch = useDispatch();

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
    setPostView({ ...postView, inputComment: ev.target.value });
  };

  const handleClickPostComment = (id, uid, commentText) => {
    console.log(id, uid, commentText);
  };

  if (isEmpty(postView)) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  return (
    <div className="bg-white container w-full max-w-5xl max-h-[calc(var(--window-height)_-_40px)]">
      <div className="grid grid-cols-[1fr_400px] divide-x h-full">
        <div
          style={{
            aspectRatio: `${postView.image.width}/${postView.image.height}`,
            height: `${
              postView.image.height > height - 80
                ? `calc(${height}px - 80px)`
                : `${postView.image.height}px`
            }`,
            width: `${
              postView.image.width > 550
                ? `550px`
                : `${postView.image.width}px`
            }`,
          }}
          className="bg-black max-w-xl overflow-hidden flex items-center"
        >
          <img
            src={postView.image.url}
            alt={postView.caption}
            className="object-contain"
          />
        </div>
        <div className="h-full divide-y flex flex-col justify-between">
          <div className="flex gap-4 items-center p-3">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              {!!postView.user.profile_pic_url && (
                <img
                  src={postView.user.profile_pic_url}
                  alt={postView.user.full_name}
                />
              )}
              {!postView.user.profile_pic_url && (
                <IconProfile className="text-[#8c8c8c]" />
              )}
            </div>
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">
                  {postView.user.username}
                </p>
                {postView.user.is_verified && (
                  <div className="w-3 h-3">
                    <IconVerified />
                  </div>
                )}
              </div>
              <button className="">
                <div className="w-5 h-5">
                  <IconMore />
                </div>
              </button>
            </div>
          </div>
          <section className="h-full">
            <p>comment</p>
          </section>
          <section className="divide-y">
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <button className="hover:text-[#3c3c43]/70">
                    <div className="w-6 h-6">
                      <IconHeart />
                    </div>
                  </button>
                  <button className="hover:text-[#3c3c43]/70">
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
              </div>
              <div className="">
                <p>{numberFormater(postView.like_count, 1)} Thích</p>
                <p className="text-[10px] text-[#8c8c8c] uppercase">
                  {moment(postView.created_at).fromNow()}
                </p>
              </div>
            </div>
            <div className="border-t hidden md:block">
              <div className="flex items-center">
                <div className="relative" ref={emojiRef}>
                  <button
                    onClick={handleClickBtnEmoji}
                    className="flex-shrink-0 p-3"
                  >
                    <div className="w-6 h-6">
                      <IconEmoji />
                    </div>
                  </button>
                  <DropLayout isShow={isShownEmoji} className="left-3">
                    <div className="w-[330px] h-[330px]">
                      <Emoji
                        handleClick={(emoji) =>
                          handleClickEmoji(postView.id, emoji)
                        }
                      />
                    </div>
                  </DropLayout>
                </div>
                <div className="w-full flex items-center flex-grow px-1">
                  <textarea
                    rows="1"
                    placeholder="Thêm bình luận..."
                    className="resize-none outline-none w-full h-9 transition-all duration-300 ease-out overflow-hidden pt-2 text-sm"
                    onKeyUp={handleAutoElementHeight}
                    onChange={(ev) => handleChangeCommentValue(postView.id, ev)}
                    value={postView.inputComment}
                  ></textarea>

                  <button
                    onClick={() =>
                      handleClickPostComment(
                        postView.id,
                        postView.uid,
                        postView.inputComment
                      )
                    }
                    className={`px-3 py-1 font-semibold text-[#0095f6] hover:bg-black/5 rounded-lg ${
                      !postView.inputComment && "opacity-30"
                    }`}
                  >
                    Đăng
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
