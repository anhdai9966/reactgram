import { v4 } from "uuid";
import { axiosFirebaseConfig } from "~/configs";

const posts = {
  getPostById(id) {
    try {
      const url = `/post/${id}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getPostsByUserId(uid) {
    try {
      const url = `/posts/${uid}`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  getAllPosts() {
    try {
      const url = `/posts`;
      return axiosFirebaseConfig.get(url);
    } catch (error) {
      throw error;
    }
  },
  createPost(data) {
    try {
      const url = `/posts`;
      const idv4 = v4()
      const post = {
        id: idv4,
        uid: data.uid,
        image: data.image,
        caption: data.caption,
        comment_count: 0,
        like_count: 0,
        caption_is_edited: false,
        location: data.province,
        like_and_view_counts_disabled: data.like_and_view_counts_disabled,
        comment_threading_disabled: data.comment_threading_disabled,
        user: {
          uid: data.uid,
          username: data.username,
          full_name: data.full_name,
          is_private: data.is_private,
          profile_pic_url: data.profile_pic_url,
          is_verified: data.is_verified,
        },
      };
      return axiosFirebaseConfig.post(url, post);
    } catch (error) {
      throw error;
    }
  },
};

export default posts;
