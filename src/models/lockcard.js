import { lockcard } from '@/services/lockcard';
import { query } from '@/services/card';

export default {
  namespace: 'lockcard',

  state: {
    data: {
      code: "00",
      data: {
        firstPage: true,
        lastPage: true,
        list: [],
        pageNumber: 1,
        pageSize: 15,
        totalPage: 1,
        totalRow: 0,
      },
      msg: "操作成功",
      token: "",
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *search({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },

    *lockcard({ payload, callback }, { call, put }) {
      const response = yield call(lockcard, payload);
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
