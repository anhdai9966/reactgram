import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { IconSpinner12Spins } from "~/components/UI/Icons";
import { ModalCommentThread, ModalMenuThread } from "./components/Modals";
import Thread from "./components/Thread";
import { useDocumentTitle, useOnClickOutside } from "~/hooks";
import Footer from "~/components/Footer";
import { setHiddenAllModalHome } from "./HomeSlice";
import ModalLayout from "~/layouts/ModalLayout";
import { setShowLoginModal } from "~/app/appSlice";
import { useEffect } from "react";
import { fetchAllPosts } from "~/app/postSlice";

// const posts = [
//   {
//     user: {
//       full_name: "Lai Cao Dai",
//       is_verified: false,
//       uid: "61kcF0jOkefFKv8l5UdxwXjVS312",
//       is_private: false,
//       username: "dailai3110",
//       profile_pic_url: null,
//     },
//     like_count: 0,
//     updated_at: null,
//     location: "Thành phố Hồ Chí Minh",
//     like_and_view_counts_disabled: false,
//     caption: "tLinh",
//     comment_count: 0,
//     caption_is_edited: false,
//     image: {
//       width: 1080,
//       url: "https://firebasestorage.googleapis.com/v0/b/reactjs-api-a31a3.appspot.com/o/fa2280d8-f022-4130-8e24-8552f39cd39e?alt=media&token=bcb34233-f05f-4b13-8128-8cd5de132a6b",
//       height: 1080,
//     },
//     comment_threading_disabled: false,
//     created_at: 1668406642115,
//     uid: "61kcF0jOkefFKv8l5UdxwXjVS312",
//     id: "0X2oCmowEmFjTDGUs5mK",

//     inputComment: "",
//   },
//   {
//     image: {
//       width: 1080,
//       height: 1080,
//       url: "https://firebasestorage.googleapis.com/v0/b/reactjs-api-a31a3.appspot.com/o/6f49949a-0c8f-41a7-9649-da61046de97d?alt=media&token=2c7462d3-2e94-4817-8571-b4571c46d71b",
//     },
//     caption: "son tung hello😃dsfd😁😂😅😀😆",
//     updated_at: null,
//     user: {
//       full_name: "Lai Cao Dai",
//       is_verified: false,
//       profile_pic_url: null,
//       username: "dailai3110",
//       is_private: false,
//       uid: "61kcF0jOkefFKv8l5UdxwXjVS312",
//     },
//     comment_threading_disabled: false,
//     uid: "61kcF0jOkefFKv8l5UdxwXjVS312",
//     like_and_view_counts_disabled: true,
//     caption_is_edited: false,
//     like_count: 0,
//     comment_count: 0,
//     location: "Thành phố Hà Nội",
//     created_at: 1668406462790,
//     id: "V6LB9k9dJr8jnfMb6kD6",
//     inputComment: "",
//   },
//   {
//     comment_count: 0,
//     caption_is_edited: false,
//     location: "",
//     user: {
//       is_private: false,
//       is_verified: false,
//       profile_pic_url: null,
//       full_name: "Lai Cao Dai",
//       uid: "61kcF0jOkefFKv8l5UdxwXjVS312",
//       username: "dailai3110",
//     },
//     image: {
//       width: 1080,
//       height: 1080,
//       url: "https://firebasestorage.googleapis.com/v0/b/reactjs-api-a31a3.appspot.com/o/76e94cd6-238f-4beb-93eb-6e97d4fc0342?alt=media&token=3b82c5ef-5ad1-4832-a566-13dd057bf681",
//     },
//     caption: "",
//     like_and_view_counts_disabled: false,
//     created_at: 1668405490484,
//     like_count: 0,
//     uid: "61kcF0jOkefFKv8l5UdxwXjVS312",
//     updated_at: null,
//     comment_threading_disabled: false,
//     id: "gfL0LC3y6HCIaADURtDM",
//     inputComment: "",
//   },
// ];

function HomePage() {
  useDocumentTitle("Reactgram");

  const { posts, isLoadingPosts } = useSelector((state) => state.posts);

  const { isToggleModalMenuThread, isToggleModalDetailThead } = useSelector(
    (state) => state.pageHome
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isShowModal = isToggleModalMenuThread || isToggleModalDetailThead;
  const isShowBtnModal = isToggleModalDetailThead;

  useEffect(() => {
    dispatch(fetchAllPosts())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const modalRef = useOnClickOutside(() => {
    dispatch(setHiddenAllModalHome());
    navigate("/app");
  });

  const handleClickBtnSwitchAccount = () => {
    dispatch(setShowLoginModal(true));
  };

  return (
    <div className="">
      <ModalLayout
        ref={modalRef}
        isShow={isShowModal}
        isShowBtn={isShowBtnModal}
      >
        {isToggleModalDetailThead && <ModalCommentThread />}
        {isToggleModalMenuThread && <ModalMenuThread />}
        <Outlet />
      </ModalLayout>

      <div className="flex gap-8 flex-col lg:flex-row py-6 w-fit mx-auto">
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "100px", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full sm:w-[470px]"
        >
          <div className="flex justify-center mb-4">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border overflow-hidden py-4 pl-4 flex gap-3 items-center">
                <div className="flex flex-col gap-2 items-center w-16">
                  <div className="inline-block rounded-full w-14 h-14 overflow-hidden">
                    <img src={images.avatar2} alt="avatar" />
                  </div>
                  <p className=" w-16 text-[12px] text-truncate text-gray-500">
                    andiez.namtruong
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col gap-4 w-full sm:w-[470px] mx-auto">
              {posts.map((post) => (
                <Thread key={post.id} item={post} />
              ))}
              {false && (
                <div className="bg-white rounded-lg overflow-hidden border">
                  <div className="space-y-2 p-6">
                    <div className="w-24 h-24 mx-auto">
                      <img src={images.done} alt="done" />
                    </div>
                    <div className="space-y-1 text-center">
                      <h5 className="">Bạn đã hoàn thành</h5>
                      <p className="text-sm font-light text-[#8c8c8c]">
                        Bạn đã xem tất cả các bài đăng mới trong 3 ngày qua.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {isLoadingPosts && (
                <div className="flex justify-center">
                  <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
        <div className="hidden lg:block">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-4 pl-4">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Link to="/">
                    <img src={images.avatar2} alt="avatar" />
                  </Link>
                </div>
                <Link to="/" className="text-sm">
                  dailai3110
                </Link>
              </div>
              <button
                onClick={handleClickBtnSwitchAccount}
                className="text-xs text-[#0095f6] relative px-4 py-2 hover:bg-black/[3%] rounded-md"
              >
                Chuyển
              </button>
            </div>
            <div className="text-sm w-80">
              <div className="pl-4 flex justify-between items-center">
                <h5 className="text-[#8c8c8c]">Gợi ý cho bạn</h5>
                <Link
                  to="/explore/people"
                  className="block text-xs px-4 py-2 hover:bg-black/[3%] rounded-md"
                >
                  Xem tất cả
                </Link>
              </div>
              <ul className="py-2">
                <li className="pl-4 py-2 flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Link to="/@:_ann3112_">
                        <img src={images.avatar2} alt="avatar" />
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      <Link to="/@:_ann3112_" className="font-semibold">
                        _ann3112_
                      </Link>
                      <p className="text-xs text-[#8c8c8c] font-light">
                        Phổ biến
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-[#0095f6] relative px-4 py-2 hover:bg-black/[3%] rounded-md">
                    Theo dõi
                  </button>
                </li>
              </ul>
            </div>
            <div className="opacity-60">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
