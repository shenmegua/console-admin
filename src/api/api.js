import axios from 'axios';

let base = '';

export const userLogin = params => {return axios.post(`${base}/login`, params).then(res => res.data);}

export const getUserList = params => {return axios.get(`${base}/user/list`, {params: params});};

export const getUserListPage = params => {
  return axios.get(`${base}/user/listPage`, {params: params});
};

// 删除用户
export const removeUser = params => {
  return axios.get(`${base}/user/delete`, {params: params});
}

// 批量删除用户
export const batchRemoveUser = params => {
  return axios.get(`${base}/user/batchdelete`, {params: params});
}

// 修改用户
export const editUser = params => {
  return axios.get(`${base}/user/edit`, {params: params});
}
// 新增用户
export const addUser = params => {
  return axios.get(`${base}/user/add`, {params: params});
}

// 分页查询角色列表
export const getRoleListPage = params => {
  return axios.get(`${base}/role/listPage`, {params: params});
}
