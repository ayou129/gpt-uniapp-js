import request from '@/common/request';

export const getBannerList = () => {
    return request({
        url: '/index/banner/list',
        method: 'GET'
    });
};

export const getCardList = () => {
    return request({
        url: '/index/card/list',
        method: 'GET'
    });
};
