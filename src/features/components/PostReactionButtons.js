import { useDispatch } from "react-redux";
import { reactionAdded } from "../reducers/posts/postsSlice";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "❤️",
  rocke: " 🚀",
  coffee: "☕",
};
const PostReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const reactionsButtons = Object.entries(reactionEmoji).map(
    ([name, emoji]) => {
      return (
        <button
          key={post.id}
          type="button"
          className="reactionButton"
          onClick={()=> {
            dispatch(reactionAdded({postId: post.id, reaction: name}))}}
        >
          {emoji} {post?.reactions[name]}
        </button>
      );
    }
  );

  return <div className="user-reaction">{reactionsButtons}</div>
};

export default PostReactionButtons
