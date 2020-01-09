import { queryAll, queryByRole} from '@/services/menu';

export default {
  namespace: 'menu',

  state: {
    queryList: [],
    queryListByRole: {
      data: {
        menuList: [],
      }
    },
  },

  effects: {
    *queryAll({ payload }, { call, put }) {
      const response = yield call(queryAll, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *queryByRole({ payload }, { call, put }) {
      const response = yield call(queryByRole, payload);
      yield put({
        type: 'queryListByRole',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        queryList: action.payload,
      };
    },
    queryListByRole(state, action) {
      return {
        ...state,
        queryListByRole: action.payload,
      };
    },
  },
  
};
