import React, {Component} from "react";
import PostFeed from "./PostFeed";
import axios from 'axios';
import AddPost from './AddPost';

import './HomePage.css'


class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postList: []
        }
    }

    componentDidMount() {
        this.getPostData();
    }
    

    getPostData = () => {
        axios.post('https://akademia108.pl/api/social-app/post/latest')
        .then(response => {
            this.setState({
                postList: response.data
            })
  
            // console.log(response.data);

        })
        .catch((error) => {
            console.error(error);
        });
         
    }

    getNextPosts = () => {

    let posts = this.state.postList;

        axios.post('https://akademia108.pl/api/social-app/post/older-then',
            {
              date: posts[posts.length - 1].created_at
            }
          )
          .then((response) => {
            let responseData = response.data;
            posts = posts.concat(responseData);
            this.setState({
                postList: posts
            })
          })
          .catch((error) => {
            console.error(error);
          });

      };
    
    

    render() {
        return(
            <div className="PostContainer">
                {this.props.user && <AddPost />}
                <PostFeed postData={this.state.postList} newPosts={this.getNextPosts}/>
            </div>
        )
    }
}

export default HomePage;