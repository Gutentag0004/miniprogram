# Pet Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "精选宠物" horizontal pet card row below the home page banner, showing 4 tappable pet cards with placeholder images and names.

**Architecture:** Pet data is added to the existing `mockFetchHome()` service, received by the home page `loadHomePage()` method, and rendered as a horizontal `scroll-view` between the header and tab section. Tapping a card calls `wx.navigateTo` with the card's URL.

**Tech Stack:** WeChat Mini Program (WXML / WXSS / JS), no test framework — verify visually in WeChat DevTools.

---

### Task 1: Add pet data to the home service

**Files:**
- Modify: `services/home/home.js`

- [ ] **Step 1: Add `pets` array to `mockFetchHome` return value**

Open `services/home/home.js`. The `mockFetchHome` function currently returns `{ swiper, tabList, activityImg }`. Add a `pets` key:

```js
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        { text: '精选推荐', key: 0 },
        { text: '夏日防晒', key: 1 },
        { text: '二胎大作战', key: 2 },
        { text: '人气榜', key: 3 },
        { text: '好评榜', key: 4 },
        { text: 'RTX 30', key: 5 },
        { text: '手机也疯狂', key: 6 },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
      pets: [
        { name: '猫咪', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
        { name: '狗狗', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
        { name: '兔子', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
        { name: '仓鼠', image: '/model/images/petsaving.png', url: '/pages/goods/list/index' },
      ],
    };
  });
}
```

> Note: All 4 cards share the same placeholder image (`/model/images/petsaving.png`) for now. Swap individual image paths once real images are ready.

---

### Task 2: Wire pet data into the home page JS

**Files:**
- Modify: `pages/home/home.js`

- [ ] **Step 1: Add `pets` to page `data`**

In the `data` object (around line 6), add:

```js
data: {
  imgSrcs: [],
  tabList: [],
  pets: [],          // add this line
  goodsList: [],
  goodsListLoadStatus: 0,
  pageLoading: false,
  current: 1,
  autoplay: true,
  duration: '500',
  interval: 5000,
  navigation: { type: 'dots' },
  swiperImageProps: { mode: 'scaleToFill' },
},
```

- [ ] **Step 2: Destructure `pets` in `loadHomePage` and store it**

Find the `fetchHome().then(...)` call (~line 57). Update the destructuring and `setData`:

```js
fetchHome().then(({ swiper, tabList, pets }) => {
  this.setData({
    tabList,
    imgSrcs: swiper,
    pets,
    pageLoading: false,
  });
  this.loadGoodsList(true);
});
```

- [ ] **Step 3: Add tap handler**

Add `onPetTap` to the page methods (place it after `navToActivityDetail`):

```js
onPetTap(e) {
  const { url } = e.currentTarget.dataset;
  wx.navigateTo({ url });
},
```

---

### Task 3: Add pet section to the template

**Files:**
- Modify: `pages/home/home.wxml`

- [ ] **Step 1: Insert pet section block**

Open `pages/home/home.wxml`. After the closing `</view>` of `.home-page-header` (line 18) and before `<view class="home-page-container">`, insert:

```xml
<view class="pet-section">
  <view class="pet-section-title">精选宠物</view>
  <scroll-view class="pet-scroll" scroll-x>
    <view
      wx:for="{{pets}}"
      wx:key="index"
      class="pet-card"
      data-url="{{item.url}}"
      bindtap="onPetTap"
    >
      <image class="pet-image" src="{{item.image}}" mode="aspectFill" />
      <text class="pet-name">{{item.name}}</text>
    </view>
  </scroll-view>
</view>
```

The full file should now read (in order):
1. loading view (`wx:if="{{pageLoading}}"`)
2. `.home-page-header` (swiper)
3. `.pet-section` ← new block
4. `.home-page-container` (tabs + goods list)

---

### Task 4: Add styles for the pet section

**Files:**
- Modify: `pages/home/home.wxss`

- [ ] **Step 1: Append styles at the end of the file**

Add to the bottom of `pages/home/home.wxss`:

```css
.pet-section {
  background: #fff;
  padding: 24rpx 32rpx 28rpx;
}

.pet-section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.pet-scroll {
  white-space: nowrap;
}

.pet-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32rpx;
  width: 160rpx;
}

.pet-image {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}

.pet-name {
  font-size: 24rpx;
  color: #555;
  margin-top: 12rpx;
  text-align: center;
}
```

---

### Task 5: Verify in WeChat DevTools

- [ ] **Step 1: Compile and open the simulator**

In WeChat DevTools, click **Compile** (or save any file to trigger auto-compile). Open the home page.

- [ ] **Step 2: Check the pet section renders**

Expected: Between the swiper banner and the tab bar, a white section appears with the title "精选宠物" and 4 horizontally arranged cards. Each card shows a circular image and a name below it.

- [ ] **Step 3: Check tap navigation**

Tap any pet card in the simulator. Expected: navigates to the goods list page (`/pages/goods/list/index`).

- [ ] **Step 4: Check scroll (optional)**

If you add more than 4 pets later, the row should scroll horizontally without line-wrapping.
