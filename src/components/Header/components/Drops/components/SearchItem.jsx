import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecents, deleteRecents } from "~/components/Header/HeaderSlice";
import { IconProfile, IconVerified, IconXmark } from "~/components/UI/Icons";
import { recents } from "~/services";

function SearchItem({ item, isShowBtn = false }) {
  const {currentUser} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickUserItem = async (user) => {
    navigate(`/@${user.username}`);

    if (!isShowBtn) {
      dispatch(addRecents(user));
      // them vao recent api
      await recents.createRecent(user, currentUser.uid);
    }
  };

  const handleDeleteRecent = async (id) => {
    dispatch(deleteRecents(id));
    await recents.deleteRecent(id)
    // delete api
  };

  return (
    <li className="px-4 py-2 h-[60px] hover:bg-[#3c3c43]/[3%]">
      <div className="pl-2 flex gap-3 items-center h-full">
        <div
          onClick={() => handleClickUserItem(item)}
          className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
        >
          {!!item.profile_pic_url && (
            <img src={item.profile_pic_url} alt="Hoang yen" />
          )}
          {!item.profile_pic_url && <IconProfile className="text-[#8c8c8c]" />}
        </div>
        <div
          className="flex flex-col text-sm w-full cursor-pointer"
          onClick={() => handleClickUserItem(item)}
        >
          <div className="flex gap-1 items-center">
            <p>{item.username}</p>
            {item.is_verified && (
              <div className="w-3 h-3">
                <IconVerified />
              </div>
            )}
          </div>
          <p className="text-[#767680]/60 font-light">{item.full_name}</p>
        </div>
        {isShowBtn && (
          <button
            onClick={() => handleDeleteRecent(item.id)}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 text-[#767680]/60 hover:bg-[#3c3c43]/[5%] rounded-md"
          >
            <IconXmark className="w-4 h-4" />
          </button>
        )}
      </div>
    </li>
  );
}

export default SearchItem;
