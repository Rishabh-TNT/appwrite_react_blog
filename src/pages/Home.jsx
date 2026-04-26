import { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import service from "../appwrite/services";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const rows = await service.getPosts();
        rows && setPosts(rows.rows);
        console.log("rows: ", rows);
        const user = await authService.getCurrentUser();
        console.log("user: ", user);
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
      {posts.length != 0 ? (
        posts.map((post) => <PostCard {...post} key={post.$id} />)
      ) : (
        <h1>Login to see posts</h1>
      )}
    </div>
  );
}

export default Home;
