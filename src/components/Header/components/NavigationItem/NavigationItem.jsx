import { motion } from "framer-motion";

function NavigationItem({ item, isSideBar, matches }) {
  const { id, Icon, IconActive, title, active, onClick, to = "/" } = item;

  return (
    <div className="my-2">
      <button onClick={() => onClick(id, to)}>
        <motion.div
          initial={{ width: "48px" }}
          animate={
            isSideBar || !matches ? { width: "48px" } : { width: "220px" }
          }
          exit={{ width: "48px" }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 p-3 rounded-full group hover:bg-black/[2%]"
        >
          <div className="w-6 h-6 transition-transform duration-300 group-hover:scale-105 rounded-full relative shrink-0">
            {active ? IconActive : Icon}
            {active && isSideBar && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 border rounded-full"></div>
            )}
            {id === 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-1 rounded-sm bg-[#FF3B30]"></div>
            )}
          </div>
          {!isSideBar && matches && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`text-truncate ${
                active ? "font-semibold" : "font-light"
              }`}
            >
              {title}
            </motion.span>
          )}
        </motion.div>
      </button>
    </div>
  );
}

export default NavigationItem;
