import React, { useEffect } from 'react';
import { Container } from "@mui/material";
import { useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceDatabase } from '../Redux/sliceDatabase';
import Menu from './Menu';
import Settings from './Settings';
import Converter from './Converter';
import Forms from './Forms';
import Organizations from './Organizations';
import Rules from './Rules';
import ModalRemoveForm from './ModalRemoveForm';
import ModalRemoveOrganization from './ModalRemoveOrganization';
import ModalRemoveRmCellRule from './ModalRemoveRmCellRule';
import { IDatabase } from '../Types/reduxTypes';

export default function App() {

	const { setDatabse } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

	useEffect(() => {

		let database = JSON.parse(localStorage.getItem('database'));

		if (!database) {

			const initialDatabase:IDatabase = {
				forms: [],
				sortFormsBy: {
					value: '',
					from: ''
				},
				organizations: [],
                sortOrganizationsBy: {
					value: '',
					from: ''
				},
                rules: {
                    rmCellRules: []
                }
			}

			localStorage.setItem('database', JSON.stringify(initialDatabase));
			database = initialDatabase;

		}

		dispatch(setDatabse(database));

	}, []);

	return (
		<Container className="App">
			<Container className='Container'>
				<Menu />
				<Converter />
				<Forms />
                <Organizations />
                <Rules />
                <Settings />
				<ModalRemoveForm />
                <ModalRemoveOrganization />
                <ModalRemoveRmCellRule />
			</Container>
		</Container>
	)

}