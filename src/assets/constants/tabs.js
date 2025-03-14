import { Tab } from '../types';

export const tabs = [
    {
        label: 'параметры',
        name: Tab.PARAMS,
        disabled: true
    },
    {
        label: 'вопросы',
        name: Tab.QUESTIONS,
    },
    {
        label: 'логика',
        name: Tab.RELATIONS,
    },
    {
        label: 'условия',
        name: Tab.CONDITIONS,
        disabled: true
    },
    {
        label: 'респонденты',
        name: Tab.RESPONDENTS,
        disabled: true
    },
]