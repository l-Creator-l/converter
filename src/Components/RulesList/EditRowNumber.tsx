import React, { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormHelperText, TextField, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdjustIcon from '@mui/icons-material/Adjust';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { useTypedSelector, useTypedDispatch } from '../../Hooks/reduxHooks';
import { sliceDatabase } from '../../Redux/sliceDatabase';
import { sliceModal } from '../../Redux/sliceModal';
import { sliceEditRowNumber } from '../../Redux/sliceEditRowNumber';
import { TEditRowNumberForm } from '../../Types/reduxTypes';

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

export default function EditRowNumber() {

	const [selectFormError, setSelectFormError] = useState(true);

	const [forms, form, tables, rules] = useTypedSelector(state => [
		state.sliceDatabase.forms,
		state.sliceEditRowNumber.form,
		state.sliceEditRowNumber.tables,
		state.sliceDatabase.rules.editRowNumber
	]);

	const { setForm, setTableAndRow, removeRuleItem } = sliceEditRowNumber.actions;
	const { setEdRowNumberRule } = sliceDatabase.actions;
	const { setModalVisibilityEd } = sliceModal.actions;
	const dispatch = useTypedDispatch();

	const { register, handleSubmit, getValues, formState: { errors } } = useForm<TEditRowNumberForm>({
		mode: "onBlur",
		defaultValues: {
			formNumber: '',
			tNumber: '',
			firstRowNumber: ''
		}
	});

	function selectForm(event: SelectChangeEvent) {
		const name = forms[Number(event.target.value)].name;
		const year = forms[Number(event.target.value)].year;
		dispatch(setForm({ name, year }));
		setSelectFormError(false);
	}

	function removeItemClick(i: number) {
		dispatch(removeRuleItem(i));
	}

	function onSubmit(data: TEditRowNumberForm) {
		const state = getValues();
		if ((!state.formNumber && state.formNumber !== 0) || !state.tNumber || !state.firstRowNumber) return;
		dispatch(setTableAndRow({
			tNumber: state.tNumber,
			firstRowNumber: state.firstRowNumber
		}));
	}

	function onSave() {
		if (!tables.length) return;
		dispatch(setEdRowNumberRule({ form, tables }));
	}

	function removeRuleClick(i: number) {
		dispatch(setModalVisibilityEd({ visible: true, ruleNumber: i }));
	}

	return <>

		<Typography className="EditRowNumber__Header">Изменение нумерации строк в таблицах</Typography>

		<Accordion className="EditRowNumber__Accordion">

			<AccordionSummary className="EditRowNumber__AccordionSummary" expandIcon={<ExpandMoreIcon className="EditRowNumber__AccordionExpandIcon" />}>
				<Typography className="EditRowNumber__AccordionHeader">Добавить/изменить правило</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<form onSubmit={handleSubmit(onSubmit)}>

					<Box className="EditRowNumber__InputContainer EditRowNumber__InputContainer-size1">

						<Typography className="EditRowNumber__InputDescription">Для формы:</Typography>

						<CustomSelect className="EditRowNumber__Select" variant="standard" defaultValue={''} disableUnderline {...register('formNumber', { required: 'Форма не выбрана' })} error={!!errors.formNumber} onChange={selectForm}
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
							{forms.map((form, i) => <MenuItem className="EditRowNumber__Option" value={i} key={`EditRowNumber-select-${form.name}-№-${i}`}>{form.name} ({form.year})</MenuItem>)}
						</CustomSelect>

						{selectFormError ? <FormHelperText className='EditRowNumber__ErrorMessage'>{errors.formNumber?.message}</FormHelperText> : ''}

					</Box>

					<Box className="EditRowNumber__InputContainer EditRowNumber__InputContainer-size2">

						<Typography className="EditRowNumber__InputDescription">Установить начало нумерации строк в таблицах:</Typography>

						<Box className="EditRowNumber__WrapperOuter">

							<Box className="EditRowNumber__WrapperInner">
								<CustomTextField className="EditRowNumber__Input" size="small" label="Номер таблицы" placeholder="Номер таблицы" {...register('tNumber', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, min: { value: 1, message: 'Номер должен быть больше 0' } })} helperText={errors.tNumber?.message} inputProps={{ maxLength: 3 }} />
								<CustomTextField className="EditRowNumber__Input" size="small" label="Номер первой строки" placeholder="Номер первой строки" {...register('firstRowNumber', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер строки может включать только цифры' }, min: { value: 1, message: 'Номер должен быть больше 0' } })} helperText={errors.firstRowNumber?.message} inputProps={{ maxLength: 3 }} />
							</Box>

							<Button className="EditRowNumber__AddRuleButton" variant="outlined" type='submit'>Установить</Button>

						</Box>
					</Box>

					<List className='EditRowNumber__List'>
						{tables.map((table, i) =>
							<ListItem className='EditRowNumber__ListItem' key={`EditRowNumber-tableMap1-№-${i}`}>
								<ListItemIcon>
									<AdjustIcon className='EditRowNumber__SelectIcon' />
								</ListItemIcon>
								<ListItemText>
									{i + 1}. Начать нумерацию строк таблицы №
									<Typography className='EditRowNumber__Span'>{table.tNumber}</Typography>
									&nbsp;с
									<Typography className='EditRowNumber__Span'>&nbsp;{table.firstRowNumber}</Typography>
								</ListItemText>
								<IconButton className="EditRowNumber__RemoveButton" size="small" onClick={() => removeItemClick(i)}>
									<DeleteForeverIcon className="EditRowNumber__RemoveIcon" />
								</IconButton>
							</ListItem>
						)}
					</List>

					<Button className="EditRowNumber__SaveRuleButton" variant="outlined" onClick={onSave}>Сохранить</Button>
				</form>

			</AccordionDetails>

		</Accordion>

		{rules.map((rule, i) =>
			<Box className={`EditRowNumber__Rules ${rules.length === 1 ? 'EditRowNumber__RulesOne' : i === 0 ? 'EditRowNumber__RulesFirst' : i === rules.length - 1 ? 'EditRowNumber__RulesLast' : ''}`} key={`EditRowNumber-list-№-${i}`}>
				<AdjustIcon className='EditRowNumber__SelectRuleIcon' />
				<List className='EditRowNumber__RulesList'>
					<Typography className='EditRowNumber__RuleHeader'>{i + 1}. {rule.form.name} {rule.form.year}</Typography>
					{rule.tables.map((table, i) => 
						<ListItem className='EditRowNumber__RuleListItem' key={`EditRowNumber-tableMap2-№-${i}`}>
							<ListItemText>
								{i + 1}. Начать нумерацию строк таблицы №
								<Typography className='EditRowNumber__RuleSpan'>{table.tNumber}</Typography>
								&nbsp;с
								<Typography className='EditRowNumber__RuleSpan'>&nbsp;{table.firstRowNumber}</Typography>
							</ListItemText>
						</ListItem>
					)}
				</List>
				<IconButton className="EditRowNumber__RemoveRuleButton" size="small" onClick={() => removeRuleClick(i)}>
					<DeleteForeverIcon className="EditRowNumber__RemoveRuleIcon"/>
				</IconButton>
			</Box>
		)}

	</>
}