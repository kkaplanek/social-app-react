import { Component } from "react";
import './Post.css';
import axios from "axios";

class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isLiked: false,
        likeCount: this.props.postObj.likes.length
    }
  }


//   componentDidMount() {
//     const isLikedByUser = this.props.postObj.likes.filter(like=>like.username === this.props.user.username)
//     this.setState({isLiked: !!isLikedByUser.length})
//   }

  likePost = (id) => {
    
    axios.post("https://akademia108.pl/api/social-app/post/like", {
        post_id: id,
      })
      .then((res) => {
        if(res.data.liked) {
            this.setState({likeCount: this.state.likeCount + 1, isLiked: true})
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  dislikePost = (id) => {

    axios.post('https://akademia108.pl/api/social-app/post/dislike', {
      post_id: id,
    })
    .then((res) => {
      if(!res.data.liked) {
        this.setState({likeCount: this.state.likeCount - 1, isLiked: false})
    }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  deletePost = (id) => {

    axios.post('https://akademia108.pl/api/social-app/post/delete', {
      post_id: id,
    })
    .then (() => {
      this.props.latestPosts();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  unfollowUser = (id) => {

    axios.post('https://akademia108.pl/api/social-app/follows/disfollow', 
    { leader_id: id })
    .then(() => {
      this.props.latestPosts();

    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    return (
      <div className="Post">
        <aside className="UserAvatar">
          <img src={this.props.postObj.user.avatar_url} alt=""/>
        </aside>
        <div className="PostData">
          <span className="UserID">{this.props.postObj.user.username}</span>
          <span className="CreatedAt">
            {this.props.postObj.created_at.split("").slice(0, 10)}
          </span>
        </div>
        <div className="PostContent">{this.props.postObj.content}</div>
        {this.props.user && <div className="PostButtons">
          {this.props.user.username === this.props.userID && <button className="PostDelete" onClick={() => this.deletePost(this.props.postObj.id)}>Delete post</button>}
          {this.props.user.username !== this.props.userID && <button className="UnfollowButton" onClick={() => this.unfollowUser(this.props.postObj.user.id)}>Unfollow</button>}
          {this.state.isLiked ? <button className="LikeToggler" onClick={()=>this.dislikePost(this.props.postObj.id)}>Dislike</button>:<button className="LikeToggler" onClick={()=>this.likePost(this.props.postObj.id)}>Like</button>}
          {this.state.likeCount}
        </div>}
      </div>
    );
  }
}

export default Post;