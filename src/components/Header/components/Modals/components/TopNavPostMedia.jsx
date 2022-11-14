function TopNavPostMedia({ item }) {
  const {
    onClickLeft,
    onClickRight,
    titleRight = "",
    titleLeft = "",
    titleCenter = "",
    id,
  } = item;

  return (
    <div className="relative font-semibold p-2">
      {!!titleLeft && (
        <button
          onClick={onClickLeft}
          className="hover:bg-black/[3%] rounded-md text-sm absolute top-1/2 -translate-y-1/2 left-3"
        >
          {titleLeft}
        </button>
      )}
      <h2 className="text-center px-6 text-truncate">{titleCenter}</h2>
      {!!titleRight && (
        <button
          onClick={() => onClickRight(id)}
          className="text-[#007AFF] hover:bg-black/[3%] rounded-md text-sm absolute top-1/2 -translate-y-1/2 right-3"
        >
          {titleRight}
        </button>
      )}
    </div>
  );
}

export default TopNavPostMedia;
