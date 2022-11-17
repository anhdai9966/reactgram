import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import images from "~/assets/images";
import {
  IconArrowLeft,
  IconChevronDown,
  IconProfile,
  IconSpinner12Spins,
} from "~/components/UI/Icons";
import Switch from "~/components/UI/Switch";
import { useBoolean, useDidMountEffect, useLockedBody } from "~/hooks";
import DownLayout from "~/layouts/Animate/DownLayout";
import OpacityLayout from "~/layouts/Animate/OpacityLayout";
import { media } from "~/services";
import posts from "~/services/postsService";
import { dataUrlToFile, getWidthHeightImage } from "~/utils";
import Caption from "./components/Caption";
import Crop from "./components/Crop";
import Provinces from "./components/Provinces";
import SelectFile from "./components/SelectFile";
import TopNavPostMedia from "./components/TopNavPostMedia";

function PostMediaModal({ setFalse }) {
  useLockedBody(true);
  const [sourceImage, setSourceImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [step, setStep] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const provinceRef = useRef(); // tinh
  const captionRef = useRef(); // chu thich

  const { state: isShowSetupAdvancedDrop, toggle: toggleSetupAdvancedDrop } =
    useBoolean();

  // like_and_view_counts_disabled
  const [isHideLikeViewCounts, setHideLikeViewCounts] = useState(false);
  // comment_threading_enabled
  const [isBlockComment, setBlockComment] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [newPost, setNewPost] = useState({})

  useDidMountEffect(() => {
    (async () => {
      try {
        const fileName = v4();
        const file = await dataUrlToFile(croppedImage, fileName);
        const resUrlImage = await media.uploadImage(file, fileName);
        const { width, height } = await getWidthHeightImage(croppedImage);
        const image = { width, height, url: resUrlImage };

        const resPost = await posts.createPost({
          ...currentUser,
          image,
          caption: captionRef.current.value,
          province: provinceRef.current.value,
          like_and_view_counts_disabled: isHideLikeViewCounts,
          comment_threading_disabled: isBlockComment,
        });

        setNewPost(resPost.data.data);
        setStep((step) => step + 1);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isSubmit]);

  const handleClickCloseMediaModal = () => {
    setFalse();
  };

  const handleReadFile = (file) => {
    if (!file) return;
    setSourceImage(file);
    setStep(1);
  };

  const handleClickSetupAdvanced = () => {
    toggleSetupAdvancedDrop();
  };

  const [topNavRef, setTopNavRef] = useState([
    {
      id: 0,
      titleCenter: "Tạo bài viết mới",
    },
    {
      id: 2,
      titleCenter: "Cắt",
      titleLeft: <IconArrowLeft className="w-5 h-5" />,
      onClickLeft: () => {
        setSourceImage(null);
        setStep((step) => step - 1);
      },
      titleRight: "Tiếp",
      onClickRight: () => {
        setStep((step) => step + 1);
      },
    },
    {
      id: 3,
      titleCenter: "Tạo bài viết mới",
      titleLeft: <IconArrowLeft className="w-5 h-5" />,
      onClickLeft: () => {
        setStep((step) => step - 1);
      },
      titleRight: "Chia sẻ",
      onClickRight: (id) => {
        setTopNavRef((nav) =>
          nav.map((na) => {
            if (na.id === id)
              na.titleRight = (
                <IconSpinner12Spins className="w-5 h-5 animate-spinner12Spins" />
              );
            return na;
          })
        );
        setIsSubmit(true);
      },
    },
    {
      id: 4,
      titleCenter: "Đã chia sẻ bài viết",
    },
  ]);

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="relative border-b">
        <TopNavPostMedia item={topNavRef[step]} />
      </div>
      <div className="divide-x flex">
        <div className="relative w-[500px] aspect-square overflow-hidden shrink-0">
          {step === 0 && <SelectFile onReadFile={handleReadFile} />}
          {step === 1 && (
            <OpacityLayout isShow={!!sourceImage}>
              <Crop
                sourceImage={sourceImage}
                setCroppedImage={setCroppedImage}
              />
            </OpacityLayout>
          )}
          {step === 2 && (
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={croppedImage}
                alt="croppedImage"
                className="object-contain w-full h-full"
              />
            </div>
          )}
          {step === 3 && (
            <div className="w-full h-full flex flex-col justify-center items-center gap-3">
              <div className="w-20 h-20 mx-auto">
                <img src={images.done} alt="done" />
              </div>
              <p className="text-center font-light">
                Đã chia sẻ bài viết của bạn
              </p>
              <button
                onClick={handleClickCloseMediaModal}
                className="px-4 py-1 rounded-md bg-[#007AFF] text-white"
              >
                Đóng
              </button>
            </div>
          )}
        </div>
        {step === 2 && (
          <div className="w-full h-[500px] overflow-x-hidden overflow-y-scroll scrollbar-gutter">
            <div className="px-4 py-4 flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <IconProfile className="text-black/30" />
              </div>
              <p className="font-semibold">laidai9966</p>
            </div>
            <div className="divide-y">
              <div className="px-4">
                <Caption ref={captionRef} />
              </div>

              <div className="px-4">
                <Provinces ref={provinceRef} />
              </div>
              <div className="overflow-hidden">
                <button
                  onClick={handleClickSetupAdvanced}
                  className="relative h-11 w-full flex items-center justify-between px-4 bg-white z-10 font-semibold"
                >
                  <p>Cài đặt nâng cao</p>
                  <div
                    className={`transition-transform ${
                      isShowSetupAdvancedDrop && "rotate-180"
                    }`}
                  >
                    <IconChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <DownLayout
                  isShow={isShowSetupAdvancedDrop}
                  className="px-4 space-y-2 pb-8 relative"
                >
                  <div className="flex gap-3 justify-between items-center">
                    <h5>Ẩn lượt thích và lượt xem trên bài viết này</h5>
                    <Switch
                      className="shrink-0"
                      onChange={(e) => setHideLikeViewCounts(e.target.checked)}
                      checked={isHideLikeViewCounts}
                    />
                  </div>
                  <p className="text-xs text-[#8c8c8c]">
                    Chỉ bạn mới nhìn thấy tổng số lượt thích và lượt xem bài
                    viết này. Về sau, bạn có thể thay đổi tùy chọn này bằng cách
                    mở menu ··· ở đầu bài viết.
                  </p>
                  <div className="flex gap-3 justify-between items-center">
                    <h5>Tắt tính năng bình luận</h5>
                    <Switch
                      className="shrink-0"
                      onChange={(e) => setBlockComment(e.target.checked)}
                      checked={isBlockComment}
                    />
                  </div>
                  <p className="text-xs text-[#8c8c8c]">
                    Về sau, bạn có thể thay đổi tùy chọn này bằng cách mở menu
                    ··· ở đầu bài viết.
                  </p>
                </DownLayout>
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
