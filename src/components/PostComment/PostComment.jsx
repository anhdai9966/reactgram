import { IconProfile, IconVerified } from "../UI/Icons";

import ReactMarkdown from "react-markdown";
import moment from "moment";
import CommentItem from "./components/CommentItem";

function PostComment({ post, comments, setCommentsView }) {
  return (
    <div className="px-3 pt-3 pb-1 space-y-4">
      <div className="shrink-0 flex gap-4">
        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
          {!!post.user.profile_pic_url && (
            <img
              src={post.user.profile_pic_url}
              alt={post.user.full_name}
              className="object-cover w-full h-full"
            />
          )}
          {!post.user.profile_pic_url && (
            <IconProfile className="text-[#8c8c8c]" />
          )}
        </div>
        <div className="space-y-2">
          <div className="">
            <span className="float-left flex gap-1 items-center w-fit mr-2">
              <span className="text-sm font-semibold">
                {post.user.username}
              </span>
              {post.user.is_verified && (
                <span className="w-3 h-3">
                  <IconVerified />
                </span>
              )}
            </span>
            <ReactMarkdown className="text-sm font-light">
              {post.caption}
            </ReactMarkdown>
          </div>
          <p className="text-[10px] uppercase text-[#8c8c8c]">
            {moment(post.created_at).fromNow()}
          </p>
        </div>
      </div>
      {!post.comment_threading_disabled && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              item={comment}
              handle={setCommentsView}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostComment;
