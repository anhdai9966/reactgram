import images from "~/assets/images";
import { IconCommentFill, IconHeartFill } from "~/components/UI/Icons";
import { numberFormater } from "~/utils";

function Grid() {
  return (
    <div className="grid grid-cols-3 gap-7">
      <button className="aspect-square overflow-hidden relative group">
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
      <button className="aspect-square overflow-hidden relative group">
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
        <img src={images.post2} alt="post" />
      </button>
      <button className="aspect-square overflow-hidden relative group">
        <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
        <img src={images.post3} alt="post" />
      </button>
      <button className="aspect-square overflow-hidden relative group">
        <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
        <img src={images.post4} alt="post" />
      </button>
      <button className="aspect-square overflow-hidden relative group">
        <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
        <img src={images.post5} alt="post" />
      </button>
      <button className="aspect-square overflow-hidden relative group">
        <div className="absolute inset-0 transition-colors group-hover:bg-black/50"></div>
        <img src={images.post6} alt="post" />
      </button>
    </div>
  );
}

export default Grid;
