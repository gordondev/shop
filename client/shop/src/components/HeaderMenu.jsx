import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Menu
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import AuthenticationModal from './AuthenticationModal';
import { CART_ROUTE, CATEGORIES_ROUTE, DASHBOARD_ROUTE, MAIN_ROUTE, PRODUCTS_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import React, { useState, useContext } from "react";
import { Context } from "../index";
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import UserButton from './UserButton';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function HeaderMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setIsLoading] = useState();
  const { user } = useContext(Context);
  console.log(user);

  return (
    <Box pb={120}>

      <Header height={80} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <MantineLogo size={30} />

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href={ MAIN_ROUTE } className={classes.link}>
              Home
            </a>
            <a href={ PRODUCTS_ROUTE } className={classes.link}>
              All products
            </a>
            <a href={ CATEGORIES_ROUTE } className={classes.link}>
              Categories
            </a>
            <a href={ CART_ROUTE } className={classes.link}>
              Cart(0)
            </a>
            <a href={ DASHBOARD_ROUTE } className={classes.link}>
              Dashboard
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            <AuthenticationModal opened={opened} onClose={close} />
            {
              user.isAuth ? (
                <Menu>
                  <Menu.Target>
                    <UserButton
                      image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                      name={user?.user?.firstName}
                      email={user?.user?.email}
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item icon={<IconUserCircle size={rem(14)} />} >
                      Профиль
                    </Menu.Item>
                    <Menu.Item icon={<IconLogout size={rem(14)} />} >
                      Выйти
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : <Button onClick={open}>Войти</Button>
            }
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="https://example.com" className={classes.link}>
            Home
          </a>
          <a href="https://example.com" className={classes.link}>
            Learn
          </a>
          <a href="https://example.com" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <AuthenticationModal opened={opened} onClose={close} />
            {
              user.isAuth ? "Авторизован" : <Button onClick={open}>Войти</Button>
            }
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}