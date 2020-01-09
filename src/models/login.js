import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { message } from 'antd';
import { fakeAccountLogin, fakeAccountLogout, getFakeCaptcha } from '@/services/api';
import { detail } from '@/services/role';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import xCookie from '@/utils/xCookie'
import { reloadAuthorized } from '@/utils/Authorized';
//import getRoleFilter from '@/components/SiderMenu/rolefilter';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(fakeAccountLogin, payload);
      if (!response) {
        return;
      }

      if (response.code === '00') {
        //xCookie.set('userData', JSON.stringify(response.data.detail));
        // console.log(response.data.detail);
        let redirect = '/questiontype';

        
        reloadAuthorized();
       
        yield put(routerRedux.replace(redirect || '/'));
        
      } else {
        message.info(response.msg)
      }
    },

    *getRole({ payload }, { call, put }) {
      const userDetail = xCookie.get('userData') ? JSON.parse(xCookie.get('userData')) : ''
      
      if (!userDetail) {
        return;
      }
  
       //根据角色获取模块权限
      if (userDetail.operType == 1 || userDetail.operType == 0){
        let menuData = yield call(detail, { roleId: userDetail.roleId });
        if (!menuData) {
          return;
        }
        let roleFilter = new Array(menuData.data.menuList.length)
        for (let i = 0; i < roleFilter.length; i++) {
          roleFilter[i] = menuData.data.menuList[i].menuData
        }

        //let roleFilter2 = ["/vipcard","/vipcard/employee","/vipcard/staffcardauth","/vipcard/tempcardauth","/vipcard/lockcard","/vipcard/unlockcard","/vipcard/returncard","/vipcard/cardtype","/vipcard/accountrecharge","/vipcard/trade","/restaurant","/restaurant/meal-section","/restaurant/menu-notice"]
        yield put({
          type: 'changeLoginStatus',
          payload: {
            //...response,
            currentAuthority: roleFilter
          },
        });
      }else if (userDetail.operType == 2) {//门店操作员
        yield put({
          type: 'changeLoginStatus',
          payload: {
            //...response,
            currentAuthority: 'shop'
          },
        });
      }
      reloadAuthorized();
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { call, put }) {
      yield call(fakeAccountLogout, {});
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      xCookie.remove('JSESSIONID', false)
      xCookie.remove('userData')

      //单点登录
      //window.location.href="/cmbc/auth/omLogin"

      //原始登录
      window.location.href='/user/login'
      // yield put(
      //   routerRedux.push({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   })
      // );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
