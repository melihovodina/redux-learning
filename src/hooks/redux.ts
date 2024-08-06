import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

/**
 * хук useAppDispatch - возвращает диспетчер экшенов приложения.
 * этот хук необходим для отправки экшенов в стор приложения.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * хук useAppSelector - возвращает селектор состояния приложения.
 * этот хук необходим для получения состояния приложения в компонентах.
 * типизирован с помощью TypedUseSelectorHook для обеспечения безопасности типов.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;