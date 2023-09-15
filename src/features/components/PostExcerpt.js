import React from 'react'
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import PostReactionButtons from "./PostReactionButtons";

const PostExcerpt = ({post}) => {
  return (
    <article>
        <h4>{post.title}</h4>
        {/* <p>{post.content.substring(0, 100)}</p> */} 
        <p>{post.body.substring(0, 100)}</p>
        <p className="postCredit">
          <div className="user-post-section">
            <div className="user-avatar"></div>
            <div className="user-name">
            <PostAuthor userId={post.userId} />
            <TimeAgo timeStamp={post.timeStamp} />
            </div>
            <PostReactionButtons post={post} />
          </div>
        </p>
      </article>
  )
}

export default PostExcerpt
