import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/userSlice'
import { postApi } from "../services/postService";

// корневой редюсер, объединяющий все редюсеры приложения
const rootReducer = combineReducers({
    // редюсер для управления состоянием пользователя
    userReducer,
    // редюсер для работы с постами
    [postApi.reducerPath]: postApi.reducer 
})

// функция для настройки хранилища приложения
export const setupStore = () => {
    // конфигурация хранилища с помощью функции configureStore
    return configureStore({
        // указыатель, что корневой редюсер - это основной редюсер приложения
        reducer: rootReducer,
        // middleware для обработки запросов к API
        middleware: (getDefaultMiddleware) => 
            // Объединение стандартного middleware с middleware для работы с постами
            getDefaultMiddleware().concat(postApi.middleware)
    })
}

// определяем типы для работы с хранилищем
export type RootState = ReturnType<typeof rootReducer>
// тип хранилища приложения
export type AppStore = ReturnType<typeof setupStore>
// тип диспетчера приложения
export type AppDispatch = AppStore['dispatch']