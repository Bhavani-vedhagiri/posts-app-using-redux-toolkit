import { useEffect } from "react";
import lodash from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPost,
  getPostsStatus,
  // getPostsError,
  fetchPosts,
} from "../reducers/posts/postsSlice";
import PostExcerpt from "./PostExcerpt";
// import {fetchedUsers} from '../reducers/posts/userSlice'

function PostsList() {
  const post = useSelector(selectAllPost);
  const postStatus = useSelector(getPostsStatus);
  // const postError = useSelector(getPostsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
      // dispatch(fetchedUsers())
    }
  }, [dispatch,postStatus]);

  let content;
  const sortPost = post
    .slice()
    .sort((a, b) => b.timeStamp.localeCompare(a.timeStamp));

  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "successed") {
    content = lodash.map(sortPost, (item) => {
      return <PostExcerpt key={item.id} post={item} />;
    });
  }
  // const renderPosts = lodash.map(sortPost, (item) => {
  //   return (
  //     <article key={item.id}>
  //       <h4>{item.title}</h4>
  //       <p>{item.content.substring(0, 100)}</p>
  //       <p className="postCredit">
  //         <div className="user-post-section">
  //           <div className="user-avatar"></div>
  //           <div className="user-name">
  //           <PostAuthor userId={item.userId} />
  //           <TimeAgo timeStamp={item.timeStamp} />
  //           </div>
  //           <PostReactionButtons post={item} />
  //         </div>
  //       </p>
  //     </article>
  //   );
  // });

  return (
    <div>
      <h3>Posts</h3>
      {content}
    </div>
  );
}

export default PostsList;
