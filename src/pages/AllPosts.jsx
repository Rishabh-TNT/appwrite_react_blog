import { useEffect, useState } from "react";
import service from "../appwrite/services";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const rows = await service.getPosts();
        rows && setPosts(rows.rows);
        console.log("rows: ", rows);
      } catch (error) {
        console.error("Home:: unable to fetch posts:: ", error);
        // throw new Error("Home:: unable to fetch posts:: ", { cause: error });
        // }
      }
    };
    getPosts();
  }, []);

  return (
    <div className="home">
      {posts.map((post) => (
        <PostCard {...post} key={post.$id} />
      ))}
    </div>
  );
}

export default AllPosts;
