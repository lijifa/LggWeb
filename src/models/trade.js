import { query, update, queryAllSda, queryAllDeptda, exportSale } from '@/services/trade';

export default {
  namespace: 'trade',

  state: {
    data: {
      code: "00",
      data: {
        desc: null,
        firstPage: true,
        lastPage: true,
        list: [],
        pageNumber: 0,
        pageSize: 15,
        totalPage: 0,
        totalRow: 0,
      },
      msg: "操作成功",
      token: "",
    },
    sdaData: [],
    deptdaData: [],
    canteenSdaData: {
      firstNum: '0',
      thirdNum: '0.00'
    },
    shoppingSdaData: {
      firstNum: '0',
      thirdNum: '0.00'
    },
    washClothSdaData: {
      firstNum: '0',
      thirdNum: '0.00'
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
    //消费撤销
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    //消费导出
    *exportSale({ payload, callback }, { call, put }) {
      const response = yield call(exportSale, payload);
      if (callback && typeof callback === 'function') {
        callback(response); // 返回结果
      }
    },

    //消费统计报表
    *querySda({ payload }, { call, put }) {
      const response = yield call(queryAllSda, payload);
      yield put({
        type: 'querySdaList',
        payload: response,
      });
    },

    //餐厅消费统计报表
    *queryCanteenSda({ payload }, { call, put }) {
      const response = yield call(queryAllSda, payload);
      yield put({
        type: 'canteenSdaList',
        payload: response,
      });
    },

    //洗衣消费统计报表
    *queryWashClothSda({ payload }, { call, put }) {
      const response = yield call(queryAllSda, payload);
      yield put({
        type: 'washClothSdaList',
        payload: response,
      });
    },

    //购物消费统计报表
    *queryShoppingSda({ payload }, { call, put }) {
      const response = yield call(queryAllSda, payload);
      yield put({
        type: 'shoppingSdaList',
        payload: response,
      });
    },

    //消费统计报表
    *queryDeptda({ payload }, { call, put }) {
      const response = yield call(queryAllDeptda, payload);
      yield put({
        type: 'queryDeptdaList',
        payload: response,
      });
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
    querySdaList(state, action) {
      return {
        ...state,
        sdaData: action.payload.data,
      };
    },
    queryDeptdaList(state, action) {
      return {
        ...state,
        deptdaData: action.payload.data,
      };
    },


    canteenSdaList(state, action) {
      return {
        ...state,
        canteenSdaData: action.payload.data.desc,
      };
    },


    washClothSdaList(state, action) {
      return {
        ...state,
        washClothSdaData: action.payload.data.desc,
      };
    },


    shoppingSdaList(state, action) {
      return {
        ...state,
        shoppingSdaData: action.payload.data.desc,
      };
    },
  },
};
