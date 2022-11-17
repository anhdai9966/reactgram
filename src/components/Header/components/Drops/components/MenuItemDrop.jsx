import { useSelector } from "react-redux";
import { IconSpinner8Spins } from "~/components/UI/Icons";

function MenuItemDrop({ item }) {
  const { isLoadingAccount } = useSelector((state) => state.user);

  const { title, Icon, to, onClick, iconAction = false } = item;

  return (
    <div className="px-4 py-2 hover:bg-[#3c3c43]/[3%]">
      <button
        onClick={() => onClick(to)}
        className="w-full flex gap-3 items-center justify-between"
      >
        <span>{title}</span>
        {!!Icon && (
          <div className="w-6 h-6 text-[#262626] flex items-center justify-center">
            {Icon}
          </div>
        )}
        {isLoadingAccount && iconAction && (
          <IconSpinner8Spins className="w-4 h-4 animate-spinner8Spins" />
        )}
      </button>
    </div>
  );
}

export default MenuItemDrop;
