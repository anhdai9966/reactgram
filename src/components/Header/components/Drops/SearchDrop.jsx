import { useDispatch, useSelector } from "react-redux";
import {
  fetchResentsByUserId,
  setIsShowClearAllRecentModal,
} from "~/components/Header/HeaderSlice";
import SearchField from "./components/SearchField";
import AnimateUpLayout from "~/layouts/AnimateUpLayout";
import { useState } from "react";
import SearchItem from "./components/SearchItem";
import { IconSpinner12Spins } from "~/components/UI/Icons";
import { useEffect } from "react";
import { useDidMountEffect } from "~/hooks";

function SearchDrop() {
  const { enteredSearch, searchs, recents, isLoadingSearch } = useSelector(
    (state) => state.header
  );
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchsView, setSearchsView] = useState([]);
  const [recentsView, setRecentsView] = useState([]);

  useEffect(() => {
    if (!recentsView.length && !enteredSearch) {
      dispatch(fetchResentsByUserId(currentUser.uid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchsView(searchs);
  }, [searchs]);

  useEffect(() => {
    setRecentsView(recents);
  }, [recents]);

  useDidMountEffect(() => {
    setSearchsView([])
  }, [enteredSearch])

  const handleClearAllRecent = () => {
    dispatch(setIsShowClearAllRecentModal(true));
  };

  return (
    <AnimateUpLayout delay={0.1}>
      <div className="px-4 py-6 flex flex-col gap-8 border-b">
        <h4 className="text-xl font-semibold px-3">Tìm kiếm</h4>
        <SearchField />
      </div>
      <div className="pt-3">
        {!enteredSearch && !!recentsView.length && (
          <div className="flex justify-between items-center px-4 py-2">
            <p className="px-3">Gần đây</p>
            <button
              className="text-sm font-semibold text-[#0095f6] hover:bg-[#3c3c43]/[5%] px-2 py-1 rounded-md"
              onClick={handleClearAllRecent}
            >
              Xóa tất cả
            </button>
          </div>
        )}
        {isLoadingSearch && (
          <div className="w-full mt-14">
            <IconSpinner12Spins className="w-4 h-4 mx-auto animate-spinner12Spins" />
          </div>
        )}
        {!enteredSearch && (
          <ul className="pt-2">
            {recentsView.map((recent, index) => (
              <SearchItem key={index} item={recent} isShowBtn={true} />
            ))}
          </ul>
        )}
        {enteredSearch && (
          <ul className="pt-2">
            {searchsView.map((search, index) => (
              <SearchItem key={index} item={search} />
            ))}
          </ul>
        )}
      </div>
    </AnimateUpLayout>
  );
}

export default SearchDrop;
