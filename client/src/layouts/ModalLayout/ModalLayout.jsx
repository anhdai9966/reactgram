import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { IconXmark } from "~/components/UI/Icons";

const Modals = forwardRef(
  ({ isShow = false, isShowBtn = false, children = null }, ref) => {
    return (
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{duration: .2}}
            className="fixed inset-0 z-50 bg-black/[65%]"
          >
            {isShowBtn && (
              <button className="absolute right-3 top-3 p-3 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-black/10 ">
                <IconXmark className="w-4 h-4 text-white" />
              </button>
            )}
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
              ref={ref}
              className="absolute top-1/2 left-1/2"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default Modals;
