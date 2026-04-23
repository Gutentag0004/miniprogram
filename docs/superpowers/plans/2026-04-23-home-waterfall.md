# Home Waterfall Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the entire home page with a 2-column waterfall grid of pet adoption listings, and create a pet detail page.

**Architecture:** Mock pet data lives in `model/pets.js`, served by `services/pets/fetchPets.js` with client-side filtering and pagination. The home page JS distributes pets alternately into `leftCol`/`rightCol` arrays. Tapping a card navigates to a new `pages/pets/detail/index` page.

**Tech Stack:** WeChat Mini Program (WXML / WXSS / JS), no test framework — verify visually in WeChat DevTools.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Create | `model/pets.js` | 10 mock pet objects |
| Create | `services/pets/fetchPets.js` | fetchPets() + fetchPetById() |
| Create | `pages/pets/detail/index.js` | Pet detail page logic |
| Create | `pages/pets/detail/index.json` | Nav title + components |
| Create | `pages/pets/detail/index.wxml` | Pet detail template |
| Create | `pages/pets/detail/index.wxss` | Pet detail styles |
| Modify | `app.json` | Add pages/pets subpackage |
| Replace | `pages/home/home.js` | Waterfall grid logic |
| Replace | `pages/home/home.wxml` | Waterfall grid template |
| Replace | `pages/home/home.wxss` | Waterfall grid styles |
| Replace | `pages/home/home.json` | Updated component list |

---

### Task 1: Create mock pet data

**Files:**
- Create: `model/pets.js`

- [ ] **Step 1: Create the file with 10 mock pets**

```js
export const petList = [
  {
    id: 1,
    name: '小橘',
    sex: '母',
    age: '8个月',
    status: '待领养',
    image: '/model/images/petsaving.png',
    description: '小橘是一只活泼可爱的橘猫，喜欢和人玩耍，已完成疫苗接种和绝育手术。它来自一个过度繁殖的家庭，现在渴望找到一个温暖的新家。',
  },
  {
    id: 2,
    name: '豆豆',
    sex: '公',
    age: '2岁',
    status: '待领养',
    image: '/model/images/petsaving.png',
    description: '豆豆是一只温顺的柴犬，性格安静，适合家庭饲养。曾在街头流浪三个月，经救助后健康状况良好。',
  },
  {
    id: 3,
    name: '雪球',
    sex: '母',
    age: '1岁',
    status: '已预约',
    image: '/model/images/petsaving.png',
    description: '雪球是一只白色短毛猫，性格独立但喜欢撒娇。来自一个无法继续饲养的家庭，已接种全套疫苗。',
  },
  {
    id: 4,
    name: '大黄',
    sex: '公',
    age: '3岁',
    status: '待领养',
    image: '/model/images/petsaving.png',
    description: '大黄是一只金毛犬，性格温和友善，喜欢小孩。原主人因出国无法带走，现寻找有耐心的家庭。',
  },
  {
    id: 5,
    name: '花花',
    sex: '母',
    age: '5个月',
    status: '待领养',
    image: '/model/images/petsaving.png',
    description: '花花是一只三花猫，充满好奇心，活泼好动。在救助站出生，从小与人类接触，非常亲人。',
  },
  {
    id: 6,
    name: '黑炭',
    sex: '公',
    age: '1岁半',
    status: '已领养',
    image: '/model/images/petsaving.png',
    description: '黑炭是一只全黑短毛猫，已找到爱它的家庭。感谢新主人的爱心！',
  },
  {
    id: 7,
    name: '奶茶',
    sex: '母',
    age: '7个月',
    status: '待领养',
    image: '/model/images/petsaving.png',
    description: '奶茶是一只奶牛猫，毛色黑白分明，性格温柔，喜欢被抱。从小被遗弃在小区，经志愿者救助后身体健康。',
  },
  {
    id: 8,
    name: '旺财',
    sex: '公',
    age: '4岁',
    status: '已预约',
    image: '/model/images/petsaving.png',
    description: '旺财是一只中华田园犬，忠诚可靠，适合有院子的家庭。已绝育并接种疫苗，等待新家确认中。',
  },
  {
    id: 9,
    name: '芝麻',
    sex: '公',
    age: '6个月',
    status: '待领养',
    image: '/model/images/petsaving.png',
    description: '芝麻是一只虎斑猫，精力旺盛，喜欢玩玩具。适合有时间陪伴它的主人，最好家中已有其他猫咪。',
  },
  {
    id: 10,
    name: '棉花',
    sex: '母',
    age: '2岁',
    status: '已领养',
    image: '/model/images/petsaving.png',
    description: '棉花是一只白色比熊，已找到爱它的家庭。感谢新主人给予她温暖的家！',
  },
];
```

- [ ] **Step 2: Verify file is saved correctly**

Open `model/pets.js` in the IDE and confirm all 10 pets are present with correct structure.

---

### Task 2: Create pet service

**Files:**
- Create: `services/pets/fetchPets.js`

- [ ] **Step 1: Create the services/pets directory and service file**

```js
import { petList } from '../../model/pets';

const { delay } = require('../_utils/delay');

export function fetchPets(page, pageSize, statusFilter) {
  return delay().then(() => {
    const filtered = statusFilter === '全部'
      ? petList
      : petList.filter((p) => p.status === statusFilter);
    const start = page * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { items, hasMore: start + pageSize < filtered.length };
  });
}

export function fetchPetById(id) {
  return delay().then(() => petList.find((p) => p.id === id) || null);
}
```

- [ ] **Step 2: Verify the file is saved correctly**

Confirm the file exists at `services/pets/fetchPets.js` and both exports are present.

---

### Task 3: Register pets subpackage in app.json

**Files:**
- Modify: `app.json`

- [ ] **Step 1: Add pets subpackage to the subpackages array**

In `app.json`, add a new entry to the `"subpackages"` array after the existing `"promotion"` entry:

```json
{
  "root": "pages/pets",
  "name": "pets",
  "pages": ["detail/index"]
}
```

The `subpackages` array should end as:

```json
    {
      "root": "pages/promotion",
      "name": "promotion",
      "pages": ["promotion-detail/index"]
    },
    {
      "root": "pages/pets",
      "name": "pets",
      "pages": ["detail/index"]
    }
```

---

### Task 4: Create pet detail page

**Files:**
- Create: `pages/pets/detail/index.json`
- Create: `pages/pets/detail/index.wxml`
- Create: `pages/pets/detail/index.wxss`
- Create: `pages/pets/detail/index.js`

- [ ] **Step 1: Create index.json**

```json
{
  "navigationBarTitleText": "宠物详情",
  "usingComponents": {
    "t-loading": "tdesign-miniprogram/loading/loading"
  }
}
```

- [ ] **Step 2: Create index.wxml**

```xml
<view class="container" wx:if="{{pet}}">
  <image class="hero-image" src="{{pet.image}}" mode="aspectFill" />

  <view class="info-card">
    <view class="name">{{pet.name}}</view>
    <view class="meta-row">
      <text class="meta-text">{{pet.sex}} · {{pet.age}}</text>
      <view class="status-badge status-badge--{{pet.status}}">{{pet.status}}</view>
    </view>
  </view>

  <view class="desc-card">
    <view class="desc-title">关于TA</view>
    <view class="desc-text">{{pet.description}}</view>
  </view>

  <view class="bottom-bar" wx:if="{{pet.status === '待领养'}}">
    <view class="adopt-btn" bindtap="onAdopt">申请领养</view>
  </view>
  <view class="bottom-bar" wx:elif="{{pet.status === '已预约'}}">
    <view class="adopt-btn adopt-btn--disabled">已被预约</view>
  </view>
  <view class="bottom-bar" wx:else>
    <view class="adopt-btn adopt-btn--disabled">已领养</view>
  </view>
</view>

<view class="loading-wrap" wx:elif="{{loading}}">
  <t-loading theme="circular" size="40rpx" text="加载中..." />
</view>
```

- [ ] **Step 3: Create index.wxss**

```css
page {
  background: #f5f5f5;
  padding-bottom: 120rpx;
}

.hero-image {
  width: 100%;
  height: 480rpx;
  display: block;
}

.info-card {
  background: #fff;
  padding: 32rpx;
  margin-bottom: 16rpx;
}

.name {
  font-size: 40rpx;
  font-weight: 700;
  color: #333;
  margin-bottom: 16rpx;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meta-text {
  font-size: 28rpx;
  color: #666;
}

.status-badge {
  font-size: 22rpx;
  color: #fff;
  padding: 6rpx 16rpx;
  border-radius: 32rpx;
}

.status-badge--待领养 { background: #FF5F15; }
.status-badge--已预约 { background: #F5A623; }
.status-badge--已领养 { background: #999; }

.desc-card {
  background: #fff;
  padding: 32rpx;
}

.desc-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.desc-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.8;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16rpx 32rpx;
  background: #fff;
  box-shadow: 0 -2rpx 12rpx rgba(0,0,0,0.06);
}

.adopt-btn {
  background: #FF5F15;
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
  text-align: center;
  padding: 24rpx;
  border-radius: 12rpx;
}

.adopt-btn--disabled {
  background: #ccc;
}

.loading-wrap {
  display: flex;
  justify-content: center;
  padding-top: 200rpx;
}
```

- [ ] **Step 4: Create index.js**

```js
import { fetchPetById } from '../../../services/pets/fetchPets';

Page({
  data: {
    pet: null,
    loading: true,
  },

  onLoad({ id }) {
    fetchPetById(Number(id)).then((pet) => {
      this.setData({ pet, loading: false });
      if (pet) {
        wx.setNavigationBarTitle({ title: pet.name });
      }
    });
  },

  onAdopt() {
    wx.switchTab({ url: '/pages/category/index' });
  },
});
```

- [ ] **Step 5: Verify in DevTools**

Navigate to `pages/pets/detail/index?id=1` in DevTools. Expected: hero image, name "小橘", sex/age row, orange 待领养 badge, description text, orange "申请领养" button at bottom.

Navigate with `id=6`. Expected: grey "已领养" disabled button.

---

### Task 5: Replace home page JS

**Files:**
- Replace: `pages/home/home.js`

- [ ] **Step 1: Overwrite home.js with the new pet grid logic**

```js
import { fetchPets } from '../../services/pets/fetchPets';

const PAGE_SIZE = 6;

Page({
  data: {
    leftCol: [],
    rightCol: [],
    loadStatus: 0,
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
    if (fresh) {
      this.currentPage = 0;
      wx.stopPullDownRefresh();
    }
    this.setData({ loadStatus: 1 });

    fetchPets(this.currentPage, PAGE_SIZE, this.data.filter).then(({ items, hasMore }) => {
      const existing = fresh
        ? { leftCol: [], rightCol: [] }
        : { leftCol: this.data.leftCol, rightCol: this.data.rightCol };

      items.forEach((item, i) => {
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
    });
  },

  onCardTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/pets/detail/index?id=${id}` });
  },
});
```

---

### Task 6: Replace home page template

**Files:**
- Replace: `pages/home/home.wxml`

- [ ] **Step 1: Overwrite home.wxml with the waterfall grid template**

```xml
<view class="page">

  <!-- Filter bar -->
  <view class="filter-bar">
    <view
      wx:for="{{filters}}"
      wx:key="index"
      class="filter-item {{filter === item ? 'filter-item--active' : ''}}"
      data-filter="{{item}}"
      bindtap="onFilterTap"
    >{{item}}</view>
  </view>

  <!-- Waterfall grid -->
  <view class="waterfall">
    <view class="col">
      <view
        wx:for="{{leftCol}}"
        wx:key="id"
        class="pet-card"
        data-id="{{item.id}}"
        bindtap="onCardTap"
      >
        <image class="pet-card-image" src="{{item.image}}" mode="aspectFill" />
        <view class="pet-card-body">
          <view class="pet-card-name-row">
            <text class="pet-card-name">{{item.name}}</text>
            <text class="pet-card-sex">{{item.sex}}</text>
          </view>
          <view class="pet-card-age">{{item.age}}</view>
          <view class="pet-card-status pet-card-status--{{item.status}}">{{item.status}}</view>
        </view>
      </view>
    </view>

    <view class="col">
      <view
        wx:for="{{rightCol}}"
        wx:key="id"
        class="pet-card"
        data-id="{{item.id}}"
        bindtap="onCardTap"
      >
        <image class="pet-card-image" src="{{item.image}}" mode="aspectFill" />
        <view class="pet-card-body">
          <view class="pet-card-name-row">
            <text class="pet-card-name">{{item.name}}</text>
            <text class="pet-card-sex">{{item.sex}}</text>
          </view>
          <view class="pet-card-age">{{item.age}}</view>
          <view class="pet-card-status pet-card-status--{{item.status}}">{{item.status}}</view>
        </view>
      </view>
    </view>
  </view>

  <!-- Load state -->
  <view class="load-tip" wx:if="{{loadStatus === 1}}">加载中...</view>
  <view class="load-tip" wx:elif="{{loadStatus === 2}}">没有更多了</view>

</view>
```

---

### Task 7: Replace home page styles

**Files:**
- Replace: `pages/home/home.wxss`

- [ ] **Step 1: Overwrite home.wxss with waterfall styles**

```css
page {
  background: #f5f5f5;
  padding-bottom: calc(env(safe-area-inset-bottom) + 96rpx);
}

.page {
  padding: 0 16rpx 16rpx;
}

/* Filter bar */
.filter-bar {
  display: flex;
  padding: 16rpx 0 12rpx;
  gap: 12rpx;
  position: sticky;
  top: 0;
  background: #f5f5f5;
  z-index: 10;
}

.filter-item {
  font-size: 24rpx;
  color: #666;
  padding: 8rpx 20rpx;
  border-radius: 32rpx;
  background: #fff;
  border: 1rpx solid #e0e0e0;
}

.filter-item--active {
  color: #fff;
  background: #FF5F15;
  border-color: #FF5F15;
}

/* Waterfall */
.waterfall {
  display: flex;
  gap: 16rpx;
}

.col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

/* Pet card */
.pet-card {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.pet-card-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.pet-card-body {
  padding: 16rpx;
}

.pet-card-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6rpx;
}

.pet-card-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.pet-card-sex {
  font-size: 22rpx;
  color: #999;
}

.pet-card-age {
  font-size: 22rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.pet-card-status {
  display: inline-block;
  font-size: 20rpx;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.pet-card-status--待领养 { background: #FF5F15; }
.pet-card-status--已预约 { background: #F5A623; }
.pet-card-status--已领养 { background: #999; }

/* Load tip */
.load-tip {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  padding: 24rpx 0;
}
```

---

### Task 8: Update home page JSON

**Files:**
- Replace: `pages/home/home.json`

- [ ] **Step 1: Overwrite home.json with minimal component list**

```json
{
  "navigationBarTitleText": "宠物之家",
  "onReachBottomDistance": 60,
  "enablePullDownRefresh": true,
  "usingComponents": {}
}
```

---

### Task 9: Verify full flow in DevTools

- [ ] **Step 1: Compile and open the home page**

Expected: Filter bar at top (全部/待领养/已预约/已领养), 2-column waterfall with 6 pet cards (3 per column). Each card shows image, name + sex, age, coloured status badge.

- [ ] **Step 2: Test filter**

Tap "待领养". Expected: grid refreshes showing only 待领养 pets (6 of them). Tap "已领养". Expected: 2 cards shown.

- [ ] **Step 3: Test load more**

With filter "全部" (10 pets, PAGE_SIZE=6): scroll to bottom. Expected: remaining 4 pets load, then "没有更多了" appears.

- [ ] **Step 4: Test navigation**

Tap any card. Expected: navigates to pet detail page showing that pet's name, photo, description and status-appropriate button.

- [ ] **Step 5: Test adopt button**

On a 待领养 detail page, tap "申请领养". Expected: switches to the category/adoption tab.
