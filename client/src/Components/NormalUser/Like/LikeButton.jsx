import React, { useState, useEffect } from "react";
import { likePost, dislikePost, getPostLikes } from "./likeAPI";
import { Tooltip } from "react-tooltip";

const LikeButton = ({ postId, initialLiked, initialLikesCount }) => {
  //
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    console.log('UseEffect triggered for postId:', postId, 'liked:', liked);
    if (liked) {
      fetchLikes();
    }
  }, [liked, postId]);

  const handleLike = () => {
    setLoading(true);
    if (liked) {
      dislikePost(postId)
        .then(() => {
          setLiked(false);
          setLikesCount(likesCount - 1);
        })
        .catch((error) => console.error("Error disliking post:", error))
        .finally(() => setLoading(false));
    } else {
      likePost(postId)
        .then(() => {
          setLiked(true);
          setLikesCount(likesCount + 1);
          fetchLikes();
        })
        .catch((error) => console.error("Error liking post:", error))
        .finally(() => setLoading(false));
    }
  };

  const fetchLikes = () => {
    console.log('Fetching likes...'); 
    getPostLikes(postId)
      .then((response) => {
        console.log('Likes fetched:', response.data);
        setLikes(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching likers:", error);
        setLikes([]); 
      });
  };

  return (
    <div>
      <button
        onClick={handleLike}
        disabled={loading}
        data-tooltip-id={`like-tooltip-${postId}`}
        data-tooltip-place="top"
        onMouseEnter={() => {
          console.log('Mouse entered button for postId:', postId);
          fetchLikes();
        }} 
      >
        {liked ? "Dislike" : "Like"} ({likesCount})
      </button>
      <Tooltip id={`like-tooltip-${postId}`}>
        {likes.length > 0 ? (
          <ul>
            {likes.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          "No likes yet"
        )}
      </Tooltip>
    </div>
  );
};
export default LikeButton;
