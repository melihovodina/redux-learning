import React, { useState } from 'react'
import PostItem from './PostItem';
import { postApi } from '../services/postService';
import { iPost } from '../models/iPost';

const PostContainer = () => {
  const [limit, setLimit] = useState(10)
  // данные о постах, ошибку, статус загрузки и функцию повторного запроса
  const {data: posts, error, isLoading, refetch} = postApi.useFetchAllPostsQuery(limit, {
    //pollingInterval: 1000 для постоянных запросов
  })
  // функции для создания, обновления и удаления постов
  const [createPost, {}] = postApi.useCreatePostMutation() 
  const [updatePost, {}] = postApi.useUpdatePostMutation()
  const [deletePost, {}] = postApi.useDeletePostMutation()
  
  // функция создания нового поста.
  const handleCreate = async () => {
    const title = prompt()
    await createPost({title, body: title} as iPost)
  }
  // функция обновления поста.
  const handleUpdate = (post: iPost) => {
    updatePost(post)
  }
  // функция удаления поста.
  const handleRemove = (post: iPost) => {
    deletePost(post)
  }

  return (
    <div className='posts-main'>
      {/* кнопка для повторного запроса постов */}
      <button onClick={() => refetch()}>refetch</button>
      {isLoading && <h1>Loading...</h1>} 
      {error && <h1>Error</h1>}
      {posts && posts.map(post => 
          <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate}/>
      )}
      <button onClick={handleCreate}>create post</button>
    </div>
  )
}

export default PostContainer