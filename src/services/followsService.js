import { v4 } from "uuid";
import { axiosFirebaseConfig } from "~/configs";

const follows = {
  getSavedByUserId(userId) {
    try {
      const url = `/follows/user_id/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getSavedByUsername(username) {
    try {
      const url = `/follows/username/${username}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  checkFollowByUsername(username) {
    try {
      const url = `/follows/check/${username}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  createFollow(data, fuid) {
    try {
      const url = `/follows`;
      const idRandom = v4();
      const saved = {
        ...data,
        id: idRandom,
        fuid: fuid,
      };
      return axiosFirebaseConfig.post(url, saved);
    } catch (error) {
      throw error;
    }
  },
  deleteSavedById(id) {
    try {
      const url = `/follows/${id}`;
      return axiosFirebaseConfig.delete(url);
    } catch (error) {
      throw error;
    }
  },
};

export default follows;
