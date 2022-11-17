import { useDispatch } from "react-redux";
import { fetchUser } from "~/app/userSlice";
import { LogoGoogle } from "~/components/UI/Logos";
import { authentication } from "~/services";
import users from "~/services/usersService";

function LoginWithGoogle({ className }) {
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      const userResult = await authentication.loginWithGoogle();
      const user = userResult.user;
      // kiểm tra user với firestore
      const checkUser = await users.checkUserById(user.uid);
      //  nếu chưa có thì tạo thông tin với firestore không thì lấy thông tin
      if (!checkUser.data.check_id) {
        const newResUser = await users.createUser(user);
        dispatch(fetchUser(newResUser.data.data.user.uid));
      } else {
        dispatch(fetchUser(user.uid));
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <button
      onClick={handleLoginWithGoogle}
      className={`w-full h-8 rounded flex items-center justify-center gap-3 hover:bg-black/[3%] ${className}`}
    >
      <div className="w-5 h-5">
        <LogoGoogle />
      </div>
      <span className="font-semibold text-[#8c8c8c]">
        Đăng nhập bằng Google
      </span>
    </button>
  );
}

export default LoginWithGoogle;
