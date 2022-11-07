function CropItem({ item }) {
  const { id, Icon, title, isActive, value, onClick } = item;

  return (
    <li>
      <button
        onClick={() => onClick(id, value)}
        className={`flex items-center gap-3 px-4 py-3 ${
          isActive ? "text-white" : "text-white/50"
        }`}
      >
        <span className="text-sm">{title}</span>
        <span className="w-6 h-6 shrink-0">{Icon}</span>
      </button>
    </li>
  );
}

export default CropItem;
