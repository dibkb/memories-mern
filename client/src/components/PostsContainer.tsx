import React from "react";
import ProfileInfo from "./ProfileInfo";
const PostsContainer: React.FC<PostsContainer> = ({ posts }) => {
  const content = posts.map((post: any) => {
    console.log(post);
    return (
      <div key={post._id}>
        <img src={post.selectedFile} alt="" />
      </div>
    );
  });
  return <div>{content}</div>;
};
interface PostsContainer {
  posts: any;
}
export default PostsContainer;
