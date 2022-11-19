import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchPostById,
  fetchPostsByUsername,
  setIsShowPostsModal,
} from "~/app/postSlice";
import {
  IconCommentFill,
  IconHeartFill,
  IconSpinner12Spins,
} from "~/components/UI/Icons";
import { numberFormater } from "~/utils";

function Grid() {
  const params = useParams();
  const { username } = params;

  const { postsUser, isLoadingPost } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsByUsername(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleClickPostDetail = (postId) => {
    dispatch(setIsShowPostsModal(true));
    window.history.replaceState(null, "test", `/post/${postId}`);
    dispatch(fetchPostById(postId));
  };

  if (isLoadingPost) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-7">
      {postsUser.map((post) => (
        <div
          key={post.id}
          onClick={() => handleClickPostDetail(post.id)}
          className="aspect-square overflow-hidden relative group cursor-pointer"
        >
          <div className="absolute inset-0 transition opacity-0 group-hover:opacity-100 group-hover:bg-black/60">
            <div className="w-full h-full flex items-center justify-center gap-6">
              <div className="text-white flex items-center gap-2">
                <IconHeartFill className="w-5 h-5" />
                <span>{numberFormater(post.like_count, 1)}</span>
              </div>
              <div className="text-white flex items-center gap-2">
                <IconCommentFill className="w-5 h-5" />
                <span>{numberFormater(post.comment_count, 1)}</span>
              </div>
            </div>
          </div>
          <img src={post.image.url} alt={`post${post.user.username}`} />
        </div>
      ))}
    </div>
  );
}

export default Grid;
