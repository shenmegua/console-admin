import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Users} from './data/users';
let _Users = Users;

export default {
  init(){
    let mock = new MockAdapter(axios);

    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    mock.onGet('/user/list').reply( req => {
      let {name} = req.params;
      let userList = _Users.filter(user => {
        if(name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: userList
          }]);
        }, 1000);
      });
    });

    mock.onGet('/user/listPage').reply( req => {
      let {page, pageSize, name} = req.params;
      let userList = _Users.filter(user => {
        if(name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = userList.length;
      userList = userList.filter((u, index) => index < pageSize * page && index >= pageSize * (page -1));
      return new Promise((reslove, reject) =>{
        setTimeout(() => {
          reslove([200, {
            total: total,
            page: page,
            pageSize: pageSize,
            users: userList
          }]);
        }, 1000);
      });
    });

    // 通过ID删除用户
    mock.onGet('/user/delete').reply(req => {
      let {id} = req.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() =>{
          resolve([200, {
            code: 200,
            msg: "删除成功！"
          }]);
        }, 500);
      });
    });

    // 批量删除用户
    mock.onGet('/user/batchdelete').reply(req => {
      let {ids} = req.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() =>{
          resolve([200, {
            code: 200,
            msg: "批量删除成功！"
          }]);
        }, 500);
      });
    });
      // 编辑用户
    mock.onGet('/user/edit').reply(req => {
      let {id, name, sex, address} = req.params;
      _Users.some(u => {
        if(u.id === id){
          u.name = name;
          u.sex = sex;
          u.address = address;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '修改用户成功！'
          }]);
        }, 500);
      }).catch(() => {});
    });

    // 新增用户
    mock.onGet('/user/add').reply(req => {
      let {name, sex, address} = req.params;
      _Users.push({
        name: name,
        sex: sex,
        address: address,
        date:'2019-08-18'
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增用户成功！'
          }]);
        }, 500);
      }).catch(() => {});
    });

  }
}
