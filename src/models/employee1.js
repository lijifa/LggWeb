import request from '../utils/request';  // request 是 demo 项目脚手架中提供的一个做 http 请求的方法，是对于 fetch 的封装，返回 Promise

const delay = (millisecond) => {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecond);
  });
};

export default {
  namespace: 'employee1',
  state: {
    data: [],
    counter: 0,
  },
  effects: {
    *queryList(_, sagaEffects) {
      const { call, put } = sagaEffects;
      const endPointURI = '/user/query'//'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke';

      const puzzle = yield call(request, endPointURI, {
        method: 'POST'});
      yield put({ type: 'addNewCard', payload: puzzle });
    }
  },
  reducers: {
    addNewCard(state) {
      const nextCounter = state.counter + 1;
      const nextData = state.data;
      return {
        data: nextData,
        counter: nextCounter,
      };
    }
  },
};