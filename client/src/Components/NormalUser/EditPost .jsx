import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});
  const [post, setPost] = useState({ title: '', content: '', image: null });
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    axios.get(`http://127.0.0.1:8000/api/posts/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      console.log('Fetched post data:', response.data); 
      if (response.data && response.data.title && response.data.content) {
        setPost({
          title: response.data.title,
          content: response.data.content,
          image: null, 
        });
      } else {
        console.error('Post data is not in the expected format:', response.data);
      }
      setIsLoading(false);
    })
    .catch(error => {
      console.log("Error fetching post", error);
      setIsLoading(false); 
    });
  }, [id]);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setPost({ ...post, [name]: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (post.image) {
      formData.append('image', post.image);
    }

    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Unauthorized: Please log in.');
      return;
    }

    axios.post(`http://127.0.0.1:8000/api/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(res => {
        console.log('Update response:', res); 
      alert(res.data.message);
      navigate('/home_user'); 
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 422) {
          setInputErrorList(error.response.data.errors);
        } else if (error.response.status === 500) {
          setInputErrorList({ server: 'Internal Server Error' });
        } else if (error.response.status === 401) {
          alert('Unauthorized: Please log in.');
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>; 
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
              value={post.title}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.title}</span>
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea 
              className="form-control"
              name='content'
              value={post.content}
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.content}</span>
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input 
              type="file"
              className="form-control"
              name='image'
              onChange={handleInput}
            />
            <span className="text-danger">{inputErrorList.image}</span>
          </div>
          <div className="submit-createpost">
            <button type="submit" className="submit-button">Update Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
