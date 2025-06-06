// LIB
import {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

// IMPORT
import {AppDispatch, RootState} from '@/redux/store';
import {fetchSearchMovies} from '@/redux/Slice/ExploreSlice';

const useExploreLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoading, exploreMovies, totalPage} = useSelector(
    (state: RootState) => state.explore,
  );

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const flatListRef = useRef<FlatList>(null);

  const getSearchMovies = (page: number, searchText: string) => {
    if (isLoading || page > totalPage) return;
    dispatch(
      fetchSearchMovies({
        page,
        searchText,
        handleLoadMore: () => setPage(prev => prev + 1),
      }),
    );
  };

  const handleLoadMore = () => {
    getSearchMovies(page, searchText);
  };

  const handleChangeSearchText = async (text: string) => {
    setSearchText(text);
    setPage(1);
    flatListRef.current?.scrollToOffset({offset: 0, animated: false});
  };

  useEffect(() => {
    getSearchMovies(page, searchText);
  }, [searchText]);

  return {
    flatListRef,
    isLoading,
    searchText,
    exploreMovies,
    handleChangeSearchText,
    handleLoadMore,
  };
};

export default useExploreLogic;
