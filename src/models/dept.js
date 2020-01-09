import { query, queryAll, edit, add } from '@/services/dept'; 
 
export default { 
  namespace: 'dept', 
 
  state: { 
    data: { 
      list: [], 
      pagination: {}, 
    },
    deptList: { 
      list: [], 
      pagination: {}, 
    },
    editRes:{}, 
    selectData: {
      data: [],
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
    *querySelectList({ payload }, { call, put }) { 
      const response = yield call(query, payload); 
      yield put({ 
        type: 'queryDeptList', 
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
      return { 
        ...state, 
        data: action.payload, 
      }; 
    },
    queryDeptList(state, action) {
      return { 
        ...state, 
        deptList: action.payload, 
      }; 
    },
    querySelect(state, action) {
      return {
        ...state,
        selectData: action.payload,
      };
    },
  }, 
}; 
