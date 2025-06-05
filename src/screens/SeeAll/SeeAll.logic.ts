// LIB
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import {AppDispatch, RootState} from '@/redux/store';
import {fetchMovies} from '@/redux/Slice/HomeSlice';

const useSeeAllLogic = (endpoint: string) => {
  const {
    totalPage,
    nowPlayMovies,
    topRatedMovies,
    upcomingMovies,
    popularMovies,
    isLoadingNowPlayMovies,
    isLoadingTopRatedMovies,
    isLoadingUpcomingMovies,
    isLoadingPopularMovies,
  } = useSelector((state: RootState) => state.home);

  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(2);

  const chooseData = () => {
    switch (endpoint) {
      case 'now_playing':
        return {movies: nowPlayMovies ?? [], loading: isLoadingNowPlayMovies};
      case 'top_rated':
        return {movies: topRatedMovies ?? [], loading: isLoadingTopRatedMovies};
      case 'upcoming':
        return {movies: upcomingMovies ?? [], loading: isLoadingUpcomingMovies};
      case 'popular':
        return {movies: popularMovies ?? [], loading: isLoadingPopularMovies};
      default:
        return {movies: [], loading: false};
    }
  };

  const getMoreMovies = (page: number, endpoint: string) => {
    if (chooseData().loading || page > totalPage) return;
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
