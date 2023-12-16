import React from 'react';
import { Modal, Fade, Container, Box, Typography, Button } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceModal } from '../Redux/sliceModal';
import { sliceDatabase } from '../Redux/sliceDatabase';

export default function ModalRemoveNumberRule() {

    const { visible, ruleNumber } = useTypedSelector(state => state.sliceModal.modalRemoveNumberRule);
	const { setModalVisibilityEd } = sliceModal.actions;
	const { removeEdRowNumberRule } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

    function removeRuleClick() {
        dispatch(setModalVisibilityEd({visible: false}));
        dispatch(removeEdRowNumberRule(ruleNumber));
    }

    function closeModalClick() {
		dispatch(setModalVisibilityEd({visible: false}));
	}

	return <Modal className='Modal' open={visible}>
        <Fade in={visible}>
            <Container className='Modal__Container'>

                <Typography className='Modal__Message'>Вы уверены, что хотите удалить правило №{ruleNumber + 1} для изменения нумерации строк в таблицах?</Typography>

                <Box className='Modal__ButtonsWrapper'>
                    <Button className='Modal__Button' size='large' onClick={removeRuleClick}>удалить</Button>
                    <Button className='Modal__Button' size='large' onClick={closeModalClick}>отмена</Button>
                </Box>
            
            </Container>
        </Fade>
    </Modal>
}