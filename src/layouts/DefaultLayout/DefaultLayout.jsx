import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useOnClickOutside } from "~/hooks";
import Header from "~/components/Header";
import { setShowLoginModal } from "~/app/appSlice";
import { LoginModal, NotificationModal } from "~/components/Modals";
import ModalLayout from "~/layouts/ModalLayout";
import OverlayCloseScreen from "~/components/OverlayCloseScreen";
import Toast from "~/components/Toast";
import ToastLayout from "../Animate/ToastLayout";
import PostModal from "~/components/Modals/PostModal";
import { setIsShowPostsModal } from "~/app/postSlice";

function DefaultLayout() {
  const { isShowLoginModal, isShowToast } = useSelector((state) => state.app);
  const { isLoadingAccount } = useSelector((state) => state.user);
  const { isShowPostModal } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const location = useLocation();

  const isShownNotificationModal = false;

  const isShowModal =
    isShowLoginModal || isShownNotificationModal || isShowPostModal;
  const isShowBtnCloseModal = isShowPostModal;

  const closePostModal = () => {
    dispatch(setIsShowPostsModal(false));
  };

  const closeLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

  const modalRef = useOnClickOutside(() => {
    window.history.replaceState(null, "back", location.pathname);
    closeLoginModal();
    closePostModal();
  });

  return (
    <div className="bg-[#fafafa] relative">
      <div className="relative grid grid-cols-1 sm:grid-cols-[73px_1fr] xl:grid-cols-[244px_1fr] h-[var(--window-height)] overflow-y-auto scrollbar-gutter">
        <Header />
        <div className="container w-full lg:max-w-[975px] h-fit min-h-[var(--window-height)] transition-all mx-auto">
          <Outlet />
        </div>
      </div>

      <ModalLayout
        ref={modalRef}
        isShow={isShowModal}
        isShowBtn={isShowBtnCloseModal}
      >
        {isShowLoginModal && <LoginModal setFalse={closeLoginModal} />}
        {isShownNotificationModal && <NotificationModal />}
        {isShowPostModal && <PostModal />}
      </ModalLayout>

      {isLoadingAccount && <OverlayCloseScreen />}

      <ToastLayout
        isShow={isShowToast}
        className="fixed left-1/2 -translate-x-1/2 bottom-16 z-50 transition-all"
      >
        <Toast />
      </ToastLayout>
    </div>
  );
}

export default DefaultLayout;
