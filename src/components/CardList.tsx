import { Grid, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [urlImage, setUrlImage] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  const handleViewImage = (url: string): void => {
    setUrlImage(url);
    onOpen();
  };

  return (
    <>
      {/* TODO CARD GRID */}
      <Grid marginBottom="40px" templateColumns="repeat(3, 1fr)" gap="40px">
        {cards.map(card => {
          return <Card key={card.id} data={card} viewImage={handleViewImage} />;
        })}
      </Grid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={urlImage} />
    </>
  );
}
