import { v4 } from "uuid";

function Switch({ onChange, checked, className }) {
  const id = v4();

  return (
    <div className={`h-11 flex items-center ${className}`}>
      <input
        type="checkbox"
        className="h-0 w-0 invisible peer"
        id={`switch-${id}`}
        onChange={onChange}
        checked={checked}
      />
      <label
        htmlFor={`switch-${id}`}
        className="cursor-pointer w-[51px] h-[31px] bg-[#767680]/[.36] block rounded-3xl relative peer-checked:bg-[#34C759] peer-checked:after:left-[calc(100%_-_2px)] peer-checked:after:-translate-x-full after:contents-[''] after:absolute after:top-[2px] after:left-[2px] after:w-[27px] after:h-[27px] after:bg-white after:rounded-full after:transition-all after:duration-300 active:after:w-8"
      ></label>
    </div>
  );
}

export default Switch;
