import React, { forwardRef, useState, useEffect } from 'react';
import './postcard.css';
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material';
import flowerImage from '../Assets/flower.jpg';
import CommentForm from './Comment/CommentForm';
import CommentItem from './Comment/CommentItem ';
import { FaEllipsisH } from 'react-icons/fa';
import LikeButton from './Like/LikeButton';
import { getPostComments } from './Comment/commentAPI';

const PostCard = forwardRef(({ id, username, profileImageUrl, postImageUrl, caption, initialLikesCount, initialLiked, comments, title, onDelete, onUpdate, currentUserId, userId }, ref) => {
  console.log('Post image URL:', postImageUrl);  
  
  const [postComments ,setPostComments] = useState(comments);
  const [showMenu, setShowMenu] = useState(false);
  const shouldShowReadMore = caption.length > 100;
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    getPostComments(id)
      .then(data => setPostComments(data))
      .catch(error => console.log('Error fetching comments:', error));
  }, [id]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleUpdate = () => {
    onUpdate();
  };

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

  return (
    <div className="post-card" ref={ref}>
      <div className="post-header">
        {/* <img src={profileImageUrl} alt="Profile" className="profile-image" /> */}
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
        <LikeButton postId={id} initialLiked={initialLiked} initialLikesCount={initialLikesCount} />
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
