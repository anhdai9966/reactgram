import { v4 } from "uuid";
import { axiosFirebaseConfig } from "~/configs";

const comments = {
  getCommentByPostId(postId) {
    try {
      const url = `/comments/post_id/${postId}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  increaseLikeCommentById(commentId) {
    try {
      const url = `/comments/inscrease/${commentId}`;
      return axiosFirebaseConfig.put(url);
    } catch (error) {
      throw error;
    }
  },
  createComment(data) {
    try {
      const url = `/comments`;
      const idRandom = v4();
      const comment = {
        id: idRandom,
        pid: data.pid,
        text: data.text,
        like_count: 0,
        user: {
          uid: data.uid,
          email: data.email,
          full_name: data.displayName,
          username: data.username,
          profile_pic_url: data.profile_pic_url,
          is_private: data.is_private,
          is_verified: data.is_verified,
        },
      };
      return axiosFirebaseConfig.post(url, comment);
    } catch (error) {
      throw error;
    }
  },
  deleteCommentById(id) {
    try {
      const url = `/comments/${id}`;
      return axiosFirebaseConfig.delete(url);
    } catch (error) {
      throw error;
    }
  },
};

export default comments;
