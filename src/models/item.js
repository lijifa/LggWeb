import { query, queryAllMer, add, update, del } from '@/services/item';

export default {
  namespace: 'item',

  state: {
    data : {
      totalRow : 0,
      pageNumber : 1,
      firstPage : true,
      lastPage : true,
      totalPage : 1,
      pageSize : 15,
      list : [],
      desc : null
    },
    editRes:{},
    merData:[],
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

    *queryAllMer({ payload }, { call, put }) {
      const response = yield call(queryAllMer, payload);
      yield put({
        type: 'queryMerList',
        payload: response,
      });
    },

    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
    *del({ payload, callback }, { call, put }) {
      const response = yield call(del, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    
    queryMerList(state, action) {
      return {
        ...state,
        merData: action.payload.data,
      };
    }
  },
};