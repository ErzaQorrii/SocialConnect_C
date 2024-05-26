import React, {useState } from 'react';
import axiosInstance from "../axiosSetup";


const CommentForm = ({postId, onCommentCreated}) => {
    //Value of the comment input
    const[content,setContent] = useState('');
    //Error message
    const [inputError,setInputError] = useState('');

    //Handeling the form submission
    const handleSubmit=(e) =>
        {
            e.preventDefault();
            // if comment is empty the execution is stopped
            if(content.trim() === '')
                {
                    setInputError('Comment can not be empty');
                    return;
                }
            //Sending a POST request to the server with comment data
            axiosInstance.post('/comments',{post_id:postId,content})
            // if the request is succesful
            .then((response)=>{
                onCommentCreated(response.data);
                setContent('');
                setInputError('');
            })
            //if the request is not succesful
            .catch((error)=>{
                console.log("Error creating comment",error);
                setInputError('Failed to create commit');
            })

        }
       




        return (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={content}
                //The content state changes every time the input changes
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
              />
              <button type="submit">Comment</button>
              {inputError && <span className="text-danger">{inputError}</span>}
            </form>
          );
          
}

export default CommentForm
