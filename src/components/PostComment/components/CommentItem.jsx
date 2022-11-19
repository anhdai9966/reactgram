import moment from "moment";
import { IconMore, IconProfile, IconVerified } from "~/components/UI/Icons";
import { comments } from "~/services";

function CommentItem({ item, handle }) {
  const handleClickLikeComment = async (commentId) => {
    handle((state) =>
      state.map((sta) => {
        if (sta.id === commentId) {
          sta.like_count += 1;
        }
        return sta;
      })
    );
    await comments.increaseLikeCommentById(commentId);
  };

  return (
    <div className="shrink-0 flex gap-4">
      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
        {!!item.user.profile_pic_url && (
          <img
            src={item.user.profile_pic_url}
            alt={item.user.full_name}
            className="object-cover w-full h-full"
          />
        )}
        {!item.user.profile_pic_url && (
          <IconProfile className="text-[#8c8c8c]" />
        )}
      </div>
      <div className="space-y-2 group w-full">
        <div className="w-full">
          <span className="float-left flex gap-1 items-center w-fit mr-2">
            <span className="text-sm font-semibold">{item.user.username}</span>
            {item.user.is_verified && (
              <span className="w-3 h-3">
                <IconVerified />
              </span>
            )}
          </span>
          <p className="text-sm font-light">{item.text}</p>
        </div>
        <div className="text-xs text-[#8c8c8c] flex gap-3">
          <p className="uppercase text-[10px]">
            <span>{moment(item.created_at).fromNow()}</span>
          </p>
          <button
            onClick={() => handleClickLikeComment(item.id)}
            className="font-semibold"
          >
            {item.like_count} Thích
          </button>
          <button className="rounded hidden group-hover:block">
            <IconMore className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
