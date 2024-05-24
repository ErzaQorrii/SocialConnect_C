import React, { forwardRef, useState } from 'react';
import './postcard.css';
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'; 
import flowerImage from '../Assets/flower.jpg';

const PostCard = forwardRef(({ username, profileImageUrl, postImageUrl, caption, likesCount, comments, title,onDelete,onUpdate, currentUserId,userId }, ref) => {
  console.log('Post image URL:', postImageUrl);  
       const shouldShowReadMore = caption.length>100;
       const toggleExpand = () => {
        setIsExpanded(!isExpanded);
      };
      const [isExpanded, setIsExpanded] = useState(false); 
      const handleDelete = () =>
        {
          onDelete();
        }
        const handleUpdate = () =>
          {
              onUpdate();
          }

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
        <div className={`caption ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {caption}
        </div>
        {
          shouldShowReadMore && (
            <span className = "read-more" onClick = {toggleExpand}>
              {isExpanded ? ' Read less': 'Read more'}
            </span>
          )
        }
        <div className="comments">
          <ChatBubbleOutline /> {comments.length} comments
        </div>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <span className="comment-username">{comment.username}</span> {comment.text}
          </div>
        ))}
        {currentUserId === userId &&(
          <div>
        <button onClick = {handleDelete}>Delete</button>
        <button onClick= {handleUpdate}>Update</button>
         </div>
       )}
      </div>
    </div>
  );
});

export default PostCard;