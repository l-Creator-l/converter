import React from 'react';
import { Fade, Box, Typography, Divider } from '@mui/material';
import { useTypedSelector } from '../Hooks/reduxHooks';
import RemoveCell from './RulesList/RemoveCell';
import EditRowNumber from './RulesList/EditRowNumber';

export default function Rules() {

	const active = useTypedSelector(state => state.sliceMenu.active);

	return <Fade in={active === 'rules'}>
		<Box className={`Rules ${active === 'rules' ? '' : 'hidden'}`}>

            <Typography className="Rules__Header">Правила</Typography>

            <Typography className="Rules__Description">При помощи правил можно модифицировать стандартную логику конвертера по преобразованию форм</Typography>

            <Divider className="Rules__DividerTop"/>

            <EditRowNumber/>

            <Divider className="Rules__DividerMiddle"/>

            <RemoveCell/>
            
            <Divider className="Rules__DividerBottom"/>
            
		</Box>
	</Fade>
}