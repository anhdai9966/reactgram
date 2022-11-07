import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useOnClickOutside } from "~/hooks";
import Header from "~/components/Header";
import { setShowLoginModal } from "~/app/appSlice";
import { LoginModal, NotificationModal } from "~/components/Modals";
import ModalLayout from "~/layouts/ModalLayout";

function DefaultLayout() {
  const { isShowLoginModal } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const isShownNotificationModal = false;

  const isShowModal = isShowLoginModal || isShownNotificationModal;
  const isShowBtnCloseModal = false;

  const modalRef = useOnClickOutside(() => {
    closeLoginModal();
  });

  const closeLoginModal = () => {
    dispatch(setShowLoginModal(false));
  };

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
        isShownBtn={isShowBtnCloseModal}
      >
        {isShowLoginModal && <LoginModal setFalse={closeLoginModal} />}
        {isShownNotificationModal && <NotificationModal />}
      </ModalLayout>
    </div>
  );
}

export default DefaultLayout;
