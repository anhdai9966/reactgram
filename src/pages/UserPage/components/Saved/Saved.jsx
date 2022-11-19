import { useState } from "react";
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
import { saved } from "~/services";
import { numberFormater } from "~/utils";

function Saved() {
  const params = useParams();
  const { username } = params;

  const [postSaved, setPostSaved] = useState([]);
  const [isLoadingPostSaved, setIsLoadingPostSaved] = useState(false);
  const {currentUser} = useSelector(state => state.user)

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoadingPostSaved(true);
      const res = await saved.getSavedByUserId(currentUser.uid);
      setPostSaved(res.data.data.saved)
    })();
    setIsLoadingPostSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleClickPostDetail = (postId) => {
    dispatch(setIsShowPostsModal(true));
    window.history.replaceState(null, "test", `/post/${postId}`);
    dispatch(fetchPostById(postId));
  };

  if (isLoadingPostSaved) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center font-light">
        <p className="text-xs text-[#8c8c8c]">
          Chỉ mình bạn có thể xem mục mình đã lưu
        </p>
        <p></p>
        {/* <button className="text-[#007AFF] text-sm hover:bg-black/[3%] px-2 py-1 rounded">
          <div className="flex items-center gap-1">
            <div className="">
              <IconPlus className="w-3 h-3"/>
            </div>
            <span>Bộ sưu tập mới</span>
          </div>
        </button> */}
      </div>
      <div className="grid grid-cols-3 gap-7">
        {postSaved.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClickPostDetail(post.pid)}
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
    </div>
  );
}

export default Saved;
