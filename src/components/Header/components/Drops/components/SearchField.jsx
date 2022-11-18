import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconSearch,
  IconSpinner8Spins,
  IconXmarkCircleFill,
} from "~/components/UI/Icons";
import useDebounce from "~/hooks/useDebounce";
import { setIsLoading } from "~/components/Header/HeaderSlice";
import { toSlug } from "~/utils";

function SearchField() {
  const { isLoadingSearch } = useSelector((state) => state.header);
  const dispatch = useDispatch();

  const [enteredSearch, setEnteredSearch] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputSearchRef = useRef();

  const deBounce = useDebounce(enteredSearch, 600);

  // có focus hoặc có giá trị search và phải có dropdown list search

  useEffect(() => {
    if (!deBounce.trim()) return;
    const toCode = toSlug(deBounce);
    console.log(toCode)
    // handler search text

    dispatch(setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deBounce]);
  
  const handleChangeInputSearch = (e) => {
    setEnteredSearch(e.target.value);
    dispatch(setIsLoading(true));
  };

  const handleFocusInputSearch = () => {
    setIsTouched(true);

    inputSearchRef.current.select();
    inputSearchRef.current.setSelectionRange(0, 99999); // For mobile devices
  };

  const handleBlurInputSearch = () => {
    setIsTouched(false);
  };

  const handleClickClearValueSearch = () => {
    setEnteredSearch("");
  };

  const handleSubmitFormSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative">
      <form
        className="w-full"
        onSubmit={handleSubmitFormSearch}
        autoComplete="off"
      >
        <label className="bg-[#efefef] text-[#333] inline-block w-full rounded-lg cursor-auto">
          {!enteredSearch && (
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[#767680]/60 font-light">
              Tìm kiếm
            </span>
          )}
          <input
            ref={inputSearchRef}
            type="text"
            name="search"
            className={`h-10 w-full px-10 py-1 outline-none bg-transparent ${
              !isTouched && "text-[#767680]/60"
            }`}
            value={enteredSearch}
            onChange={handleChangeInputSearch}
            onFocus={handleFocusInputSearch}
            onBlur={handleBlurInputSearch}
          />
        </label>
      </form>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#767680]/60">
        <IconSearch className=" w-4 h-4" />
      </div>

      {!isLoadingSearch && enteredSearch && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={handleClickClearValueSearch}
        >
          <IconXmarkCircleFill className="w-4 h-4 text-[#3c3c43]/30" />
        </button>
      )}
      {isLoadingSearch && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <IconSpinner8Spins className="w-4 h-4 animate-spinner8Spins" />
        </div>
      )}
    </div>
  );
}

export default SearchField;
