import React, { useEffect } from 'react';
import { Container } from "@mui/material";
import { useTypedDispatch } from '../Hooks/reduxHooks';
import { sliceDatabase } from '../Redux/sliceDatabase';
import Menu from './Menu';
import Settings from './Settings';
import Converter from './Converter';
import Forms from './Forms';
import Organizations from './Organizations';
import Rules from './Rules';
import ModalRemoveForm from './ModalRemoveForm';
import ModalRemoveOrganization from './ModalRemoveOrganization';
import ModalRemoveCellRule from './ModalRemoveCellRule';
import ModalRemoveNumberRule from './ModalRemoveNumberRule';
import { IDatabase } from '../Types/reduxTypes';

export default function App() {

	const { setDatabse } = sliceDatabase.actions;
	const dispatch = useTypedDispatch();

	useEffect(() => {

		let database:IDatabase = JSON.parse(localStorage.getItem('database'));

        /* if (!database) {

			const importDB2022:IDatabase = {
                forms: [
                    { name: '1-аборты', year: '2022', code: '02134' },
                    { name: '1-дети', year: '2022', code: '02312' },
                    { name: '1-дом ребенка', year: '2022', code: '02413' },
                    { name: '1-заболеваемость', year: '2022', code: '02122' },
                    { name: '1-здрав', year: '2022', code: '40531' },
                    { name: '1-иппп', year: '2022', code: '02094' },
                    { name: '1-медкадры', year: '2022', code: '01176' },
                    { name: '1-медобеспечение ЧАЭС', year: '2022', code: '03154' },
                    { name: '1-наркология', year: '2022', code: '02118' },
                    { name: '1-организация', year: '2022', code: '0130C' },
                    { name: '1-помощь беременным', year: '2022', code: '02324' },
                    { name: '1-психиатрия', year: '2022', code: '02107' },
                    { name: '1-скорая помощь', year: '2022', code: '01405' },
                    { name: '1-ссз', year: '2022', code: '40540' },
                    { name: '1-стационар', year: '2022', code: '01147' },
                    { name: '4-нетрудоспособность', year: '2023', code: '02040' }
                ],
                    sortFormsBy: {
                        value: '',
                        from: ''
                    },
                    organizations: [],
                    sortOrganizationsBy: {
                        value: '',
                        from: ''
                    },
                    rules: {
                        removeCell: [{ form: { name: '', year: '', all: true }, radio: 'all', table: { number: '', from: '', to: '' }, regexp: { value: '^чел\\.|единиц|тысяч единиц$', iFlag: true } }],
                        editRowNumber: [
                            {
                                form: { name: '1-дети', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 1 },
                                    { tNumber: 3, firstRowNumber: 1 },
                                    { tNumber: 4, firstRowNumber: 1 },
                                    { tNumber: 5, firstRowNumber: 1 },
                                    { tNumber: 6, firstRowNumber: 1 },
                                    { tNumber: 7, firstRowNumber: 1 },
                                    { tNumber: 8, firstRowNumber: 1 },
                                    { tNumber: 9, firstRowNumber: 1 },
                                    { tNumber: 10, firstRowNumber: 1 }
                                ]
                            },
                            {
                                form: { name: '1-дом ребенка', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 20 },
                                    { tNumber: 3, firstRowNumber: 30 },
                                    { tNumber: 4, firstRowNumber: 35 },
                                    { tNumber: 5, firstRowNumber: 40 },
                                    { tNumber: 6, firstRowNumber: 50 },
                                    { tNumber: 7, firstRowNumber: 60 },
                                    { tNumber: 8, firstRowNumber: 70 },
                                    { tNumber: 9, firstRowNumber: 150 }
                                ]
                            },
                            {
                                form: { name: '1-здрав', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 80 },
                                    { tNumber: 4, firstRowNumber: 90 },
                                    { tNumber: 5, firstRowNumber: 100 },
                                    { tNumber: 7, firstRowNumber: 110 },
                                    { tNumber: 8, firstRowNumber: 121 },
                                    { tNumber: 9, firstRowNumber: 151 },
                                    { tNumber: 10, firstRowNumber: 166 },
                                    { tNumber: 11, firstRowNumber: 180 }
                                ]
                            },
                            {
                                form: { name: '1-иппп', year: '2022' },
                                tables: [
                                    { tNumber: 3, firstRowNumber: 50 },
                                    { tNumber: 7, firstRowNumber: 90 },
                                    { tNumber: 8, firstRowNumber: 92 }
                                ]
                            },
                            {
                                form: { name: '1-медкадры', year: '2022' },
                                tables: [
                                    { tNumber: 3, firstRowNumber: 120 },
                                    { tNumber: 4, firstRowNumber: 160 },
                                    { tNumber: 5, firstRowNumber: 170 },
                                    { tNumber: 6, firstRowNumber: 300 },
                                    { tNumber: 8, firstRowNumber: 400 },
                                ]
                            },
                            {
                                form: { name: '1-медобеспечение ЧАЭС', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 51 }
                                ]
                            },
                            {
                                form: { name: '1-организация', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 17 },
                                    { tNumber: 3, firstRowNumber: 30 },
                                    { tNumber: 5, firstRowNumber: 70 },
                                    { tNumber: 6, firstRowNumber: 105 },
                                    { tNumber: 8, firstRowNumber: 130 },
                                    { tNumber: 9, firstRowNumber: 150 },
                                    { tNumber: 10, firstRowNumber: 287 },
                                    { tNumber: 13, firstRowNumber: 310 },
                                    { tNumber: 14, firstRowNumber: 372 },
                                    { tNumber: 15, firstRowNumber: 390 },
                                    { tNumber: 16, firstRowNumber: 415 },
                                    { tNumber: 18, firstRowNumber: 430 },
                                    { tNumber: 19, firstRowNumber: 435 },
                                    { tNumber: 20, firstRowNumber: 450 },
                                    { tNumber: 22, firstRowNumber: 475 },
                                    { tNumber: 23, firstRowNumber: 485 },
                                    { tNumber: 24, firstRowNumber: 495 },
                                    { tNumber: 26, firstRowNumber: 505 },
                                    { tNumber: 28, firstRowNumber: 525 },
                                    { tNumber: 34, firstRowNumber: 580 },
                                    { tNumber: 35, firstRowNumber: 600 },
                                    { tNumber: 37, firstRowNumber: 620 },
                                    { tNumber: 38, firstRowNumber: 625 },
                                    { tNumber: 39, firstRowNumber: 650 },
                                    { tNumber: 40, firstRowNumber: 660 },
                                    { tNumber: 41, firstRowNumber: 680 }
                                ]
                            },
                            {
                                form: { name: '1-помощь беременным', year: '2022' },
                                tables: [
                                    { tNumber: 5, firstRowNumber: 25 },
                                    { tNumber: 7, firstRowNumber: 55 },
                                    { tNumber: 11, firstRowNumber: 100 },
                                    { tNumber: 12, firstRowNumber: 150 },
                                    { tNumber: 13, firstRowNumber: 200 },
                                    { tNumber: 15, firstRowNumber: 240 },
                                    { tNumber: 16, firstRowNumber: 260 },
                                    { tNumber: 17, firstRowNumber: 280 },
                                    { tNumber: 18, firstRowNumber: 300 },
                                    { tNumber: 19, firstRowNumber: 370 },
                                    { tNumber: 20, firstRowNumber: 430 },
                                    { tNumber: 21, firstRowNumber: 480 }
                                ]
                            },
                            {
                                form: { name: '1-ссз', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 40 },
                                    { tNumber: 3, firstRowNumber: 80 },
                                    { tNumber: 4, firstRowNumber: 120 },
                                    { tNumber: 5, firstRowNumber: 140 },
                                    { tNumber: 6, firstRowNumber: 200 },
                                    { tNumber: 7, firstRowNumber: 210 },
                                    { tNumber: 8, firstRowNumber: 220 },
                                    { tNumber: 9, firstRowNumber: 240 },
                                    { tNumber: 10, firstRowNumber: 260 },
                                    { tNumber: 11, firstRowNumber: 280 },
                                    { tNumber: 12, firstRowNumber: 290 },
                                    { tNumber: 13, firstRowNumber: 310 },
                                    { tNumber: 14, firstRowNumber: 350 },
                                    { tNumber: 15, firstRowNumber: 360 },
                                    { tNumber: 16, firstRowNumber: 380 },
                                    { tNumber: 17, firstRowNumber: 390 }
                                ]
                            },
                            {
                                form: { name: '1-стационар', year: '2022' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 130 },
                                    { tNumber: 7, firstRowNumber: 400 }
                                ]
                            }
                        ]
                    }
            }

            const importDB2023:IDatabase = {
                forms: [
                    { name: '1-аборты', year: '2023', code: '02134' },
                    { name: '1-дети', year: '2023', code: '02312' },
                    { name: '1-дом ребенка', year: '2023', code: '02414' },
                    { name: '1-заболеваемость', year: '2023', code: '02122' },
                    { name: '1-здрав', year: '2023', code: '40532' },
                    { name: '1-медкадры', year: '2023', code: '01177' },
                    { name: '1-медобеспечение ЧАЭС', year: '2023', code: '03154' },
                    { name: '1-наркология', year: '2023', code: '02118' },
                    { name: '1-организация', year: '2023', code: '0130D' },
                    { name: '1-помощь беременным', year: '2023', code: '02324' },
                    { name: '1-психиатрия', year: '2023', code: '02108' },
                    { name: '1-скорая помощь', year: '2023', code: '01405' },
                    { name: '1-ссз', year: '2023', code: '40540' },
                    { name: '1-стационар', year: '2023', code: '01148' },
                    { name: '4-нетрудоспособность', year: '2023', code: '02040' }
                ],
                    sortFormsBy: {
                        value: '',
                        from: ''
                    },
                    organizations: [
                        { name: 'Государственное учреждение "Республиканская туберкулезная больница "Сосновка"', okpoGood: '020137502000', okpoBad: '020137512000' },
                        { name: 'Учреждение здравоохранения "Кормянская центральная районная больница"', okpoGood: '020148543000', okpoBad: '020148073000' },
                        { name: 'Учреждение здравоохранения "Октябрьская центральная районная больница"', okpoGood: '020148663000', okpoBad: '020148683000' },
                        { name: 'Учреждение здравоохранения "Свислочская центральная районная больница"', okpoGood: '020153864000', okpoBad: '020153884000' },
                        { name: 'Учреждение здравоохранения "Брестская городская поликлиника №2"', okpoGood: '020180101000', okpoBad: '055618551000' },
                        { name: 'Коммунальное унитарное предприятие "Детский реабилитационно-оздоровительный центр "Жемчужина"', okpoGood: '301205522000', okpoBad: '147150912000' },
                        { name: 'Учреждение здравоохранения "Мозырская центральная городская поликлиника"', okpoGood: '020146093000', okpoBad: '201484533000' },
                        { name: 'Учреждение здравоохранения "Барановичская городская больница №2"', okpoGood: '011095031000', okpoBad: '288732891000' },
                        { name: 'Учреждение "Центр медицинской реабилитации для детей-инвалидов и молодых инвалидов с психоневрологическими заболеваниями "Радуга"', okpoGood: '020146093016', okpoBad: '288951393000' },
                        { name: 'Учреждение "Мозырская городская стоматологическая поликлиника"', okpoGood: '020146093007', okpoBad: '291242433000' },
                        { name: 'Учреждение "Мозырский городской родильный дом"', okpoGood: '020146093009', okpoBad: '291242553000' },
                        { name: 'Учреждение "Гомельский областной центр профилактической дезинфекции"', okpoGood: '020146733001', okpoBad: '291593423000' },
                        { name: 'Коммунальное унитарное предприятие «Мозырская городская поликлиника №4»', okpoGood: '020146093008', okpoBad: '292594923000' },
                        { name: 'Учреждение здравоохранения "Витебский областной клинический центр психиатрии и наркологии"', okpoGood: '020145832001', okpoBad: '299691532000' },
                        { name: 'Учреждение здравоохранения "Бобруйская станция скорой и неотложной медицинской помощи"', okpoGood: '020166567003', okpoBad: '302810547000' },
                        { name: 'Учреждение здравоохранения "Могилёвская областная больница медицинской реабилитации"', okpoGood: '291213077000', okpoBad: '304479227000' },
                        { name: 'Учреждение здравоохранения "Борисовский родильный дом"', okpoGood: '020165256003', okpoBad: '304608746000' },
                        { name: 'Учреждение здравоохранения "Хойникская центральная районная больница"', okpoGood: '020149113000', okpoBad: '373662463000' },
                        { name: 'Государственное учреждение "Республиканский научно-практический центр спорта"', okpoGood: '055649995000', okpoBad: '381963885000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №3"', okpoGood: '292642057003', okpoBad: '500418087000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №7"', okpoGood: '292642057007', okpoBad: '500418147000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №2"', okpoGood: '292642057002', okpoBad: '500418207000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №10"', okpoGood: '292642057010', okpoBad: '500418517000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №12"', okpoGood: '292642057012', okpoBad: '500418667000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №9"', okpoGood: '292642057009', okpoBad: '500418727000' },
                        { name: 'Учреждение здравоохранения "Могилёвская детская поликлиника №1"', okpoGood: '293013517001', okpoBad: '500418897000' },
                        { name: 'Учреждение здравоохранения "Могилёвская детская поликлиника №4"', okpoGood: '293013517003', okpoBad: '500424987000' },
                        { name: 'Учреждение здравоохранения "Могилёвская детская поликлиника №2"', okpoGood: '293013517002', okpoBad: '500425067000' },
                        { name: 'Учреждение здравоохранения "Могилёвская детская стоматологическая поликлиника"', okpoGood: '292641977002', okpoBad: '500425127000' },
                        { name: 'Учреждение здравоохранения "Могилёвская стоматологическая поликлиника №2"', okpoGood: '292641977001', okpoBad: '500425297000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №6"', okpoGood: '293014787006', okpoBad: '500425357000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №4"', okpoGood: '293014787004', okpoBad: '500425410000' },
                        { name: 'Учреждение здравоохранения "Могилёвская поликлиника №5"', okpoGood: '293014787005', okpoBad: '500425587000' },
                        { name: 'Учреждение здравоохранения "Брестская городская детская поликлиника №2"', okpoGood: '019962661001', okpoBad: '504173951000' },
                        { name: 'Государственное учреждение здравоохранения "Гомельская городская клиническая поликлиника №10"', okpoGood: '291363063010', okpoBad: '505803333000' },
                        { name: 'Государственное учреждение здравоохранения "Гомельская городская клиническая поликлиника №11"', okpoGood: '291363063011', okpoBad: '505803453000' },
                        { name: 'Государственное учреждение здравоохранения "Гомельская городская клиническая поликлиника №3"', okpoGood: '291363063003', okpoBad: '505802383000' },
                        { name: 'Учреждение здравоохранения "Витебский областной эндокринологический диспансер"', okpoGood: '020178032002', okpoBad: '055626882000' },
                        { name: 'Учреждение здравоохранения "Мозырская центральная городская поликлиника"', okpoGood: '020146093000', okpoBad: '020148453000' },
                        { name: 'Учреждение здравоохранения "Брестский областной противотуберкулезный диспансер"', okpoGood: '055616331000', okpoBad: '055616311000' },
                        { name: 'Учреждение здравоохранения "2-я городская клиническая больница"', okpoGood: '367000255000', okpoBad: '376000255000' },
                        { name: 'Государственное учреждение здравоохранения "Гомельская городская клиническая поликлиника №4"', okpoGood: '291363063004', okpoBad: '505802443000' },
                        { name: 'Государственное учреждение здравоохранения "Гомельская городская клиническая поликлиника №9"', okpoGood: '291363063009', okpoBad: '505803273000' },
                        { name: 'Государственное учреждение здравоохранения "Гомельская городская клиническая поликлиника №8"', okpoGood: '291363063008', okpoBad: '505803793000' }
                    ],
                    sortOrganizationsBy: {
                        value: '',
                        from: ''
                    },
                    rules: {
                        removeCell: [{ form: { name: '', year: '', all: true }, radio: 'all', table: { number: '', from: '', to: '' }, regexp: { value: '^чел\\.|единиц|тысяч единиц$', iFlag: true } }],
                        editRowNumber: [
                            {
                                form: { name: '1-дети', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 1 },
                                    { tNumber: 3, firstRowNumber: 1 },
                                    { tNumber: 4, firstRowNumber: 1 },
                                    { tNumber: 5, firstRowNumber: 1 },
                                    { tNumber: 6, firstRowNumber: 1 },
                                    { tNumber: 7, firstRowNumber: 1 },
                                    { tNumber: 8, firstRowNumber: 1 },
                                    { tNumber: 9, firstRowNumber: 1 },
                                    { tNumber: 10, firstRowNumber: 1 }
                                ]
                            },
                            {
                                form: { name: '1-дом ребенка', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 20 },
                                    { tNumber: 3, firstRowNumber: 30 },
                                    { tNumber: 4, firstRowNumber: 35 },
                                    { tNumber: 5, firstRowNumber: 40 },
                                    { tNumber: 6, firstRowNumber: 60 },
                                    { tNumber: 7, firstRowNumber: 70 },
                                    { tNumber: 8, firstRowNumber: 150 }
                                ]
                            },
                            {
                                form: { name: '1-заболеваемость', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 301 },
                                    { tNumber: 3, firstRowNumber: 333 },
                                    { tNumber: 4, firstRowNumber: 350 },
                                    { tNumber: 8, firstRowNumber: 390 }
                                ]
                            },
                            {
                                form: { name: '1-здрав', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 300 },
                                    { tNumber: 3, firstRowNumber: 82 },
                                    { tNumber: 4, firstRowNumber: 90 },
                                    { tNumber: 5, firstRowNumber: 100 },
                                    { tNumber: 7, firstRowNumber: 110 },
                                    { tNumber: 8, firstRowNumber: 121 },
                                    { tNumber: 9, firstRowNumber: 151 },
                                    { tNumber: 10, firstRowNumber: 166 },
                                    { tNumber: 11, firstRowNumber: 180 }
                                ]
                            },
                            {
                                form: { name: '1-медкадры', year: '2023' },
                                tables: [
                                    { tNumber: 3, firstRowNumber: 120 },
                                    { tNumber: 4, firstRowNumber: 160 },
                                    { tNumber: 5, firstRowNumber: 170 },
                                    { tNumber: 6, firstRowNumber: 300 },
                                    { tNumber: 8, firstRowNumber: 400 },
                                ]
                            },
                            {
                                form: { name: '1-медобеспечение ЧАЭС', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 51 }
                                ]
                            },
                            {
                                form: { name: '1-организация', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 17 },
                                    { tNumber: 3, firstRowNumber: 30 },
                                    { tNumber: 5, firstRowNumber: 70 },
                                    { tNumber: 6, firstRowNumber: 105 },
                                    { tNumber: 8, firstRowNumber: 130 },
                                    { tNumber: 9, firstRowNumber: 150 },
                                    { tNumber: 10, firstRowNumber: 287 },
                                    { tNumber: 13, firstRowNumber: 310 },
                                    { tNumber: 14, firstRowNumber: 372 },
                                    { tNumber: 15, firstRowNumber: 390 },
                                    { tNumber: 16, firstRowNumber: 415 },
                                    { tNumber: 17, firstRowNumber: 420 },
                                    { tNumber: 18, firstRowNumber: 430 },
                                    { tNumber: 19, firstRowNumber: 435 },
                                    { tNumber: 20, firstRowNumber: 450 },
                                    { tNumber: 22, firstRowNumber: 475 },
                                    { tNumber: 23, firstRowNumber: 485 },
                                    { tNumber: 24, firstRowNumber: 495 },
                                    { tNumber: 26, firstRowNumber: 505 },
                                    { tNumber: 28, firstRowNumber: 525 },
                                    { tNumber: 34, firstRowNumber: 580 },
                                    { tNumber: 35, firstRowNumber: 600 },
                                    { tNumber: 37, firstRowNumber: 620 },
                                    { tNumber: 38, firstRowNumber: 625 },
                                    { tNumber: 39, firstRowNumber: 650 },
                                    { tNumber: 40, firstRowNumber: 660 },
                                    { tNumber: 41, firstRowNumber: 680 }
                                ]
                            },
                            {
                                form: { name: '1-помощь беременным', year: '2023' },
                                tables: [
                                    { tNumber: 5, firstRowNumber: 25 },
                                    { tNumber: 7, firstRowNumber: 55 },
                                    { tNumber: 11, firstRowNumber: 100 },
                                    { tNumber: 12, firstRowNumber: 150 },
                                    { tNumber: 13, firstRowNumber: 200 },
                                    { tNumber: 15, firstRowNumber: 240 },
                                    { tNumber: 16, firstRowNumber: 260 },
                                    { tNumber: 17, firstRowNumber: 280 },
                                    { tNumber: 18, firstRowNumber: 300 },
                                    { tNumber: 19, firstRowNumber: 370 },
                                    { tNumber: 20, firstRowNumber: 430 },
                                    { tNumber: 21, firstRowNumber: 480 }
                                ]
                            },
                            {
                                form: { name: '1-психиатрия', year: '2023' },
                                tables: [
                                    { tNumber: 5, firstRowNumber: 101 },
                                    { tNumber: 7, firstRowNumber: 157 }
                                ]
                            },
                            {
                                form: { name: '1-ссз', year: '2023' },
                                tables: [
                                    { tNumber: 3, firstRowNumber: 80 },
                                    { tNumber: 4, firstRowNumber: 120 },
                                    { tNumber: 5, firstRowNumber: 140 },
                                    { tNumber: 6, firstRowNumber: 200 },
                                    { tNumber: 7, firstRowNumber: 210 },
                                    { tNumber: 8, firstRowNumber: 220 },
                                    { tNumber: 9, firstRowNumber: 240 },
                                    { tNumber: 10, firstRowNumber: 260 },
                                    { tNumber: 11, firstRowNumber: 280 },
                                    { tNumber: 12, firstRowNumber: 290 },
                                    { tNumber: 13, firstRowNumber: 310 },
                                    { tNumber: 14, firstRowNumber: 350 },
                                    { tNumber: 15, firstRowNumber: 360 },
                                    { tNumber: 16, firstRowNumber: 380 },
                                    { tNumber: 17, firstRowNumber: 390 }
                                ]
                            },
                            {
                                form: { name: '1-стационар', year: '2023' },
                                tables: [
                                    { tNumber: 2, firstRowNumber: 130 },
                                    { tNumber: 7, firstRowNumber: 400 }
                                ]
                            }
                        ]
                    }
            }

			localStorage.setItem('database', JSON.stringify(importDB2023));
			database = importDB2023;

		} */

		if (!database) {

			const initialDatabase:IDatabase = {
				forms: [],
				sortFormsBy: {
					value: '',
					from: ''
				},
				organizations: [],
                sortOrganizationsBy: {
					value: '',
					from: ''
				},
                rules: {
                    removeCell: [],
                    editRowNumber: []
                }
			}

			localStorage.setItem('database', JSON.stringify(initialDatabase));
			database = initialDatabase;

		}

		dispatch(setDatabse(database));

	}, []);

	return (
		<Container className="App">
			<Container className='Container'>
				<Menu />
				<Converter />
				<Forms />
                <Organizations />
                <Rules />
                <Settings />
				<ModalRemoveForm />
                <ModalRemoveOrganization />
                <ModalRemoveCellRule />
                <ModalRemoveNumberRule />
			</Container>
		</Container>
	)

}