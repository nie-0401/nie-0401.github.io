const imgBaseUrl = process.env.VUE_APP_BASE_IMAGE_URL
const fileBaseUrl = process.env.VUE_APP_BASE_FILE_URL
import { moment } from "moment";

const $imgUrl = function(url) {
    return url ? (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) ? url : imgBaseUrl + url : ''
}
const $fileUrl = function(url) {
    return url ? (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) ? url : fileBaseUrl + url : ''
}
const $companyImg = function(url, type) {
    if (type) {
        return url ? url : require('../assets/images/companyLogo.png')
    } else {
        return url ? (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) ? url : fileBaseUrl + url : require('../assets/images/companyLogo.png')
    }
}
const $time = function(dataStr, pattern = 'YYYY-MM-DD') {
    return dataStr ? moment(dataStr).format(pattern) : ''
}
const $textEmpty = function(text) {
    return text ? text : '-'
}
const $fieldShow = function(val) {
    let arr = []
    if(val && val.length > 0){
        val.forEach(el => {
            let str = el.demandFieldName
            if(el.demandFieldNametwo){
                str+=' — ' + el.demandFieldNametwo
            }
            arr.push(str)
        })
        return arr.join('；')
    }
}
const $urlToName = function(url) {
    let name = ''
    let data = url.split('/')
    if (data.length > 1) {
        name = data[data.length - 1]
    }
    return name
}
const $timeDuration = function(dataStr) {
    let h = dataStr ? moment(dataStr).hours() : ''
    let str = ''
    if (h >= 18) {
        str = '晚上'
    } else if (h >= 16) {
        str = '傍晚'
    } else if (h >= 13) {
        str = '下午'
    } else if (h >= 11) {
        str = '中午'
    } else if (h >= 6) {
        str = '上午'
    } else {
        str = '凌晨'
    }
    return str
}
const $moneyFormat = function(money, type = true) {
    if (money && money != null && money != ' ') {
        money = String(money);
        var left = money.split('.')[0],
            right = money.split('.')[1];
        right = right ? (type ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.' + parseFloat(right)) : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0.00';
    } else {
        return '';
    }
}
const $moneyUnit = function(money) {
    let value = $moneyFormat(money)
    if (!isNaN(parseFloat(money))) {
        let num = parseFloat(money)
        if (num / (10 ** 8) > 1) {
            value = $moneyFormat(parseFloat(num / (10 ** 8)).toFixed(2)) + '亿'
        } else if (num / (10 ** 6) > 1) {
            value = $moneyFormat(parseFloat(num / (10 ** 6)).toFixed(2)) + '万'
        } else {
            value = $moneyFormat(money)
        }
    }
    return value
}
const $moneyUnitTwo = function(money) {
    let value = $moneyFormat(money)
    if (!isNaN(parseFloat(money))) {
        let num = parseFloat(money)
        if (num.toString().length > 4) {
            value = $moneyFormat(parseFloat(num / (10 ** 4)).toFixed(2)) + '亿'
        } else {
            value = $moneyFormat(money) + '万'
        }
    }
    return value
}
const $numberFormat = function(money) {
    if (money && money != null && money != ' ') {
        money = String(money);
        var left = money.split('.')[0]
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('');
    } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0';
    } else {
        return '';
    }
}
const $phoneHide = function(dataStr) {
    // return dataStr ? dataStr.substring(0, 3) + '****' + dataStr.substring(dataStr.length - 4, dataStr.length) : ''
    return dataStr ? dataStr.substring(0, 3) + '****' + dataStr.substring(dataStr.length - 4, dataStr.length) : ''
}
export default {
    $imgUrl,
    $fileUrl,
    $time,
    $urlToName,
    $textEmpty,
    $timeDuration,
    $moneyFormat,
    $numberFormat,
    $moneyUnit,
    $moneyUnitTwo,
    $phoneHide,
    $companyImg,
    $fieldShow
}