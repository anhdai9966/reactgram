import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import images from "~/assets/images";
import { IconVerified, IconXmark } from "~/components/UI/Icons";
import { setIsShowClearAllRecentModal } from "~/components/Header/HeaderSlice";
import SearchField from "./components/SearchField";
import AnimateUpLayout from "~/layouts/AnimateUpLayout";

function SearchDrop() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClearAllRecent = () => {
    dispatch(setIsShowClearAllRecentModal(true));
  };

  const handleClickItemUser = (userId) => {
    navigate(`/@${userId}`);
  };

  return (
    <AnimateUpLayout delay={.1}>
      <div className="px-4 py-6 flex flex-col gap-8 border-b">
        <h4 className="text-xl font-semibold px-3">Tìm kiếm</h4>
        <SearchField />
      </div>
      <div className="pt-3">
        <div className="flex justify-between items-center px-4 py-2">
          <p className="px-3">Gần đây</p>
          <button
            className="text-sm font-semibold text-[#0095f6] hover:bg-[#3c3c43]/[5%] px-2 py-1 rounded-md"
            onClick={handleClearAllRecent}
          >
            Xóa tất cả
          </button>
        </div>
        <ul className="pt-2">
          <li className="px-4 py-2 h-[60px] hover:bg-[#3c3c43]/[3%]">
            <div className="pl-2 flex gap-3 items-center h-full">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                <img src={images.avatarHoangYen} alt="Hoang yen" />
              </div>
              <div
                className="flex flex-col text-sm w-full cursor-pointer"
                onClick={() => handleClickItemUser("abc")}
              >
                <div className="flex gap-1 items-center">
                  <p>hoangyenchibi812</p>
                  <div className="">
                    <IconVerified className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-[#767680]/60 font-light">Hoàng Yến</p>
              </div>
              <button className="flex-shrink-0 flex items-center justify-center w-8 h-8 text-[#767680]/60 hover:bg-[#3c3c43]/[5%] rounded-md">
                <IconXmark className="w-4 h-4" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </AnimateUpLayout>
  );
}

export default SearchDrop;
