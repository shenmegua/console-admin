import Mock from 'mockjs'

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

export {Users};
