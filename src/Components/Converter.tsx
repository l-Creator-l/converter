import React from 'react';
import { Fade, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceConverter } from '../Redux/sliceConverter';
import { asyncTransferData } from '../Redux/asyncActions';

const CustomTextField = styled(TextField)({
	'& input': {
		color: 'white',
	},
	'& label': {
		color: 'white',
	},
	'& label.Mui-focused': {
		color: 'white',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'white',
			borderRadius: '15px',
		},
		'&:hover fieldset': {
			borderColor: 'white',
		},
		'&.Mui-focused fieldset': {
			background: 'rgba(25, 118, 210, 0.04)',
			borderColor: 'white',
		},
	},
	'& .MuiFormHelperText-root': {
		color: '#f7b0b9',
	}
});

export default function Converter() {

	const { inputValue, isValid } = useTypedSelector(state => state.sliceConverter);
	const active = useTypedSelector(state => state.sliceMenu.active);
    const { loading, result, showResult } = useTypedSelector(state => state.sliceConverter);
	const { setInputValue } = sliceConverter.actions;
	const dispatch = useTypedDispatch();

	function inputChange(event:React.ChangeEvent<HTMLInputElement>) {
		dispatch(setInputValue(event.target.value));
	}

    function buttonClick() {
        if (!isValid) return;
        dispatch(asyncTransferData());
    }

	return <Fade in={active === 'converter'}>
		<Box className={`Converter ${active === 'converter' ? '' : 'hidden'}`}>

            <Typography className="Converter__Header">Конвертер</Typography>
			
			<Typography className="Converter__Description">Конвертер предназначен для преобразования файлов форм в формате xlsx в файлы xml, совместимые с программой ИАС "Здравоохранение".</Typography>

			<Box className="Converter__Container">
				<Typography className="Converter__InputDescription">Укажите путь к папке, которая содержит файлы .xlsx</Typography>
				<Typography className="Converter__InputDescriptionSmall">( файлы xml будут помещены в папку "Result", которая будет автоматически создана внутри указанного каталога )</Typography>
				<Box className="Converter__Form">
					<CustomTextField className="Converter__Input" label="C:\Example" placeholder="C:\Example" value={inputValue} helperText={`${((isValid && inputValue) || (!isValid && !inputValue)) ? '' : 'Путь содержит ошибку'}`} onChange={inputChange}/>
					<Button className="Converter__Button" variant="outlined" onClick={buttonClick}>Конвертировать</Button>
				</Box>
			</Box>

            <CircularProgress className={`Converter__Loading ${loading ? '' : 'hidden'}`} size={80}/>

            <Box className={`Converter__ResutlBox ${showResult ? '' : 'hidden'}`}>
                <Typography className='Converter__Result'>Файлов сконвертировано: {result.success}</Typography>
                <Typography className={`Converter__NotFound ${(result.notFound && result.notFound.length) ? '' : 'hidden'}`}>Конвертер не содержит реквизиты форм для следующих файлов:</Typography>
                {
                    (result.notFound && result.notFound.length) ? 
                    result.notFound.map(text => <Typography className='Converter__NotFoundItem'>{text}</Typography>)
                    : ''
                }
                <Typography className={`Converter__Error ${result.error ? '' : 'hidden'}`}>Ошибка: {result.error}</Typography>
            </Box>
			
		</Box>
	</Fade>
		
}