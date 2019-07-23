import {loginFn, logout, getUserInfo, getUserMenue} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import Layout from '@/views/layout/Layout'
import {constantRouterMap} from '@/router'
import Cookies from 'js-cookie'

// 将数组中的对象的某个属性提取为一个数组
function filterPro(arr, proName) {
    let result = [];
    arr.forEach((item, idx) => {
        result.push(item[proName])
    })
    return result;
}

let aa = [
    // 队伍管理
    {
        "id": 1,
        "path": "/teamManage",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "队伍管理",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "队伍管理",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "list", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/teamManage/list", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "teamList",     // children中的name：取我定义的
                "title": "队伍管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            }, {
                "id": 5,
                "path": "manage",
                "component": "views/teamManage/manage",
                "name": "teamManage",
                "title": "队伍新增/维护",
                "icon": null,
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍新增/维护",
                    "icon": "ios-basket-outline",
                    "hideInMenu": true
                },
                "url": "",
                "hideInMenu": true
            }]
    },

    // 队伍看板
    {
        "id": 2,
        "path": "/teamOverview",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "队伍看板",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "队伍看板",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "teamOverview", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/teamOverview/teamOverview", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "teamOverview",     // children中的name：取我定义的
                "title": "队伍管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "队伍看板",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false
                },
                "url": "",
                "hideInMenu": false
            }]
    },

    // 生成报告
    {
        "id": 3,
        "path": "/report",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "生成报告",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "生成报告",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "report", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/report/report", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "report",     // children中的name：取我定义的
                "title": "生成报告",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "生成报告",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false
                },
                "url": "",
                "hideInMenu": false
            }]
    },

    {
        "id": 4,
        "path": "/trainingAndSummary",  // 第一级菜单前面有斜杠： /
        "component": "Layout",
        "name": "",  // 可有可无，我用不到*****
        "title": "训练和总结",  // 可有可无，我用不到*****
        "icon": "ios-color-wand",
        "parentId": 0,
        "enabled": 1,
        "roles": null,
        "meta": {
            "access": null,
            "title": "训练和总结",        //  title取我定义的
            "icon": "ios-color-wand",
            "hideInMenu": false
        },
        "url": "",
        "hideInMenu": false,
        "children": [
            {
                "id": 3,
                "path": "yearTraining", // children中的path：取我定义的（子菜单path前不加斜杠： /）
                "component": "views/trainingAndSummary/yearTraining/yearTraining", // children中的component：取我定义的，最前面不加斜杠： /
                "name": "yearTraining",     // children中的name：取我定义的
                "title": "年训练管理",      // 可有可无*****
                "icon": "ios-basket-outline",
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "年训练管理",    // children中的title：取我定义的
                    "icon": "ios-basket-outline",
                    "hideInMenu": false,
                    "noCache": true     // 这个是新加的字段！！！！！！！！！！！！
                },
                "url": "",
                "hideInMenu": false
            }, {
                "id": 5,
                "path": "monthTraining",
                "component": "views/trainingAndSummary/monthTraining/monthTraining",
                "name": "monthTraining",
                "title": "月训练管理",
                "icon": null,
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "月训练管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false
                },
                "url": "",
                "hideInMenu": false
            }, {
                "id": 6,
                "path": "weekTraining",
                "component": "views/trainingAndSummary/weekTraining/weekTraining",
                "name": "weekTraining",
                "title": "周训练管理",
                "icon": null,
                "parentId": 1,
                "enabled": 1,
                "children": null,
                "roles": null,
                "meta": {
                    "access": null,
                    "title": "周训练管理",
                    "icon": "ios-basket-outline",
                    "hideInMenu": false
                },
                "url": "",
                "hideInMenu": false
            }]
    },
]


// 遍历路由，重组字段(接口可以调通的时候启用)
function reformRouters(routersList) {
    let arr = [];
    routersList.forEach((item, idx) => {
        arr.push(eachRouter(item))
    })
    return arr;
}

// 递归每一项路由
function eachRouter(route) {
    let obj = {};
    if (route.children && route.children.length > 0) {
        obj.path = route.path;
        // obj.alwaysShow = true;  // 始终显示根目录(只有一个子菜单)
        obj.component = () => import('@/views/layout/Layout');
        obj.meta = {
            title: route.meta.title,
            icon: route.meta.icon,
        };
        let arr = [];
        route.children.forEach((item, idx) => {
            arr.push(eachRouter(item))
        })
        obj.children = arr;
    } else {
        obj.path = route.path;
        obj.name = route.name;
        obj.component = () => import(`@/${route.component}`);
        obj.hidden = route.meta.hideInMenu;
        obj.meta = {
            title: route.meta.title,
            icon: route.meta.icon,
            hidden: route.meta.hideInMenu,
            noCache: route.meta.noCache
        }
    }
    return obj;
}


// 将后台返回的路由数据的集合进行组装(成为路由的格式)
function reformRouters1(routersList) {
    let list = [
        {
            path: '/trainingProgram',
            component: Layout,
            meta: {title: '训练计划'},
            children: [
                {
                    path: 'weekProgram',
                    component: () => import('@/views/trainingProgram/weekProgram/weekProgram'),
                    name: 'weekProgram',
                    meta: {title: '新增周训练计划'}
                },
                {
                    path: 'monthProgram',
                    component: () => import('@/views/trainingProgram/monthProgram/monthProgram'),
                    name: 'monthProgram',
                    meta: {title: '新增月训练计划'}
                }
            ]
        },
        {
            path: '/teamOverview',
            component: Layout,
            meta: {title: '队伍看板'},
            children: [
                {
                    path: 'teamOverview',
                    component: () => import('@/views/teamOverview/teamOverview'),
                    name: 'teamOverview',
                    meta: {title: '队伍看板'}
                }
            ]
        },
        {
            path: '/report',
            component: Layout,
            meta: {title: '生成报告'},
            children: [
                {
                    path: 'report',
                    component: () => import('@/views/report/report'),
                    name: 'report',
                    meta: {title: '生成报告'}
                }
            ]
        },
    ]
    // 后续会将接口中的数据转化为以下的数组形式
    return list
}

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        introduction: '',
        setting: {
            articlePlatform: []
        },

        roles: ['ROLE_admin'], // 用户所具有的角色
        userName: '',          // 用户名
        realName: '',          // 真实姓名
        routers: constantRouterMap, // 白名单路由
        addRouters: [], // 动态回去的路由

    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        // 设置角色
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        // 设置用户名
        SET_USERNAME: (state, userName) => {
            state.userName = userName
        },
        // 设置真实姓名
        SET_REALNAME: (state, realName) => {
            state.realName = realName
        },

        SET_ROLECODE: (state, roleCode) => {
            state.roleCode = roleCode
        },
        // 设置路由
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        },
    },

    // 请求方法都在api/login.js中
    actions: {
        // 登录
        loginFn({commit, state}, userInfo) {
            return new Promise((resolve, reject) => {
                loginFn(userInfo).then(response => {
                    if (response.code === 200) {
                        const data = response.data;
                        commit('SET_ROLES', filterPro(data.roles, 'roleCode'));    // 角色名称
                        commit('SET_REALNAME', data.realName);          // 真实姓名
                        commit('SET_USERNAME', data.username);          // 用户名
                        Cookies.set('roles', state.roles);
                        Cookies.set('realName', state.realName);
                        Cookies.set('userName', state.userName);
                        resolve();
                    } else {
                        this.$message(response.msg);
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户菜单-路由(业务需求，菜单和路由需要在后端返回)
        GetUserMenue({commit, state}) {
            return new Promise((resolve, reject) => {

                // 模拟
                let newRouters = reformRouters(aa);
                commit('SET_ROUTERS', newRouters);
                resolve()


                // 真实
                // getUserMenue(state.roles[0]).then(response => {
                //     if (response.code === 200) {
                //         const res = response.data;
                //         if (res && res.length > 0) { // 验证返回的菜单是否是一个非空数组
                //             let newRouters = reformRouters(res);
                //             // let newRouters = reformRouters1(res);
                //             // let newRouters = reformRouters(aa);
                //             commit('SET_ROUTERS', newRouters);
                //             resolve()
                //         } else {
                //             reject('getInfo: routers must be a non-null array !')
                //         }
                //     } else {
                //         // this.$message(response.msg);
                //     }
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    // commit('SET_TOKEN', '')
                    // removeToken()
                    commit('SET_ROLES', '');
                    Cookies.remove('realName');
                    Cookies.remove('userName');
                    Cookies.remove('roles');
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error)
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_ROLES', '');
                Cookies.remove('realName');
                Cookies.remove('userName');
                Cookies.remove('roles');
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({commit}, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    resolve()
                })
            })
        }
    }
}

export default user
