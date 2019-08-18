<template>
  <aside>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
          <el-button type="primary" v-on:click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  <el-col :span="24">
    <el-button type="primary" v-on:click="handleAddUser" size="mini">新增</el-button>
  </el-col>
  <el-table :data="users" stripe border v-loading="loading" style="width: 100%" @selection-change="selsChange">
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
    <!-- <el-table-column prop="id" label="id" v-if="show"></el-table-column> -->
    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
    <el-table-column prop="sex" label="性别" width="60" :formatter="formatSex"></el-table-column>
    <el-table-column prop="date" label="日期" width="100"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column fixed="right" label="操作" width="280">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
        <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--分页-->
  <!-- <el-pagination layout="prev, pager, next" background :page-size="pageSize" :total="total" @current-change	="handleCurrentChange" style="float: right"></el-pagination> -->
  <el-col :span="24">
    <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    <el-pagination layout="total, sizes, prev, pager, next, jumper" background @size-change="handleSizeChange" @current-change	="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20 ,50, 100]" :page-size="pageSize" :total="total" style="float: right"></el-pagination>
  </el-col>

  <!-- 新增用户 -->
  <el-dialog title="新增用户" :visible.sync="addFormVisible" :close-on-click-modal="false">
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item prop="name" label="姓名">
        <el-input v-model="addForm.name" placeholder="请输入姓名" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="addForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker type="date" v-model="addForm.date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="addForm.address" placeholder="请输入地址" :autosize="{minRows: 2, maxRows:4}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible=false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
  </el-dialog>

  <!-- 修改用户 -->
  <el-dialog title="修改用户" :visible.sync="editFormVisible" :close-on-click-modal="false">
    <el-form :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
      <el-form-item prop="name" label="姓名">
        <el-input v-model="editForm.name" placeholder="请输入姓名" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="editForm.sex">
          <el-radio class="radio" :label="1">男</el-radio>
          <el-radio class="radio" :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker type="date" v-model="editForm.date" placeholder="请选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="editForm.address" placeholder="请输入地址" :autosize="{minRows: 2, maxRows:4}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="editFormVisible=false">取消</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>
  </aside>
</template>

<script>
import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../api/api';
export default {
  name: 'Tabledemo',
  data(){
    return {
      filters: {
        name: ''
      },
      show: false,
      addFormVisible: false,
      addLoading: false,
      editFormVisible: false,
      editLoading: false,
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false,
      users: [
      ],
      sels:[],
      addForm: {
        name: '',
        sex: 1,
        date: '',
        address: ''
      },
      editForm: {
        name: '',
        sex: 1,
        date: '',
        address: ''
      },
      addFormRules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
      }
    };
  },
  methods:{
    formatSex(row, column){
      return row.sex == 0?'女': row.sex == 1?'男':'未知';
    },
    handleCurrentChange(val){
      this.page = val;
      this.getUser();
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.getUser();
    },
    handleClick(row){
      console.log(row)
    },
    getUser(){
      let para = {
        name: this.filters.name,
        page: this.page,
        pageSize: this.pageSize
      };
      this.loading = true;
      getUserListPage(para).then((res) => {
        this.loading = false;
        this.total = res.data.total;
        this.users = res.data.users;

      });
    },
    reset(){
      this.filters.name = '';
      this.getUser();
    },
    batchRemove(){
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm('确定删除所选中的记录？', '提示', {
        type: "warning"
      }).then(()=>{
        this.loading = true;
        let para = { ids: ids};
        batchRemoveUser(para).then(res => {
          this.loading = false;
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.getUser();
        });
      }).catch(() => {});
    },
    selsChange(sels){
      this.sels = sels;
    },
    handleAddUser(){
      this.addFormVisible = true;
      this.addForm = {
        name: '',
        sex: 1,
        date: '',
        address: ''
      };
    },
    addSubmit(){
      this.$refs.addForm.validate((valid) => {
        if(valid){
          this.$confirm("确定提交吗？", '提示', {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            addUser(para).then(res =>{
              this.addLoading = false;
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUser();
            });
          }).catch(() => {});
        }
      });
    },
    editSubmit(){
      this.$refs.editForm.validate((valid) => {
        if(valid){
          this.$confirm("确定提交吗？", '提示', {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            editUser(para).then(res => {
              this.editLoading = false;
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getUser();
            }).catch(() => {});
          });
        }
      });
    },
    handleEdit(id, row){
      this.editFormVisible = true;
      let data = Object.assign({}, row);
      this.editForm = data;
    },
    handleRemove(row){
      this.$confirm('确定删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        let para = { id: row.id };
        removeUser(para).then((res) => {
          this.loading = false;
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.getUser();
        });
      }).catch(()=>{});
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>
