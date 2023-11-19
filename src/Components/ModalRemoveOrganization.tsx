import React from 'react';
import { Modal, Fade, Container, Box, Typography, Button } from '@mui/material';
import { useTypedSelector, useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceModal } from '../Redux/sliceModal';
import { sliceDatabase } from '../Redux/sliceDatabase';

export default function ModalRemoveOrganization() {

    const { visible, organizationName, organizationNumber } = useTypedSelector(state => state.sliceModal.modalRemoveOrganization);
	const { setModalVisibilityO } = sliceModal.actions;
	const { removeOrganization } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

    function removeOrganizationClick() {
        dispatch(setModalVisibilityO({visible: false}));
        dispatch(removeOrganization(organizationNumber));
    }

    function closeModalClick() {
		dispatch(setModalVisibilityO({visible: false}));
	}

	return <Modal className='Modal' open={visible}>
        <Fade in={visible}>
            <Container className='Modal__Container'>

                <Typography className='Modal__Message'>Вы уверены, что хотите удалить организацию "{organizationName}"?</Typography>

                <Box className='Modal__ButtonsWrapper'>
                    <Button className='Modal__Button' size='large' onClick={removeOrganizationClick}>удалить</Button>
                    <Button className='Modal__Button' size='large' onClick={closeModalClick}>отмена</Button>
                </Box>
            
            </Container>
        </Fade>
    </Modal>
}