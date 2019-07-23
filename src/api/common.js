/**
 *  公用接口
 */

import request from '@/utils/request'


// select下拉集合(测试使用，后续删掉)
export function getAllDic() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取大项列表
export function getBigItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取小项列表
export function getSmallItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取队伍列表
export function getTeamItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}

// 获取组列表
export function getGroupItem() {
    return request({
        url: '/sports/dict/getAllDic',
        method: 'get'
    })
}