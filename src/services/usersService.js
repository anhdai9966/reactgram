import { axiosFirebaseConfig } from "~/configs";

const users = {
  getUser(userId) {
    try {
      const url = `/users/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  checkUserById(userId) {
    try {
      const url = `/users/check_id/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  createUser(data) {
    try {
      const url = `/users`;
      const user = {
        uid: data.uid,
        email: data.email,
        emailVerified: data.emailVerified,
        full_name: data.displayName,
        photoURL: null,
        createdAt: data.createdAt,
        updatedAt: null,
        apiKey: data.apiKey,
        biography: null,
        bio_url: null,
        follows_viewer: false,
        hide_like_and_view_counts: false,
        is_private: false,
        is_verified: false,
        profile_pic_url: null,
        username: data.username,
      };
      return axiosFirebaseConfig.post(url, user);
    } catch (error) {
      throw error;
    }
  },
};

export default users;
