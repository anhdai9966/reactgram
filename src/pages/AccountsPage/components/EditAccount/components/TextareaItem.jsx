function TextareaItem({
  register,
  title = "",
  type = "text",
  placeholder = "",
  disabled = false,
  text = "",
  rows = 1,
}) {
  const { onChange, onBlur, name, ref } = register;

  return (
    <label className="flex lg:gap-6 flex-col lg:flex-row">
      <div className="font-semibold px-2 h-8 flex items-center lg:justify-end lg:w-36 shrink-0">
        {title}
      </div>
      <div className="w-full max-w-sm space-y-2">
        <textarea
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          rows={rows}
          className="block border rounded w-full p-2 outline-none bg-[#fafafa]"
        ></textarea>
        {text}
      </div>
    </label>
  );
}

export default TextareaItem;
