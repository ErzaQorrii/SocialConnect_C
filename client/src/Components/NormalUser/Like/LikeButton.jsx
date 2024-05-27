
import React, { useState, useEffect } from 'react';
import { likePost, dislikePost } from './likeAPI';

const LikeButton = ({ postId, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = () => {
    if (liked) {
      dislikePost(postId)
        .then(() => setLiked(false))
        .catch((error) => console.error('Error disliking post:', error));
    } else {
      likePost(postId)
        .then(() => setLiked(true))
        .catch((error) => console.error('Error liking post:', error));
    }
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Dislike' : 'Like'}
    </button>
  );
};

export default LikeButton;
