import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, setIsShowPostsModal } from "~/app/postSlice";
import {
  IconCommentFill,
  IconHeartFill,
  IconSpinner12Spins,
} from "~/components/UI/Icons";
import { useDidMountEffect, useDocumentTitle } from "~/hooks";
import { numberFormater } from "~/utils";
import { fetchPostExplore } from "./exploreSlice";

function Explore() {
  useDocumentTitle('Khám phá • Reactgram')
  const [postsView, setPostView] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { postsExplore, isLoadingPostsExplore } = useSelector(
    (state) => state.explore
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostExplore(currentUser.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidMountEffect(() => {
    setPostView(postsExplore);
  }, [postsExplore]);

  const handleClickPostItem = (postId) => {
    dispatch(setIsShowPostsModal(true))
    window.history.replaceState(null, "Post detail", `/post/${postId}`);
    dispatch(fetchPostById(postId))
  };

  if (isLoadingPostsExplore) {
    return (
      <div className="w-full h-[var(--window-height)] flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  return (
    <div className="py-6 px-2">
      <div className="grid grid-cols-3 gap-1 sm:gap-6">
        {postsView.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClickPostItem(post.id)}
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
            <img src={post.image.url} alt={post.user.username} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
