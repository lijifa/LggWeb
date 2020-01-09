import { query, queryAll, add, edit } from '@/services/mer';

export default {
  namespace: 'mer',

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
    editRes:{},
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
    *queryAll({ payload }, { call, put }) {
      const response = yield call(queryAll, payload);
      yield put({
        type: 'querySelect',
        payload: response,
      });
    },
    *edit({ payload, callback }, { call, put }) {
      const response = yield call(edit, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      };
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(add, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      };
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
    querySelect(state, action) {
      return {
        ...state,
        selectData: action.payload,
      };
    },
  },
};
