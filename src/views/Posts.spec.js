import React from "react";
import { shallow, mount, render } from "enzyme";
import Posts from "./Posts";
import Post from "../components/Post";
import axios from "axios";
jest.mock("axios");

beforeAll(() => {});
let wrapper;
beforeEach(() => {
  wrapper = shallow(<Posts />, { disableLifecycleMethods: true });
});
afterEach(() => {
  wrapper.unmount();
});
it("must render a loader before API call returns a response", () => {
  expect(wrapper.dive().find("div.loading")).toHaveLength(1);
  expect(wrapper.dive().find("div.error")).toHaveLength(0);
  expect(wrapper.find(Post)).toHaveLength(0);
});
it("must show the post data and hide the loading div after API returns success", (done) => {
  // here we are spying on componentDidMount to know that it has been called
  const spyDidMount = jest.spyOn(Posts.prototype, "componentDidMount");
  const posts = [
    {
      userId: 1,
      id: 1,
      title: "Test title",
      body: "Test body",
      comments: [
        {
          postId: 1,
          id: 1,
          name: "Savitha",
          email: "savithapremkumar@gmail.com",
          body: "Test comment 1",
        },
      ],
    },
  ];
  const res = { data: posts };

  axios.get.mockImplementation(() => Promise.resolve(res));
  const didMount = wrapper.instance().componentDidMount();
  // expecting componentDidMount have been called
  expect(spyDidMount).toHaveBeenCalled();
  didMount.then(() => {
    // updating the wrapper
    wrapper.update();
    expect(wrapper.find("div.posts").length).toBe(1);
    expect(wrapper.find(Post)).toHaveLength(1);
    expect(wrapper.find(Post).prop("title")).toEqual("Test title");
    expect(wrapper.find(Post).prop("body")).toEqual("Test body");
    expect(wrapper.find("div.loading").length).toBe(0);
    expect(wrapper.find("div.error")).toHaveLength(0);
    spyDidMount.mockRestore();
    axios.mockClear();
    done();
  });
});

it("must show the error message and hide the loader after API returns error", (done) => {
  const spyDidMount = jest.spyOn(Posts.prototype, "componentDidMount");
  axios.get.mockImplementation(() =>
    Promise.reject(new Error("Oops there was an error"))
  );

  const didMount = wrapper.instance().componentDidMount();
  // expecting componentDidMount have been called
  expect(spyDidMount).toHaveBeenCalled();
  didMount.then(() => {
    // updating the wrapper
    wrapper.update();
    expect(wrapper.find("div.posts").length).toBe(0);
    expect(wrapper.find(Post)).toHaveLength(0);
    expect(wrapper.find("div.loading").length).toBe(0);
    expect(wrapper.dive().find("div.error")).toHaveLength(1);
    spyDidMount.mockRestore();
    axios.mockClear();
    done();
  });
});

it("must show the error message and hide the loader after API returns incorrect data", (done) => {
  const spyDidMount = jest.spyOn(Posts.prototype, "componentDidMount");
  const posts = {
    userId: 1,
    id: 1,
    title: "Test title",
    body: "Test body",
    comments: [
      {
        postId: 1,
        id: 1,
        name: "Savitha",
        email: "savithapremkumar@gmail.com",
        body: "Test comment 1",
      },
    ],
  };
  const res = { data: posts };
  axios.get.mockImplementation(() => Promise.resolve(res));

  const didMount = wrapper.instance().componentDidMount();
  // expecting componentDidMount have been called
  expect(spyDidMount).toHaveBeenCalled();
  didMount.then(() => {
    // updating the wrapper
    wrapper.update();
    expect(wrapper.find("div.posts").length).toBe(0);
    expect(wrapper.find(Post)).toHaveLength(0);
    expect(wrapper.find("div.loading").length).toBe(0);
    expect(wrapper.dive().find("div.error")).toHaveLength(1);
    expect(wrapper.dive().find("div.error").text()).toContain(
      "Data is not in expected format"
    );
    spyDidMount.mockRestore();
    axios.mockClear();
    done();
  });
});
