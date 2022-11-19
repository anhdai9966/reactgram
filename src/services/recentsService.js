import { v4 } from "uuid";
import { axiosFirebaseConfig} from "~/configs";

const recents = {
  getResentByUserId(uid) {
    try {
      const url = `/recents/user_id/${uid}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  createRecent(data, currentUserId) {
    try {
      const url = `/recents`;
      const idRamdom = v4();
      const user = {
        id: idRamdom,
        uid: currentUserId,
        email: data.email,
        full_name: data.displayName,
        username: data.username,
        profile_pic_url: data.profile_pic_url,
        is_private: data.is_private,
        is_verified: data.is_verified,
      };
      return axiosFirebaseConfig.post(url, user);
    } catch (error) {
      throw error;
    }
  },
  deleteRecent(id) {
    try {
      const url = `/recents/${id}`;
      return axiosFirebaseConfig.delete(url);
    } catch (error) {
      throw error;
    }
  },
  deleteAllResentByUserId(uid) {
    try {
      const url = `/recents/user_id/${uid}`;
      return axiosFirebaseConfig.delete(url);
    } catch (error) {
      throw error;
    }
  },
};

export default recents;
