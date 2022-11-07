function DropMenuItem({ item }) {
  const { title, Icon, to, onClick } = item;

  return (
    <div className="px-4 py-2 hover:bg-[#3c3c43]/[3%]">
      <button
        onClick={() => onClick(to)}
        className="w-full flex gap-3 items-center justify-between"
      >
        <span>{title}</span>
        {!!Icon && <div className="w-6 h-6 text-[#262626]">{Icon}</div>}
      </button>
    </div>
  );
}

export default DropMenuItem;
