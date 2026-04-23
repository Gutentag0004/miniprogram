import { fetchPets } from '../../services/pets/fetchPets';

const PAGE_SIZE = 6;

Page({
  data: {
    leftCol: [],
    rightCol: [],
    loadStatus: 1,
    filter: '全部',
    filters: ['全部', '待领养', '已预约', '已领养'],
  },

  currentPage: 0,

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.loadPets(true);
  },

  onReachBottom() {
    if (this.data.loadStatus === 0) {
      this.loadPets(false);
    }
  },

  onPullDownRefresh() {
    this.loadPets(true);
  },

  onFilterTap(e) {
    const filter = e.currentTarget.dataset.filter;
    if (filter === this.data.filter) return;
    this.setData({ filter });
    this.loadPets(true);
  },

  loadPets(fresh) {
    if (this.isLoading && !fresh) return;
    if (fresh) {
      this.currentPage = 0;
    }
    this.isLoading = true;
    this._loadNonce = (this._loadNonce || 0) + 1;
    const nonce = this._loadNonce;
    this.setData({ loadStatus: 1 });

    fetchPets(this.currentPage, PAGE_SIZE, this.data.filter).then(({ items, hasMore }) => {
      if (nonce !== this._loadNonce) return;

      const existing = fresh
        ? { leftCol: [], rightCol: [] }
        : { leftCol: this.data.leftCol, rightCol: this.data.rightCol };

      items.forEach((item) => {
        const isLeft = (existing.leftCol.length + existing.rightCol.length) % 2 === 0;
        if (isLeft) {
          existing.leftCol.push(item);
        } else {
          existing.rightCol.push(item);
        }
      });

      this.currentPage += 1;
      this.setData({
        leftCol: existing.leftCol,
        rightCol: existing.rightCol,
        loadStatus: hasMore ? 0 : 2,
      });
    }).catch(() => {
      if (nonce !== this._loadNonce) return;
      this.setData({ loadStatus: 0 });
      wx.showToast({ title: '加载失败', icon: 'error' });
    }).finally(() => {
      this.isLoading = false;
      if (fresh) wx.stopPullDownRefresh();
    });
  },

  onCardTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/pets/detail/index?id=${id}` });
  },
});
