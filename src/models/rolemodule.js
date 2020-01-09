import { add } from '@/services/rolemodule';

export default {
  namespace: 'rolemodule',

  state: {
    data: {
    },
  },

  effects: {
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
  },

  reducers: {
  },
};