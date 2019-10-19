<template>
<aside>
  <el-container style="position: absolute;top: 0px;bottom: 0px;width: 100%;border:1px solid #eee">
    <!--Header-->
      <el-header>
        <span style="font-size: 22px">后台管理系统</span>
        <el-dropdown trigger="hover" class="userinfo">
          <!-- <i class="el-icon-setting" style="margin-right: 15px;"></i> -->
          <span class="el-dropdown-link userinfo-inner"><img :src="this.userAvatar" />{{userName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
    <el-container>
      <!--左边菜单栏-->
      <el-aside width="200px" style="background-color:rgb(238, 241, 246); min-height: 400px">
        <el-menu :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect"
            unique-opened router>
          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!--Main-->
      <el-main>
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-main>
    </el-container>

  </el-container>
</aside>
</template>
<script>
export default {
  name: 'Home',
  data(){
    return {
      userName: '',
      userAvatar: ''
    };
  },
  methods: {
    handleopen(index){
      console.log(index);
    },
    handleclose(index){
      console.log(index);
    },
    handleselect(index, indexPath){
      console.log(index, indexPath);
    },
    logout(){
      this.$confirm('确定退出登录吗？', '提示', {

      }).then(() => {
        sessionStorage.removeItem('user');
        this.$router.push({path: '/login'});
      }).catch(() => {});
    }
  },
  mounted(){
    var user = sessionStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      this.userName = user.userName || '';
      this.userAvatar = user.avatar || ''
    }
  }
}
</script>

<style scoped lang="scss">
.el-header{
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside{
  color: #f1ee23;
}
.breadcrumb-container {
  //margin-bottom: 15px;
  .title {
    width: 200px;
    float: left;
    color: #475669;
  }
  .breadcrumb-inner {
    float: right;
  }
}

.logo {
  //width:230px;
  height:160px;
  font-size: 22px;
  padding-left:20px;
  padding-right:20px;
  border-color: #f0f0f0;
  border-right-width: 1px;
  border-right-style: solid;
  // background: url("http://img4.duitang.com/uploads/item/201511/26/20151126112617_vUaQf.jpeg") no-repeat center;
  // background-size: 60%;
  background-color: #ffffff;
  img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }
  .txt {
    color:#fff;
  }
}

.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
  .userinfo-inner {
    cursor: pointer;
    // color:$color-primary;
    img {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }
}
</style>
