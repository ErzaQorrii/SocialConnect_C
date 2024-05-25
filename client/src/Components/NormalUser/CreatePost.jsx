import React, { useState } from 'react';
import "./style.css";
import axiosInstance from './axiosSetup';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const [InputErrorList, setInputErrorList] = useState({});
    const [Post, setPost] = useState({
        title: '',
        content: '',
        image: null
    });
    const navigate = useNavigate();


    const handleInput = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            setPost({ ...Post, [name]: files[0] });
        } else {
            setPost({ ...Post, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', Post.title);
        formData.append('content', Post.content);
        if (Post.image) {
            formData.append('image', Post.image);
        }

        axiosInstance.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            alert(res.data.message);
        })
        .catch(error => {
            if (error.response) {
                console.error('Error response:', error.response);
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);

                if (error.response.status === 422) {
                    setInputErrorList(error.response.data.errors);
                } else if (error.response.status === 500) {
                    setInputErrorList({ server: 'Internal Server Error' });
                } else if (error.response.status === 401) {
                    alert('Unauthorized: Please log in.');
                }
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            
        });
       
       
    };
    const goToHomePage = ()=>
        {
            navigate('/home_user');
        }

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <form className="form-createUser" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input 
                            type="text" 
                            name='title'
                            className="form-control"
                            value={Post.title}
                            onChange={handleInput}
                        />
                        <span className="text-danger">{InputErrorList.title}</span>
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea 
                            className="form-control"
                            name='content'
                            value={Post.content}
                            onChange={handleInput}
                        />
                        <span className="text-danger">{InputErrorList.content}</span>
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input 
                            type="file"
                            className="form-control"
                            name='image'
                            onChange={handleInput}
                        />
                        <span className="text-danger">{InputErrorList.image}</span>
                    </div>
                    <div className="submit-createpost">
                        <button type="submit" className="submit-button">Create Post</button>
                    </div>
                    <div className='home_page_redirect'>
                        <button type="button" onClick={goToHomePage}>Go to HomePage</button></div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
