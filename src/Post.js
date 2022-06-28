import React from "react";

import './Post.css';

function Post (props) {

    let postFeed = props.postData;

    let postElements = postFeed.map((postObj) => {
        return (
            <div className="Post" key={postObj.id}>
                <div className="PostData">
                    <span className="UserID">{postObj.user.username}</span>
                    <span className="CreatedAt">{postObj.created_at}</span>
                </div>
                <div className="UserAvatar"></div>
                <div className="PostContent">{postObj.content}</div>
                {/* <div className="PostLikes">{postObj.likes}</div> */}
            </div>
        ) 
    })

    // console.log(postElements);

    return (
        <div className="PostWrapper">
            {postElements}
        </div>
    )
}

export default Post;