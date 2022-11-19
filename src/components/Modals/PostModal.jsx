import { isEmpty } from "@firebase/util";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "moment/locale/vi";
import { numberFormater } from "~/utils";
import {
  IconBookmark,
  IconBookmarkFill,
  IconBubbleRight,
  IconEmoji,
  IconHeart,
  IconHeartFill,
  IconMore,
  IconPaperplane,
  IconProfile,
  IconSpinner12Spins,
  IconSpinner8Spins,
  IconVerified,
} from "../UI/Icons";
import {
  useBoolean,
  useDidMountEffect,
  useDocumentTitle,
  useOnClickOutside,
  useWindowSize,
} from "~/hooks";
import { fetchPostById } from "~/app/postSlice";
import DropLayout from "~/layouts/DropLayout";
import Emoji from "../Emoji";
import PostComment from "../PostComment";
import { showToast } from "~/app/appSlice";
import { comments, liked, saved } from "~/services";

moment.locale("vi");

function PostModal() {
  useDocumentTitle("Bài viết");
  const { height } = useWindowSize();
  const { post, isLoadingPost } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);
  const [postView, setPostView] = useState({});
  const [commentsView, setCommentsView] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const commentInputRef = useRef();

  useDidMountEffect(() => {
    window.document.title = `${currentUser.full_name} trên Reactgram | ${post.caption}`;
  }, [currentUser]);

  useDidMountEffect(() => {
    setPostView({ ...post, inputComment: "", is_saved: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
    if (!params.postId) return;
    dispatch(fetchPostById(params.postId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidMountEffect(() => {
    (async () => {
      const res = await comments.getCommentByPostId(post.id);
      const commentsData = res.data.data.comments;
      setCommentsView(commentsData);
    })();
  }, [post]);

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
    setPostView((state) => {
      const addEmoji = state.inputComment + emoji;
      return { ...postView, inputComment: addEmoji };
    });
  };

  // xử lý auto height
  const handleAutoElementHeight = (e) => {
    e.target.value
      ? (e.target.style.height = `${e.target.scrollHeight}px`)
      : (e.target.style.height = "36px"); // leading 1.5 * 16 + px 6 * 2
  };

  const [isLoadingCreateComment, setIsLoadingCreateComment] = useState(false);

  const handleClickPostComment = async (id, commentText) => {
    if (post.comment_threading_disabled) {
      dispatch(showToast("Bài viết này đã khóa bình luận bởi người đăng!"));
      setPostView({ ...postView, inputComment: "" });
      return;
    }
    setIsLoadingCreateComment(true);
    const data = { ...currentUser, pid: id, text: commentText };
    const res = await comments.createComment(data);
    const comment = res.data.data.comment;
    setCommentsView((state) => [comment, ...state]);
    setPostView({ ...postView, inputComment: "" });
    setIsLoadingCreateComment(false);
  };

  const handleChangeCommentValue = (id, ev) => {
    if (ev.nativeEvent.inputType === "insertLineBreak") {
      handleClickPostComment(id, ev.target.value);
      return;
    }
    setPostView({ ...postView, inputComment: ev.target.value });
  };

  const handleClickCommentIcon = () => {
    commentInputRef.current.focus();
  };

  const [isLiked, setIsLiked] = useState(false);
  const [likedId, setIsLikeId] = useState("");

  useEffect(() => {
    if (isEmpty(post) || isEmpty(currentUser)) return;
    (async () => {
      const res = await liked.checkLikedForPostId(post.id, currentUser.id);
      if (!res.data.is_liked) return;
      setIsLikeId(res.data.data?.id);
    })();
  }, [post, currentUser]);

  useDidMountEffect(() => {
    setIsLiked(true);
  }, [likedId]);

  const handleClickLikeIcon = async (post) => {
    setIsLiked(true);
    // like +1
    setPostView((state) => {
      return { ...state, like_count: state.like_count + 1 };
    });
    await liked.createLiked(post);
  };

  const handleClickUnLikeIcon = async (post) => {
    setIsLiked(false);
    // like -1
    setPostView((state) => {
      return { ...state, like_count: state.like_count - 1 };
    });
    await liked.deleteLikeById(likedId, post.id);
  };

  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState('');

  useEffect(() => {
    if (isEmpty(post) || isEmpty(currentUser)) return;
    (async () => {
      const res = await saved.checkSavedForPostId(post.id, currentUser.uid);
      if (!res.data.is_saved) return;
      setSavedId(res.data.data?.id);
    })();
  }, [post, currentUser])

  useDidMountEffect(() => {
    setIsSaved(true);
  }, [savedId]);

  const handleClickSavedIcon = async (post) => {
    setIsSaved(true);
    // saved
    await saved.createSaved(post, currentUser.uid)
  };

  const handleClickUnSavedIcon = async (id) => {
    setIsSaved(false);
    // not save
    await saved.deleteSavedById(savedId)
  };

  if (isEmpty(postView)) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  if (isEmpty(postView) && !isLoadingPost) {
    navigate("/error");
  }

  return (
    <div className="bg-white container w-full max-w-5xl max-h-[calc(var(--window-height)_-_40px)]">
      <div
        className="grid grid-cols-[1fr_400px] grid-rows-1 divide-x h-full"
        style={{
          height: `${
            postView.image.height > height - 80
              ? `calc(${height}px - 80px)`
              : `${postView.image.height}px`
          }`,
        }}
      >
        <div
          style={{
            aspectRatio: `${postView.image.width}/${postView.image.height}`,
            width: `${
              postView.image.width > 550 ? `600px` : `${postView.image.width}px`
            }`,
          }}
          className="bg-black max-w-xl overflow-hidden flex items-center w-full h-full"
        >
          <img
            src={postView.image.url}
            alt={postView.caption}
            className="object-contain"
          />
        </div>
        <div className="h-full divide-y flex flex-col justify-between border">
          <div className="flex gap-4 items-center justify-between p-3">
            <div className="shrink-0 flex gap-4">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                {!!postView.user.profile_pic_url && (
                  <img
                    src={postView.user.profile_pic_url}
                    alt={postView.user.full_name}
                    className="object-cover w-full h-full"
                  />
                )}
                {!postView.user.profile_pic_url && (
                  <IconProfile className="text-[#8c8c8c]" />
                )}
              </div>
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
            </div>
            <div className="">
              <button className="p-2 hover:bg-black/5 rounded-lg">
                <div className="w-5 h-5">
                  <IconMore />
                </div>
              </button>
            </div>
          </div>
          <section className="h-full overflow-y-auto scrollbar-gutter">
            <PostComment
              post={postView}
              comments={commentsView}
              setCommentsView={setCommentsView}
            />
          </section>
          <section className="divide-y">
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  {isLiked && (
                    <motion.div
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      className="w-6 h-6"
                    >
                      <button
                        onClick={() => handleClickUnLikeIcon(postView)}
                        className="hover:text-[#3c3c43]/70"
                      >
                        <div className="w-6 h-6">
                          <IconHeartFill className="text-[#FF3B30]" />
                        </div>
                      </button>
                    </motion.div>
                  )}
                  {!isLiked && (
                    <button
                      onClick={() => handleClickLikeIcon(postView)}
                      className="hover:text-[#3c3c43]/70"
                    >
                      <div className="w-6 h-6">
                        <IconHeart />
                      </div>
                    </button>
                  )}
                  <button
                    onClick={handleClickCommentIcon}
                    className="hover:text-[#3c3c43]/70"
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
                {!isSaved && (
                  <button
                    onClick={() => handleClickSavedIcon(postView)}
                    className="hover:text-[#3c3c43]/70"
                  >
                    <div className="w-6 h-6">
                      <IconBookmark />
                    </div>
                  </button>
                )}
                {isSaved && (
                  <button
                    onClick={handleClickUnSavedIcon}
                    className="hover:text-[#3c3c43]/70"
                  >
                    <div className="w-6 h-6">
                      <IconBookmarkFill />
                    </div>
                  </button>
                )}
              </div>
              <div className="">
                {!postView.like_and_view_counts_disabled && (
                  <p>{numberFormater(postView.like_count, 1)} Thích</p>
                )}
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
                    className="resize-none outline-none w-full h-9 transition-all duration-300 ease-out overflow-y-auto max-h-20 pt-2 text-sm"
                    onKeyUp={handleAutoElementHeight}
                    onChange={(ev) => handleChangeCommentValue(postView.id, ev)}
                    value={postView.inputComment}
                    ref={commentInputRef}
                  ></textarea>

                  {isLoadingCreateComment && (
                    <div className="px-3 py-1 w-16">
                      <IconSpinner8Spins className="w-4 h-4 mx-auto animate-spinner8Spins" />
                    </div>
                  )}
                  {!isLoadingCreateComment && (
                    <button
                      onClick={() =>
                        handleClickPostComment(
                          postView.id,
                          postView.inputComment
                        )
                      }
                      disabled={!postView.inputComment}
                      className={`px-3 py-1 w-16 font-semibold text-[#0095f6] hover:bg-black/5 disabled:cursor-not-allowed rounded-lg ${
                        !postView.inputComment && "opacity-30"
                      }`}
                    >
                      Đăng
                    </button>
                  )}
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
