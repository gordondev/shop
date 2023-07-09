import React from 'react';
import { SimpleGrid, Container, Title } from '@mantine/core';
import ArticleCard from './ArticleCard';
import girl from './123.jpg.webp';

const mockdata = [
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
  {
    title: '13.6 Ноутбук Apple MacBook Air черный',
    image: girl,
    price: `$${899}`,
  },
];

export default function ArticlesCardsGrid() {
  const cards = mockdata.map((article, index) => (
    <ArticleCard
      key={index}
      title={article.title}
      image={article.image}
      price={article.price}
    />
  ));

  return (
    <Container py="xl">
      <Title order={2} style={{ marginBottom: '20px' }}>
        Новинки:
      </Title>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
