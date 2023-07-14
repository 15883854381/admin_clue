<template>
    <Content>
        <div style="width: 100%">
            <el-table size="mini" :data="tableData" :height="taheight" style="width: 100%;">
                <el-table-column prop="nickname" show-overflow-tooltip label="微信昵称" width="180"></el-table-column>
                <el-table-column prop="name" label="微信头像" width="180">
                    <template slot-scope="scope">
                        <el-avatar :size="50" :src="scope.row.headimgurl"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="phone_number" label="手机号码"></el-table-column>
                <el-table-column prop="balance" label="账户余额"></el-table-column>

                <el-table-column prop="type" label="用户类型">
                    <template slot-scope="scope">
                        <span>{{ scope.row.type === 1 ? '个人' : '公司' }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="upClueNum" label="上传线索数量"></el-table-column>
                <!--             0 新注册   1 审核通过 2 审核不通过 3 审核中 4 只能上传 5 只能购买 -->
                <el-table-column prop="flas" label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.flas === 0" type="warning">新注册用户</el-tag>
                        <el-tag v-else-if="scope.row.flas=== 1 " type="success">审核通过</el-tag>
                        <el-tag v-else-if="scope.row.flas===2" type="danger">审核不通过</el-tag>
                        <el-tag v-else-if="scope.row.flas===3" type="warning">等待审核</el-tag>
                        <el-tag v-else-if="scope.row.flas===4">只可上传</el-tag>
                        <el-tag v-else-if="scope.row.flas===5">只可购买</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="notes_name" label="备注名称"></el-table-column>
                <el-table-column prop="enroll_time" show-overflow-tooltip label="注册时间"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="EditUserFlasBtn(scope.row,scope.$index)">审核信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div slot="footer" style="text-align: center">
            <el-pagination @current-change="EditPage" background layout="prev, pager, next" :page-size="page.pageSize"
                           :total="page.pageCunt">
            </el-pagination>
        </div>
        <el-dialog
                title="审核信息"
                :visible.sync="dialogVisible"
                destroy-on-close
                :modal-append-to-body="false"
                width="30%">
            <el-form ref="form" :model="ExamineForm" label-width="80px">
                <el-form-item label="主体">
                    <el-radio-group v-model="ExamineForm.type">
                        <el-radio :label="1">个人</el-radio>
                        <el-radio :label="2">公司</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="ExamineForm.username"></el-input>
                </el-form-item>
                <div v-if="ExamineForm.type === 2">

                    <el-form-item label="公司名称">
                        <el-input v-model="ExamineForm.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="营业执照">
                        <el-upload
                                :limit="1"
                                list-type="picture"
                                class="avatar-uploader"
                                action="#"
                                :show-file-list="false"
                                :auto-upload="false"
                                :on-change="handleAvatarSuccess">
                            <el-image class="avatar" v-if="image" :src="image"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </div>

                <el-form-item label="备注名称">
                    <el-input v-model="ExamineForm.notesName" placeholder="请公司备注名称"></el-input>
                </el-form-item>

                <el-form-item label="审核状态">
                    <el-radio-group v-model="ExamineForm.flas">
                        <el-radio :label="1">审核通过</el-radio>
                        <el-radio :label="2">审核不通过</el-radio>
                        <el-radio :label="4">只可上传</el-radio>
                        <el-radio :label="5">只可购买</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="queryEditFlas">确 定</el-button>
            </span>
        </el-dialog>
    </Content>

</template>

<script>
import {getUserAll, editUserFlas, getEnevtUserProcessData} from '@/api/user'
import Content from "@/components/Content/index.vue";
import row from "element-ui/packages/row";

export default {
    name: "index",
    components: {Content},
    data() {
        return {
            tableData: [],
            taheight: window.innerHeight - 210,
            dialogVisible: false,
            update: {},
            page: {
                pageSize: 10,
                pageNumber: 1,
                pageCunt: 0,
            },
            UserProcessData: {},
            ExamineForm: {
                notesName: '',
                flas: 1,
                companyName: '',
                openid: '',
                type: '',
                username: '',
                id: '',
            },
            image: '',
        }
    },
    mounted() {
        this.getUserAll();
    },
    methods: {

        // 获取列表数据
        getUserAll(data) {
            getUserAll(data).then(res => {
                let {count, data} = res.data.data
                this.page.pageCunt = count
                this.tableData = data
            })
        },
        // 编辑状态
        EditUserFlasBtn(row, index) {
            this.getEnevtUserProcess(row.id)
            this.update = row
            this.dialogVisible = true;
        },
        // 确认修改用户信息
        queryEditFlas() {
            this.ExamineForm.openid = this.update.id
            const FromData = new FormData();
            for (let item in this.ExamineForm) {
                FromData.append(item, this.ExamineForm[item] || '')
            }

            editUserFlas(FromData).then(res => {
                let {code, mes} = res.data
                if (code !== 200) {
                    this.$message.error(mes);
                    return false;
                }
                this.update.flas = this.ExamineForm.flas
                this.update.notes_name = this.ExamineForm.notesName
                this.$message.success(mes);
                this.dialogVisible = false;
            })
        },

        // 修改页码
        EditPage(e) {
            this.page.pageNumber = e
            this.getUserAll(this.page)
        },

        // 点击编辑时的请求数据
        getEnevtUserProcess(e) {
            getEnevtUserProcessData({id: e}).then(res => {
                let {data, code} = res.data
                if (code === 200) {
                    this.image = data.img
                    this.ExamineForm = data
                } else {
                    this.ExamineForm = {}
                }


            })
        },
        // 上传文件的框框
        handleAvatarSuccess(res, file) {
            this.ExamineForm.ImgFile = res.raw
            this.image = window.URL.createObjectURL(res.raw);
        },
    }
}
</script>

<style>
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