import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    activeTab: 0,
    tabs: [
      { label: '关于领养' },
      { label: '领养协议' },
      { label: '领养信息' },
      { label: '关于我们' },
    ],
    housingOptions: ['自有住房', '租房', '与家人同住'],
    petOptions: ['没有', '有猫', '有狗', '有其他'],
    form: {
      name: '',
      phone: '',
      city: '',
      housing: '',
      hasPets: '',
      experience: '',
      reason: '',
    },
  },

  onShow() {
    this.getTabBar().init();
  },

  onTabTap(e) {
    this.setData({ activeTab: e.currentTarget.dataset.index });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onRadioTap(e) {
    const { field, value } = e.currentTarget.dataset;
    this.setData({ [`form.${field}`]: value });
  },

  onSubmit() {
    const { name, phone, city, housing, reason } = this.data.form;
    if (!name || !phone || !city || !housing || !reason) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请填写必填项',
        theme: 'error',
      });
      return;
    }
    Toast({
      context: this,
      selector: '#t-toast',
      message: '申请已提交，我们将尽快联系您',
      theme: 'success',
      duration: 3000,
    });
  },
});
