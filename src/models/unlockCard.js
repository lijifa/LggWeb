
import { lockcardQuery, unlockcard } from '@/services/lockcard';

export default {
  namespace: 'unlockcard',

  state: {
    data: {
      code: "00",
      data: {
        totalRow: 0,
        pageNumber: 0,
        firstPage: true,
        lastPage: true,
        totalPage: 0,
        pageSize: 15,
        list: []
      },
      msg: "操作成功",
      token: "",
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(lockcardQuery, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *search({ payload }, { call, put }) {
      const response = yield call(lockcardQuery, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *unlockcard({ payload, callback }, { call, put }) {
      const response = yield call(unlockcard, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
  },
  reducers: {
    queryList(state, action) {
      if(action.payload == undefined) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          data: action.payload,
        };
      }
    },
  },
};
