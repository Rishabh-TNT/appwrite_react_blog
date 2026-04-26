import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../appwrite/services";
import { PostForm } from "../components";

function EditPost() {
  const { slug } = useParams();
  console.log("slug: ", slug);
  const [post, setPost] = useState();

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await service.getPost(slug);
        setPost(post);
      } catch (error) {
        console.error("EditPost.getPost:: ", error);
      }
    };

    getPost();
  }, [slug]);

  return post ? <PostForm post={post} /> : <p>Loading...</p>;
}

export default EditPost;
