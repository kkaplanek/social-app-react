import axios from "axios";
import React, { useEffect, useState } from "react";

import './FollowRecommended.css';


function FollowRecommended (props) {


    const [recommendations, setRecommendations] = useState([]);


    useEffect(()=>{
        getFollowRecs()
    }, []) 

    const getFollowRecs = () => {

        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
        .then((response) => {
            setRecommendations(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const followUser = (id) => {
        axios.post(
            "https://akademia108.pl/api/social-app/follows/follow",
            { leader_id: id }
          )
          .then(() => {
            props.latestPosts();
            getFollowRecs();
          })
          .catch((error) => {
            console.error(error);
          });
      };

    let userElements = recommendations.map((userObj) => {
        return(
            <div className="UserWrapper" key={userObj.id}>
                <div className="UserPhoto">
                    <img src={userObj.avatar_url} alt="" />
                </div>
                <div className="Username">{userObj.username}</div>
                <button onClick={() => followUser(userObj.id)}>Follow</button>
            </div>
        )
    })
    
    return(
        <div className="FollowRecommendations">
            {userElements}
        </div>
    )
    
}

export default FollowRecommended;