import axiosInstance from '../axiosSetup';

export const likePost = (postId) => {
  console.log(`Liking post with ID: ${postId}`);
  return axiosInstance.post(`/posts/${postId}/like`)
    .then(response => {
      console.log('Like response:', response);
      return response;
    })
    .catch(error => {
      console.error('Error liking post:', error);
      throw error;
    });
};

export const dislikePost = (postId) => {
  console.log(`Disliking post with ID: ${postId}`);
  return axiosInstance.delete(`/posts/${postId}/dislike`)
    .then(response => {
      console.log('Dislike response:', response);
      return response;
    })
    .catch(error => {
      console.error('Error disliking post:', error);
      throw error;
    });
};
