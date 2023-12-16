import React from 'react';
import { Modal, Fade, Container, Box, Typography, Button } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceModal } from '../Redux/sliceModal';
import { sliceDatabase } from '../Redux/sliceDatabase';

export default function ModalRemoveCellRule() {

    const { visible, ruleNumber } = useTypedSelector(state => state.sliceModal.modalRemoveCell);
	const { setModalVisibilityRm } = sliceModal.actions;
	const { removeRmCellRule } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

    function removeRuleClick() {
        dispatch(setModalVisibilityRm({visible: false}));
        dispatch(removeRmCellRule(ruleNumber));
    }

    function closeModalClick() {
		dispatch(setModalVisibilityRm({visible: false}));
	}

	return <Modal className='Modal' open={visible}>
        <Fade in={visible}>
            <Container className='Modal__Container'>

                <Typography className='Modal__Message'>Вы уверены, что хотите удалить правило №{ruleNumber + 1} для удаления ячеек нестандартных таблиц?</Typography>

                <Box className='Modal__ButtonsWrapper'>
                    <Button className='Modal__Button' size='large' onClick={removeRuleClick}>удалить</Button>
                    <Button className='Modal__Button' size='large' onClick={closeModalClick}>отмена</Button>
                </Box>
            
            </Container>
        </Fade>
    </Modal>
}