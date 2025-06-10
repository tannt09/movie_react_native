// LIB
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import {AppDispatch, RootState} from '@/redux/store';
import {fetchMovies} from '@/redux/Slice/HomeSlice';

const useSeeAllLogic = (endpoint: string) => {
  const {totalPage, movies, isLoading} = useSelector(
    (state: RootState) => state.home,
  );

  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(2);

  const chooseData = () => {
    switch (endpoint) {
      case 'now_playing':
        return {
          movies: movies[0] ?? [],
          loading: isLoading[0],
          totalPage: totalPage[0],
        };
      case 'top_rated':
        return {
          movies: movies[1] ?? [],
          loading: isLoading[1],
          totalPage: totalPage[1],
        };
      case 'upcoming':
        return {
          movies: movies[2] ?? [],
          loading: isLoading[2],
          totalPage: totalPage[2],
        };
      case 'popular':
        return {
          movies: movies[3] ?? [],
          loading: isLoading[3],
          totalPage: totalPage[3],
        };
      default:
        return {movies: [], loading: false, totalPage: 1};
    }
  };

  const getMoreMovies = (page: number, endpoint: string) => {
    if (chooseData().loading || page > chooseData().totalPage) return;
    dispatch(
      fetchMovies({
        page,
        endpoint,
        handleLoadMore: () => setPage(prev => prev + 1),
      }),
    );
  };

  const handleLoadMore = () => {
    getMoreMovies(page, endpoint);
  };

  return {
    chooseData,
    handleLoadMore,
  };
};

export default useSeeAllLogic;
