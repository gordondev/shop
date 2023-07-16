import React from 'react'
import { Text, Paper, Container, Avatar, Group, Flex, Button, Title } from '@mantine/core';

const Profile = () => {
	return (
		<Container py="xl">
			<Paper shadow="sm" radius="md" p="lg" mb={20}>
			<Group position="apart">
				<Group>
			  		<Avatar size="xl" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" />
			  		    <Flex
					      mih={50}
					      gap="xs"
					      justify="flex-start"
					      align="flex-start"
					      direction="column"
					      wrap="wrap"
					    >
					  		<Text fz="xl">Nickname</Text>
					  		<Group spacing="xs">
					      		<Text c="dimmed">usr.@mail.ru</Text>
				      		</Group>
		      			</Flex>
		      	</Group>
		      	<Button>Редактировать</Button>
		    </Group>
		    </Paper>
		    <Paper shadow="sm" radius="md" p="lg" mb={20}>
				<Title order={3} style={{ marginBottom: '20px' }} ta="center">
					Сессии
				</Title>
				<Paper radius="md" p="lg" mb={15} withBorder>
					<Group position="apart">
						<Text>Desktop</Text>
						<Button color="red">Выйти</Button>
					</Group>
				</Paper>
				<Paper radius="md" p="lg" mb={15} withBorder>
					<Group position="apart">
						<Text>Desktop</Text>
						<Button color="red">Выйти</Button>
					</Group>
				</Paper>
				<Paper radius="md" p="lg" withBorder>
					<Group position="apart">
						<Text>Desktop</Text>
						<Button color="red">Выйти</Button>
					</Group>
				</Paper>
		    </Paper>
			<Paper shadow="sm" radius="md" p="lg">
		    	<Text ta="center">Дата регистрации: 26.05.2002</Text>
		    </Paper>
	    </Container>
	)
}

export default Profile