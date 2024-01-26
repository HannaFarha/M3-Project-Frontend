// Dans le composant RecipeCard.jsx
import React from 'react';
import { Card, Image, Text, Badge, Group, Indicator } from '@mantine/core';
import classes from '../styles/VinylCard.module.css';

const RecipeCard = ({ artiste, album, image, type }) => {
  return (
    <div className={classes.container}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} height={160} alt="Vinyl Cover" />
        </Card.Section>

        <Indicator color="#f4612d" withBorder size={50} inline>
          <Group justify="space-between" mt="sm" mb="xs">
            <Text fw={700} c="#252525">{artiste}</Text>
          </Group>
        </Indicator>

        <Text fw={500} c="#252525">
          Album: {album}
        </Text>

        <div>
          <p>
            <span className={classes.type}>Type :</span>
            {type && type.length > 0 && (
              type.slice(0, 6).map((type, index) => (
                <Badge key={index} color="#f4c0b0" style={{ marginRight: '4px' }}>
                  {type}
                </Badge>
              ))
            )}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RecipeCard;
