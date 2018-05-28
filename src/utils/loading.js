import store from '@/store';
import { message } from 'antd';
import { spinLoading } from '@/reducers/app'

let loading = {

}

let hide = false;

let lastRequest = new Date('2018');

loading.show = function (config) {
    if (config && config.loading) {
        let now = new Date();
        let ms = now - lastRequest;
        lastRequest = now;
        if (ms > 2000) {//相隔两秒的请求才重新显示loading
            if (config.loading === "message") {
                hide = message.loading('请求中...', 0);
            } else if (config.loading === "spin") {
                store.dispatch(spinLoading(true));
            }
        }
    }

}

loading.hide = function (config) {
    if (config && config.loading) {
        if (config.loading === "message" && hide) {
            setTimeout(hide, 1000)
        } else if (config.loading === "spin") {
            setTimeout(() => {
                store.dispatch(spinLoading(false));
            }, 1000);
        }
    }
}

export default loading;