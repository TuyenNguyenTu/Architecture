import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home';
import Category from '../page/Category';
import CategoryDetail from '../page/CategoryDetail';
Vue.use(Router)
let router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        }, {
            path: '/category',
            name: 'category',
            component: Category
        },
        {
            path: '/category/:id',
            component: CategoryDetail,
            name: 'CategoryDetail',
            props: true
        }
    ]
})
export default router;