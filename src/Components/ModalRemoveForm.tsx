import React from 'react';
import { Modal, Fade, Container, Box, Typography, Button } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceModal } from '../Redux/sliceModal';
import { sliceDatabase } from '../Redux/sliceDatabase';

export default function ModalRemoveForm() {

    const { visible, formName, formNumber } = useTypedSelector(state => state.sliceModal.modalRemoveForm);
	const { setModalVisibilityF } = sliceModal.actions;
	const { removeForm } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

    function removeFormClick() {
        dispatch(setModalVisibilityF({visible: false}));
        dispatch(removeForm(formNumber));
    }

    function closeModalClick() {
		dispatch(setModalVisibilityF({visible: false}));
	}

	return <Modal className='Modal' open={visible}>
        <Fade in={visible}>
            <Container className='Modal__Container'>

                <Typography className='Modal__Message'>Вы уверены, что хотите удалить форму "{formName}"?</Typography>

                <Box className='Modal__ButtonsWrapper'>
                    <Button className='Modal__Button' size='large' onClick={removeFormClick}>удалить</Button>
                    <Button className='Modal__Button' size='large' onClick={closeModalClick}>отмена</Button>
                </Box>
            
            </Container>
        </Fade>
    </Modal>
}