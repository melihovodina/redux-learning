import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { iPost } from "../models/iPost"

// API для работы с постами
export const postApi = createApi({
  // путь к редьюсеру для этого API
  reducerPath: 'postApi',
  // базовый URL для запросов
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001'}),
  // типы тегов, которые будут использоваться для инвалидации кэша
  tagTypes: ['Post'],
  // конечные точки API
  endpoints: (build) => ({
    // точка для получения всех постов
    fetchAllPosts: build.query<iPost[], number>({
      // функция, которая возвращает объект запроса
      query: (limit = 5) => ({
        // URL запроса
        url: '/posts',
        // параметры запроса
        params: {
          // ограничение количества постов
          _limit: limit
        }
      }),
      // функция, которая возвращает теги для инвалидации кэша
      providesTags: result => ['Post'],
    }),
    // конечная точка для создания нового поста
    createPost: build.mutation<iPost, iPost>({
      // функция, которая возвращает объект запроса
      query: (post) => ({
        // URL запроса
        url: '/posts',
        // метод запроса
        method: 'POST',
        // тело запроса
        body: post
      }),
      // теги, которые необходимо инвалидировать после выполнения запроса
      invalidatesTags: ['Post']
    }),
    // конечная точка для обновления поста
    updatePost: build.mutation<iPost, iPost>({
      // функция, которая возвращает объект запроса
      query: (post) => ({
        // URL запроса
        url: `/posts/${post.id}`,
        // метод запроса
        method: 'PUT',
        // тело запроса
        body: post
      }),
      // теги, которые необходимо инвалидировать после выполнения запроса
      invalidatesTags: ['Post']
    }),
    // конечная точка для удаления поста
    deletePost: build.mutation<iPost, iPost>({
      // функция, которая возвращает объект запроса
      query: (post) => ({
        // URL запроса
        url: `/posts/${post.id}`,
        // метод запроса
        method: 'DELETE',
      }),
      // теги, которые необходимо инвалидировать после выполнения запроса
      invalidatesTags: ['Post']
    })
  })
})