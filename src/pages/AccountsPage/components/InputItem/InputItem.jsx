function InputItem({
  register = {},
  title = "",
  type = "",
  placeholder = "",
  disabled = false,
  text = "",
  className = "",
  onFocus = () => {},
}) {
  const { onChange, onBlur, name, ref } = register;

  return (
    <label className="flex lg:gap-6 flex-col lg:flex-row">
      <div className={`${!title && "hidden lg:block"}`}>
        <div className="font-semibold px-2 h-8 flex items-center lg:justify-end lg:w-36 shrink-0 text-right">
          {title}
        </div>
      </div>
      <div className="w-full max-w-sm space-y-2">
        {!!type && (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={ref}
            disabled={disabled}
            className={`outline-none block border rounded h-8 w-full px-2 bg-[#fafafa] ${className} ${
              disabled && "bg-[#efefef] text-[#767680]"
            }`}
          />
        )}
        {text}
      </div>
    </label>
  );
}

export default InputItem;
