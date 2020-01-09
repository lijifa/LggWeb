import { query, add, edit, read, detail, detailTemp, queryAll, addManage, changeCardNo } from '@/services/employee';

export default {
  namespace: 'employee',

  state: {
    data: {
      code : '00',
      msg : '操作成功',
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
      token : '',
      success : true
    },
    editRes:{},
    detailRes:{},
    detailTempRes:{},
    allUserList:{
      data: {
        code: "00",
        data: [],
        msg: "操作成功",
        token: "",
      }
    },
    readRes:{
      data:{
        cardNo:'',
      }
    },
    loading: true
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
    *detail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      yield put({
        type: 'detailData',
        payload: response,
      });
    },

    *detailTemp({ payload }, { call, put }) {
      const response = yield call(detailTemp, payload);
      yield put({
        type: 'detailTempData',
        payload: response,
      });
    },

    *read({ payload }, { call, put }) {
      const response = yield call(read, payload);
      yield put({
        type: 'readData',
        payload: response,
      });
    },
    *queryAll({ payload }, { call, put }) {
      const response = yield call(queryAll, payload);
      yield put({
        type: 'queryAllUserList',
        payload: response,
      });
    },
    *addManage({ payload, callback }, { call, put }) { 
      const response = yield call(addManage, payload); 
      if (callback && typeof callback === 'function') { 
        callback(response); 
      }; 
    }, 
    *changeCardNo({ payload, callback }, { call, put }) { 
      const response = yield call(changeCardNo, payload); 
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
    queryAllUserList(state, action) {
      return {
        ...state,
        allUserList: action.payload,
      };
    },
    detailData(state, action) {
      return {
        ...state,
        detailRes: action.payload.data,
        loading: false
      };
    },
    detailTempData(state, action) {
      return {
        ...state,
        detailTempRes: action.payload.data,
      };
    },
    readData(state, action) {
      return {
        ...state,
        readRes: action.payload,
      };
    },
  },
};
