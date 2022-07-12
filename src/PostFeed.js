import React from "react";
import Post from "./Post";

import './PostFeed.css';

function PostFeed (props) {

    let postFeed = props.postData;


    let postElements = postFeed.map((postObj) => {
        return <Post postObj={postObj} user={props.user} key={postObj.id} userID={postObj.user.username} latestPosts={props.latestPosts}/>
    })

    return (
        <div className="PostWrapper">
            {postElements}
            <button className="LoadMore" onClick={props.newPosts}>Load more</button>
        </div>
    )
}

export default PostFeed;