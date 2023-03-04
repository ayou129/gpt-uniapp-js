export const getToken = () => {
    const token = uni.getStorageSync('token') || uni.getStorageSync('uni_token');
    return token;
};

/**
 * 防抖函数
 * @param func 函数
 * @param delay 延迟时间（毫秒）
 */
export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

/**
 * 节流函数
 * @param func 函数
 * @param delay 延迟时间（毫秒）
 */
export const throttle = (func, delay) => {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    };
};

// 公共工具函数

// 将对象转为查询字符串
export function objToQueryString(obj) {
    let queryString = '';
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
        }
    }
    return queryString.slice(0, -1);
}

export function queryStringToObj(queryString) {
    const obj = {};
    queryString.split('&').forEach((pair) => {
        const [key, value] = pair.split('=');
        obj[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return obj;
}

// 格式化时间戳
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}

// 在数字前补0
function addZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
}
