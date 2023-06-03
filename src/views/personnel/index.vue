<template>
    <div>
        <Content>
            <el-button type="primary" @click="ShowDialog">新增人员</el-button>

            <div style="width: 100%">
                <el-table :data="person_list" :height="taheight" style="width: 100%;">
                    <el-table-column prop="username" label="姓名"></el-table-column>
                    <el-table-column prop="phone_number" label="手机号"></el-table-column>
                    <el-table-column prop="role_name" label="用户角色"></el-table-column>
                    <el-table-column label="状态" width="100">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.flag === 1">正常</el-tag>
                            <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="small" @click="editUserAdmin(scope.row)">编辑</el-button>
                            <el-button size="small" @click="deleteAdminUser(scope.row,scope.$index)" type="danger">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" style="text-align: center">
                <el-pagination background layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </Content>

        <el-dialog
                title="提示"
                :visible.sync="dialog.upUser"
                append-to-body
                width="420px">

            <el-form ref="form" label-position="left" size="small" :model="form" label-width="120px">
                <el-form-item label="人员姓名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="form.phone_number"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-select @change="authorityChange" v-model="form.authority" placeholder="请选择用户角色">
                        <el-option :key="item.id" v-for="item in $store.state.role.RoleData" :label="item.role_name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="form.authority===3">
                    <el-form-item label="客户昵称">
                        <el-input v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="对接的省份">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="全部" value="0"></el-option>
                            <el-option v-for="item in CityData" :key="item.text" :label="item.text"
                                       :value="item.text"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="客服二维码">
                        <el-upload
                                :limit="1"
                                list-type="picture"
                                class="avatar-uploader"
                                action="#"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="handleAvatarSuccess">
                            <el-image class="avatar" v-if="image || form.WatchCode"
                                      :src="image || form.WatchCode"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                </div>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.upUser = false">取 消</el-button>
                <el-button type="primary" @click="querySubmit">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {mapActions, mapState} from "vuex";
import dialog from "element-ui/packages/dialog";
import {City} from "@/api/Ulit";


export default {
    data() {
        return {
            taheight: window.innerHeight - 210,
            CityData: [],
            image: '',
            state: false,

        }
    },
    components: {
        Content
    },
    methods: {
        // 删除用户
        deleteAdminUser(row, index) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row.index = index
                this.A_deleteAdminUser(row)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        ShowDialog() {
            this.state = false
            this.dialog.upUser = true
            let from = this.$store.state.personnel.form;
            for (let item in from) {
                from[item] = ""
            }
        },
        City() {
            City().then(res => {
                this.CityData = res.data.data
            })
        },
        authorityChange(e) {
            console.log(e)
        },
        handleAvatarSuccess(res) {
            console.log(res.raw)
            this.form.WatchCode = res.raw;
            this.image = window.URL.createObjectURL(res.raw)
        },
        querySubmit() {
            // true 修改
            if (this.state) {
                this.EditAdminUser()
            } else {
                this.onSubmit()
            }
        },
        // 修改用户数据
        editUserAdmin(row) {
            this.SelectCustomerUser(row);
            this.state = true
            this.dialog.upUser = true
        },
        ...mapActions('personnel', ['SelectAllAdminUser', 'A_deleteAdminUser', 'onSubmit', 'SelectCustomerUser', 'EditAdminUser']),
        ...mapActions('role', ['role_listData']),
    },
    mounted() {

        this.SelectAllAdminUser()
        this.City();
        this.role_listData();
    }
    ,
    computed: {

        ...mapState('personnel', ['person_list', 'dialog', 'form']),
    }

}
</script>

<style>
.el-select {
    width: 100%;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>