import { config, cdnBase } from '../../config/index';

const mockNewsPool = [
  { title: '流浪猫咪历经三个月终于找到温暖的家', image: '/model/images/petsaving.png' },
  { title: '新手养猫必看：5个让猫咪更健康快乐的小技巧', image: '/model/images/petsaving.png' },
  { title: '感人故事：小狗守护受伤主人两天两夜等待救援', image: '/model/images/petsaving.png' },
  { title: '宠物饮食指南：哪些食物对狗狗有害要避开', image: '/model/images/petsaving.png' },
  { title: '兔子的日常护理：如何给兔宝宝创造舒适环境', image: '/model/images/petsaving.png' },
  { title: '领养代替购买：这只仓鼠改变了一家人的生活', image: '/model/images/petsaving.png' },
  { title: '猫咪常见疾病早发现：这些信号要注意', image: '/model/images/petsaving.png' },
  { title: '带狗狗出行必备清单，旅途更安心', image: '/model/images/petsaving.png' },
  { title: '宠物心理健康：如何判断你的猫咪是否焦虑', image: '/model/images/petsaving.png' },
  { title: '公益救助站探访：每一只流浪动物都值得被爱', image: '/model/images/petsaving.png' },
];

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '精选推荐',
          key: 0,
        },
        {
          text: '夏日防晒',
          key: 1,
        },
        {
          text: '二胎大作战',
          key: 2,
        },
        {
          text: '人气榜',
          key: 3,
        },
        {
          text: '好评榜',
          key: 4,
        },
        {
          text: 'RTX 30',
          key: 5,
        },
        {
          text: '手机也疯狂',
          key: 6,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
      pets: [
        { name: '猫咪', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
        { name: '狗狗', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
        { name: '兔子', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
        { name: '仓鼠', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
      ],
      news: mockNewsPool.slice(0, 4),
    };
  });
}

export function fetchMoreNews(page, pageSize) {
  const { delay } = require('../_utils/delay');
  return delay().then(() => {
    const start = page * pageSize;
    const items = mockNewsPool.slice(start, start + pageSize);
    return { items, hasMore: start + pageSize < mockNewsPool.length };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
