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
    //if the post is liked
    if (liked) {
      dislikePost(postId)
        .then(() => {
          setLiked(false);
          setLikesCount(likesCount - 1);
        })
        .catch((error) => console.error("Error disliking post:", error))
        .finally(() => setLoading(false));
    } else {
      //if the post is not liked
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
  const buttonStyle = {
    backgroundColor: liked ? '#e74c3c' : '#f0f0f0', 
    color: liked ? '#fff' : '#000', 
    border: 'none',
    borderRadius: '20px', 
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <div>
      <button
       style={buttonStyle}
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
