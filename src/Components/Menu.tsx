import React from 'react';
import { List, ListItem, ListItemButton, Typography } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceMenu } from '../Redux/sliceMenu';
import { sliceEditForm } from '../Redux/sliceEditForm';
import { sliceEditOrganization } from '../Redux/sliceEditOrganization';

export default function Menu() {

	const active = useTypedSelector(state => state.sliceMenu.active);
	const { setActiveItem } = sliceMenu.actions;
    const { closeEditForm } = sliceEditForm.actions;
    const { closeEditOrganization } = sliceEditOrganization.actions;
	const dispatch = useTypedDispatch();

	function converterClick() {
		dispatch(setActiveItem('converter'));
        dispatch(closeEditForm());
        dispatch(closeEditOrganization());
	}

    function formsClick() {
		dispatch(setActiveItem('forms'));
        dispatch(closeEditForm());
        dispatch(closeEditOrganization());
	}

	function organizationsClick() {
		dispatch(setActiveItem('organizations'));
        dispatch(closeEditForm());
        dispatch(closeEditOrganization());
	}

	function rulesClick() {
		dispatch(setActiveItem('rules'));
        dispatch(closeEditForm());
        dispatch(closeEditOrganization());
	}

	function settingsClick() {
		dispatch(setActiveItem('settings'));
        dispatch(closeEditForm());
        dispatch(closeEditOrganization());
	}

	return <List className='Menu'>
		<ListItem>
			<ListItemButton className='Menu__Button' onClick={converterClick}>
				<Typography className='Menu__ButtonText'>Конвертер</Typography>
				<AdjustIcon className={`Menu__ButtonIcon ${active === 'converter' ? '' : 'hidden'}`}/>
			</ListItemButton>
		</ListItem>
        <ListItem>
			<ListItemButton className='Menu__Button' onClick={formsClick}>
				<Typography className='Menu__ButtonText'>Формы</Typography>
				<AdjustIcon className={`Menu__ButtonIcon ${active === 'forms' ? '' : 'hidden'}`}/>
			</ListItemButton>
		</ListItem>
		<ListItem>
			<ListItemButton className='Menu__Button' onClick={organizationsClick}>
				<Typography className='Menu__ButtonText'>Организации</Typography>
				<AdjustIcon className={`Menu__ButtonIcon ${active === 'organizations' ? '' : 'hidden'}`}/>
			</ListItemButton>
		</ListItem>
        <ListItem>
			<ListItemButton className='Menu__Button' onClick={rulesClick}>
				<Typography className='Menu__ButtonText'>Правила</Typography>
				<AdjustIcon className={`Menu__ButtonIcon ${active === 'rules' ? '' : 'hidden'}`}/>
			</ListItemButton>
		</ListItem>
		<ListItem>
			<ListItemButton className='Menu__Button' onClick={settingsClick}>
				<Typography className='Menu__ButtonText'>Настройки</Typography>
				<AdjustIcon className={`Menu__ButtonIcon ${active === 'settings' ? '' : 'hidden'}`}/>
			</ListItemButton>
		</ListItem>
	</List>

}