import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { addNewPost } from "~/app/postSlice";
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

  const navigate = useNavigate();

  const provinceRef = useRef(); // tinh
  const captionRef = useRef(); // chu thich

  const { state: isShowSetupAdvancedDrop, toggle: toggleSetupAdvancedDrop } =
    useBoolean();

  // like_and_view_counts_disabled
  const [isHideLikeViewCounts, setHideLikeViewCounts] = useState(false);
  // comment_threading_enabled
  const [isBlockComment, setBlockComment] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const [newPost, setNewPost] = useState({});

  const dispatch = useDispatch();

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

        dispatch(addNewPost(resPost.data.data.post));

        setNewPost(resPost.data.data.post);
        setStep((step) => step + 1);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isSubmit]);

  const handleClickViewPosted = () => {
    navigate(`/post/${newPost.id}`);
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
      titleCenter: "T???o b??i vi???t m???i",
    },
    {
      id: 2,
      titleCenter: "C???t",
      titleLeft: <IconArrowLeft className="w-5 h-5" />,
      onClickLeft: () => {
        setSourceImage(null);
        setStep((step) => step - 1);
      },
      titleRight: "Ti???p",
      onClickRight: () => {
        setStep((step) => step + 1);
      },
    },
    {
      id: 3,
      titleCenter: "T???o b??i vi???t m???i",
      titleLeft: <IconArrowLeft className="w-5 h-5" />,
      onClickLeft: () => {
        setStep((step) => step - 1);
      },
      titleRight: "Chia s???",
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
      titleCenter: "???? chia s??? b??i vi???t",
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
                ???? chia s??? b??i vi???t c???a b???n
              </p>
              <button
                onClick={handleClickViewPosted}
                className="px-4 py-1 rounded-md bg-[#007AFF] text-white"
              >
                Xem
              </button>
            </div>
          )}
        </div>
        {step === 2 && (
          <div className="w-full h-[500px] overflow-x-hidden overflow-y-scroll scrollbar-gutter">
            <div className="px-4 py-4 flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                {!!currentUser.profile_pic_url && (
                  <img
                    src={currentUser.profile_pic_url}
                    alt={currentUser.username}
                  />
                )}
                {!currentUser.profile_pic_url && (
                  <IconProfile className="text-black/30" />
                )}
              </div>
              <p className="font-semibold">{currentUser.username}</p>
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
                  <p>C??i ?????t n??ng cao</p>
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
                    <h5>???n l?????t th??ch v?? l?????t xem tr??n b??i vi???t n??y</h5>
                    <Switch
                      className="shrink-0"
                      onChange={(e) => setHideLikeViewCounts(e.target.checked)}
                      checked={isHideLikeViewCounts}
                    />
                  </div>
                  <p className="text-xs text-[#8c8c8c]">
                    Ch??? b???n m???i nh??n th???y t???ng s??? l?????t th??ch v?? l?????t xem b??i
                    vi???t n??y. V??? sau, b???n c?? th??? thay ?????i t??y ch???n n??y b???ng c??ch
                    m??? menu ?????? ??? ?????u b??i vi???t.
                  </p>
                  <div className="flex gap-3 justify-between items-center">
                    <h5>T???t t??nh n??ng b??nh lu???n</h5>
                    <Switch
                      className="shrink-0"
                      onChange={(e) => setBlockComment(e.target.checked)}
                      checked={isBlockComment}
                    />
                  </div>
                  <p className="text-xs text-[#8c8c8c]">
                    V??? sau, b???n c?? th??? thay ?????i t??y ch???n n??y b???ng c??ch m??? menu
                    ?????? ??? ?????u b??i vi???t.
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
