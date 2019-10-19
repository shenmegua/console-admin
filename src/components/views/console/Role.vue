<template>
  <aside>
    <!-- {{this.$store.state.count}} -->
    <!-- 查询条件 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :model="roleFilters" :inline="true">
        <el-form-item>
          <el-input v-model="roleFilters.roleId" placeholder="角色编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="roleFilters.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getRole">查询</el-button>
            <el-button type="primary" v-on:click="reset">重置</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 按钮 -->
    <el-col :span="24">
      <el-button type="primary" size="mini" v-on:click="handleAddRole">新增</el-button>
    </el-col>
    <!-- 角色列表 -->
    <el-table :data="roleData" stripe border v-loading="loading" @selection-change="selsChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="角色编号" prop="roleId" width="100"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="150"></el-table-column>
      <el-table-column label="显示顺序" prop="orderby" ></el-table-column>
      <el-table-column label="角色状态" prop="status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" disabled active-text="启用" inactive-text="禁用"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="create_time"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primay" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-col :span="24">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="total, sizes, prev, pager, next, jumper" background @size-change="handleSizeChange" @current-change	="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20 ,50, 100]" :page-size="pageSize" :total="total" style="float: right"></el-pagination>
    </el-col>

    <!-- 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="addRoleFormVisible" :close-on-click-modal="false">
      <el-form :model="addRoleForm" ref="addRoleForm" :rules="addRoleRules" label-width="80px">
        <el-form-item label="角色编号" prop="roleId">
          <el-input v-model="addRoleForm.roleId" placeholder="请输入角色编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName" placeholder="请输入角色名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="addRoleForm.orderby" placeholder="请输入顺序" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="addRoleForm.status" active-text="启用" inactive-text="禁用"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="addRoleForm.desc" :autosize="{minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click.native="addRoleFormVisible=false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色 -->
    <el-dialog title="修改角色" :visible.sync="editRoleFormVisible" :close-on-click-modal="false">
      <el-form :model="editRoleForm" ref="editRoleForm" :rules="addRoleRules" label-width="80px">
        <el-form-item label="角色编号" prop="roleId">
          <el-input v-model="editRoleForm.roleId" placeholder="请输入角色编号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="editRoleForm.roleName" placeholder="请输入角色名称" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="editRoleForm.orderby" placeholder="请输入顺序" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="editRoleForm.status" active-text="启用" inactive-text="禁用"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="editRoleForm.desc" :autosize="{minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editRoleFormVisible=false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确定</el-button>
      </div>
    </el-dialog>
  </aside>
</template>

<script>
import {getRoleListPage} from '../../../api/api'
export default {
  name: 'Role',
  data(){
    return {
      roleFilters:{
        roleName: '',
        roleId: ''
      },
      sels: [],
      roleData: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 0,
      addLoading: false,
      addRoleFormVisible: false,
      addRoleForm: {
        roleId: '',
        roleName: '',
        orderby: '',
        status: true,
        desc: ''
      },
      addRoleRules: {
        roleId:[
          {required: true, message: '请输入角色编号', trigger: 'blur'}
        ]
      },
      editRoleFormVisible: false,
      editLoading: false,
      editRoleForm: {
        roleId: '',
        roleName: '',
        orderby: '',
        status: true,
        desc: ''
      }
    };
  },
  methods: {
    getRole(){
      let para = {
        roleId: this.roleFilters.roleId,
        roleName: this.roleFilters.roleName,
        page: this.page,
        pageSize: this.pageSize
      }
      this.loading = true;
      getRoleListPage(para).then((res) => {
        this.loading = false;
        this.total = res.data.total;
        this.roleData = res.data.roleList;
      }).catch(()=>{});
    },
    reset(){
      this.roleFilters.roleName = '';
      this.roleFilters.roleId
      getRole();
    },
    handleAddRole(){
      this.addRoleFormVisible = true;
      this.addRoleForm = {
        roleId: '',
        roleName: '',
        orderby: '',
        status: true,
        desc: ''
      }
    },
    handleEdit(id, row){
      this.editRoleFormVisible = true;
      let data = Object.assign({}, row);
      this.editRoleForm = data;
      console.log(this.editRoleForm);
    },
    handleRemove(row){
      this.$confirm('确定删除吗？', '提示', {
        type: 'danger'
      }).then(() => {
        this.loading = true;
        let para = {roleId: row.roleId};
        this.loading = false;
        this.getRole();
      }).catch(() => {});
    },
    batchRemove(){

    },
    selsChange(sels){
      this.sels = sels;
    },
    handleSizeChange(val){
      this.pageSize = val;
      getRole();
    },
    handleCurrentChange(val){
      this.page = val;
      this.getRole();
    },
    addSubmit(){

    },
    editSubmit(){

    }
  },
  mounted() {
    this.getRole();
  }
}
</script>
