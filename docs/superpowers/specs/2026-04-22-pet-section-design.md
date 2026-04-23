# Home Page Pet Section Design

## Summary

Add a horizontally scrollable "精选宠物" (Featured Pets) section below the swiper banner on the home page. Displays 4 tappable pet cards, each with a placeholder image and pet name. Tapping a card navigates to the goods list page.

## Data

**File:** `services/home/home.js`

Add a `pets` array to the mock return value in `mockFetchHome()`:

```js
pets: [
  { name: '猫咪', image: '/images/pets/cat.png', url: '/pages/goods/list/index' },
  { name: '狗狗', image: '/images/pets/dog.png', url: '/pages/goods/list/index' },
  { name: '兔子', image: '/images/pets/rabbit.png', url: '/pages/goods/list/index' },
  { name: '仓鼠', image: '/images/pets/hamster.png', url: '/pages/goods/list/index' },
]
```

Images are placeholders — paths can be updated once real images are available.

## Template

**File:** `pages/home/home.wxml`

Add a new `<view class="pet-section">` block immediately after the closing tag of `.home-page-header` and before `.home-page-container`:

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

## Styles

**File:** `pages/home/home.wxss`

```css
.pet-section {
  padding: 24rpx 32rpx 0;
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
  margin-right: 24rpx;
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

## Logic

**File:** `pages/home/home.js`

1. Add `pets: []` to the `data` object.
2. In `loadHomePage()`, destructure `pets` from `fetchHome()` and store via `setData`.
3. Add handler:

```js
onPetTap(e) {
  const { url } = e.currentTarget.dataset;
  wx.navigateTo({ url });
},
```

## Out of Scope

- Real pet images (placeholders used; swap URLs when images are ready)
- Per-pet category filtering on the goods list page
