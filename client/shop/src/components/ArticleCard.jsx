import React from 'react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Group,
  Button,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { IconShoppingCartPlus } from '@tabler/icons-react';

export default function ArticleCard({ title, image, price }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} style={{ padding: '10px', paddingTop: '20px' }} />
        <ActionIcon color="red" size="xl" radius="xl">
          <IconHeart />
        </ActionIcon>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} component="a" href="https://example.com" className="link-card">
          {title}
        </Text>
      </Group>

      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {price}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        <IconShoppingCartPlus style={{ marginRight: '8px' }} />
        В корзину
      </Button>
    </Card>
  );
}
