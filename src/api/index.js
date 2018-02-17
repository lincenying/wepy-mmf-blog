import wepy from 'wepy'
import config from '@/config'

export default {
    async getCustomHeader() {
        const user = wepy.getStorageSync('user') || ''
        const userid = wepy.getStorageSync('userid') || ''
        const username = wepy.getStorageSync('username') || ''
        return {
            user,
            userid,
            username
        }
    },
    async get(url, params) {
        url = url.indexOf('http://') > -1 || url.indexOf('https://') > -1 ? url : config.api + url
        const header = await this.getCustomHeader()
        let $return
        try {
            const xhr = await wepy.request({
                url,
                method: 'get',
                data: params,
                dataType: 'json',
                header
            })
            $return = xhr.data
            if ($return.code && $return.code !== 200) {
                wepy.showToast({
                    title: $return.message,
                })
            }
        } catch (e) {
            wepy.showModal({
                title: '提示',
                content: `接口请求失败。${e.message}`
            })
        }
        return $return
    },
    async post(url, data) {
        url = url.indexOf('http://') > -1 || url.indexOf('https://') > -1 ? url : config.api + url
        const header = await this.getCustomHeader()
        let $return
        try {
            const xhr = await wepy.request({
                url,
                method: 'post',
                data,
                dataType: 'json',
                header: {
                    ...header,
                    'content-type': 'application/x-www-form-urlencoded',
                }
            })
            $return = xhr.data
            if ($return.code && $return.code !== 200) {
                wepy.showToast({
                    title: $return.message,
                })
            }
        } catch (e) {
            wepy.showModal({
                title: '提示',
                content: `接口请求失败。${e.message}`
            })
        }
        return $return
    },
    async getUserInfo () {
        const loginData = await wepy.login()
        const openData = await this.jscode2session(loginData.code)
        const userinfo = await wepy.getUserInfo()
        userinfo.code = loginData.code
        return {
            ...userinfo,
            ...openData
        }
    },
    async login () {
        let userinfoRaw = {}
        let userinfo = {}
        let $return = {}
        try {
            userinfoRaw = await this.getUserInfo()
            userinfo = await this.post(`frontend/user/wxLogin`, {
                nickName: userinfoRaw.userInfo.nickName,
                avatar: userinfoRaw.userInfo.avatarUrl,
                wxSignature: userinfoRaw.openid,
            })
            await wepy.setStorageSync('user', userinfo.data.user)
            await wepy.setStorageSync('userid', userinfo.data.userid)
            await wepy.setStorageSync('username', userinfo.data.username)
            $return = {
                ...userinfo.data,
                avatar: userinfoRaw.userInfo.avatarUrl || config.avatar
            }
        } catch (e) {
            wepy.showModal({
                title: '提示',
                content: `获取用户信息失败，请关闭重新进入。${e.message}`
            })
        }
        return $return
    },
    async jscode2session(code) {
        const xhr = await this.get('https://api.weixin.qq.com/sns/jscode2session', {
            appid: config.apiId,
            secret: config.secret,
            js_code: code,
            grant_type: 'authorization_code'
        })
        return xhr
    }
}
