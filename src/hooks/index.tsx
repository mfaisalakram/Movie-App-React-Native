import { useFetchMore } from '@utils';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Context {
  loading: boolean;
  movie: ItemsProps[];
  pages: { page: string | number; total: string | number };
  setPages: React.Dispatch<React.SetStateAction<number>>;
  c: React.Dispatch<React.SetStateAction<Array<Number>>>;
  favorite: Array<Number>;
  page: number;

}

const ContextAPI = createContext<Context>({} as Context);

export function useMovie() {
  const ctx = useContext(ContextAPI);

  if (ctx === null || ctx === undefined) throw new Error('not using contex');

  return ctx;
}

const Provides: React.FC = ({ children }) => {
  const [page, setPages] = useState(1);
  const [favorite, setFavorites] = useState<Array<Number>>([]);
  const [movie, loading, pages] = useFetchMore(page);
  useEffect(() => {

    console.log("favoriteconsole", favorite);

    AsyncStorage.setItem('favorite', `${favorite}`);

  }, [favorite]);
  const value = useMemo(() => ({ movie, loading, pages, page, setPages }), []);
  console.log("favoriteconsole222", favorite);

  return <ContextAPI.Provider value={{ movie, loading, page, setPages, pages, favorite, setFavorites }}>{children}</ContextAPI.Provider>;
};

export default Provides;
