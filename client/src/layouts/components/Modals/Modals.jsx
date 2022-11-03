import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IconXmark } from "~/components/Icons";
import { useOnClickOutside } from "~/hooks";
import { setModalLogin } from "~/layouts/DefaultLayout/DefaultLayoutSlice";
import { ModalLogin } from "~/pages/Home/components/Modal";
import Notification from "./Notification";


function Modals() {
  const { isShownModalLogin } = useSelector((state) => state.defaultLayout);
  const dispatch = useDispatch();
  const isShownModalNotification = false

  const isShownModal = isShownModalLogin || isShownModalNotification;
  const isShownBtnClose = false;

  const modalRef = useOnClickOutside(() => {
    closeModalLogin();
  });

  const closeModalLogin = () => {
    dispatch(setModalLogin(false));
  };

  return (
    <div>
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
            {isShownModalLogin && <ModalLogin setFalse={closeModalLogin} />}
            {isShownModalNotification && <Notification />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Modals;
