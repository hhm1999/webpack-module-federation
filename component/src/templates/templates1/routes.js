import template1 from './template1';
import list from './list';

export default [
    {
        name: '模板1-列表',
        path: '/list',
        component: list,
    },
    {
        name: '模板1-首页',
        path: '(.*)',
        component: template1,
    },
];
