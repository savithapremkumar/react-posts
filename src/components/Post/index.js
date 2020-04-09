import React, { Component } from "react";
import Comment from "./Comment/index";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }
  toggleVisiblity = () => {
    this.setState((prevState) => ({
      display: !prevState.display,
    }));
  };
  render() {
    return (
      <div className="post">
        <div className="title">{this.props.title}</div>
        <div className="body">{this.props.body}</div>
        {this.props.comments.length > 0 && (
          <div
            className={this.state.display ? "comments show" : "comments"}
            onClick={this.toggleVisiblity}
          >
            {this.props.comments.length} Comments
            {this.props.comments.map((item) => (
              <Comment key={item.id} body={item.body} user={item.name} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
