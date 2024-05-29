import axiosInstance from '../axiosSetup';

export const getPostComments = (postId) => {
    return axiosInstance.get(`/comments/comment/${postId}/`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching post comments:', error);
            throw error;
        });
};
