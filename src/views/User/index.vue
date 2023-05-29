<template>
    <Content>
        <div style="width: 100%">
            <el-table :data="tableData" :height="taheight" style="width: 100%;">
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
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="EditUserFlasBtn(scope.row,scope.$index)">审核信息</el-button>
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
                :modal-append-to-body="false"
                width="30%">

            <el-descriptions v-if="UserProcessData.type" direction="vertical" :column="4" border>
                <el-descriptions-item label="公司名称">{{ UserProcessData.companyName }}</el-descriptions-item>
                <el-descriptions-item label="认证类型">{{ UserProcessData.type === 1 ? '个人' : '公司' }}
                </el-descriptions-item>
                <el-descriptions-item label="联系人" :span="2">{{ UserProcessData.username }}</el-descriptions-item>
                <el-descriptions-item label=联系电话>
                    {{ UserProcessData.phone_number }}
                </el-descriptions-item>
                <el-descriptions-item label=图片>
                    <el-image
                            v-for="item in UserProcessData.img"
                            :key="item"
                            style="width: 100px; height: 100px"
                            :src="item"
                            :preview-src-list="UserProcessData.img">
                    </el-image>
                </el-descriptions-item>
            </el-descriptions>

            <div style="margin: 20px 0">
                <el-input v-model="notesName" placeholder="请公司备注名称"></el-input>
            </div>


            <el-radio-group v-model="flas">
                <el-radio :label="1">审核通过</el-radio>
                <el-radio :label="2">审核不通过</el-radio>
                <el-radio :label="4">只可上传</el-radio>
                <el-radio :label="5">只可购买</el-radio>
            </el-radio-group>

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
            flas: 1,
            update: {},
            notesName: '',
            page: {
                pageSize: 10,
                pageNumber: 1,
                pageCunt: 0,
            },
            UserProcessData: {},
        }
    },
    mounted() {
        this.getUserAll();
    },
    methods: {
        getUserAll(data) {
            getUserAll(data).then(res => {
                let {count, data} = res.data.data
                this.page.pageCunt = count
                this.tableData = data
            })
        },
        EditUserFlasBtn(row, index) {
            this.flas = row.flas
            this.notesName = row.notes_name
            this.update = row
            this.update.index = index
            this.dialogVisible = true;
            this.UserProcessData = {}
            this.getEnevtUserProcess(row.id)
        },
        // 确认修改用户信息
        queryEditFlas() {
            if (this.UserProcessData?.type === undefined) {
                this.$message({
                    message: '用户还没有上传审核信息',
                    type: 'error'
                });
                return false
            }
            editUserFlas({
                ...this.update, ...{
                    flas: this.flas,
                    notesName: this.notesName,
                    type: this.UserProcessData.type
                }
            }).then(res => {
                let {code, mes} = res.data
                if (code !== 200) {
                    this.$message({
                        message: mes,
                        type: 'error'
                    });
                    return false;
                }
                this.update.flas = this.flas
                this.$message({
                    message: mes,
                    type: 'success'
                });
                this.dialogVisible = false;
            })
        },
        EditPage(e) {
            this.page.pageNumber = e
            this.getUserAll(this.page)
        },
        getEnevtUserProcess(e) {
            getEnevtUserProcessData({id: e}).then(res => {
                let {data, code} = res.data
                if (code === 200) {
                    this.UserProcessData = data
                }
            })
        }
    }
}
</script>

<style scoped>

</style>