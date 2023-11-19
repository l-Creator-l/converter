import { TDispatch, TRootReducer } from '../Types/reduxTypes';
import { IData } from '../Types/electronTypes';
import { IBridge } from '../renderer.d';
import { sliceConverter } from './sliceConverter'
import { sliceSettings } from './sliceSettings';

export const asyncTransferData = () => async (dispatch: TDispatch, getState: () => TRootReducer) => {
    
    const { setLoading, setResult, resultVisibilityChange } = sliceConverter.actions;

	const path = getState().sliceConverter.inputValue;
    const forms = getState().sliceDatabase.forms;
    const organizations = getState().sliceDatabase.organizations;
    const rules = getState().sliceDatabase.rules;
    const group = getState().sliceSettings.group;

    dispatch(resultVisibilityChange(false));
    dispatch(setLoading(true));

	const response = await window.bridge.transferData(<IData>{
        path,
        forms,
        organizations,
        rules,
        group
    });

    dispatch(setLoading(false));
    if ('success' in response || 'notFound' in response || 'error' in response) {
        dispatch(setResult(response));
        dispatch(resultVisibilityChange(true));
    }

};

export const asyncGetVersion = () => async (dispatch: TDispatch) => {

    const { setVersion } = sliceSettings.actions;

    const response = await window.bridge.getVersion();

    dispatch(setVersion(response));

}