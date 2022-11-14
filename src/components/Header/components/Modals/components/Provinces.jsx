import { forwardRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IconLocation, IconSpinner8Spins } from "~/components/UI/Icons";
import { useDebounce, useOnClickOutside } from "~/hooks";
import DropLayout from "~/layouts/DropLayout";

const Provinces = forwardRef((props, ref) => {
  const [provinces, setProvinces] = useState([]);
  const [provinceValue, setProvinceValue] = useState("");
  const [isShowProvincesDrop, setIsShowProvincesDrop] = useState(false);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);

  const debounce = useDebounce(provinceValue, 600);

  useEffect(() => {
    if (!debounce.trim()) {
      setIsShowProvincesDrop(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `https://provinces.open-api.vn/api/p/search/?q=${debounce}`
        );
        const data = await res.json();
        setIsLoadingProvinces(false);
        setProvinces(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [debounce]);

  const handleChangeProvinceInput = (ev) => {
    setProvinceValue(ev.target.value);
    setIsLoadingProvinces(true);
    setProvinces([]);
    setIsShowProvincesDrop(true);
  };

  const handleClickProvice = (province) => {
    setProvinceValue(province.name);
    setIsShowProvincesDrop(false);
  };

  const provinceRef = useOnClickOutside(() => {
    setIsShowProvincesDrop(false);
  });

  return (
    <div ref={provinceRef} className="relative">
      <div className="h-11 flex items-center justify-between">
        <input
          type="text"
          id="pepProvince"
          className="outline-none grow"
          placeholder="Thêm vị trí"
          value={provinceValue}
          onChange={handleChangeProvinceInput}
          ref={ref}
        />
        <label htmlFor="pepProvince">
          <IconLocation className="w-4 h-4" />
        </label>
      </div>
      <DropLayout
        className="right-0"
        isShow={isShowProvincesDrop}
        isShowDown={true}
      >
        <div className="w-full h-40 bg-white border shadow-lg rounded-lg overflow-hidden">
          {isLoadingProvinces && (
            <div className="h-full flex items-center justify-center">
              <IconSpinner8Spins className="w-4 h-4 animate-spinner8Spins mx-auto" />
            </div>
          )}
          {!provinces.length && !isLoadingProvinces && (
            <p className="text-sm h-full flex items-center justify-center">
              Không tìm thấy vị trí
            </p>
          )}
          {!!provinces.length && (
            <div className="h-full overflow-y-auto">
              <ul className="py-2 divide-y">
                {provinces.map((province, index) => (
                  <li key={index} className="hover:bg-black/[3%]">
                    <button
                      onClick={() => handleClickProvice(province)}
                      className="w-full text-left px-4 py-3"
                    >
                      {province.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DropLayout>
    </div>
  );
});

export default Provinces;
