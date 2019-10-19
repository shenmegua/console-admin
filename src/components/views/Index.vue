<template>
<aside>
  <el-calendar v-model="value"></el-calendar>
</aside>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return {
      value : new Date()
    };
  }
}
</script>
