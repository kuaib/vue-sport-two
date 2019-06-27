import request from '@/utils/request'

// 接口可以调通的时候打开
// 登陆
export function loginByUsername(userInfo) {
    return request({
        url: '/sports/login',
        method: 'post',
        transformRequest: [function (data) {
            let ret = '';
            for (let key in userInfo) {
                ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
            }
            return ret.substr(0, ret.length - 1)
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        // data: {
        //     username: userInfo.username,
        //     password: userInfo.password
        // }
        data: userInfo
    })
}

// 获取左侧菜单（即：路由信息，路由全部需要动态返回）
export function getUserMenue(roleCode) {
    return request({
        url: '/sports/menu/list',
        method: 'get',
        params: {roleCode}
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}

// 获取用户信息(包括用户的权限)
export function getUserInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

// 忘记密码
export function forgePsw(data) {
    return request({
        url: '/user/forgePsw',
        method: 'post',
        data: data
    })
}

// 更改密码
export function changePsw(data) {
    return request({
        url: '/user/changePsw',
        method: 'post',
        data: data
    })
}



