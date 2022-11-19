import { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "~/app/appSlice";
import { IconRepresentMedia } from "~/components/UI/Icons";
import { FILE_SIZE } from "~/configs";
import { humanFileSize, readFileToDataUrl, selectFile } from "~/utils";

function SelectFile({ onReadFile }) {
  const [isDragMedia, setIsDragMedia] = useState(false);
  const dispatch = useDispatch();

  const handleReadFile = async (file) => {
    const size = file.size;

    // Check if the file size is bigger than 1MB and prepare a message.
    if (size > 1024 * 1024 * FILE_SIZE) {
      dispatch(
        showToast(
          `Bạn chỉ có thể tải lên file nhỏ hơn ${FILE_SIZE} Mb! File: ${humanFileSize(
            size
          )}`
        )
      );
      onReadFile(false);
      return;
    }

    const imageDataUrl = await readFileToDataUrl(file);
    onReadFile(imageDataUrl);
  };

  const handleDragOverFile = (ev) => {
    ev.preventDefault();
    setIsDragMedia(true);
  };

  const handleDragLeaveFile = (ev) => {
    ev.preventDefault();
    setIsDragMedia(false);
  };

  const handleDropFile = (ev) => {
    ev.preventDefault();
    setIsDragMedia(false);

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          handleReadFile(file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        handleReadFile(file);
      });
    }
  };

  const handleClickSelectFile = async () => {
    const fileImage = await selectFile("image/*");
    if (!fileImage) return;
    handleReadFile(fileImage);
  };

  return (
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
        onDrop={handleDropFile}
        onDragOver={handleDragOverFile}
        onDragLeave={handleDragLeaveFile}
      ></div>
      <button
        onClick={handleClickSelectFile}
        className="relative px-3 py-1 rounded bg-[#007AFF] "
      >
        <span className="text-sm font-semibold text-white">
          Chọn ảnh từ máy tính
        </span>
      </button>
    </div>
  );
}

export default SelectFile;
