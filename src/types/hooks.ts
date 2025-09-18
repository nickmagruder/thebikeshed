import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux.types';
import { AppDispatch } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector` for type safety
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
