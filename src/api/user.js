//这里是在login,js文件中
import request from '@/network'
/**
 * 请求方法
 * @param {Object} option (用于axios config 中的参数如:data,params,...)
 * @param {string} id(用于url中需要的参数，url需要多个参数，方法继续加参数即可)
 */
export function login(data) {
    return request({
        url: '/login', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}


export function getUser(data) {
    return request({
        url: '/selectUser', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}


export function deleUser(data) {
    return request({
        url: '/deleUser', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}

export function editUser(data) {
    return request({
        url: '/editUser', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}


export function addUser(data) {
    return request({
        url: '/addUser', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}



//查询人员工资
export function selectPay(data) {
    return request({
        url: '/selectPay', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}


//添加人员工资
export function addPay(data) {
    return request({
        url: '/addPay', //请求url
        method: 'get', //这里方法的类型可以写get,post,put,delete
        params: data //向后台返回的数据
    })
}