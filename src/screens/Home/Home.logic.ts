// LIB
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

//IMPORT
import {AppDispatch, RootState} from '@redux/store';
import {fetchMovieDetail, fetchMovies} from '@redux/Slice/HomeSlice';

const useHomeLogic = () => {
  const {
    isLoading,
    movieDetail,
    nowPlayMovies,
    topRatedMovies,
    upcomingMovies,
    popularMovies,
  } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();

  const getMovieDetail = () => {
    const ids = [278, 238, 240, 424, 389, 129, 497, 680, 372058, 122, 13];
    const index = Math.floor(Math.random() * ids.length);
    const randomId = ids[index];

    dispatch(fetchMovieDetail(randomId));
  };

  const getMovies = (page: number, endpoint: string) => {
    dispatch(fetchMovies({page, endpoint}));
  };

  useEffect(() => {
    getMovieDetail();
    getMovies(1, 'now_playing');
    getMovies(1, 'top_rated');
    getMovies(1, 'upcoming');
    getMovies(1, 'popular');
  }, []);

  const getNameGenres = () => {
    if (!movieDetail?.genres) return '';
    return movieDetail.genres.map(item => item.name).join(', ');
  };

  return {
    isLoading,
    movieDetail,
    nowPlayMovies,
    topRatedMovies,
    upcomingMovies,
    popularMovies,
    getNameGenres,
  };
};

export default useHomeLogic;
