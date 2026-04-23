# Home Page Waterfall Grid Design

## Summary

Replace the entire home page with a 2-column waterfall grid of pet adoption listings. Each card shows a pet photo, name, sex, age, and a coloured status badge. Tapping a card navigates to a new pet detail page. The page includes a search/filter bar and loads more pets on scroll.

---

## Data Model

**File:** `model/pets.js`

Each pet object:
```js
{
  id: 1,
  name: '小橘',
  sex: '母',
  age: '8个月',
  status: '待领养',   // '待领养' | '已预约' | '已领养'
  image: '/model/images/petsaving.png',
  description: '小橘是一只活泼可爱的橘猫，喜欢和人玩耍...',
}
```

Provide 10 mock pets with a mix of statuses (6 待领养, 2 已预约, 2 已领养), varied names, sex, and ages.

**File:** `services/pets/fetchPets.js`

Export two functions:
- `fetchPets(page, pageSize, statusFilter)` — returns `{ items, hasMore }`. Filters by status if `statusFilter` is not `'全部'`, then paginates by slicing the mock array.
- `fetchPetById(id)` — returns a single pet object by id.

---

## Home Page

### Files modified
- `pages/home/home.wxml` — full replacement
- `pages/home/home.js` — full replacement
- `pages/home/home.wxss` — full replacement

### Layout

```
┌─────────────────────────────┐
│  [搜索框]  [状态筛选 ▾]      │  ← fixed filter bar
├─────────────┬───────────────┤
│  pet card   │   pet card    │  ← 2-column waterfall
│  pet card   │   pet card    │
│  pet card   │   pet card    │  ← 6 items visible initially
│    ...      │    ...        │  ← load more on scroll
└─────────────┴───────────────┘
```

### Pet card

- Square image (full card width, `mode="aspectFill"`)
- Name + sex on one row (e.g. "小橘 · 母")
- Age on next row
- Status badge: 待领养 = `#FF5F15`, 已预约 = `#F5A623`, 已领养 = `#999`

### Filter bar

- Text input for name search (filters client-side against current list)
- Status picker: 全部 / 待领养 / 已预约 / 已领养 (tap cycles or dropdown)

### Data flow

1. `onLoad` → `loadPets(fresh=true)` → `fetchPets(0, 6, '全部')` → `setData({ leftCol, rightCol })`
2. Items distributed alternately: even index → leftCol, odd index → rightCol
3. `onReachBottom` → `loadPets(fresh=false)` → appends to both columns
4. Filter/search change → reset pagination → `loadPets(fresh=true)`
5. Card tap → `wx.navigateTo({ url: '/pages/pets/detail/index?id={{item.id}}' })`

### Page data

```js
data: {
  leftCol: [],
  rightCol: [],
  loadStatus: 0,   // 0=idle, 1=loading, 2=noMore
  filter: '全部',
  searchText: '',
}
```

---

## Pet Detail Page

### Files created
- `pages/pets/detail/index.js`
- `pages/pets/detail/index.json`
- `pages/pets/detail/index.wxml`
- `pages/pets/detail/index.wxss`

### Layout

```
┌─────────────────────────────┐
│                             │
│        [pet photo]          │  ← full-width, 480rpx tall
│                             │
├─────────────────────────────┤
│  小橘                        │  ← name (large)
│  母 · 8个月  [待领养 badge]   │  ← sex / age / status
├─────────────────────────────┤
│  关于TA                      │  ← section title
│  小橘是一只活泼可爱的橘猫...   │  ← description
├─────────────────────────────┤
│       [申请领养]              │  ← button → /pages/category/index
└─────────────────────────────┘
```

### Data flow

1. `onLoad({ id })` → `fetchPetById(id)` → `setData({ pet })`
2. "申请领养" button → `wx.switchTab({ url: '/pages/category/index' })`

---

## app.json changes

Add a new `pages/pets` subpackage:
```json
{
  "root": "pages/pets",
  "name": "pets",
  "pages": ["detail/index"]
}
```

---

## Out of Scope

- Real backend / API integration
- Image upload for pets
- Search hitting a server
- User favouriting pets
