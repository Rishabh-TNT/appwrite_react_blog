import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/services";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userid = useSelector((state) =>
    state.userData ? state.userData.$id : null,
  );

  useEffect(() => {
    const getPosts = async () => {
      try {
        const rows = await service.getPosts([Query.equal("userid", userid)]);
        rows && setPosts(rows.rows);
        console.log("rows: ", rows);
      } catch (error) {
        console.error("Home:: unable to fetch posts:: ", error);
        // throw new Error("Home:: unable to fetch posts:: ", { cause: error });
        // }
      }
    };
    getPosts();
  }, [userid]);

  return (
    <div className="home">
      {posts.length !== 0 ? (
        posts.map((post) => <PostCard {...post} key={post.$id} />)
      ) : (
        <h1>No post by the user</h1>
      )}
    </div>
  );
}

export default AllPosts;
