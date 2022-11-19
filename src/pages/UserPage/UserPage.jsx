import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  Outlet,
  useNavigate,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { v4 } from "uuid";
import { setCurrentUser, updateProfilePicCurrentUser } from "~/app/userSlice";
import {
  IconGrid,
  IconGear,
  IconPersonCropCircleBadgeCheckmark,
  IconProfileFill,
  IconTag,
  IconVerified,
  IconBookmark,
  IconSpinner12Spins,
} from "~/components/UI/Icons";
import {
  useBoolean,
  useDidMountEffect,
  useDocumentTitle,
  useOnClickOutside,
} from "~/hooks";
import FooterLayout from "~/layouts/FooterLayout";
import ModalLayout from "~/layouts/ModalLayout";
import { media, users } from "~/services";
import {
  getLocationFromHref,
  isEmpty,
  numberFormater,
  selectFile,
} from "~/utils";
import ChangeAvatarModal from "./components/Modals/ChangeAvatarModal";
import Tabs from "./components/Tabs";
import { fetchUsername } from "./userPageSlice";

function PageUser() {
  useDocumentTitle("Reactgram Profile");
  const para = useParams();
  const loc = useLocation();
  const { username } = para;
  const { currentUser } = useSelector((state) => state.user);
  const { userPage, isStatusUserPage, isLoadingUserPage, isMessageUserPage } =
    useSelector((state) => state.userPage);

  const [profilePic, setProfilePic] = useState("");
  const {
    state: isLoadingProfilePic,
    setFalse: hiddenLoadingProfilePic,
    setTrue: showLoadingProfilePic,
  } = useBoolean();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsername(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const navigate = useNavigate();

  useDidMountEffect(() => {
    if (isEmpty(userPage)) {
      navigate("/error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPage, isMessageUserPage]);

  useDidMountEffect(() => {
    window.document.title = `${userPage.full_name} (@${userPage.username}) • Reactgram photos`;
  }, [userPage]);

  useDidMountEffect(() => {
    setProfilePic(userPage.profile_pic_url);
  }, [userPage]);

  useDidMountEffect(() => {
    if (!isStatusUserPage && !isLoadingUserPage) {
      navigate("/error");
    }
  }, [isStatusUserPage]);

  const {
    state: isShowAvatarModal,
    setFalse: closeAvatarModal,
    setTrue: openAvatarModal,
  } = useBoolean();

  const isShowModal = isShowAvatarModal;

  const modalRef = useOnClickOutside(() => {
    closeAvatarModal();
  });

  const handleUploadFile = async () => {
    let files = await selectFile("image/*");
    showLoadingProfilePic();
    closeAvatarModal();
    const imgSrc = URL.createObjectURL(files);
    setProfilePic(imgSrc);
    const idRamdom = v4();
    const imageUrl = await media.uploadImage(files, idRamdom);
    const image = { url: imageUrl };
    dispatch(updateProfilePicCurrentUser(imageUrl));
    await users.updateProfilePicUser(userPage.uid, image);
    hiddenLoadingProfilePic();
  };

  const handleRemoveProfilePic = async () => {
    showLoadingProfilePic();
    closeAvatarModal();
    await users.updateProfilePicUser(userPage.uid, { url: null });
    hiddenLoadingProfilePic();
  };

  const handleClickAvatar = () => {
    if (userPage.uid !== currentUser.uid) return;
    if (!!userPage.profile_pic_url) {
      openAvatarModal();
      return;
    }
    handleUploadFile();
  };

  const handleActiveTabs = (id) => {
    setTabs(() =>
      tabs.map((tab) => {
        if (tab.id === id) tab.isActive = true;
        else tab.isActive = false;

        return tab;
      })
    );
  };

  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: "Bài viết",
      Icon: <IconGrid />,
      isActive: !loc.pathname.includes("saved"),
      to: "",
      onClick: (id, to) => {
        navigate(to);
        handleActiveTabs(id);
      },
    },
    {
      id: 2,
      title: "Đã lưu",
      Icon: <IconBookmark />,
      isActive: loc.pathname.includes("saved"),
      hidden: false,
      to: "saved",
      onClick: (id, to) => {
        navigate(to);
        handleActiveTabs(id);
      },
    },
    {
      id: 3,
      title: "Được gắn thẻ",
      Icon: <IconTag />,
      isActive: false,
      to: "tagged",
      onClick: (id, to) => {
        navigate(to);
        handleActiveTabs(id);
      },
    },
  ]);

  useEffect(() => {
    if (isEmpty(currentUser) || isEmpty(userPage)) return;

    setTabs((state) =>
      state.map((tab) => {
        if (tab.id === 2) {
          if (currentUser.uid !== userPage.uid) {
            tab.hidden = true;
          }
        }
        return tab;
      })
    );
  }, [currentUser, userPage, username]);

  const handleClickEditProfile = () => {
    navigate("/accounts/edit");
  };

  if (isEmpty(userPage) || isLoadingUserPage) {
    return (
      <div className="w-full h-[var(--window-height)] flex justify-center items-center">
        <IconSpinner12Spins className="w-6 h-6 animate-spinner12Spins" />
      </div>
    );
  }

  return (
    <FooterLayout>
      <div className="pt-[30px] px-5 w-full">
        <div className="grid grid-cols-3 gap-[30px] pb-11 font-light">
          <div className="flex items-center justify-center">
            <button onClick={handleClickAvatar}>
              <div className="rounded-full overflow-hidden w-16 h-16 md:w-40 md:h-40 flex-shrink-0 relative">
                {!!profilePic && (
                  <img src={profilePic} alt={userPage.username} />
                )}
                {!userPage.profile_pic_url && !profilePic && (
                  <IconProfileFill className="text-[#dbdbdb]" />
                )}
                {isLoadingProfilePic && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconSpinner12Spins className="w-5 h-5 animate-spinner12Spins" />
                  </div>
                )}
              </div>
            </button>
          </div>

          <div className="col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <h1 className="text-[28px] font-extralight">{username}</h1>
                {userPage.is_verified && (
                  <div className="w-4 h-4">
                    <IconVerified />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {userPage.uid === currentUser.uid && (
                  <>
                    <button
                      onClick={handleClickEditProfile}
                      className="min-w-24 h-8 flex items-center justify-center border rounded"
                    >
                      <span className="text-sm font-semibold px-2">
                        Chỉnh sửa trang cá nhân
                      </span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-[#3c3c43]/5 rounded-lg">
                      <div className="w-6 h-6">
                        {/* <MoreIcon /> */}
                        <IconGear />
                      </div>
                    </button>
                  </>
                )}
                {userPage.uid !== currentUser.uid && (
                  <>
                    <button className="min-w-24 h-8 flex items-center justify-center border rounded">
                      <span className="text-sm font-semibold px-2">Nhắn tin</span>
                    </button>
                    {false && (
                      <button className="w-24 h-8 flex items-center justify-center border rounded">
                        <div className="w-5 h-4">
                          <IconPersonCropCircleBadgeCheckmark />
                        </div>
                      </button>
                    )}
                    <button className="w-24 h-8 flex items-center justify-center border rounded bg-[#0095f6] ">
                      <span className="text-sm font-semibold text-white">
                        Theo dõi
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-9">
              <p className="">
                <span className="font-semibold">
                  {numberFormater(userPage.posts?.count, 1)}
                </span>{" "}
                <span>bài viết</span>
              </p>
              <p className="">
                <span className="font-semibold">
                  {numberFormater(userPage.followed_by?.count, 1)}
                </span>{" "}
                <span>người theo dõi</span>
              </p>
              <p className="">
                <span>Đang theo dõi</span>{" "}
                <span className="font-semibold">
                  {numberFormater(userPage.follow.count, 1)}
                </span>{" "}
                <span>người</span>
              </p>
            </div>

            <div className="">
              <h5 className="font-semibold">{userPage.full_name}</h5>
              <p>{userPage.bio}</p>
              {!!userPage.bio_url && (
                <a
                  href={userPage.bio_url}
                  target="blank"
                  className="text-[#385898] font-semibold text-sm text-truncate"
                >
                  {getLocationFromHref(userPage.bio_url)}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t">
          <ul className="w-full flex items-center justify-center gap-12 uppercase text-sm font-semibold text-[#3c3c43]/60">
            {tabs.map((tab) => (
              <Tabs key={tab.id} item={tab} />
            ))}
          </ul>
        </div>

        <div className="py-1">
          <Outlet />
        </div>
      </div>
      <ModalLayout ref={modalRef} isShow={isShowModal}>
        {isShowAvatarModal && (
          <ChangeAvatarModal
            setFalse={closeAvatarModal}
            handleUpload={handleUploadFile}
            handleRemove={handleRemoveProfilePic}
          />
        )}
      </ModalLayout>
    </FooterLayout>
  );
}

export default PageUser;
