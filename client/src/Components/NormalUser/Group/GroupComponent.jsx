import React, {useState,useEffect} from 'react';
import groupAPI from './groupAPI';
import './Groups.css';
const GroupComponent = () => {
    
    const [yourGroups,setYouGroups] = useState([]);
    const [otherGroups,setOtherGroups] = useState([]);

    useEffect(()=>{
        const fetchGroups = async () =>
            {
                try{
                    const userId = localStorage.getItem('user_id');
                    const response = await groupAPI.getGroups();
                    const allGroups = response.data;

                    setYouGroups(allGroups.filter(group=>group.owner_id===parseInt(userId)));
                    setOtherGroups(allGroups.filter(group => group.owner_id !== parseInt(userId)));


                }
                catch(error)
                {
                    console.log('These was an error fetching the groups',error);
                }
            };
            fetchGroups();
    },[]);



    return (
        <div className="groups-container">
          <div className="your_group">
          <h1>Your Groups</h1>
          <ul className="groups-list">
            {yourGroups.map(group => (
              <li key={group.id}>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
              </li>
            ))}
          </ul>
          </div>
          <div className="others_group">
          <h1>Other People's Groups</h1>
          <ul className="groups-list">
            {otherGroups.map(group => (
              <li key={group.id}>
                <h2>{group.name}</h2>
                <p>{group.description}</p>
              </li>
            ))}
          </ul>
        </div>
        </div>
      );
    };
export default GroupComponent;
