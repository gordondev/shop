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
import React, { useState, useContext, useEffect } from "react";
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
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 8 || val.length > 32 ? 'Пароль должен состоять от 6 до 32 символов' : null),
    },
  });

  const sendData = async (values) => {
    setLoading(true);
    try {
      if (type === 'register') {
        let data = await registration(values);
        notifications.show({ title: 'Пользователь успешно зарегестрирован', color: 'green' });
      } else {
        let data = await login(values);
        notifications.show({ title: 'Добро пожаловать!', color: 'green' });
      }

      // user.setUser(data.user);
      // user.setIsAuth(true);
      // user.setRole(data.role);
    } catch (e) {
      if (e.response?.data?.message) {
        notifications.show({ title: e.response?.data?.message, color: 'red', });
      }
      if (e.response?.data?.error) {
        notifications.show({ title: e.response?.data?.error, color: 'red', });
      }
      if (e.response?.data?.errors) {
        e.response?.data?.errors.map((i) => {
          notifications.show({ title: e.response?.data?.error, message: i.message, color: 'red', });
        });
      }
    }
    setLoading(false);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={upperFirst(type)} centered>
      <form onSubmit={form.onSubmit(() => sendData(form.values))}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.firstName}
              onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Пароль должен состоять от 6 до 32 символов'}
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
