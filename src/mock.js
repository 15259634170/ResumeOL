import Mock from 'mockjs';

// 用于测试post请求是否成功
let result = {
    code: 200,
    msg: '保存成功',
    data: null
}

// 拦截请求
Mock.mock('/api/test', 'post', () => {
    return result
})