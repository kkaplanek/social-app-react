import React, { Component } from "react";
import PostFeed from "./PostFeed";
import axios from "axios";
import AddPost from "./AddPost";
import FollowRecommended from "./FollowRecommended";

import "./HomePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postList: []
    };
  }

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/latest")
      .then((response) => {
        this.setState({
          postList: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getNextPosts = () => {
    let posts = this.state.postList;

    axios
      .post("https://akademia108.pl/api/social-app/post/older-then", {
        date: posts[posts.length - 1].created_at,
      })
      .then((response) => {
        let responseData = response.data;
        posts = posts.concat(responseData);
        this.setState({
          postList: posts,
        });
        console.log(posts);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getNewPosts = () => {
    let posts = this.state.postList;

    axios
      .post("https://akademia108.pl/api/social-app/post/newer-then", {
        date: posts[0].created_at,
      })
      .then((response) => {
        let responseData = response.data;
        posts = responseData.concat(posts);
        this.setState({
          postList: posts,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="PostContainer">
        {this.props.user && <AddPost newPosts={this.getNewPosts} />}
        {this.props.user && <FollowRecommended followRecs={this.state.followRecs} latestPosts={this.getPostData}/>}
        <PostFeed
          postData={this.state.postList}
          newPosts={this.getNextPosts}
          likePost={this.likePost}
          user={this.props.user}
          latestPosts={this.getPostData}
        />
      </div>
    );
  }
}

export default HomePage;
