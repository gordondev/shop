import React from 'react';
import { Card, Image, Text, Group, Button, Flex } from '@mantine/core';
import { IconShoppingCartPlus } from '@tabler/icons-react';

export default function ArticleCard({ title, image, price }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} style={{ padding: '10px', paddingTop: '20px' }} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} component="a" href="https://example.com" className="link-card">
          {title}
        </Text>
      </Group>

      <Text color="green" size="xm" transform="uppercase" weight={700} mt="md">
        {price}
      </Text>
      
      <Flex alignItems="center" mt="md">
        <Button variant="light" color="blue" fullWidth radius="md">
          <IconShoppingCartPlus style={{ marginRight: '20px' }} />
          В корзину
        </Button>
      </Flex>
    </Card>
  );
}
