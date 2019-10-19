import Mock from 'mockjs'

const LoginUser = [
  {
    id: 1,
    userId: 'admin',
    userName: '东瓜',
    password: '123456',
    avatar: 'https://c-ssl.duitang.com/uploads/item/201908/11/20190811011834_Lee38.jpeg'
  },
  {
    id: 2,
    userId: 'test',
    userName: '测试账号',
    password: '123123',
    avatar: 'https://b-ssl.duitang.com/uploads/item/201904/24/20190424145931_i3eUi.jpeg'
  }
]

const Users = [];

for(let i=0; i < 100; i++){
  Users.push(
    Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        address: Mock.mock('@county(true)'),
        date: Mock.Random.date(),
        sex: Mock.Random.integer(0,1)
    })
  );
}

const Roles = [];

for(let i = 0; i < 28; i++){
  Roles.push(
    Mock.mock({
      id: Mock.Random.guid(),
      roleId: Mock.Random.word(7),
      roleName: Mock.Random.province(),
      create_time: Mock.Random.datetime(),
      status: Mock.Random.boolean,
      orderby: Mock.Random.integer(1,10),
      desc: Mock.mock('@cparagraph(2)')
    })
  );
}

export {LoginUser, Users, Roles};
