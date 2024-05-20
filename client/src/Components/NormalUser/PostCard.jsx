import React from 'react';
import './postcard.css';
import { FavoriteBorder, ChatBubbleOutline } from '@mui/icons-material'; 
import flowerImage from '../Assets/flower.jpg';
const PostCard = ({ username, profileImageUrl, postImageUrl, caption, likesCount, comments }) => {
    return (
        <div className="post-card">
            <div className="post-header">
                <img src={profileImageUrl} alt="Profile" className="profile-image" />
                <span className="username">{username}</span>
            </div>
            <div className="post-image">
            <img src={flowerImage} alt="Post" />
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
};


export default PostCard;
