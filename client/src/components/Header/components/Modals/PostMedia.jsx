import { forwardRef, useState } from "react";
import { IconRepresentMedia } from "~/components/UI/Icons";
import { useLockedBody } from "~/hooks";

const PostMedia = forwardRef((props, ref) => {
  useLockedBody(true);

  const [isDragMedia, setIsDragMedia] = useState(false);

  const handleDropMedia = (ev) => {
    ev.preventDefault();
    setIsDragMedia(false);

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          console.log("🚀 file:", file);
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };

  const handleChangeInputMedia = (ev) => {
    ev.preventDefault();
    console.log("🚀 ev:", ev);
  };

  const handleDragOverInputMedia = (ev) => {
    ev.preventDefault();
    setIsDragMedia(true);
  };

  const handleDragLeaveInputMedia = (ev) => {
    ev.preventDefault();
    setIsDragMedia(false);
  };

  return (
    <div className="bg-white w-[300px] sm:w-[527px] aspect-square drop-shadow-xl rounded-xl text-center text-[#262626] flex flex-col">
        <div className="px-4 py-2 border-b flex-shrink-0">
          <h6 className="font-semibold">Tạo bài viết mới</h6>
        </div>
        <div
          className={`h-full p-4 flex flex-col gap-3 items-center justify-center relative ${
            isDragMedia && "bg-[#eee]"
          }`}
        >
          <div className={`w-24 h-24 ${isDragMedia && "text-[#007AFF]"}`}>
            <IconRepresentMedia className="w-24 h-24" />
          </div>
          <p className="font-extralight text-[22px]">Kéo ảnh vào đây</p>
          <div
            className="absolute inset-0"
            onDrop={handleDropMedia}
            onDragOver={handleDragOverInputMedia}
            onDragLeave={handleDragLeaveInputMedia}
          ></div>
          <label className="relative cursor-pointer px-3 py-1 rounded bg-[#007AFF] ">
            <span className="text-sm font-semibold text-white">
              Chọn ảnh từ máy tính
            </span>
            <input
              type="file"
              name="media"
              multiple={true}
              className="hidden"
              onChange={handleChangeInputMedia}
            />
          </label>
        </div>
      </div>
    
  );
});

export default PostMedia;
