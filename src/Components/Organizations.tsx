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
import { sliceEditOrganization } from '../Redux/sliceEditOrganization';
import { sliceModal } from '../Redux/sliceModal';
import { IOrganization, TSortOrganizationsBy } from '../Types/reduxTypes';

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

export default function Organizations() {

	const [organizations, sortOrganizationsBy, value, from, active, editMode, editTarget, editInputs] = useTypedSelector(state => [
        state.sliceDatabase.organizations,
        state.sliceDatabase.sortOrganizationsBy,
        state.sliceDatabase.sortOrganizationsBy.value,
        state.sliceDatabase.sortOrganizationsBy.from,
        state.sliceMenu.active,
        state.sliceEditOrganization.editMode,
		state.sliceEditOrganization.editTarget,
		state.sliceEditOrganization.editInputs
    ]);
	const { sortOrganizations } = sliceDatabase.actions;
	const { setEditOrganization, editName, editOKPOGood, editOKPOBad, closeEditOrganization } = sliceEditOrganization.actions;
	const { setModalVisibilityO } = sliceModal.actions;
    const { setOrganization, resetOrganization } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

	const { register, handleSubmit, setError, formState: { errors } } = useForm<IOrganization>({
		mode: "onBlur",
		defaultValues: {
			name: '',
			okpoGood: '',
			okpoBad: ''
		}
	});

    function inputChange() {
        setError('root', { type: 'custom', message: '' });
    }

	function onSubmit(data: IOrganization) {
		for (const organization of organizations) {
			if (organization.okpoGood === data.okpoGood) return setError('root', {type: 'custom', message: 'организация с такими ОКПО уже есть в таблице'});
		}

        const newOrganization = {
			name: data.name,
			okpoGood: data.okpoGood,
			okpoBad: data.okpoBad
        }

        dispatch(setOrganization(newOrganization));
        dispatch(sortOrganizations(sortOrganizationsBy));
        dispatch(closeEditOrganization());
	}

	function sortByNameClick(from:TSortOrganizationsBy['from']) {
		dispatch(sortOrganizations({value: 'name', from}));
        dispatch(closeEditOrganization());
	}

	function sortByOKPOGoodClick(from:TSortOrganizationsBy['from']) {
		dispatch(sortOrganizations({value: 'okpoGood', from}));
        dispatch(closeEditOrganization());
	}

	function sortByOKPOBadClick(from:TSortOrganizationsBy['from']) {
		dispatch(sortOrganizations({value: 'okpoBad', from}));
        dispatch(closeEditOrganization());
	}

    function editOrganizationClick(i: number) {
		editName(editTarget.name);
		editOKPOGood(editTarget.okpoGood);
		editOKPOBad(editTarget.okpoBad);
		dispatch(setEditOrganization(i));
	}

    function nameChange(event:React.ChangeEvent<HTMLInputElement>) {
		dispatch(editName(event.target.value));
	}

	function okpoGoodChange(event:React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 12) return;
		dispatch(editOKPOGood(event.target.value));
	}

	function okpoBadChange(event:React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length > 12) return;
		dispatch(editOKPOBad(event.target.value));
	}

    function submitChangesClick() {
        if (editInputs.nameError || editInputs.okpoGoodError || editInputs.okpoBadError) return;
		dispatch(resetOrganization({
            number: editTarget.number,
            name: editInputs.name,
            okpoGood: editInputs.okpoGood,
            okpoBad: editInputs.okpoBad
        }));
        dispatch(closeEditOrganization());
	}

    function closeEditOrganizationClick() {
		dispatch(closeEditOrganization());
	}

	function removeOrganizationClick(i:number) {
		const database = JSON.parse(localStorage.getItem('database'));
		const organizationName = database.organizations[i].name;
		dispatch(setModalVisibilityO({visible: true, organizationName, organizationNumber: i}));
	}

	return <Fade in={active === 'organizations'}>
		<Box className={`Organizations ${active === 'organizations' ? '' : 'hidden'}`}>

            <Typography className="Organizations__Header">Организации</Typography>

            <Typography className="Organizations__Description">Таблица содержит список соответствий ОКПО. В случае, если ОКПО в конвертируемых файлах отличается от ОКПО в ИАС "Здравоохранение", внесите оба кода в таблицу для сопоставления.</Typography>

			<Accordion className="Organizations__Accordion">

				<AccordionSummary className="Organizations__AccordionSummary" expandIcon={<ExpandMoreIcon className="Organizations__AccordionExpandIcon" />}>
					<Typography className="Organizations__AccordionHeader">Добавить организацию</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<form className="Organizations__NewOrganization" onSubmit={handleSubmit(onSubmit)}>

						<Box className="Organizations__InputContainer">
							<CustomTextField className="Organizations__Input" {...register('name', { required: 'Поле не заполнено' })} error={!!errors.name} helperText={errors.name?.message} size="small" label="Наименование организации" placeholder="Наименование организации" onChange={inputChange}/>
							<CustomTextField className="Organizations__Input" {...register('okpoGood', { required: 'Поле не заполнено', pattern: { value: /^\d{12}$/i, message: 'Код должен состоять из 12 цифр' } })} error={!!errors.okpoGood} helperText={errors.okpoGood?.message} inputProps={{ maxLength: 12 }} size="small" label="ОКПО ИАС" placeholder="ОКПО ИАС" onChange={inputChange}/>
							<CustomTextField className="Organizations__Input" {...register('okpoBad', { required: 'Поле не заполнено', pattern: { value: /^\d{12}$/, message: 'Код должен состоять из 12 цифр' } })} error={!!errors.okpoBad} helperText={errors.okpoBad?.message} inputProps={{ maxLength: 12 }} size="small" label="ОКПО xlsx" placeholder="ОКПО xlsx" onChange={inputChange}/>
						</Box>

                        <Typography className="Organizations__SubmitError">{errors.root?.message}</Typography>
						
						<Button className="Organizations__SaveOrganizationButton" type='submit' variant="outlined">Сохранить</Button>

					</form>
				</AccordionDetails>
				
			</Accordion>

			<Table className="Organizations__Table">
				<TableHead>
					<TableRow>

						<TableCell className="Organizations__TableHeaderCell"></TableCell>

						<TableCell className="Organizations__TableHeaderCell">
							<Box className="Organizations__TableHeaderWrapper">
								<Typography className='Organizations__TableHeaderText'>Наименование организации</Typography>
								<ArrowDropDownIcon className={`Organizations__SortMaxIcon ${(value === 'name' && from === 'max') ? 'active' : ''}`} onClick={() => sortByNameClick('max')}/>
								<ArrowDropUpIcon className={`Organizations__SortMinIcon ${(value === 'name' && from === 'min') ? 'active' : ''}`} onClick={() => sortByNameClick('min')}/>
							</Box>
						</TableCell>

						<TableCell className="Organizations__TableHeaderCell">
							<Box className="Organizations__TableHeaderWrapper">
								<Typography className='Organizations__TableHeaderText'>ОКПО ИАС</Typography>
								<ArrowDropDownIcon className={`Organizations__SortMaxIcon ${(value === 'okpoGood' && from === 'max') ? 'active' : ''}`} onClick={() => sortByOKPOGoodClick('max')}/>
								<ArrowDropUpIcon className={`Organizations__SortMinIcon ${(value === 'okpoGood' && from === 'min') ? 'active' : ''}`} onClick={() => sortByOKPOGoodClick('min')}/>
							</Box>
						</TableCell>

						<TableCell className="Organizations__TableHeaderCell">
							<Box className="Organizations__TableHeaderWrapper">
								<Typography className='Organizations__TableHeaderText'>ОКПО xlsx</Typography>
								<ArrowDropDownIcon className={`Organizations__SortMaxIcon ${(value === 'okpoBad' && from === 'max') ? 'active' : ''}`} onClick={() => sortByOKPOBadClick('max')}/>
								<ArrowDropUpIcon className={`Organizations__SortMinIcon ${(value === 'okpoBad' && from === 'min') ? 'active' : ''}`} onClick={() => sortByOKPOBadClick('min')}/>
							</Box>
						</TableCell>

						<TableCell className="Organizations__TableHeaderCell"></TableCell>

					</TableRow>
				</TableHead>
				<TableBody>
					{organizations.map((organization:IOrganization, i:number) => {
						return (editMode && editTarget.number === i) ?

                            <TableRow className='Organizations__TableBodyRow selectedBackground' key={i}>
                                <TableCell className="Organizations__SelectOrganizationCell">
                                    <AdjustIcon className={`Organizations__SelectIcon ${(editMode && editTarget.number === i) ? 'selectedIcon' : ''}`} />
                                </TableCell>
                                <TableCell className="Organizations__TableCell">
                                    <CustomEditField className="Organizations__NameEditInput" variant="standard" size="small" value={editInputs.name} helperText={editInputs.nameError ? 'Ошибка' : ''} onChange={nameChange}/>
                                </TableCell>
                                <TableCell className="Organizations__TableCell">
                                    <CustomEditField className="Organizations__OKPOGoodEditInput" variant="standard" size="small" value={editInputs.okpoGood} helperText={editInputs.okpoGoodError ? 'Ошибка' : ''} onChange={okpoGoodChange}/>
                                </TableCell>
                                <TableCell className="Organizations__TableCell">
                                    <CustomEditField className="Organizations__OKPOBadEditInput" variant="standard" size="small" value={editInputs.okpoBad} helperText={editInputs.okpoBadError ? 'Ошибка' : ''} onChange={okpoBadChange}/>
                                </TableCell>
                                <TableCell className="Organizations__ControlsCell">
                                    <IconButton className="Organizations__ApplyButton" size="small" onClick={submitChangesClick}>
                                        <CheckIcon className="Organizations__ApplyIcon"/>
                                    </IconButton>
                                    <IconButton className="Organizations__CancelButton" size="small" onClick={closeEditOrganizationClick}>
                                        <ClearIcon className="Organizations__CancelIcon" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>

                            : (editMode && editTarget.number !== i) ?

                            <TableRow className='Organizations__TableBodyRow_locked' key={i}>
								<TableCell className="Organizations__SelectOrganizationCell"></TableCell>
								<TableCell className="Organizations__TableCell">{organization.name}</TableCell>
								<TableCell className="Organizations__TableCell">{organization.okpoGood}</TableCell>
								<TableCell className="Organizations__TableCell">{organization.okpoBad}</TableCell>
								<TableCell className="Organizations__ControlsCell"></TableCell>
							</TableRow>

                            :

                            <TableRow className="Organizations__TableBodyRow" key={i}>
                                <TableCell className="Organizations__SelectOrganizationCell">
                                    <AdjustIcon className="Organizations__SelectIcon"/>
                                </TableCell>
                                <TableCell className="Organizations__TableCell">{organization.name}</TableCell>
                                <TableCell className="Organizations__TableCell">{organization.okpoGood}</TableCell>
                                <TableCell className="Organizations__TableCell">{organization.okpoBad}</TableCell>
                                <TableCell className="Organizations__ControlsCell">
                                    <IconButton className="Organizations__EditButton" size="small" onClick={() => editOrganizationClick(i)}>
										<EditIcon className="Organizations__EditIcon" />
									</IconButton>
                                    <IconButton className="Organizations__RemoveButton" size="small" onClick={() => removeOrganizationClick(i)}>
                                        <DeleteForeverIcon className="Organizations__RemoveIcon"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            
					})}
				</TableBody>
			</Table>
		</Box>
	</Fade>
}