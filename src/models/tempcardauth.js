import { query, detail, tempapplyBatchDeal, batchUpdate, reSendEmail} from '@/services/tempcardauth';

export default {
  namespace: 'tempcardauth',

  state: {
    data: {
      code: "00",
      data: {
        totalRow: 0,
        pageNumber: 1,
        firstPage: true,
        lastPage: true,
        totalPage: 1,
        pageSize: 15,
        list: []
      },
      msg: "操作成功",
      token: "",
    },
  },
  detailRes:{},

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
    *tempapplyBatchDeal({ payload, callback }, { call, put }) {
      const response = yield call(tempapplyBatchDeal, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      };
    },
    *batchUpdate({ payload , callback}, { call, put }) {
      const response = yield call(batchUpdate, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      };
    },
    *reSendEmail({ payload, callback }, { call, put }) {
      const response = yield call(reSendEmail, payload);
      if (callback && typeof callback === 'function') {
        callback(response);
      };
    },
  },

  reducers: {
    detailData(state, action) {
      return {
        ...state,
        detailRes: action.payload.data,
      };
    },
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
