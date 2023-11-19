import React from 'react';
import { Fade, Box, Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AdjustIcon from '@mui/icons-material/Adjust';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceDatabase } from '../Redux/sliceDatabase';
import { sliceEditForm } from '../Redux/sliceEditForm';
import { sliceModal } from '../Redux/sliceModal';
import { IForm, TSortFormsBy } from '../Types/reduxTypes';

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
	}
});

const CustomEditField = styled(TextField)({
	'& input': {
		textAlign: 'center',
		fontSize: '15px',
		color: 'white',
	},
	'& .MuiFormHelperText-root': {
		textAlign: 'center',
		color: '#f7b0b9 !important',
		userSelect: 'none',
	},
	'& .MuiInputBase-root::before': {
		borderBottom: '1px solid lightgrey',
	},
	'& .MuiInputBase-root:hover::before': {
		borderBottom: '1px solid white !important',
	},
	'& .MuiInputBase-root::after': {
		border: '1px solid lightgrey'
	},
	'& .MuiInputBase-root:hover::after': {
		border: '1px solid white'
	}
});

export default function Forms() {

	const [forms, sortFormsBy, value, from, active, editMode, editTarget, editInputs] = useTypedSelector(state => [
		state.sliceDatabase.forms,
		state.sliceDatabase.sortFormsBy,
		state.sliceDatabase.sortFormsBy.value,
		state.sliceDatabase.sortFormsBy.from,
		state.sliceMenu.active,
		state.sliceEditForm.editMode,
		state.sliceEditForm.editTarget,
		state.sliceEditForm.editInputs
	]);
	const { sortForms } = sliceDatabase.actions;
	const { setEditForm, editName, editCode, editYear, closeEditForm } = sliceEditForm.actions;
	const { setModalVisibilityF } = sliceModal.actions;
	const { setForm, resetForm } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

	const { register, handleSubmit, setError, formState: { errors } } = useForm<IForm>({
		mode: "onBlur",
		defaultValues: {
			name: '',
			code: '',
			year: ''
		}
	});

	function inputChange() {
		setError('root', { type: 'custom', message: '' });
	}

	function onSubmit(data: IForm) {
		for (const form of forms) {
			if (form.code === data.code && form.year === data.year) return setError('root', { type: 'custom', message: 'форма с такими параметрами уже есть в таблице' });
		}

		const newForm = {
			name: data.name,
			code: data.code,
			year: data.year
		}

		dispatch(setForm(newForm));
		dispatch(sortForms(sortFormsBy));
		dispatch(closeEditForm());
	}

	function sortByNameClick(from: TSortFormsBy['from']) {
		dispatch(sortForms({ value: 'name', from }));
		dispatch(closeEditForm());
	}

	function sortByCodeClick(from: TSortFormsBy['from']) {
		dispatch(sortForms({ value: 'code', from }));
		dispatch(closeEditForm());
	}

	function sortByYearClick(from: TSortFormsBy['from']) {
		dispatch(sortForms({ value: 'year', from }));
		dispatch(closeEditForm());
	}

	function editFormClick(i: number) {
		editName(editTarget.name);
		editCode(editTarget.code);
		editYear(editTarget.year);
		dispatch(setEditForm(i));
	}
	
	function nameChange(event:React.ChangeEvent<HTMLInputElement>) {
		dispatch(editName(event.target.value));
	}

	function codeChange(event:React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 5) return;
		dispatch(editCode(event.target.value));
	}

	function yearChange(event:React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 4) return;
		dispatch(editYear(event.target.value));
	}

	function submitChangesClick() {
        if (editInputs.nameError || editInputs.codeError || editInputs.yearError) return;
		dispatch(resetForm({
            number: editTarget.number,
            name: editInputs.name,
            code: editInputs.code,
            year: editInputs.year
        }));
        dispatch(closeEditForm());
	}

	function closeEditFormClick() {
		dispatch(closeEditForm());
	}

	function removeFormClick(i: number) {
		const database = JSON.parse(localStorage.getItem('database'));
		const formName = database.forms[i].name;
		dispatch(setModalVisibilityF({ visible: true, formName, formNumber: i }));
	}

	return <Fade in={active === 'forms'}>
		<Box className={`Forms ${active === 'forms' ? '' : 'hidden'}`}>
            
            <Typography className="Forms__Header">Формы</Typography>

			<Typography className="Forms__Description">Таблица хранит реквизиты форм, конвертируемых документов. Если документ содержит форму, которой ещё нет в списке, добавьте в таблицу реквизиты формы с помощью меню "Добавить форму" для возможности конвертации.</Typography>

			<Accordion className="Forms__Accordion">

				<AccordionSummary className="Forms__AccordionSummary" expandIcon={<ExpandMoreIcon className="Forms__AccordionExpandIcon" />}>
					<Typography className="Forms__AccordionHeader">Добавить форму</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<form className="Forms__NewForm" onSubmit={handleSubmit(onSubmit)}>

						<Box className="Forms__InputContainer">
							<CustomTextField className="Forms__Input" {...register('name', { required: 'Поле не заполнено' })} error={!!errors.name} helperText={errors.name?.message} size="small" label="Наименование формы" placeholder="Наименование формы" onChange={inputChange} />
							<CustomTextField className="Forms__Input" {...register('code', { required: 'Поле не заполнено', pattern: { value: /^[\da-z]{5}$/i, message: 'Код должен состоять из 5 цифр/л. букв' } })} error={!!errors.code} helperText={errors.code?.message} inputProps={{ maxLength: 5 }} size="small" label="Код формы" placeholder="Код формы" onChange={inputChange} />
							<CustomTextField className="Forms__Input" {...register('year', { required: 'Поле не заполнено', pattern: { value: /^\d{4}$/, message: 'Год должен быть указан в формате YYYY' } })} error={!!errors.year} helperText={errors.year?.message} inputProps={{ maxLength: 4 }} size="small" label="Год" placeholder="Год" onChange={inputChange} />
						</Box>

						<Typography className="Forms__SubmitError">{errors.root?.message}</Typography>

						<Button className="Forms__SaveFormButton" type='submit' variant="outlined">Сохранить</Button>

					</form>
				</AccordionDetails>

			</Accordion>

			<Table className="Forms__Table">
				<TableHead>
					<TableRow>

						<TableCell className="Forms__TableHeaderCell"></TableCell>

						<TableCell className="Forms__TableHeaderCell">
							<Box className="Forms__TableHeaderWrapper">
								<Typography className='Forms__TableHeaderText'>Наименование формы</Typography>
								<ArrowDropDownIcon className={`Forms__SortMaxIcon ${(value === 'name' && from === 'max') ? 'active' : ''}`} onClick={() => sortByNameClick('max')} />
								<ArrowDropUpIcon className={`Forms__SortMinIcon ${(value === 'name' && from === 'min') ? 'active' : ''}`} onClick={() => sortByNameClick('min')} />
							</Box>
						</TableCell>

						<TableCell className="Forms__TableHeaderCell">
							<Box className="Forms__TableHeaderWrapper">
								<Typography className='Forms__TableHeaderText'>Код формы</Typography>
								<ArrowDropDownIcon className={`Forms__SortMaxIcon ${(value === 'code' && from === 'max') ? 'active' : ''}`} onClick={() => sortByCodeClick('max')} />
								<ArrowDropUpIcon className={`Forms__SortMinIcon ${(value === 'code' && from === 'min') ? 'active' : ''}`} onClick={() => sortByCodeClick('min')} />
							</Box>
						</TableCell>

						<TableCell className="Forms__TableHeaderCell">
							<Box className="Forms__TableHeaderWrapper">
								<Typography className='Forms__TableHeaderText'>Год</Typography>
								<ArrowDropDownIcon className={`Forms__SortMaxIcon ${(value === 'year' && from === 'max') ? 'active' : ''}`} onClick={() => sortByYearClick('max')} />
								<ArrowDropUpIcon className={`Forms__SortMinIcon ${(value === 'year' && from === 'min') ? 'active' : ''}`} onClick={() => sortByYearClick('min')} />
							</Box>
						</TableCell>

						<TableCell className="Forms__TableHeaderCell"></TableCell>

					</TableRow>
				</TableHead>
				<TableBody>
					{forms.map((form: IForm, i: number) => {
						return (editMode && editTarget.number === i) ? 

							<TableRow className='Forms__TableBodyRow selectedBackground' key={i}>
								<TableCell className="Forms__SelectFormCell">
									<AdjustIcon className={`Forms__SelectIcon ${(editMode && editTarget.number === i) ? 'selectedIcon' : ''}`} />
								</TableCell>
								<TableCell className="Forms__TableCell">
									<CustomEditField className="Forms__NameEditInput" variant="standard" size="small" value={editInputs.name} helperText={editInputs.nameError ? 'Ошибка' : ''} onChange={nameChange}/>
								</TableCell>
								<TableCell className="Forms__TableCell">
									<CustomEditField className="Forms__CodeEditInput" variant="standard" size="small" value={editInputs.code} helperText={editInputs.codeError ? 'Ошибка' : ''} onChange={codeChange}/>
								</TableCell>
								<TableCell className="Forms__TableCell">
									<CustomEditField className="Forms__YearEditInput" variant="standard" size="small" value={editInputs.year} helperText={editInputs.yearError ? 'Ошибка' : ''} onChange={yearChange}/>
								</TableCell>
								<TableCell className="Forms__ControlsCell">
									<IconButton className="Forms__ApplyButton" size="small" onClick={submitChangesClick}>
										<CheckIcon className="Forms__ApplyIcon"/>
									</IconButton>
									<IconButton className="Forms__CancelButton" size="small" onClick={closeEditFormClick}>
										<ClearIcon className="Forms__CancelIcon" />
									</IconButton>
								</TableCell>
							</TableRow>

							: (editMode && editTarget.number !== i) ? 

							<TableRow className='Forms__TableBodyRow_locked' key={i}>
								<TableCell className="Forms__SelectFormCell"></TableCell>
								<TableCell className="Forms__TableCell">{form.name}</TableCell>
								<TableCell className="Forms__TableCell">{form.code}</TableCell>
								<TableCell className="Forms__TableCell">{form.year}</TableCell>
								<TableCell className="Forms__ControlsCell"></TableCell>
							</TableRow>
							
							:

							<TableRow className='Forms__TableBodyRow' key={i}>
								<TableCell className="Forms__SelectFormCell">
									<AdjustIcon className="Forms__SelectIcon" />
								</TableCell>
								<TableCell className="Forms__TableCell">{form.name}</TableCell>
								<TableCell className="Forms__TableCell">{form.code}</TableCell>
								<TableCell className="Forms__TableCell">{form.year}</TableCell>
								<TableCell className="Forms__ControlsCell">
									<IconButton className="Forms__EditButton" size="small" onClick={() => editFormClick(i)}>
										<EditIcon className="Forms__EditIcon" />
									</IconButton>
									<IconButton className="Forms__RemoveButton" size="small" onClick={() => removeFormClick(i)}>
										<DeleteForeverIcon className="Forms__RemoveIcon" />
									</IconButton>
								</TableCell>
							</TableRow>

					})}

				</TableBody>
			</Table>
		</Box>
	</Fade>
}