import { axiosFirebaseConfig, ROLE } from "~/configs";

const users = {
  getUserById(userId) {
    try {
      const url = `/users/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getUsername(username) {
    try {
      const url = `/users/username/${username}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getUsersByKeyword(keyword) {
    try {
      const url = `/users/search/${keyword}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getUsersResent(uid) {
    try {
      const url = `/users/resent/${uid}`;
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
  updateProfilePicUser(userId, data) {
    try {
      const url = `/users/profile_pic/${userId}`;
      return axiosFirebaseConfig.put(url, data);
    } catch (error) {
      throw error;
    }
  },
  updateProfile(userId, data) {
    try {
      const url = `/users/${userId}`;
      return axiosFirebaseConfig.put(url, data);
    } catch (error) {
      throw error;
    }
  },
  createUser(data) {
    try {
      const url = `/users`;
      const user = {
        id: data.uid,
        uid: data.uid,
        email: data.email,
        emailVerified: data.emailVerified,
        full_name: data.displayName,
        full_name_code: data.displayName.toLowerCase(),
        username: data.username.toLowerCase(),
        profile_pic_url: null,
        biography: null,
        bio_url: null,
        role: ROLE,
        gender: {
          type: 3,
          custom: "Không muốn tiết lộ",
        },
        follow: {
          count: 0,
        },
        followed_by: {
          count: 0,
        },
        posts: {
          count: 0,
        },
        follows_viewer: false,
        hide_like_and_view_counts: false,
        is_private: false,
        is_verified: false,
      };
      return axiosFirebaseConfig.post(url, user);
    } catch (error) {
      throw error;
    }
  },
};

export default users;
