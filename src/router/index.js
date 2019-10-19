import Home from '@/components/Home';
import Login from '@/components/Login'
import Index from '@/components/views/Index'
import User from '@/components/views/console/User'
import Role from '@/components/views/console/Role'
import Permission from '@/components/views/console/Permission'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
        { path: '/index', component: Index, name: '首页' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '系统管理',
    iconCls: 'el-icon-menu',
    children: [
        { path: '/user', component: User, name: '用户管理' },
        { path: '/role', component: Role, name: '角色管理' },
        { path: '/permission', component: Permission, name: '权限管理' }
    ]
  }
];

export default routes;
