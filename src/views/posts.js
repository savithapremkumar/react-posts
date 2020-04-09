import React, { Component } from "react";
import axios from "../axios";
import Post from "../components/Post/index";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: false,
      errorMsg: "",
    };
  }
  getPostsData() {
    axios
      .get(`/posts?_embed=comments`)
      .then((res) => {
        const data = res.data;
        let posts = [];
        if (data !== null && Array.isArray(data) && data.length > 0) {
          posts = data.map((p) => (
            <Post
              key={p.id}
              title={p.title}
              body={p.body}
              comments={p.comments}
            />
          ));
          this.setState({
            posts,
            loading: false,
          });
        } else {
          this.setState({
            loading: false,
            error: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          error: true,
          errorMsg: error,
        });
      });
  }
  componentDidMount() {
    this.getPostsData();
  }
  render() {
    return this.state.loading ? (
      <div className="loading">Loading...</div>
    ) : this.state.error ? (
      <div className="error">
        {this.state.errorMsg !== ""
          ? this.state.errorMsg
          : " Sorry, an error occured, please refresh your page to try again..."}
      </div>
    ) : (
      <div className="posts">{this.state.posts}</div>
    );
  }
}
