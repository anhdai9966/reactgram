import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "~/app/appSlice";
import { IconProfile } from "~/components/UI/Icons";
import { auth } from "~/configs";
import { useDocumentTitle } from "~/hooks";
import { authentication, users } from "~/services";
import InputItem from "../InputItem";

function ChangePassword() {
  useDocumentTitle("Thay đổi mật khẩu • Reactgram photos");
  const { currentUser } = useSelector((state) => state.user);
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!data.confirm_new_password || !data.new_password || !data.old_password) {
      dispatch(showToast("Bạn phải nhập đủ thông tin"));
      return 
    }
    if (data.confirm_new_password !== data.new_password) {
      dispatch(showToast("Oops! Nhập lại mật khẩu không trùng nhau."));
      return;
    }
    await authentication
      .updatePasswordByUser(data.confirm_new_password)
      .then(() => {
        dispatch(showToast("Thay đổi mật khẩu thành công."));
        authentication.logout()
      })
      .catch((error) => {
        dispatch(showToast(error.code));
      });
    setTimeout(() => {
      navigate('/accounts/login')
    }, 1000);
  };

  return (
    <article className="py-8 space-y-6">
      <div className="flex gap-4 lg:gap-6 px-2 items-center">
        <div className="px-2 h-8 flex items-center lg:justify-end lg:w-36 shrink-0">
          <div className="w-9 h-9 border rounded-full overflow-hidden">
            {!!currentUser.profile_pic_url && (
              <img
                src={currentUser.profile_pic_url}
                alt={currentUser.username}
              />
            )}
            {!currentUser.profile_pic_url && (
              <IconProfile className="text-[#8c8c8c]/60" />
            )}
          </div>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <h2 className="text-lg">{currentUser.username}</h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light space-y-6 px-2"
      >
        <div className="">
          <InputItem
            register={register("old_password")}
            type="password"
            placeholder="Mật khẩu cũ"
            title="Mật khẩu cũ"
          />
        </div>

        <div className="">
          <InputItem
            register={register("new_password")}
            type="password"
            placeholder="Mật khẩu mới"
            title="Mật khẩu mới"
          />
        </div>

        <div className="">
          <InputItem
            register={register("confirm_new_password")}
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            title="Xác nhận mật khẩu mới"
          />
        </div>

        <div className="">
          <InputItem
            text={
              <div className="">
                <button className="font-semibold text-white bg-[#007AFF] rounded-md py-1 w-36">
                  <span className="px-3">Đổi mật khẩu</span>
                </button>
              </div>
            }
          />
        </div>

        <div className="">
          <InputItem
            text={
              <div className="">
                <button className="font-semibold bg-white text-[#007AFF] hover:bg-black/[5%] rounded-md py-1 w-36">
                  <span className="px-3">Quên mật khẩu</span>
                </button>
              </div>
            }
          />
        </div>
      </form>
    </article>
  );
}

export default ChangePassword;
