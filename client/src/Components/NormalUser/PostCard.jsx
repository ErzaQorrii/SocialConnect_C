import React, { forwardRef, useState } from 'react';
import './postcard.css';
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'; 
import flowerImage from '../Assets/flower.jpg'
import CommentForm from './Comment/CommentForm';
import CommentItem from './Comment/CommentItem ';
import { FaEllipsisH } from 'react-icons/fa'; 
import { likePost, dislikePost } from '../NormalUser/Like/likeAPI';
import LikeButton from './Like/LikeButton';



const PostCard = forwardRef(({ id, username, profileImageUrl, postImageUrl, caption, initialLikesCount, initialLiked, comments, title, onDelete, onUpdate, currentUserId, userId }, ref) => {
  console.log('Post image URL:', postImageUrl);  
   const [postComments ,setPostComments] = useState(comments);
   const [showMenu, setShowMenu] = useState(false);
       const shouldShowReadMore = caption.length>100;
       const [liked, setLiked] = useState(initialLiked);
       const [likesCount, setLikesCount] = useState(initialLikesCount);

       
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
          const handleCommentCreated = (newComment) => {
            setPostComments([...postComments, newComment]);
          };
        
          const handleCommentUpdate = (updatedComment) => {
            setPostComments(postComments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
          };
        
          const handleCommentDelete = (commentId) => {
            setPostComments(postComments.filter(comment => comment.id !== commentId));
          }; 
           const toggleMenu = () => {
            setShowMenu(!showMenu);
          };
          const handleLike = () => {
            if (liked) {
              dislikePost(id)
                .then(() => {
                  setLiked(false);
                  setLikesCount(likesCount - 1);
                })
                .catch(error => console.error('Error disliking post:', error));
            } else {
              likePost(id)
                .then(() => {
                  setLiked(true);
                  setLikesCount(likesCount + 1);
                })
                .catch(error => console.error('Error liking post:', error));
            }
          };
          
  return (
    <div className="post-card" ref={ref}>
      <div className="post-header">
        <img src={profileImageUrl} alt="Profile" className="profile-image" />
        <span className="username">{username}</span>
        {currentUserId === userId && (
          <div className="menu-container">
            <FaEllipsisH onClick={toggleMenu} className="menu-icon" />
            {showMenu && (
              <div className="menu">
                <button onClick={handleUpdate}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post-title">
        <h2>{title}</h2>
      </div>
      <div className="post-image">
        <img src={postImageUrl || flowerImage} alt="Post" />
      </div>
      <div className="post-footer">
        <LikeButton postId={id} initialLiked={initialLiked} initialLikesCount={initialLikesCount} /> {/* Integrate LikeButton here */}
        <div className={`caption ${isExpanded ? 'expanded' : 'collapsed'}`}>
          {caption}
        </div>
        {shouldShowReadMore && (
          <span className="read-more" onClick={toggleExpand}>
            {isExpanded ? 'Read less' : 'Read more'}
          </span>
        )}
        <div className="comments">
          <ChatBubbleOutline /> {postComments.length} comments
        </div>
        {postComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpdate={handleCommentUpdate}
            onDelete={handleCommentDelete}
            currentUserId={currentUserId}
          />
        ))}
        <CommentForm postId={id} onCommentCreated={handleCommentCreated} />
      </div>
    </div>
  );
});

export default PostCard;