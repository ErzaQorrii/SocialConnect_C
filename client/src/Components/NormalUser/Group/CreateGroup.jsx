import React,{useState} from 'react'
import groupAPI from './groupAPI';
import useNavigation from '../navigationUtils';
import './Groups.css';

const CreateGroup = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { goToGroups } = useNavigation();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await groupAPI.createGroup({ name, description });
        goToGroups();
      } catch (error) {
        console.error('Error creating group:', error);
      }
    };
  
    return (
      <div className="create-group-container">
        <h1>Create a New Group</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Group Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Create Group</button>
        </form>
      </div>
    );
  };
  
  export default CreateGroup;