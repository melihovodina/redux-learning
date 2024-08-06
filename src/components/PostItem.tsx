import React, {FC} from 'react'
import { iPost } from '../models/iPost'

interface postItemProps {
    post: iPost
    remove: (post: iPost) => void;
    update: (post: iPost) => void;
}

const PostItem: FC<postItemProps> = ({post, remove, update}) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    remove(post)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || ''
    update({...post, title})
  }

  return (
    <div className='post-main'>
      <div className='post-info' onClick = {handleUpdate}>
        {post.id}. {post.title}
      </div>
      <button onClick={handleRemove}>Delete</button>
    </div>
  )
}

export default PostItem