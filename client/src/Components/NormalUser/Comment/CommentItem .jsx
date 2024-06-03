import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import axiosInstance from '../axiosSetup';

const CommentItem = ({ comment, onUpdate, onDelete, currentUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [inputError, setInputError] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  //Setting components to edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };
  // Canceling the edit mode and reseting the input field

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
    setInputError('');
  };
  // Handeling the update of editContent state when the value of the input changes

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editContent.trim() === '') {
      setInputError('Comment cannot be empty');
      return;
    }

    axiosInstance.put(`/comments/${comment.id}`, { content: editContent })
      .then((response) => {
        setIsEditing(false);
        setInputError('');
        onUpdate(response.data);
      })
      .catch((error) => {
        console.error('Error updating comment:', error);
        setInputError('Failed to update comment');
      });
  };

  const handleDelete = () => {
    axiosInstance.delete(`/comments/${comment.id}`)
      .then(() => {
        onDelete(comment.id);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
        setInputError('Failed to delete comment');
      });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="comment">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editContent}
            onChange={handleEditChange}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
          {inputError && <span className="text-danger">{inputError}</span>}
        </form>
      ) : (
        <>
          <span className="comment-username">{comment.user?.username}</span> {comment.content}
          {currentUserId === comment.user_id && (
            <div className="menu-container">
              <FaEllipsisH onClick={toggleMenu} className="menu-icon" />
              {showMenu && (
                <div className="menu">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
