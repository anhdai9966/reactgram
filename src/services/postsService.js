import { axiosFirebaseConfig } from "~/configs";

const posts = {
  getPostsById(uid) {
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
      const post = {
        uid: data.uid,
        like_and_view_counts_disabled: data.like_and_view_counts_disabled,
        comment_threading_disabled: data.comment_threading_disabled,
        comment_count: 0,
        like_count: 0,
        image: data.image,
        caption: data.caption,
        created_at: new Date().getTime(),
        updated_at: null,
        caption_is_edited: false,
        location: data.province,
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
