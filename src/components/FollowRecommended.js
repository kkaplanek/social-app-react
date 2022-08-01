import React, { Component } from "react";
import axios from "axios";

import './FollowRecommended.css';


class FollowRecommended extends Component {
	
	constructor(props) {
        super(props);

        this.state = {
            recommendations: []
        }
	};
	
    getFollowRecs = () => {

        axios
            .post('https://akademia108.pl/api/social-app/follows/recommendations')
            .then((response) => {
                this.setState({recommendations: response.data})
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        this.getFollowRecs();
    }

    followUser = (id) => {

        axios
            .post(
                "https://akademia108.pl/api/social-app/follows/follow",
                { leader_id: id }
            )
            .then(() => {
                this.props.latestPosts();
                this.getFollowRecs();
            })
            .catch((error) => {
                console.error(error);
            });
    };    

render() {

    return (
        <div className="FollowRecommendations">
            {this.state.recommendations.map((userObj) => {
                return(
                    <div className="UserWrapper" key={userObj.id}>
                        <div className="UserPhoto">
                            <img src={userObj.avatar_url} alt="" />
                        </div>
                        <div className="Username">{userObj.username}</div>
                        <button onClick={() => this.followUser(userObj.id)}>Follow</button>
                    </div>
                )
                })
            }
        </div>
    )
}

}

export default FollowRecommended;