import { query, update, detail, queryDetailList, batchUpdate } from '@/services/menunotice';

export default {
  namespace: 'menunotice',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    detailData: '',
    detailListData: [],
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

    *detail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      yield put({
        type: 'detailData',
        payload: response,
      });
    },


    *queryDetailList({ payload }, { call, put }) {
      const response = yield call(queryDetailList, payload);
      yield put({
        type: 'detailListData',
        payload: response,
      });
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *batchUpdate({ payload, callback }, { call, put }) {
      const response = yield call(batchUpdate, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    detailListData(state, action) {
      return {
        ...state,
        detailListData: action.payload.data,
      };
    },
  },
};
