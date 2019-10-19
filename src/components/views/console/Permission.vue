<template>
  <aside>
    <el-tabs v-model="activeName" type="border-card" editable @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>

    <el-button size="small" @click="addTab">add tab</el-button>
    <el-tabs v-model="tabValues" type="border-card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(item, index) in tabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      >
      {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </aside>
</template>

<script>
export default {
  name: 'Permission',
  data(){
    return {
      activeName: 'second',
      tabValues: '2',
      tabs: [
        {
          title: 'Tab 1',
          name: '1',
          content: 'Tab1 Content'
        },
        {
          title: 'Tab 2',
          name: '2',
          content: 'Tab2 Content'
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    handleClick(tab, events){
      console.log(tab, events);
    },
    addTab(){
      let newTabName = ++this.tabIndex + "";
      this.tabs.push({
        title: "newTab " + this.tabIndex,
        name: newTabName,
        content: 'newTabs ' + this.tabIndex + " Content"
      });
      this.tabValues = newTabName;
    },
    removeTab(targetTab){
      let curActive = this.tabValues;
      let tempTabs = this.tabs;
      if(curActive === targetTab){// 当前激活当tab和待关闭待tab一致才
        //遍历tabs
        tempTabs.forEach((tab, index) => {
          if(tab.name === targetTab){// 待激活tab
            let nextTab = tempTabs[index+1] || tempTabs[index-1];
            if(nextTab){
              curActive = nextTab.name;
            }
          }
        });
      }
      this.tabValues = curActive;
      this.tabs = tempTabs.filter(tab => tab.name != targetTab);
    }
  }
}
</script>
