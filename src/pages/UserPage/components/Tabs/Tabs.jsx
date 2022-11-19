function Tabs({ item }) {
  const { id, Icon, title, isActive, to, onClick, hidden = false } = item;

  if (hidden) return ''

  return (
    <li
      className={`py-3 ${
        isActive && "text-[#3c3c43] border-t border-gray-600"
      }`}
    >
      <button
        onClick={() => onClick(id, to)}
        className="relative py-2 flex items-center gap-2 h-full rounded-md group"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%_+_24px)] h-full rounded-lg group-hover:bg-[#3c3c43]/[3%]"></div>
        <div className="w-3 h-3">{Icon}</div>
        <span>{title}</span>
      </button>
    </li>
  );
}

export default Tabs;
