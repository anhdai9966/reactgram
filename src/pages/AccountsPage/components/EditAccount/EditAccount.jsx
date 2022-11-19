import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "~/app/appSlice";
import { setCurrentUser } from "~/app/userSlice";
import {
  IconProfile,
  IconSpinner12Spins,
  IconSpinner8SpinsWhite,
} from "~/components/UI/Icons";
import { useBoolean, useDidMountEffect, useDocumentTitle, useOnClickOutside } from "~/hooks";
import ModalLayout from "~/layouts/ModalLayout";
import { users } from "~/services";
import { isEmpty, toSlug } from "~/utils";
import InputItem from "../InputItem";
import GenderModal from "./components/GenderModal";
import TextareaItem from "./components/TextareaItem";

function EditAccount() {
  useDocumentTitle("Chỉnh sửa trang cá nhân • Reactgram photos");
  const { currentUser } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoadingEditUser, setIsLoadingEditUser] = useState(false);
  const {
    state: isShowModalGender,
    setFalse: closeModalGender,
    setTrue: showModalGender,
  } = useBoolean();

  useEffect(() => {
    setValue("email", currentUser.email);
    setValue("full_name", currentUser.full_name);
    setValue("username", currentUser.username);
    setValue("bio_url", currentUser.bio_url || "");
    setValue("bio", currentUser.bio || "");
    setValue("gender", currentUser.gender || "Không muốn tiết lộ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const [isActionBtnSend] = useState(true);
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const combineData = {data, full_name_code: toSlug(data.full_name)}
    setIsLoadingEditUser(true);
    await users.updateProfile(currentUser.uid, combineData);
    dispatch(setCurrentUser(data))
    dispatch(showToast('Cập nhật thành công 👏👏👏!'))
    setIsLoadingEditUser(false);
  };

  const modalRef = useOnClickOutside(() => {
    closeModalGender();
  });

  const handleFocusGender = () => {
    showModalGender();
  };

  const handleChangeGender = (data) => {
    setValue("gender", data.gender);
  };

  if (isEmpty(currentUser)) {
    return (
      <div className="w-full h-24 flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  return (
    <article className="py-8 space-y-4">
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
          <label className="text-[#007AFF] cursor-pointer">
            <input type="file" name="avatarFile" className="hidden" />
            <span>Thay đổi ảnh đạn diện</span>
          </label>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-light space-y-4 px-2"
      >
        <div className="">
          <InputItem
            register={register("full_name")}
            type="text"
            placeholder="Tên"
            title="Tên"
            text={
              <p className="text-xs text-[#8c8c8c]">
                Hãy lấy tên mà bạn thường dùng để tài khoản của bạn dễ tìm thấy
                hơn. Đó có thể là tên đầy đủ, biệt danh hoặc tên doanh nghiệp
              </p>
            }
          />
        </div>

        <div className="">
          <InputItem
            register={register("username")}
            type="text"
            placeholder="Tên người dùng"
            title="Tên người dùng"
          />
        </div>

        <div className="">
          <InputItem
            register={register("bio_url")}
            type="text"
            placeholder="Trang web"
            title="Trang web"
          />
        </div>

        <div className="">
          <TextareaItem
            register={register("bio")}
            type="text"
            placeholder="Tiểu sử"
            title="Tiểu sử"
            rows={3}
            maxLength={150}
            text={
              <p className="text-xs text-[#8c8c8c]">
                <span>{watch("bio")?.length || 0}</span>
                <span> / 150</span>
              </p>
            }
          />
        </div>

        <div className="">
          <InputItem
            text={
              <div className="text-[#8c8c8c]">
                <h2 className="text-sm font-semibold">Thông tin cá nhân</h2>
                <p className="text-xs">
                  Cung cấp thông tin cá nhân của bạn, bất kể bạn dùng tài khoản
                  cho doanh nghiệp, thú cưng hay gì khác. Thông tin này sẽ không
                  hiển thị trên trang cá nhân công khai của bạn.
                </p>
              </div>
            }
          />
        </div>

        <div className="">
          <InputItem
            register={register("email")}
            type="email"
            placeholder="Email"
            disabled={true}
            title="Email"
          />
        </div>
        <div className="">
          <InputItem
            type="text"
            placeholder="Giới tính"
            register={register("gender")}
            title="Giới tính"
            onFocus={handleFocusGender}
          />
        </div>

        <div className="">
          <InputItem
            text={
              <div className="w-full flex justify-between">
                {isLoadingEditUser && (
                  <div className="font-semibold w-16 h-8 text-white bg-[#007AFF] rounded-md px-3 py-1 flex justify-center items-center">
                    <IconSpinner8SpinsWhite className="w-4 h-4 animate-spinner8Spins" />
                  </div>
                )}
                {!isLoadingEditUser && (
                  <button
                    disabled={!isActionBtnSend}
                    className={`font-semibold w-16 h-8 text-white bg-[#007AFF] rounded-md px-3 py-1 ${
                      !isActionBtnSend && "opacity-50 disabled:cursor-not-allowed"
                    }`}
                  >
                    <span>Gửi</span>
                  </button>
                )}
                <div className="text-[#007AFF] font-semibold text-sm hover:bg-black/[5%] px-2 py-1 rounded-md flex items-center cursor-pointer">
                  Vô hiệu hóa tài khoản của tôi
                </div>
              </div>
            }
          />
        </div>
      </form>
      <ModalLayout isShow={isShowModalGender} ref={modalRef}>
        <GenderModal
          setFalse={closeModalGender}
          defaultValue={currentUser.gender.type}
          handle={handleChangeGender}
        />
      </ModalLayout>
    </article>
  );
}

export default EditAccount;
