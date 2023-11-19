import React from 'react';
import { Modal, Fade, Container, Box, Typography, Button } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceModal } from '../Redux/sliceModal';
import { sliceDatabase } from '../Redux/sliceDatabase';

export default function ModalRemoveRmCellRule() {

    const { visible, ruleNumber } = useTypedSelector(state => state.sliceModal.modalRemoveRmCellRule);
	const { setModalVisibilityRm } = sliceModal.actions;
	const { removeRmCellRule } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

    function removeRmCellRuleClick() {
        dispatch(setModalVisibilityRm({visible: false}));
        dispatch(removeRmCellRule(ruleNumber));
    }

    function closeModalClick() {
		dispatch(setModalVisibilityRm({visible: false}));
	}

	return <Modal className='Modal' open={visible}>
        <Fade in={visible}>
            <Container className='Modal__Container'>

                <Typography className='Modal__Message'>Вы уверены, что хотите удалить правило №{ruleNumber + 1}?</Typography>

                <Box className='Modal__ButtonsWrapper'>
                    <Button className='Modal__Button' size='large' onClick={removeRmCellRuleClick}>удалить</Button>
                    <Button className='Modal__Button' size='large' onClick={closeModalClick}>отмена</Button>
                </Box>
            
            </Container>
        </Fade>
    </Modal>
}