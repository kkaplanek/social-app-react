import React, { Component } from "react";
import axios from "axios";

import './AddPost.css';

class AddPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postContent: ''
        };

    }

    addNewPost = (event) => {
        event.preventDefault();

        axios
          .post('https://akademia108.pl/api/social-app/post/add',
           {
            "content": this.state.postContent
           })
          .then(() => {
            this.setState({
                postContent: ''
            })
            this.props.newPosts();
           })
          .catch((error) => {
            console.error(error);
           });
    }

    handleChange = (event) => {
        this.setState({postContent: event.target.value});
    }

    render() {

        return(
            <div className="AddPost">
                <form className="PostArea" onSubmit={this.addNewPost}>
                    <textarea placeholder="Write something here..." id="NewPost" value={this.state.postContent} onChange={this.handleChange}></textarea><br />
                    <button type="submit">Publish</button>
                </form>
            </div>
        )
    }
}

export default AddPost;