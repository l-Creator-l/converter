import React, { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormHelperText, RadioGroup, FormControlLabel, Radio, TextField, Checkbox, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdjustIcon from '@mui/icons-material/Adjust';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { useTypedSelector, useTypedDispatch } from '../../Hooks/reduxHooks';
import { sliceDatabase } from '../../Redux/sliceDatabase';
import { sliceModal } from '../../Redux/sliceModal';
import { TRemoveCellForm, TRemoveCell } from '../../Types/reduxTypes';

const CustomSelect = styled(Select)({
	'& .MuiSelect-select': {
		background: 'transparent !important',
		padding: '10px 15px',
	},
	'& .MuiSvgIcon-root': {
		fill: 'white',
	},
});

const CustomTextField = styled(TextField)({
	'& input': {
		width: '275px',
		color: 'white',
	},
	'& label': {
		color: 'white !important',
	},
	'& label.Mui-focused': {
		color: 'white',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'white !important',
			borderRadius: '10px',
		},
		'&:hover fieldset': {
			borderColor: 'white !important',
		},
		'&.Mui-focused fieldset': {
			background: 'rgba(25, 118, 210, 0.04)',
			borderColor: 'white !important',
		},
	},
	'& .MuiFormHelperText-root': {
		color: '#f7b0b9 !important',
		userSelect: 'none',
		/* whiteSpace: 'nowrap', */
	}
});

export default function RemoveCell() {

	const [selectFormError, setSelectFormError] = useState(true);

	const [forms, removeCell] = useTypedSelector(state => [
		state.sliceDatabase.forms,
		state.sliceDatabase.rules.removeCell
	]);

	const { setRmCellRule } = sliceDatabase.actions;
	const { setModalVisibilityRm } = sliceModal.actions;
	const dispatch = useTypedDispatch();

	const { register, handleSubmit, control, watch, formState: { errors } } = useForm<TRemoveCellForm>({
		mode: "onBlur",
		defaultValues: {
			formNumber: 'all',
			radio: 'one',
			table: {
				number: '',
				from: '',
				to: ''
			},
			regexp: {
				value: '',
				iFlag: false
			}
		}
	});

	const radio = watch('radio');

	function onSubmit(data: TRemoveCellForm) {
		dispatch(setRmCellRule({
			formNumber: data.formNumber === 'all' ? 'all' : Number(data.formNumber),
			radio: data.radio,
			table: {
				number: Number(data.table.number) - 1,
				from: Number(data.table.from) - 1,
				to: Number(data.table.to) - 1
			},
			regexp: {
				value: data.regexp.value,
				iFlag: Boolean(data.regexp.iFlag)
			}
		}));
	}

	function selectForm() {
		setSelectFormError(false);
	}

	function removeRuleClick(i: number) {
		dispatch(setModalVisibilityRm({ visible: true, ruleNumber: i }));
	}

	return <>

		<Typography className="RemoveCell__Header">Удаление ячеек нестандартных таблиц</Typography>

		<Accordion className="RemoveCell__Accordion">

			<AccordionSummary className="RemoveCell__AccordionSummary" expandIcon={<ExpandMoreIcon className="RemoveCell__AccordionExpandIcon" />}>
				<Typography className="RemoveCell__AccordionHeader">Добавить правило</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<form onSubmit={handleSubmit(onSubmit)}>

					<Box className="RemoveCell__InputContainer RemoveCell__InputContainer-size1">

						<Typography className="RemoveCell__InputDescription">Для формы:</Typography>

						<CustomSelect className="RemoveCell__Select" variant="standard" defaultValue='all' disableUnderline {...register('formNumber', { required: 'Форма не выбрана' })} error={!!errors.formNumber} onChange={selectForm}
							MenuProps={{
								PaperProps: {
									sx: {
										marginTop: '10px',
										border: '1px solid white',
										borderRadius: '10px',
										background: '#8D8D8D',
										'& .MuiMenuItem-root': {
											padding: '10px 15px',
											background: '#8D8D8D',
											fontWeight: '400',
											color: 'white',
										},
										'& .Mui-selected': {
											background: '#ACACAC !important',
										},
									},
								},
							}}
						>
							<MenuItem className="RemoveCell__Option" value='all'>для всех форм</MenuItem>
							{forms.map((form, i) => <MenuItem className="RemoveCell__Option" value={i} key={`RemoveCell-select-${form.name}-№-${i}`}>{form.name} ({form.year})</MenuItem>)}
						</CustomSelect>

						{selectFormError ? <FormHelperText className='RemoveCell__ErrorMessage'>{errors.formNumber?.message}</FormHelperText> : ''}

					</Box>

					<Box className="RemoveCell__InputContainer RemoveCell__InputContainer-size2">

						<Typography className="RemoveCell__InputDescription">Применить правило к таблицам:</Typography>

						<Controller control={control} name="radio" render={({ field }) => (
							<RadioGroup className="RemoveCell__RadioGroup" row {...field}>
								<FormControlLabel className="RemoveCell__RadioLabel" value="one" control={<Radio className="RemoveCell__Radio" />} label="К одной таблице" />
								<FormControlLabel className="RemoveCell__RadioLabel" value="range" control={<Radio className="RemoveCell__Radio" />} label="К диапазону таблиц" />
								<FormControlLabel className="RemoveCell__RadioLabel" value="all" control={<Radio className="RemoveCell__Radio" />} label="Ко всем таблицам" />
							</RadioGroup>
						)} />

						{
							(radio === 'one') ?
								<CustomTextField className="RemoveCell__InputTable" size="small" label="Номер таблицы" placeholder="Номер таблицы" {...register('table.number', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, min: { value: 1, message: 'Номер таблицы должен быть больше 0' } })} helperText={errors.table?.number?.message} inputProps={{ maxLength: 3 }} /> :
								(radio === 'range') ?
									<Box>
										<CustomTextField className="RemoveCell__InputTable" size="small" label="Начальный номер" placeholder="Начальный номер" {...register('table.from', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, min: { value: 1, message: 'Конечный номер должен быть больше 0' } })} helperText={errors.table?.from?.message} inputProps={{ maxLength: 3 }} />
										<Typography className="RemoveCell__InputRadioDash">-</Typography>
										<CustomTextField className="RemoveCell__InputTable" size="small" label="Конечный номер" placeholder="Конечный номер" {...register('table.to', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, validate: (value, formValues) => Number(value) > Number(formValues.table.from) || 'Конечный номер должен быть больше начального' })} helperText={errors.table?.to?.message} inputProps={{ maxLength: 3 }} />
									</Box> :
									''
						}

					</Box>

					<Box className="RemoveCell__InputContainer">

						<Typography className="RemoveCell__InputDescription">Удалить ячейки по совпадению с регулярным выражением:</Typography>

						<Box className="RemoveCell__InputRegexpContainer">
							<Typography className="RemoveCell__InputRegexpSlash">/</Typography>
							<CustomTextField className="RemoveCell__Input" {...register('regexp.value', { required: 'Поле не заполнено' })} helperText={errors.regexp?.value.message} size="small" label="Регулярное выражение" placeholder="Регулярное выражение" />
							<Typography className="RemoveCell__InputRegexpSlash">/</Typography>
							<FormControlLabel className="RemoveCell__CheckboxLabel" labelPlacement="start" label="i" control={
								<Checkbox {...register('regexp.iFlag')} sx={{
									'& .MuiSvgIcon-root': { fontSize: 25, color: 'white' }
								}} />
							} sx={{
								'& .MuiFormControlLabel-label': { fontSize: 20, userSelect: 'none' }
							}} />
						</Box>

					</Box>

					<Button className="RemoveCell__SaveRuleButton" type='submit' variant="outlined">Сохранить</Button>
				</form>

			</AccordionDetails>

		</Accordion>

		<List className='RemoveCell__List'>
			{removeCell.map((rule: TRemoveCell, i) =>
				<ListItem className='RemoveCell__ListItem' key={`RemoveCell-rule-№-${i}`}>
					<ListItemIcon>
						<AdjustIcon className='RemoveCell__SelectIcon' />
					</ListItemIcon>
					<ListItemText>
						{i + 1}. {rule.form.all ? <Typography className='RemoveCell__Span'>Во всех формах</Typography> : <>В форме <Typography className='RemoveCell__Span'>{rule.form.name} ({rule.form.year})</Typography></>}
						&nbsp;удалить ячейки {rule.radio === 'one' ? <Typography className='RemoveCell__Span'>таблицы {Number(rule.table.number) + 1}</Typography> : rule.radio === 'range' ? <Typography className='RemoveCell__Span'>таблиц с {Number(rule.table.from) + 1} по {Number(rule.table.to) + 1}</Typography> : <Typography className='RemoveCell__Span'>всех таблиц</Typography>}
						&nbsp;по совпадению с регулярным выражением {<Typography className='RemoveCell__Span'>/{rule.regexp.value}/{rule.regexp.iFlag ? 'i' : ''}</Typography>}
					</ListItemText>
					<IconButton className="RemoveCell__RemoveButton" size="small" onClick={() => removeRuleClick(i)}>
						<DeleteForeverIcon className="RemoveCell__RemoveIcon" />
					</IconButton>
				</ListItem>
			)}
		</List>
	</>
}