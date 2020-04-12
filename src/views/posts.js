import React, { Component } from "react";
import axios from "axios";
import { API } from "../constants/api";
import Post from "../components/Post/index";
import Loader from "../components/Loader/index";
import Error from "../components/Error/index";
import { LoadingMessage } from "../constants/messages";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      loading: true,
      error: false,
      errorMsg: "",
    };
  }
  async componentDidMount() {
    try {
      const url = `${API}/posts?_embed=comments`;
      const res = await axios.get(url);
      if (res.status >= 400) throw new Error("4xx client error");
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
          errorMsg: "Data is not in expected format",
        });
      }
    } catch (err) {
      console.error(err.message);
      this.setState({
        loading: false,
        error: true,
        errorMsg: err,
      });
    }
  }
  render() {
    return this.state.loading ? (
      <Loader message={LoadingMessage} />
    ) : this.state.posts ? (
      <div className="posts">{this.state.posts}</div>
    ) : (
      <Error errorMsg={this.state.errorMsg} />
    );
  }
}
