import axios from 'axios';

const getToken = () => {
    try {
        return TTJSBridge.invoke('data', 'getToken');
    } catch (e) {
        return null;
    }
};

/**
 * @name sentryReport 上报请求错误
 * @typedef {object} Metadata
 * @property {string} url api接口路径
 * @property {string} method 请求方法
 * @property {string | number} status 状态码
 * @property {string=} errorMsg 错误信息
 * @param {Metadata} metadata 上报信息
 */
const sentryReport = metadata => {
    if (window.Sentry) {
        window.Sentry.getCurrentHub().withScope(scope => {
            scope.setTag('api', metadata.url);
            scope.setTag('status', metadata.status);
            scope.setTag('method', metadata.method);
            scope.setContext('xhr', metadata);
            scope.setLevel('error');
            window.Sentry.getCurrentHub().captureMessage(`request ${metadata.url} error`);
        });
    }
};

const filterChild = (source, arr) => {
    const target = JSON.parse(JSON.stringify(source));
    if (!arr.length > 0) return target;
    arr.forEach(element => {
        if (element in target) delete target[element];
    });
    return target;
};

export default (axiosConfig = {}) => {
    const ins = axios.create(Object.assign({}, { timeout: 5000 }, axiosConfig));
    let toastOff = false;

    // 请求拦截器
    ins.interceptors.request.use(
        config => {
            // 添加token
            const token = getToken();
            if (config.method === 'get') {
                config.params = Object.assign({}, config.params, { token });
            } else if (config.method === 'post') {
                config.data = Object.assign({}, config.data, { token });
            }
            // toastOff
            toastOff = config.toastOff;
            return config;
        },
        error => {

            window.f7 && window.f7.toast.show({
                text: `连接服务器失败，请稍后重试 [${error.config.baseURL + error.config.url} - timeout - ${Date.now()}]`,
                closeTimeout: 3000,
                closeButton: true,
            });
            sentryReport({ url: error.config.baseURL + error.config.url, status: 'timeout', method: error.config.method });
            return Promise.reject(error);
        },
    );

    // 响应拦截器
    ins.interceptors.response.use(
        response => {

            const data = response.data;
            if (data.code !== 0 && !toastOff) {
                var toastText =
                    !data.msg && !data.code
                        ? `服务器返回信息错误 [${response.config.baseURL + response.config.url} - ${Date.now()}]`
                        : `${data.msg} (${data.code}) [${Date.now()}]`;
                window.f7.toast.show({
                    text: toastText,
                    closeTimeout: 3000,
                    closeButton: true,
                });
            }
            if (data.code !== 0) {
                sentryReport({
                    url: response.config.baseURL + response.config.url,
                    method: response.config.method,
                    status: response.status,
                    params: filterChild(response.config.method === 'post' ? response.config.data : response.config.params, ['token']),
                    data: response.data,
                });
            }
            return data;
        },
        error => {

            if (error.response) {
                window.f7.toast.show({
                    text: `连接服务器失败，请稍后重试 [${error.config.baseURL + error.config.url} - ${error.response.status} - ${Date.now()}]`,
                    closeTimeout: 3000,
                    closeButton: true,
                });
                sentryReport({
                    url: error.config.baseURL + error.config.url,
                    method: error.config.method,
                    status: error.response.status,
                    params: filterChild(error.config.method === 'post' ? error.config.data : error.config.params, ['token']),
                    data: error.response.data,
                })
            } else {
                window.f7.toast.show({
                    text: `${error.message} [${error.config.baseURL + error.config.url} - ${Date.now()}]`,
                    closeTimeout: 3000,
                    closeButton: true,
                });
                sentryReport({
                    url: error.config.baseURL + error.config.url,
                    method: error.config.method,
                    status: 'timeout',
                    errorMsg: error.message,
                })
            }
            return Promise.reject(error);
        },
    );

    return ins;
};
