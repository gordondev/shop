import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  rem,
} from '@mantine/core';
import girl from "./ja.jpg.webp";
import { IconShoppingCartPlus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export default function HeroBullets() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              MacBook Pro серый
            </Title>
            <Text color="dimmed" mt="md">
              Ноутбук Apple MacBook Pro ускорит загрузку файлов и способствует плавной навигации между множеством окон. Процессор Apple M1 Pro с 8-ядерной архитектурой поддерживает высокую производительность модели, независимо от выполняемой задачи.
            </Text>

            <Group mt={30}>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Подробнее
              </Button>
              <Button radius="xl" size="md" className={classes.control}>
                <IconShoppingCartPlus style={{ marginRight: '8px' }} />
                В корзину
              </Button>
            </Group>
          </div>
          <Image src={girl} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}