// LIB
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import {AppDispatch, RootState} from '@/redux/store';
import {fetchMyList} from '@/redux/Slice/MyListSlice';

const useMyListLogic = () => {
  const {movies, isLoading, totalPage, page} = useSelector(
    (state: RootState) => state.myList,
  );

  const dispatch = useDispatch<AppDispatch>();

  const getMyList = (id: number) => {
    if (isLoading || page > totalPage) return;
    dispatch(
      fetchMyList({
        id: id,
        page: page,
      }),
    );
  };

  const handleLoadMore = () => {
    getMyList(8535578);
  };

  useEffect(() => {
    getMyList(8535578);
  }, []);

  return {movies, isLoading, handleLoadMore};
};

export default useMyListLogic;
