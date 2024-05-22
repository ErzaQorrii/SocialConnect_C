import React, { forwardRef } from 'react';
import './postcard.css';
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'; 
import flowerImage from '../Assets/flower.jpg';

const PostCard = forwardRef(({ username, profileImageUrl, postImageUrl, caption, likesCount, comments, title }, ref) => {
  console.log('Post image URL:', postImageUrl);  

  return (
    <div className="post-card" ref={ref}>
      <div className="post-header">
        <img src={profileImageUrl} alt="Profile" className="profile-image" />
        <span className="username">{username}</span>
      </div>
      <div className="post-title">
        <h2>{title}</h2>
      </div>
      <div className="post-image">
        <img src={postImageUrl || flowerImage} alt="Post" />
      </div>
      <div className="post-footer">
        <div className="likes">
          <FavoriteBorder /> {likesCount} likes
        </div>
        <div className="caption">{caption}</div>
        <div className="comments">
          <ChatBubbleOutline /> {comments.length} comments
        </div>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <span className="comment-username">{comment.username}</span> {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
});

export default PostCard;
