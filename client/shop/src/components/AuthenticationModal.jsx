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
import { registration } from "../http/userAPI";
import React, { useState, useContext } from "react";
import { notifications } from '@mantine/notifications';

function AuthenticationModal({ opened, onClose }) {
  const [type, toggle] = useToggle(['login', 'register']);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const sendDataForRegistration = async (values) => {
    setLoading(true);
    console.log("send");
    try {
      let data = await registration(values);
      // user.setUser(data.user);
      // user.setIsAuth(true);
      // user.setRole(data.role);
      // navigate(MAIN_ROUTE);
    } catch (e) {
      notifications.show({ title: e.response?.data?.error, color: 'red', });
      e.response?.data?.errors.map((i) => {
        notifications.show({ title: e.response?.data?.error, message: i.message, color: 'red', });
      });
      console.log(e.response?.data);
      // message.error(e.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={upperFirst(type)} centered>
      <form onSubmit={form.onSubmit(() => sendDataForRegistration(form.values))}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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
            error={form.errors.password && 'Password should include at least 6 characters'}
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
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AuthenticationModal;
