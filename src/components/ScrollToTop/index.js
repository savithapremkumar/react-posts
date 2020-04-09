import React, { Component } from "react";

export default class ScrollingWrapper extends Component {
  constructor(props) {
    super(props);
    this.scrollingWrapper = React.createRef();
    this.state = {
      hasScrolled: false,
    };
  }

  componentDidMount() {
    this.scrollingWrapper.current.addEventListener(
      "scroll",
      this.onScroll,
      true
    );
  }

  onScroll = () => {
    if (
      this.scrollingWrapper.current.scrollTop > 100 &&
      !this.state.hasScrolled
    ) {
      this.setState({ hasScrolled: true });
    } else if (
      this.scrollingWrapper.current.scrollTop < 100 &&
      this.state.hasScrolled
    ) {
      this.setState({ hasScrolled: false });
    }
  };

  scrollToTop = () => {
    this.scrollingWrapper.current.scrollTop = 0;
  };

  render() {
    return (
      <div className="scrollToTop">
        {this.state.hasScrolled && (
          <div className="iconContainer" onClick={this.scrollToTop}>
            <div>^</div>
            <div className="button">BACK TO TOP</div>
          </div>
        )}
        <div className="wrapperContainer" ref={this.scrollingWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
