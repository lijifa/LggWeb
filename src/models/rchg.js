import { query, batchRchgAdd } from '@/services/rchg';

export default {
  namespace: 'rchg',

  state: {
    data: {
      totalRow: 0,
      pageNumber: 0,
      firstPage: true,
      lastPage: true,
      totalPage: 0,
      pageSize: 15,
      list: []
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
    *batchRchgAdd({ payload, callback }, { call, put }) {
      const response = yield call(batchRchgAdd, payload);
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
