import React, { useState, useEffect } from 'react';
import { Fade, Container, Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceSettings } from '../Redux/sliceSettings';
import { asyncGetVersion } from '../Redux/asyncActions';

export default function Settings() {

	const active = useTypedSelector(state => state.sliceMenu.active);
    const { group, version } = useTypedSelector(state => state.sliceSettings);
    const { setGroup } = sliceSettings.actions;
	const dispatch = useTypedDispatch();

    const [tooltipText, setTooltipText] = useState("Копировать");

    useEffect(() => {
        dispatch(asyncGetVersion());
    }, []);

    function changeGroup(event: React.ChangeEvent<HTMLInputElement>) {
       dispatch(setGroup(event.target.value));
    }

    function emailClick() {
        const email = document.querySelector('.Settings__Email').textContent;
        navigator.clipboard.writeText(email);
        setTooltipText('Email скопирован');
    }

    function tooltipOpen() {
        setTooltipText('Копировать');
    }

	return <Fade in={active === 'settings'}>
		<Container className={`Settings ${active === 'settings' ? '' : 'hidden'}`}>

			<Typography className="Settings__Header">Настройки</Typography>

			<FormControl className="Settings__Form">
				<FormLabel className="Settings__FormLabel">Группировать файлы xml:</FormLabel>
				<RadioGroup className="Settings__FormGroup" value={group} onChange={changeGroup}>
					<FormControlLabel value="by forms" control={<Radio className="Settings__Radio"/>} label="по типу формы" />
					<FormControlLabel value="by organizations" control={<Radio className="Settings__Radio"/>} label="по организациям" />
					<FormControlLabel value="do not group" control={<Radio className="Settings__Radio"/>} label="не группировать" />
				</RadioGroup>
			</FormControl>

            <Box className="Settings__Footer">
                <Typography className="Settings__FooterText">
                    Контакт разработчика: &nbsp;
                    <Tooltip title={tooltipText} placement="top" arrow onOpen={tooltipOpen}>
                        <Typography className='Settings__Email' onClick={emailClick}>marenkov@rnpcmt.by</Typography>
                    </Tooltip>
                </Typography>
                <Typography className="Settings__FooterText">Версия: {version}</Typography>
            </Box>

		</Container>
	</Fade>

}