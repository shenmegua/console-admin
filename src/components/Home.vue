<template>
<aside>
  <el-container style="position: absolute;top: 0px;bottom: 0px;width: 100%;border:1px solid #eee">
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

    <el-container>
      <!--Header-->
      <el-header style="text-align: right; font-size: 12px;">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>东瓜</span>
      </el-header>
      
      <!--Main-->
      <el-main>
        <el-col :span="24" class="breadcrumb-container">
          <!-- <strong class="title">{{$route.name}}</strong> -->
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
    }
  }
}
</script>
<style>
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
</style>
