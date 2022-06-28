import React, {Component} from "react";
import Post from "./Post";
import axios from 'axios';

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
  
            console.log(response.data);

        })
         
    }

    render() {
        return(
            <div className="PostContainer">
                <Post postData={this.state.postList}/>
            </div>
        )
    }
}

export default HomePage;