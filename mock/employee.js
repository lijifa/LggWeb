const result = {
  return_code : '00',
  return_info : '操作成功',
  return_data : {
    totalRow : 16,
    pageNumber : 1,
    firstPage : true,
    lastPage : true,
    totalPage : 1,
    pageSize : 15,
    list : [
      {
        id: 1000000001,
        name: '宋江',
        mobile: 18718236321,
        zhiwei: '主管',
        bumen: '行政',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 1000000002,
        name: '李逵',
        mobile: 18718299999,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 1000000003,
        name: '史进',
        mobile: 18666636321,
        zhiwei: '主管',
        bumen: '市场',
        status: '挂失',
        createTime: '1519629374000',
      },
      {
        id: 1000000004,
        name: '吴用',
        mobile: 18777736321,
        zhiwei: '主管',
        bumen: '研发',
        status: '正常',
        createTime: '1520503368000',
      },
      {
        id: 1000000005,
        name: '公孙胜',
        mobile: 18718212345,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 1000000006,
        name: '卢忠义',
        mobile: 18718299876,
        zhiwei: '总监',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 1000000007,
        name: '王英',
        mobile: 18718299988,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 1000000008,
        name: '孙二娘',
        mobile: 18718299989,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 1000000009,
        name: '武松',
        mobile: 18718299910,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '挂失',
        createTime: '1519629374000',
      },
      {
        id: 110,
        name: '武大郎',
        mobile: 18718299911,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '挂失',
        createTime: '1519629374000',
      },
      {
        id: 111,
        name: '潘金莲',
        mobile: 18718299912,
        zhiwei: '普通员工',
        bumen: '客服',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 112,
        name: '王婆',
        mobile: 18718299913,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 113,
        name: '燕青',
        mobile: 18718299914,
        zhiwei: '普通员工',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 114,
        name: '华容',
        mobile: 18718299915,
        zhiwei: '主管',
        bumen: '研发',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 115,
        name: '林冲',
        mobile: 18718299916,
        zhiwei: '总监',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      },
      {
        id: 116,
        name: '高俅',
        mobile: 18718299917,
        zhiwei: '董事',
        bumen: '市场',
        status: '正常',
        createTime: '1519629374000',
      }
    ],
    desc : null
  },
  token : '',
  success : true
}

export default {
  'POST /user/query': (req, res) => {
    res.send(result.return_data);
  }
};