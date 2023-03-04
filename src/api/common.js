import request from '@/common/request';

export const getBannerList = () => {
    return request({
        url: '/banner/list',
        method: 'GET'
    });
};

export const getCardList = () => {
    return request({
        url: '/card/list',
        method: 'GET'
    });
};
