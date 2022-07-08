import axios from "axios";
import React, { Component } from "react";

import './FollowRecommended.css';


function FollowRecommended (props) {

    let followRecs = props.followRecs;

    let userElements = followRecs.map((userObj) => {
        return(
            <div className="UserWrapper">
                <div className="UserPhoto">
                    <img src="" alt="" />
                </div>
                <div className="Username"></div>
                <button>Follow</button>
            </div>
        )
    })
    
    const getFollowRecs = () => {

        axios.post('https://akademia108.pl/api/social-app/follows/recommendations')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }


    
    return(
        <div className="FollowRecommendations" onClick={getFollowRecs}>
            <div className="UserBox"></div>
            <div className="UserBox"></div>
            <div className="UserBox"></div>
        </div>
    )
    
}

export default FollowRecommended;