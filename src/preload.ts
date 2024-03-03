import { IData } from './Types/electronTypes';
import { contextBridge, ipcRenderer } from 'electron';

const bridge = {
	transferData: (data: IData) => ipcRenderer.invoke('transferData', data),
    getVersion: () => ipcRenderer.invoke('getVersion')
}

contextBridge.exposeInMainWorld('bridge', bridge);