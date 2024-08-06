import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchUsers } from '../store/reducers/actionCreators'

const UsersContainer = () => {
  // диспетчер экшенов
  const dispatch = useAppDispatch()
  // состояние пользователей, статус загрузки и ошибку
  const {users, isLoading, error} = useAppSelector(state => state.userReducer)

  // загружает пользователей при помощи экшен-креатора fetchUsers.
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {users && JSON.stringify(users, null, 2)}
    </div>
  )
}

export default UsersContainer