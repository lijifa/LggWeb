export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/questiontype' },
      // {
      //   path: '/home',
      //   name: 'home',
      //   icon: 'home',
      //   component: './Home/index',
      // },
      {
        path: '/questiontype',
        name: 'questiontype',
        icon: 'question-circle',
        component: './Questiontype/index',
      },
      {
        path: '/question',
        name: 'question',
        icon: 'ordered-list',
        component: './Question/index',
      },
      {
        path: '/answer',
        name: 'answer',
        icon: 'radar-chart',
        component: './Answer/index',
      },
      {
        path: '/scorerule',
        name: 'scorerule',
        icon: 'setting',
        component: './Scorerule/index',
      },
      {
        path: '/trade',
        name: 'trade',
        icon: 'solution',
        component: './Trade/index',
      },
      {
        path: '/paytrade',
        name: 'paytrade',
        icon: 'shop',
        component: './Paytrade/index',
      },
      {
        path: '/vip',
        name: 'vip',
        icon: 'user',
        component: './Vip/index',
      },
      {
        path: '/oper',
        name: 'oper',
        icon: 'key',
        component: './Oper/index',
      },
      {
        component: '404',
      },
    ],
  },
];
