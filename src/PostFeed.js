import React from "react";
// import Moment from 'moment';

import './PostFeed.css';

function PostFeed (props) {

    let postFeed = props.postData;

    let postElements = postFeed.map((postObj) => {
        return (
            <div className="Post" key={postObj.id}>
                <aside className="UserAvatar"><img src={postObj.user.avatar_url} alt="" /></aside>
                <div className="PostData">
                    <span className="UserID">{postObj.user.username}</span>
                    <span className="CreatedAt">{postObj.created_at.split('').slice(0, 10)}</span>
                </div>
                <div className="PostContent">{postObj.content}</div>
                <div className="PostLikes">{'♥ ' + postObj.likes.length}</div>
            </div>
        ) 
    })

    // console.log(postElements);

    return (
        <div className="PostWrapper">
            {postElements}
            <button className="LoadMore" onClick={props.newPosts}>Load more</button>
        </div>
    )
}

export default PostFeed;