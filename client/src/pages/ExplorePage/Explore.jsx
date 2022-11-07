import { useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { IconCommentFill, IconHeartFill } from "~/components/UI/Icons";
import { numberFormater } from "~/utils";

function Explore() {
  const navigate = useNavigate();

  const handleClickPostItem = () => {
    navigate("/post/:postId");
  };
  return (
    <div className="py-6 px-2">
      <div className="grid grid-cols-3 gap-1 sm:gap-6">
        <button
          onClick={handleClickPostItem}
          className="aspect-square overflow-hidden relative group"
        >
          <div className="absolute inset-0 transition opacity-0 group-hover:opacity-100 group-hover:bg-black/60">
            <div className="w-full h-full flex items-center justify-center gap-6">
              <div className="text-white flex items-center gap-2">
                <IconHeartFill className="w-5 h-5" />
                <span>{numberFormater(12345, 1)}</span>
              </div>
              <div className="text-white flex items-center gap-2">
                <IconCommentFill className="w-5 h-5" />
                <span>{numberFormater(12345, 1)}</span>
              </div>
            </div>
          </div>
          <img src={images.post1} alt="post" />
        </button>
        <div className="aspect-square overflow-hidden">
          <img src={images.post2} alt="post" />
        </div>
        <div className="aspect-square overflow-hidden">
          <img src={images.post3} alt="post" />
        </div>
        <div className="aspect-square overflow-hidden">
          <img src={images.post4} alt="post" />
        </div>
      </div>
    </div>
  );
}

export default Explore;
