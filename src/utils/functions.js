const imgBaseUrl = process.env.VUE_APP_BASE_IMAGE_URL;
const fileBaseUrl = process.env.VUE_APP_BASE_FILE_URL;
import { moment } from "moment";

const avatar = require("../assets/images/default_avatar.png");
import { Message } from "element-ui";
import { File_AddFileAsync } from "@/api/base";
let timeout = null;
const bases = function (Vue) {
  (Vue.prototype.$isHttp = function (url) {
    return url ? (url.indexOf("http") > -1 ? url : "https://" + url) : "";
  }),
    (Vue.prototype.$setImgUrl = function (url) {
      return url
        ? url.indexOf("http://") == 0 || url.indexOf("https://") == 0
          ? url
          : imgBaseUrl + url
        : "";
    });
  Vue.prototype.$setFileUrl = function (url) {
    return url
      ? url.indexOf("http://") == 0 || url.indexOf("https://") == 0
        ? url
        : fileBaseUrl + url
      : "";
  };
  Vue.prototype.$setAvatar = function (url) {
    return url
      ? url.indexOf("http://") == 0 || url.indexOf("https://") == 0
        ? url
        : fileBaseUrl + url
      : avatar;
  };
  Vue.prototype.$hexToRgba = function (hex, opacity = 1) {
    return (
      "rgba(" +
      parseInt("0x" + hex.slice(1, 3)) +
      "," +
      parseInt("0x" + hex.slice(3, 5)) +
      "," +
      parseInt("0x" + hex.slice(5, 7)) +
      "," +
      opacity +
      ")"
    );
  };
  Vue.prototype.$setTime = function (dataStr, pattern = "YYYY-MM-DD") {
    return dataStr ? moment(dataStr).format(pattern) : "";
  };
  Vue.prototype.$mobilePhoneReg = function (phone) {
    var myMobilePhoneReg = /^(((1[3-9]{1}))+\d{9})$/;
    return myMobilePhoneReg.test(phone);
  };
  Vue.prototype.$noZhReg = function (name) {
    var myNoZhReg = /[\u4e00-\u9fa5/\s+/]/ig;
    return myNoZhReg.test(name);
  };
  Vue.prototype.$ipAddressReg = function (ip) {
    var ipReg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    return ipReg.test(ip);
  };
  Vue.prototype.$pwdReg = function (pwd) {
    var pwdReg = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,18}$/;
    // var pwdReg = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,18}")
    return pwdReg.test(pwd);
  };
  Vue.prototype.$landlineNumber = function (phone) {
    var Reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    return Reg.test(phone);
  };
  Vue.prototype.$emailReg = function (email) {
    // var myEmailReg = new RegExp("^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$");
    //var myEmailReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
    var myEmailReg = new RegExp(/@/);
    return myEmailReg.test(email);
  };
  Vue.prototype.$CreditCodeReg = function (val) {
    //统一社会信用的代码
    var reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
    return reg.test(val);
  };
  Vue.prototype.$idCardReg = function (idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard =
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
      if (idCard.length == 18) {
        var idCardWi = new Array(
          7,
          9,
          10,
          5,
          8,
          4,
          2,
          1,
          6,
          3,
          7,
          9,
          10,
          5,
          8,
          4,
          2
        ); //将前17位加权因子保存在数组里
        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
        for (var i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }

        var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
        var idCardLast = idCard.substring(17); //得到最后一位身份证号码

        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
          if (idCardLast == "X" || idCardLast == "x") {
            return true;
          } else {
            return false;
          }
        } else {
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast == idCardY[idCardMod]) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  };
  Vue.prototype.$moneyFormat = function (money) {
    if (money && money != null) {
      money = String(money);
      var left = money.split(".")[0],
        right = money.split(".")[1];
      right = right
        ? right.length >= 2
          ? "." + right.substr(0, 2)
          : "." + right + "0"
        : ".00";
      var temp = left
        .split("")
        .reverse()
        .join("")
        .match(/(\d{1,3})/g);
      return (
        (Number(money) < 0 ? "-" : "") +
        temp.join(",").split("").reverse().join("") +
        right
      );
    } else if (money === 0) {
      // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
      return "0.00";
    } else {
      return "";
    }
  };
  Vue.prototype.$numberFormat = function (money) {
    if (money && money != null) {
      money = String(money);
      var left = money.split(".")[0];
      var temp = left
        .split("")
        .reverse()
        .join("")
        .match(/(\d{1,3})/g);
      return (
        (Number(money) < 0 ? "-" : "") +
        temp.join(",").split("").reverse().join("")
      );
    } else if (money === 0) {
      // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
      return "0";
    } else {
      return "";
    }
  };
  Vue.prototype.numberFormatter = function (money) {
    if (money && money != null && money != " ") {
      money = String(money);
      var left = money.split(".")[0];
      var temp = left
        .split("")
        .reverse()
        .join("")
        .match(/(\d{1,3})/g);
      return (
        (Number(money) < 0 ? "-" : "") +
        temp.join(",").split("").reverse().join("")
      );
    } else if (money === 0) {
      // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
      return "0";
    } else {
      return "";
    }
  };

  Vue.prototype.$phoneHide = function (dataStr) {
    // return dataStr ? dataStr.substring(0, 3) + '****' + dataStr.substring(dataStr.length - 4, dataStr.length) : ''
    return dataStr
      ? dataStr.substring(0, 3) +
          "****" +
          dataStr.substring(dataStr.length - 4, dataStr.length)
      : "";
  };
//   Vue.prototype.$tipIcon = function (val) {
//     let jsons = {
//       warring: require("@/assets/images/icon_tishi.png"),
//       default: require("@/assets/images/notice_normal.png"),
//       success: require("@/assets/images/notice_success.png"),
//       error: require("@/assets/images/notice_error.png"),
//     };
//     return jsons[val];
//   };
  Vue.prototype.$setIdFun = function (val, f) {
    let id = String(val),
      _len = id.length,
      _str = f ? f : "";
    if (_len < 7) {
      for (let i = 0; i < 7 - _len; i++) {
        _str += "0";
      }
      _str = _str + id;
    } else {
      _str += id;
    }
    return _str;
  };
  Vue.prototype.$uploadFun = function (e, big, small, size, accept) {
    //上传图片
    let allowFileType = accept ? accept.split(",") : [];
    let fileName = e.target.files[0].name;
    let nameData = fileName.toLowerCase().split(".");
    let fileSize = e.target.files[0].size;
    if (
      allowFileType &&
      allowFileType.length > 0 &&
      allowFileType.indexOf(nameData[nameData.length - 1]) == -1
    ) {
      Message({
        message: "请上传" + allowFileType.join("、") + "格式的文件",
        duration: 2000,
        type: "error",
      });
      e.target.value = "";
      return false;
    }
    if (size && size > 0 && fileSize > size * 1024 * 1024) {
      Message({
        message: "文件大小不能超过" + size + "M",
        duration: 2000,
        type: "error",
      });
      e.target.value = "";
      return false;
    }
    return new Promise((resolve, reject) => {
      File_AddFileAsync(big, small, e).then((res) => {
        if (res.success) {
          resolve(res);
        } else {
          reject(false);
        }
      });
    });
  };
//   Vue.prototype.$getBg = function (id) {
//     let _arr = [
//       require("@/assets/images/home/解决方背景1.png"),
//       require("@/assets/images/home/解决方背景2.png"),
//       require("@/assets/images/home/解决方背景3.png"),
//       require("@/assets/images/home/解决方背景4.png"),
//     ];
//     let i = Number(id) % 4;
//     return _arr[i];
//   };
//   Vue.prototype.$getDemandLogo = function (id) {
//     let _arr = [
//       require("@/assets/images/home/demand_bg1.png"),
//       require("@/assets/images/home/demand_bg2.png"),
//       require("@/assets/images/home/demand_bg3.png"),
//       require("@/assets/images/home/demand_bg4.png"),
//       require("@/assets/images/home/demand_bg5.png"),
//       require("@/assets/images/home/demand_bg6.png"),
//     ];
//     let i = Number(id) % 6;
//     return _arr[i];
//   };

  //防抖 当持续触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时
  Vue.prototype.$debounce = function (fn, wait) {
    if (timeout !== null) {
      clearTimeout(timeout);
    } else {
      timeout = setTimeout(fn, wait);
    }
  };

  //节流 当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数
  Vue.prototype.$throttle = function (fn, delay) {
    var prev = Date.now();
    return function () {
      var now = Date.now();
      if (now - prev > delay) {
        fn();
        prev = Date.now();
      }
    };
  };

  Vue.prototype.$getCompanyTypeName = function (val) {
    let obj = {
      government_sector: "政府部门",
      agency: "服务机构",
      company: "企业",
    };
    return obj[val];
  };
};
export default bases;
