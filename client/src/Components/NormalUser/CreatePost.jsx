import {React,UseState} from 'react'
import "./style.css"
const CreatePost = () => {


return (
    <div className="form-wrapper">
      <div className="form-container">
        <form  className="form-createUser">
          <div className="form-group">
            <label>Title:</label>
            <input 
              type="text" 
        
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea 
     
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input 
              type="file"
     
              className="form-control"
            />
          </div>
          <div className="submit-createpost">
            <button type="submit" className="submit-button">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};
    
    export default CreatePost;