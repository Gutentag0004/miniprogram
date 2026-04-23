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
    }).catch(() => {
      this.setData({ loading: false });
    });
  },

  onAdopt() {
    wx.switchTab({ url: '/pages/category/index' });
  },
});
