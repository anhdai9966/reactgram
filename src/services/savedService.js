import { v4 } from "uuid";
import { axiosFirebaseConfig } from "~/configs";

const saved = {
  getSavedByUserId(userId) {
    try {
      const url = `/saved/user_id/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getSavedByUsername(username) {
    try {
      const url = `/saved/username/${username}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  checkSavedForPostId(postId, userId) {
    try {
      const url = `/saved/check/${postId}/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  createSaved(data, uid) {
    try {
      const url = `/saved`;
      const idRandom = v4();
      const saved = {
        ...data,
        id: idRandom,
        uid: uid,
        pid: data.id,
      };
      return axiosFirebaseConfig.post(url, saved);
    } catch (error) {
      throw error;
    }
  },
  deleteSavedById(id) {
    try {
      const url = `/saved/${id}`;
      return axiosFirebaseConfig.delete(url);
    } catch (error) {
      throw error;
    }
  },
};

export default saved;
