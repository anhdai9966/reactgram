import { useDispatch, useSelector } from "react-redux";

import images from "~/assets/images";
import { IconSpinner12Spins, IconXmark } from "~/components/Icons";

import { ModalCommentThread, ModalMenuThread } from "./components/Modal";
import Thread from "./components/Thread";

import { useDocumentTitle, useOnClickOutside } from "~/hooks";
import Footer from "~/layouts/components/Footer";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { setModalLogin } from "~/layouts/DefaultLayout/DefaultLayoutSlice";

function PageHome() {
  useDocumentTitle("Reactgram");

  const { isToggleModalMenuThread, isToggleModalDetailThead } = useSelector(
    (state) => state.pageHome
  );
  const dispatch = useDispatch();

  const isShownModal = isToggleModalMenuThread || isToggleModalDetailThead;
  const isShownBtnClose = isToggleModalDetailThead;

  const modalRef = useOnClickOutside(() => {
  });

  const handleClickBtnSwitchAccount = () => {
    dispatch(setModalLogin(true));
  };

  return (
    <div className="flex gap-8 justify-center flex-col lg:flex-row py-6">
      {isShownModal && (
        <div className="fixed inset-0 z-50 bg-black/[65%]">
          {isShownBtnClose && (
            <button className="transition-transform duration-300 hover:scale-105 hover:bg-black/10 p-3 rounded-lg absolute right-3 top-3">
              <IconXmark className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      )}
      <AnimatePresence>
        {isShownModal && (
          <motion.div
            initial={{
              opacity: 1,
              scale: 1.1,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              translateX: "-50%",
              translateY: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              translateX: "-50%",
              translateY: "-50%",
            }}
            ref={modalRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            {isToggleModalDetailThead && <ModalCommentThread />}
            {isToggleModalMenuThread && <ModalMenuThread />}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full sm:w-[470px]">
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
          <div className="flex flex-col gap-4">
            <Thread />
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
            <div className="flex justify-center">
              <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
            </div>
          </div>
        </div>
      </div>
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
                  <Link to="@:_ann3112_">
                    <img src={images.avatar2} alt="avatar" />
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link to="@:_ann3112_" className="font-semibold">
                    _ann3112_
                  </Link>
                  <p className="text-xs text-[#8c8c8c] font-light">Phổ biến</p>
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
  );
}

export default PageHome;
