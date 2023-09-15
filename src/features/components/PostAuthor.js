import React from 'react'
import { selectAllUser } from '../reducers/posts/userSlice'
import { useSelector } from 'react-redux'
import lodash from 'lodash';

const PostAuthor = ({userId}) => {
    const post = useSelector(selectAllUser)
    const getAuthor = lodash.find(post,(user)=> {return userId === user.id})
    return (
    <span>
      {getAuthor ? getAuthor.name : 'Anonymous user'}
    </span>
  )
}

export default PostAuthor
