function NavItem({ item }) {
  const { id, title, to, onClick, isActive } = item;
  return (
    <li
      className={`border-l-2 ${
        isActive
          ? "border-gray-500 font-normal"
          : "border-transparent hover:border-gray-200 hover:bg-black/[3%]"
      }`}
    >
      <button
        onClick={() => onClick(id, to)}
        className="text-left w-full py-4 pl-7 pr-4"
      >
        {title}
      </button>
    </li>
  );
}

export default NavItem;
