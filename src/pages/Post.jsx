import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/services";

function Post() {
  const { postid } = useParams();
  const [post, setPost] = useState();
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const handleDelete = async () => {
    service.deletePost(postid);
    console.log("Post deleted: ", postid);
    navigate("/all-posts");
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await service.getPost(postid);
        setPost(post);
      } catch (error) {
        console.error("Post.getPost:: ", error);
      }
    };

    getPost();
  }, [postid]);

  return post ? (
    <div className="post">
      <img src={service.viewFile(post.featuredImage)} alt={post.$id} />
      <p>{post.title}</p>
      {parse(post.content)}
      {userData && userData.$id == post.userid && (
        <div className="btnSection">
          <button
            className="edit"
            type="button"
            onClick={(e) => navigate(`/edit-post/${postid}`)}
          >
            Edit
          </button>
          <button className="delete" type="button" onClick={handleDelete}>
            delete
          </button>
        </div>
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Post;
