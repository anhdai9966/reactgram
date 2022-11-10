import { motion } from "framer-motion";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cropper from "react-easy-crop";
import Emoji from "~/components/Emoji";
import {
  IconArrowLeft,
  IconChevronDown,
  IconCrop,
  IconEmoji,
  IconImage,
  IconLocation,
  IconPlusMagnifyingGlass,
  IconProfile,
  IconRectangle,
  IconRectanglePortrait,
  IconRepresentMedia,
  IconSpinner12Spins,
  IconSquare,
} from "~/components/UI/Icons";
import Switch from "~/components/UI/Switch";
import {
  useBoolean,
  useDebounce,
  useLockedBody,
  useOnClickOutside,
} from "~/hooks";
import DropLayout from "~/layouts/DropLayout";
import { readFileToDataUrl, selectFile } from "~/utils";
import CropItem from "./components/CropItem";

function PostMediaModal() {
  useLockedBody(true);

  const [isDragMedia, setIsDragMedia] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleDragOverInputMedia = (ev) => {
    ev.preventDefault();
    setIsDragMedia(true);
  };

  const handleDragLeaveInputMedia = (ev) => {
    ev.preventDefault();
    setIsDragMedia(false);
  };

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
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log("🚀 file else:", file);
      });
    }
  };

  const handleClickSelectFile = async () => {
    const fileImage = await selectFile("image/*");
    const imageDataUrl = await readFileToDataUrl(fileImage);
    setImageSrc(imageDataUrl);
  };

  const handleClickBackDepth1 = () => {
    setImageSrc(null);
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [isShowGrid, setIsShowGrid] = useState(false);

  useEffect(() => {
    setIsShowGrid(true);
    const handler = setTimeout(() => {
      setIsShowGrid(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [crop]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
    // setIsShowGrid(false)
  }, []);

  const {
    state: isCropDrop,
    toggle: toggleCropDrop,
    setFalse: closeCropDrop,
  } = useBoolean();
  const {
    state: isZoomDrop,
    toggle: toggleZoomDrop,
    setFalse: closeZoomDrop,
  } = useBoolean();

  const isDrop = isCropDrop || isZoomDrop;

  const handleClickCrop = () => {
    toggleCropDrop();
    closeZoomDrop();
  };

  const handleClickZoom = () => {
    toggleZoomDrop();
    closeCropDrop();
  };

  const handleActiveCrop = (id) => {
    setCropList(() =>
      cropList.map((crop) => {
        if (crop.id === id) crop.isActive = true;
        else crop.isActive = false;

        return crop;
      })
    );
  };

  const [cropList, setCropList] = useState([
    {
      id: 1,
      title: "Gốc",
      Icon: <IconImage />,
      isActive: false,
      value: 1,
      onClick: (id, value) => {
        handleActiveCrop(id);
        setAspect(value);
      },
    },
    {
      id: 2,
      title: "1:1",
      Icon: <IconSquare />,
      isActive: true,
      value: 1,
      onClick: (id, value) => {
        handleActiveCrop(id);
        setAspect(value);
      },
    },
    {
      id: 3,
      title: "4:5",
      Icon: <IconRectanglePortrait />,
      isActive: false,
      value: 4 / 5,
      onClick: (id, value) => {
        handleActiveCrop(id);
        setAspect(value);
      },
    },
    {
      id: 4,
      title: "16:9",
      Icon: <IconRectangle />,
      isActive: false,
      value: 16 / 9,
      onClick: (id, value) => {
        handleActiveCrop(id);
        setAspect(value);
      },
    },
  ]);

  const { state: isShowSetupAdvancedDrop, toggle: toggleSetupAdvancedDrop } =
    useBoolean();

  const handleClickSetupAdvanced = () => {
    toggleSetupAdvancedDrop();
  };

  const { state: isNext, setTrue: onNext, setFalse: onNotNext } = useBoolean();

  const handleClickNext = () => {
    onNext();
  };

  const handleClickBackDepth2 = () => {
    onNotNext();
  };

  const {
    state: isShowEmojiDrop,
    toggle: toggleEmojiDrop,
    setFalse: closeEmojiDrop,
  } = useBoolean();

  const emojiRef = useOnClickOutside(() => {
    closeEmojiDrop();
  });

  const handleClickEmojiIcon = () => {
    toggleEmojiDrop();
  };

  const [provinces, setProvinces] = useState([]);
  const [provinceValue, setProvinceValue] = useState("");

  const debounce = useDebounce(provinceValue, 800);

  useEffect(() => {
    (async () => {
      if (debounce.trim() === "") return;
      setProvinces([]);
      const res = await fetch(
        `https://provinces.open-api.vn/api/p/search/?q=${debounce}`
      );
      const data = await res.json();
      setProvinces(data);
    })();
  }, [debounce]);

  const handleClickShare = () => {
    console.log("chia se");
  };

  return (
    <div className="bg-white transition-all rounded-xl overflow-hidden text-[#262626]">
      <div className="relative p-2 flex-shrink-0 border-b">
        {imageSrc && !isNext && (
          <div className="flex items-center justify-between font-semibold">
            <button
              onClick={handleClickBackDepth1}
              className="hover:bg-black/[3%] w-10 h-full flex items-center justify-center rounded-md"
            >
              <IconArrowLeft className="w-5 h-5" />
            </button>
            <h6>Cắt</h6>
            <button
              onClick={handleClickNext}
              className="text-sm text-[#007AFF] hover:bg-black/[3%] w-10 h-full flex items-center justify-center rounded-md"
            >
              Tiếp
            </button>
          </div>
        )}
        {!imageSrc && !isNext && (
          <h6 className="text-center font-semibold">Tạo bài viết mới</h6>
        )}
        {isNext && (
          <div className="flex items-center justify-between font-semibold">
            <button
              onClick={handleClickBackDepth2}
              className="w-20 h-full flex items-center justify-start rounded-md px-3"
            >
              <IconArrowLeft className="w-5 h-5" />
            </button>
            <h6 className="text-center font-semibold">Tạo bài viết mới</h6>
            <button
              onClick={handleClickShare}
              className="text-sm text-[#007AFF] w-20 h-full flex items-center justify-end rounded-md px-3"
            >
              Chia sẻ
            </button>
          </div>
        )}
        {/* Đã chia sẻ bài viết */}
        {/* Đã chia sẻ bài viết của bạn */}
      </div>
      <div
        className={`divide-x font-light grid  grid-rows-[500px] ${
          isNext && "grid-cols-[500px_320px]"
        }`}
      >
        <div className="relative aspect-square overflow-hidden">
          {!imageSrc && (
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
              <button
                onClick={handleClickSelectFile}
                className="relative px-3 py-1 rounded bg-[#007AFF] "
              >
                <span className="text-sm font-semibold text-white">
                  Chọn ảnh từ máy tính
                </span>
              </button>
            </div>
          )}
          {imageSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Cropper
                image={imageSrc}
                style={{
                  cropAreaStyle: {
                    border: "none",
                    transition: "all .3s easy-out",
                    boxShadow: "0 0 0 9999em #fff",
                  },
                }}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                showGrid={isShowGrid}
                zoomWithScroll={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              {!isNext && (
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="flex gap-3 items-center">
                    <div className="relative pt-4">
                      <button
                        onClick={handleClickCrop}
                        className={`bg-black/70 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 ${
                          isDrop && !isCropDrop && "opacity-20"
                        }`}
                      >
                        <IconCrop className="text-white w-4 h-4" />
                      </button>
                      <DropLayout isShow={isCropDrop}>
                        <ul className="bg-black/80 rounded-lg divide-y">
                          {cropList.map((crop) => (
                            <CropItem key={crop.id} item={crop} />
                          ))}
                        </ul>
                      </DropLayout>
                    </div>
                    <div className="relative pt-4">
                      <button
                        onClick={handleClickZoom}
                        className={`bg-black/70 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/50 ${
                          isDrop && !isZoomDrop && "opacity-20"
                        }`}
                      >
                        <IconPlusMagnifyingGlass className="text-white w-4 h-4" />
                      </button>
                      <DropLayout isShow={isZoomDrop}>
                        <div className="w-28 h-7 flex items-center bg-black/80 px-3 py-1 rounded-lg">
                          <input
                            id="small-range"
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(e.target.value)}
                            className="block w-full h-[2px] bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                          />
                        </div>
                      </DropLayout>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
        {isNext && (
          <div className="w-full h-full overflow-x-hidden overflow-y-scroll scrollbar-gutter">
            <div className="px-4 py-4 flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <IconProfile className="text-black/30" />
              </div>
              <p className="font-semibold">laidai9966</p>
            </div>
            <div className="">
              <textarea
                name="caption"
                id="pepCaption"
                cols="30"
                rows="6"
                placeholder="Viết chú thích..."
                className="outline-none px-4 resize-none"
              ></textarea>
            </div>
            <div className="divide-y">
              <div className="h-11 flex items-center justify-between px-4 text-[#8c8c8c] text-xs">
                <div ref={emojiRef} className="relative w-5 h-5">
                  <button onClick={handleClickEmojiIcon} className="w-5 h-5">
                    <IconEmoji />
                  </button>
                  <DropLayout isShow={isShowEmojiDrop} isShowDown={true}>
                    <div className="w-72 h-40">
                      <Emoji />
                    </div>
                  </DropLayout>
                </div>
                <div className="opacity-50">2/2,000</div>
              </div>
              <div className="relative h-11 flex items-center justify-between px-4">
                <input
                  type="text"
                  className="outline-none grow"
                  placeholder="Thêm vị trí"
                  value={provinceValue}
                  onChange={(e) => setProvinceValue(e.target.value)}
                />
                <div className="">
                  <IconLocation className="w-4 h-4" />
                </div>
                <DropLayout
                  className="right-0"
                  isShow={!!provinceValue}
                  isShowDown={true}
                >
                  <div className="w-full h-40 bg-white border shadow-lg rounded-lg overflow-hidden">
                    {!provinces.length && (
                      <div className="py-5">
                        <IconSpinner12Spins className="w-8 h-8 animate-spinner12Spins mx-auto" />
                      </div>
                    )}
                    {!!provinces.length && (
                      <div className="h-full overflow-y-auto">
                        <ul className="py-2 divide-y">
                          {provinces.map((province, index) => (
                            <li key={index} className="hover:bg-black/[3%]">
                              <button className="w-full text-left px-4 py-3">
                                {province.name.replaceAll("Tỉnh", "")}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </DropLayout>
              </div>
              <div className="overflow-hidden">
                <button
                  onClick={handleClickSetupAdvanced}
                  className="relative h-11 w-full flex items-center justify-between px-4 bg-white z-10"
                >
                  <p
                    className={`${isShowSetupAdvancedDrop && "font-semibold"}`}
                  >
                    Cài đặt nâng cao
                  </p>
                  <div
                    className={`transition-transform ${
                      isShowSetupAdvancedDrop && "rotate-180"
                    }`}
                  >
                    <IconChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isShowSetupAdvancedDrop && (
                  <motion.div
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 space-y-2 pb-8 relative"
                  >
                    <div className="flex gap-3 justify-between items-center">
                      <h5>Ẩn lượt thích và lượt xem trên bài viết này</h5>
                      <Switch className="shrink-0" />
                    </div>
                    <p className="text-xs text-[#8c8c8c]">
                      Chỉ bạn mới nhìn thấy tổng số lượt thích và lượt xem bài
                      viết này. Về sau, bạn có thể thay đổi tùy chọn này bằng
                      cách mở menu ··· ở đầu bài viết.
                    </p>
                    <div className="flex gap-3 justify-between items-center">
                      <h5>Tắt tính năng bình luận</h5>
                      <Switch className="shrink-0" />
                    </div>
                    <p className="text-xs text-[#8c8c8c]">
                      Về sau, bạn có thể thay đổi tùy chọn này bằng cách mở menu
                      ··· ở đầu bài viết.
                    </p>
                  </motion.div>
                )}
              </div>
              <div className=""></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostMediaModal;
