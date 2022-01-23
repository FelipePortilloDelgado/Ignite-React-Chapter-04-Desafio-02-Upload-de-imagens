import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}
interface CardListProps {
  // after: string;
  data: Card[];
  nextCursor: string;
}

const fetchProjects = async ({ pageParam = 0 }): Promise<CardListProps> => {
  const response = await api.get('api/images', {
    params: { after: pageParam },
  });
  const { after, data } = response.data;

  return { data, nextCursor: after };
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchProjects,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const dataFlat: Card[] = [];
    data?.pages.forEach(page => {
      page.data.forEach(dataImage => dataFlat.push(dataImage));
    });

    return dataFlat;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && !isFetchingNextPage && (
          <Button onClick={() => fetchNextPage()}>Carregar mais</Button>
        )}
      </Box>
    </>
  );
}
