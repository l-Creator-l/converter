import React, { useState } from 'react';
import { Fade, Box, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormHelperText, RadioGroup, FormControlLabel, Radio, TextField, Checkbox, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Button, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdjustIcon from '@mui/icons-material/Adjust';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceDatabase } from '../Redux/sliceDatabase';
import { sliceModal } from '../Redux/sliceModal';
import { TRmCellRule } from '../Types/reduxTypes';

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

export default function Rules() {

    const [selectFormError, setSelectFormError] = useState(true);

	const [active, forms, rmCellRules] = useTypedSelector(state => [
        state.sliceMenu.active,
        state.sliceDatabase.forms,
        state.sliceDatabase.rules.rmCellRules
    ]);

    const { setRmCellRule } = sliceDatabase.actions;
    const { setModalVisibilityRm } = sliceModal.actions;
	const dispatch = useTypedDispatch();

	const { register, handleSubmit, control, watch, formState: { errors } } = useForm<TRmCellRule>({
		mode: "onBlur",
		defaultValues: {
			formNumber: '',
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

	function onSubmit(data:TRmCellRule) {
		dispatch(setRmCellRule({
            formNumber: Number(data.formNumber),
            radio: data.radio,
            table: {
                number: Number(data.table.number),
                from: Number(data.table.from),
                to: Number(data.table.to)
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

    function removeRmCellRuleClick(i:number) {
		dispatch(setModalVisibilityRm({ visible: true, ruleNumber: i }));
    }

	return <Fade in={active === 'rules'}>
		<Box className={`Rules ${active === 'rules' ? '' : 'hidden'}`}>

            <Typography className="Rules__Header">Правила</Typography>

            <Typography className="Rules__Description">При помощи правил можно модифицировать стандартную логику конвертера по преобразованию форм</Typography>

            <Divider className="Rules__DividerTop"/>

            <Typography className="Rules__RmCellDescription">Удаление ячеек нестандартных таблиц</Typography>

			<Accordion className="Rules__Accordion">

				<AccordionSummary className="Rules__AccordionSummary" expandIcon={<ExpandMoreIcon className="Rules__AccordionExpandIcon" />}>
					<Typography className="Rules__AccordionHeader">Добавить правило</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<form className="Rules__NewRmCellRule" onSubmit={handleSubmit(onSubmit)}>

                        <Box className="Rules__InputContainer Rules__InputContainer-size1">

                            <Typography className="Rules__InputDescription">Для формы:</Typography>
                            
                            <CustomSelect className="Rules__Select" variant="standard" disableUnderline {...register('formNumber', { required: 'Форма не выбрана' } )} error={!!errors.formNumber} onChange={selectForm}
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
                                {forms.map((form, i) => <MenuItem className="Rules__Option" value={i} key={`rmCellRule-select-${form.name}-№-${i}`}>{form.name} ({form.year})</MenuItem>)}
                            </CustomSelect>

                            {selectFormError ? <FormHelperText className='Rules__ErrorMessage'>{errors.formNumber?.message}</FormHelperText> : ''}

                        </Box>

                        <Box className="Rules__InputContainer Rules__InputContainer-size2">

                            <Typography className="Rules__InputDescription">Применить правило к таблицам:</Typography>

                            <Controller control={control} name="radio" render={({ field }) => (
                                <RadioGroup className="Rules__RadioGroup" row {...field}>
                                    <FormControlLabel className="Rules__RadioLabel" value="one" control={<Radio className="Rules__Radio"/>} label="К одной таблице"/>
                                    <FormControlLabel className="Rules__RadioLabel" value="range" control={<Radio className="Rules__Radio"/>} label="К диапазону таблиц"/>
                                    <FormControlLabel className="Rules__RadioLabel" value="all" control={<Radio className="Rules__Radio"/>} label="Ко всем таблицам"/>
                                </RadioGroup>
                            )}/>

                            {
                                (radio === 'one') ? 
                                <CustomTextField className="Rules__InputTable" size="small" label="Номер таблицы" placeholder="Номер таблицы" {...register('table.number', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, min: { value: 1, message: 'Номер таблицы должен быть больше 0' } })} helperText={errors.table?.number?.message} inputProps={{ maxLength: 3 }}/> :
                                (radio === 'range') ? 
                                <Box>
                                    <CustomTextField className="Rules__InputTable" size="small" label="Начальный номер" placeholder="Начальный номер" {...register('table.from', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, min: { value: 1, message: 'Конечный номер должен быть больше 0' } })} helperText={errors.table?.from?.message} inputProps={{ maxLength: 3 }}/>
                                    <Typography className="Rules__InputRadioDash">-</Typography>
                                    <CustomTextField className="Rules__InputTable" size="small" label="Конечный номер" placeholder="Конечный номер" {...register('table.to', { required: 'Поле не заполнено', pattern: { value: /^\d+$/, message: 'Номер таблицы может включать только цифры' }, validate: (value, formValues) => Number(value) > Number(formValues.table.from) || 'Конечный номер должен быть больше начального' })} helperText={errors.table?.to?.message} inputProps={{ maxLength: 3 }}/>
                                </Box> :
                                ''
                            }

                        </Box>

                        <Box className="Rules__InputContainer">

                            <Typography className="Rules__InputDescription">Удалить ячейки по совпадению с регулярным выражением:</Typography>

                            <Box className="Rules__InputRegexpContainer">
                                <Typography className="Rules__InputRegexpSlash">/</Typography>
                                <CustomTextField className="Rules__Input" {...register('regexp.value', { required: 'Поле не заполнено' })} helperText={errors.regexp?.value.message} size="small" label="Регулярное выражение" placeholder="Регулярное выражение" />
                                <Typography className="Rules__InputRegexpSlash">/</Typography>
                                <FormControlLabel className="Rules__CheckboxLabel" labelPlacement="start" label="i" control={
                                    <Checkbox {...register('regexp.iFlag')} sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 25, color: 'white' }
                                    }}/>
                                } sx={{
                                    '& .MuiFormControlLabel-label': { fontSize: 20, userSelect: 'none' }
                                }}/>
                            </Box>

                        </Box>

                        <Button className="Rules__SaveRuleButton" type='submit' variant="outlined">Сохранить</Button>
					</form>

				</AccordionDetails>
				
			</Accordion>

            <List className='Rules_rmCellRuleList'>                   
            {rmCellRules.map((rule:TRmCellRule, i) => 
                <ListItem className='Rules_rmCellRuleListItem' key={`rmCellRule-for-${forms[rule.formNumber as number].name}-№-${i}`}>
                    <ListItemIcon>
                        <AdjustIcon className='Rules__SelectIcon'/>
                    </ListItemIcon>
                    <ListItemText>
                        {i + 1}. Для формы {<Typography className='Rules__rmCellRuleSpan'>{forms[rule.formNumber as number].name} ({forms[rule.formNumber as number].year})</Typography>}
                        &nbsp;удалить ячейки {rule.radio === 'one' ? <Typography className='Rules__rmCellRuleSpan'>таблицы {rule.table.number}</Typography> : rule.radio === 'range' ? <Typography className='Rules__rmCellRuleSpan'>таблиц с {rule.table.from} по {rule.table.to}</Typography> : <Typography className='Rules__rmCellRuleSpan'>всех таблиц</Typography>}
                        &nbsp;по совпадению с регулярным выражением {<Typography className='Rules__rmCellRuleSpan'>/{rule.regexp.value}/{rule.regexp.iFlag ? 'i' : ''}</Typography>}
                    </ListItemText>
                    <IconButton className="Rules__RemoveButton" size="small" onClick={() => removeRmCellRuleClick(i)}>
                        <DeleteForeverIcon className="Rules__RemoveIcon"/>
                    </IconButton>
                </ListItem>
            )}
            </List>
            
            <Divider className="Rules__DividerBottom"/>
            
		</Box>
	</Fade>
}