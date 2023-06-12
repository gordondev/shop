import {
  Modal,
  TextInput,
  PasswordInput,
  Anchor,
  Button,
  Stack,
  Group
} from '@mantine/core';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { registration, login } from "../http/userAPI";
import React, { useState, useEffect } from "react";
import { notifications } from '@mantine/notifications';

function AuthenticationModal({ opened, onClose }) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.reset();
  }, [type]);

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      password: '',
    },

    validate: {
      firstName: (val) => {
        if (val.length < 2 || val.length > 32) {
          return 'Имя должно содержать от 2 до 32 символов';
        }
        if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(val)) {
          return 'Имя должно состоять только из букв';
        }
        return null;
      },
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Некорректный email'),
      password: (val) => {
        if (val.length < 8 || val.length > 32) {
          return 'Пароль должен состоять от 6 до 32 символов';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(val)) {
          return 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ: !@#$%^&*()';
        }
        return null;
      },
    },
  });

  const sendData = async (values) => {
    setLoading(true);
    try {
      let data;
      if (type === 'register') {
        data = await registration(values);
        notifications.show({ title: 'Пользователь успешно зарегистрирован', color: 'green' });
      } else {
        data = await login(values);
        notifications.show({ title: 'Добро пожаловать!', color: 'green' });
      }

      handleSuccess(data);
    } catch (e) {
      handleErrors(e);
    }
    setLoading(false);
  };

const handleSuccess = (data) => {
  // user.setUser(data.user);
  // user.setIsAuth(true);
  // user.setRole(data.role);
};

const handleErrors = (e) => {
  const { response } = e;
  if (response && response.data) {
    const { data } = response;
    if (data.message) {
      notifications.show({ title: data.message, color: 'red' });
    }
    if (data.error) {
      notifications.show({ title: data.error, color: 'red' });
    }
    if (data.errors) {
      data.errors.forEach(({ message }) => {
        notifications.show({ title: data.error, message, color: 'red' });
      });
    }
  }
};

  return (
    <Modal opened={opened} onClose={onClose} title={upperFirst(type)} centered>
      <form onSubmit={form.onSubmit(() => sendData(form.values))}>
        <Stack>
          {type === 'register' && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              error={form.errors.firstName}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />
        </Stack>

        <Stack position="apart" mt="xl">
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={loading} loaderPosition="right">
              {upperFirst(type)}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AuthenticationModal;
