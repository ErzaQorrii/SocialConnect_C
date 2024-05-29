import axiosInstance from '../axiosSetup';

export const likePost = (postId) => {
  console.log(`Liking post with ID: ${postId}`);
  return axiosInstance.post(`/like/${postId}/like`)
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
  return axiosInstance.delete(`/like/${postId}/dislike`)
    .then(response => {
      console.log('Dislike response:', response);
      return response;
    })
    .catch(error => {
      console.error('Error disliking post:', error);
      throw error;
    });
};
export const getPostLikes = (postId) => {
  return axiosInstance.get(`/like/${postId}/likes`)
    .then(response => response)
    .catch(error => {
      console.error('Error fetching post likes:', error);
      throw error;
    });
};