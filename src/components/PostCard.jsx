import { Link } from "react-router-dom";
import service from "../appwrite/services";

function PostCard({ title, $id, featuredImage, userid }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="postcard">
        <div className="postimage">
          <img src={service.viewFile(featuredImage)} alt={$id} />
        </div>
        <div className="posttitle">{title}</div>
      </div>
    </Link>
  );
}

export default PostCard;
