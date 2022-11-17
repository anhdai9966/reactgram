import { IconLike } from "~/components/UI/Icons";

function CommentItem({ item }) {
  const handleClickCommentLike = (id, user) => {};

  return (
    <div className="flex justify-between items-center">
      <p>
        <span className="font-semibold mr-2">{item.user.username}</span>
        <span>{item.comment}</span>
      </p>
      <button onClick={() => handleClickCommentLike(item.id, item.user)}>
        <IconLike className="w-3 h-3" />
      </button>
    </div>
  );
}

export default CommentItem;
