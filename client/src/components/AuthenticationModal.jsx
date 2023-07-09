import {
  Modal,
  TextInput,
  PasswordInput,
  Anchor,
  Button,
  Stack,
  Group,
} from '@mantine/core';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { registration, login } from '../http/userAPI';
import React, { useEffect, useContext } from 'react';
import { Context } from '../index';
import { notifications } from '@mantine/notifications';
import { IconPassword } from '@tabler/icons-react';
import { generateValidPassword } from '../utils/passwordUtils';

function AuthenticationModal({ opened, onClose }) {
  const [type, toggle] = useToggle(['login', 'register']);
  const { user } = useContext(Context);

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
      firstName: function (val) {
        if (val.length < 2 || val.length > 32) {
          return 'Имя должно содержать от 2 до 32 символов';
        }
        if (!/^[a-zA-Zа-яА-ЯёЁ]+$/.test(val)) {
          return 'Имя должно состоять только из букв';
        }
        return null;
      },
      email: function (val) {
        return /^\S+@\S+$/.test(val) ? null : 'Некорректный email';
      },
      password: function (val) {
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

  const generatePassword = function () {
    const password = generateValidPassword(12);
    form.setFieldValue('password', password);
  };

  const sendData = async function (values) {
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
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleSuccess = function (data) {
    console.log(data);
    user.setUser(data);
    user.setIsAuth(true);
    user.setRole(data.role);
  };

  const handleErrors = function (error) {
    const { response } = error;
    if (response && response.data) {
      const { data } = response;
      if (data.message) {
        notifications.show({ title: data.message, color: 'red' });
      }
      if (data.error) {
        notifications.show({ title: data.error, color: 'red' });
      }
      if (data.errors) {
        data.errors.forEach(function ({ message }) {
          notifications.show({ title: data.error, message, color: 'red' });
        });
      }
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={upperFirst(type)} centered>
      <form onSubmit={form.onSubmit(function () {
        return sendData(form.values);
      })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.firstName}
              onChange={function (event) {
                return form.setFieldValue('firstName', event.currentTarget.value);
              }}
              error={form.errors.firstName}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={function (event) {
              return form.setFieldValue('email', event.currentTarget.value);
            }}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={function (event) {
              return form.setFieldValue('password', event.currentTarget.value);
            }}
            error={form.errors.password}
            radius="md"
          />
        </Stack>
        {type === 'register' && (
          <Button variant="light" radius="xl" mt="xl" color="gray" onClick={generatePassword} size="xs">
            Сгенерировать пароль
            <IconPassword />
          </Button>
        )}
        <Stack position="apart" mt="xl">
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={toggle}
              size="xs"
            >
              {type === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={form.loading} loaderPosition="right">
              {upperFirst(type)}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AuthenticationModal;
