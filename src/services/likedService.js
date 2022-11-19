import { v4 } from "uuid";
import { axiosFirebaseConfig } from "~/configs";

const liked = {
  checkLikedForPostId(postId, userId) {
    try {
      const url = `/liked/check/${postId}/${userId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  createLiked(data) {
    try {
      const url = `/liked`;
      const idRandom = v4();
      const liked = {
        ...data,
        id: idRandom,
        pid: data.id,
      };
      return axiosFirebaseConfig.post(url, liked);
    } catch (error) {
      throw error;
    }
  },
  deleteLikeById(id, postId) {
    try {
      const url = `/liked/${id}/${postId}`;
      return axiosFirebaseConfig.delete(url);
    } catch (error) {
      throw error;
    }
  },
};

export default liked;
