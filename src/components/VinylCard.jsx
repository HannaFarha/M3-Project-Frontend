import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import classes from '../styles/VinylCard.module.css';
import { Link } from "react-router-dom";


const VinylCard = ({ artist, album, image, types, onAddToCollection, vinyl }) => {
  return (
    <div className={classes.container}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
        <Link to={`/vinyls/${vinyl._id}`}>
          <Image src={image} height={160} alt="Vinyl Cover" />
          </Link>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500} c="#252525">
            {artist} - {album}
          </Text>
          <Badge color="pink">{types}</Badge>
        </Group>
        <Button color="blue" fullWidth mt="md" radius="md" onClick={onAddToCollection}>
          Add to Collection
        </Button>
      </Card>
    </div>
  );
};

export default VinylCard;
