import axios from 'axios'
import store from '@/store'
import router from '@/router'

import { Message, Loading } from 'element-ui'
let IndicatorHaveLoadCount = 0
let loadingService = {
    text: '加载中',
    spinner: 'vab-loading-type',
    background: '#fff',
}
let protocol = window.location.protocol
let loadingIndicator = ''
axios.defaults.timeout = 30000
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
const service = axios.create({})
let pendingData = []

// eslint-disable-next-line no-unused-vars
let CancelToken = axios.CancelToken
let removePendingData = (config) => {
    for (let i = 0, len = pendingData.length; i < len; i++) {
        if (pendingData[i] && pendingData[i].url === config.baseURL + config.url) {
            pendingData[i].cancelFun()
            pendingData.splice(i, 1)
        }
    }
}
service.interceptors.request.use(
    (config) => {
        config.baseURL = config.baseURL ? config.baseURL : process.env.VUE_APP_BASE_API
        if (config.baseURL.indexOf(protocol + '//') == -1) {
            config.baseURL = protocol == 'https:' ? config.baseURL.replace('http://', 'https://') : config.baseURL.replace('https://', 'http://')
        }
        if (!config.headers['noToken'] && localStorage.getItem('token') && !config.headers['Authorization']) {
            config.headers['Authorization'] = localStorage.getItem('token')
        } else {
            delete config.headers['noToken']
        }
        IndicatorHaveLoadCount += 1
        if (!config.headers['noLoading']) {
            loadingIndicator = Loading.service(loadingService)
            delete config.headers['noLoading']
        } else {
            delete config.headers['noLoading']
        }
        removePendingData(config)
        return config
    },
    (error) => {
        if (loadingIndicator) {
            loadingIndicator.close()
        }
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    (response) => {
        let noMessage = response.config.headers.noMessage || false
        removePendingData(response.config)
        IndicatorHaveLoadCount -= 1
        if (IndicatorHaveLoadCount < 1) {
            IndicatorHaveLoadCount = 0
            if (loadingIndicator) {
                loadingIndicator.close()
            }
        }
        const res = response.data
        if (!noMessage && res.code != 0) {
            if (res.code == 401) {
                Message({
                    message: '请重新登录',
                    type: 'error',
                    duration: 2000,
                })
                store.dispatch('signOut', [])
                router.push('/')
            } else {
                if (res.resultType != 0 || res.resultType != 1) {
                    Message({
                        message: res.message,
                        type: 'error',
                        duration: 2000,
                    })
                    return false
                }
            }
        }
        return res
    },
    (error) => {
        IndicatorHaveLoadCount -= 1
        if (IndicatorHaveLoadCount < 1) {
            IndicatorHaveLoadCount = 0
            if (loadingIndicator) {
                loadingIndicator.close()
            }
        }
        if (error.response) {
            if (error.response.status == 401) {
                Message({
                    message: '请重新登录',
                    type: 'error',
                    duration: 2000,
                })
                store.dispatch('signOut', [])
                setTimeout(function() {
                    window.location.reload()
                }, 2000)
            } else if (error.response.status == 400) {
                Message({
                    message: '请输入正确的参数',
                    type: 'error',
                    duration: 2000,
                })
            }
        }
        return Promise.reject(error)
    }
)

export default service