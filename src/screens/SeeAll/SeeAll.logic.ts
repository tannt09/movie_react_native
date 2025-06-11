// LIB
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import {AppDispatch, RootState} from '@/redux/store';
import {fetchMovies} from '@/redux/Slice/HomeSlice';

const useSeeAllLogic = (endpoint: string) => {
  const {totalPage, movies, isLoading, page} = useSelector(
    (state: RootState) => state.home,
  );

  const dispatch = useDispatch<AppDispatch>();

  const chooseData = () => {
    switch (endpoint) {
      case 'now_playing':
        return {
          movies: movies[0] ?? [],
          loading: isLoading[0],
          totalPage: totalPage[0],
          page: page[0],
        };
      case 'top_rated':
        return {
          movies: movies[1] ?? [],
          loading: isLoading[1],
          totalPage: totalPage[1],
          page: page[1],
        };
      case 'upcoming':
        return {
          movies: movies[2] ?? [],
          loading: isLoading[2],
          totalPage: totalPage[2],
          page: page[2],
        };
      case 'popular':
        return {
          movies: movies[3] ?? [],
          loading: isLoading[3],
          totalPage: totalPage[3],
          page: page[3],
        };
      default:
        return {movies: [], loading: false, totalPage: 1, page: 1};
    }
  };

  const getMoreMovies = (page: number, endpoint: string) => {
    if (chooseData().loading || page > chooseData().totalPage) return;
    dispatch(
      fetchMovies({
        page,
        endpoint,
      }),
    );
  };

  const handleLoadMore = () => {
    getMoreMovies(chooseData().page, endpoint);
  };

  return {
    chooseData,
    handleLoadMore,
  };
};

export default useSeeAllLogic;
