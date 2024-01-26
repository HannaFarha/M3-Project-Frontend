// Dans le composant VinylCard.jsx
import React from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import classes from '../styles/VinylCard.module.css';

const VinylCard = ({ artist, album, image, type }) => {
  return (
    <div className={classes.container}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} 
          height={160} 
          alt="Vinyl Cover" />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} c="#252525">{artist}- {album}</Text>
        <Badge color="pink">{type}</Badge>
      </Group>
      <Button color="blue" fullWidth mt="md" radius="md">
        Add to Collection
         </Button>
      
      </Card>
    </div>
  );
};

export default VinylCard;