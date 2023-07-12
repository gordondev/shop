import React from 'react'
import { Text, Paper, Container, Avatar, Group, Table, Flex, Button } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const Profile = () => {

	const rows = elements.map((element) => (
	    <tr key={element.name}>
		    <td>{element.position}</td>
		    <td>{element.name}</td>
		    <td>{element.symbol}</td>
		    <td>{element.mass}</td>
	    </tr>
	));

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
					      		<Text>Кутузов</Text>
					      		<Text>Сергей</Text>
					      		<Text>Михайлович</Text>
				      		</Group>
		      			</Flex>
		      	</Group>
		      	<Button>Редактировать</Button>
		    </Group>
		    </Paper>
		    <Paper shadow="sm" radius="md" p="lg" mb={20}>
		    	<Text ta="center">Дата регистрации: 26.05.2002</Text>
		    </Paper>
		    <Paper shadow="sm" radius="md" p="lg">
				<Table horizontalSpacing="xl" verticalSpacing="md" fontSize="md">
					<thead>
				        <tr>
				          <th>Устройство</th>
				          <th>IP</th>
				          <th>Браузер</th>
				          <th></th>
				        </tr>
				    </thead>
			       <tbody>{rows}</tbody>
			    </Table>
		    </Paper>
	    </Container>
	)
}

export default Profile