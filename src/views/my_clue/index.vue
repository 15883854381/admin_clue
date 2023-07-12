<template>
    <div>
        <Content>
            <el-button type="primary" @click="batchUp">批量上传</el-button>
            <div style="width: 100%">
                <el-table :data="ClueData" :height="taheight" style="width: 100%;">
                    <el-table-column prop="brand" label="汽车品牌">
                        <template slot-scope="scope">
                            <span v-if="scope.row.user_name">{{
                                scope.row.user_name
                                }}{{ scope.row.sex === 0 ? '女士' : '先生' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone_number" label="联系方式"></el-table-column>
                    <el-table-column prop="createtime" label="上传时间"></el-table-column>
                    <el-table-column prop="sales" label="购车地区">
                        <template slot-scope="scope">
                            <span>{{ scope.row.province }}{{ scope.row.city }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sales" label="售卖次数"></el-table-column>
                    <el-table-column prop="sales" label="售卖价格">
                        <template slot-scope="scope">
                            <span>
                                {{ scope.row.unitPrice_1 }}/
                                {{ scope.row.unitPrice_2 }}/
                                {{ scope.row.unitPrice_3 }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="线索类型">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.cart_type===1?'success':''">
                                {{ scope.row.cart_type === 1 ? '新车' : '二手车' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="线索状态">
                        <template slot-scope="scope">
                            <el-tag type="info" v-if="scope.row.flag === 0">无效线索</el-tag>
                            <el-tag type="success" v-if="scope.row.flag === 1">审核通过</el-tag>
                            <el-tag type="warning" v-if="scope.row.flag === 2">正在审核</el-tag>
                            <el-tag type="danger" v-if="scope.row.flag === 3">已下架</el-tag>
                            <el-tag v-if="scope.row.flag === 4">待上线</el-tag>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div slot="footer" style="text-align: center">
                <el-pagination @current-change="ChangePage" background layout="prev, pager, next"
                               :page-size="page.pageSize" :total="page.PageCount">
                </el-pagination>
            </div>
            <!-- 批量上传得界面 -->
            <el-dialog
                    title="批量上传"
                    append-to-body
                    :visible.sync="dialog.excel_box"
                    width="450px">
                <el-upload
                        :on-change="ChangeUpdateExcel"
                        class="upload-demo"
                        ref="uploadExcel"
                        drag
                        action="#"
                        :limit="1"
                        :auto-upload="false"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-dialog
                        title="excel数据"
                        append-to-body
                        :visible.sync="dialog.Data_box"
                        width="70%">

                    <el-table
                            :data="SelectUpData"
                            height="500"
                            border
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                type="selection"
                                :selectable="selected"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="user_name"
                                label="用户名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="cart_type"
                                label="性别">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.cart_type === 1?'success':''">
                                    {{ scope.row.sex === 1 ? '男' : scope.row.sex === 0 ? '女' : '' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="phone_number" label="手机号码" width="180"></el-table-column>
                        <el-table-column prop="sales" label="售卖次数"></el-table-column>
                        <el-table-column prop="unitPrice_1" label="价格【1】"></el-table-column>
                        <el-table-column prop="unitPrice_2" label="价格【2】"></el-table-column>
                        <el-table-column prop="unitPrice_3" label="价格【3】"></el-table-column>
                        <el-table-column prop="PhoneBelongingplace" label="号码归属地" show-overflow-tooltip></el-table-column>
                        <el-table-column
                                prop="cart_type"
                                label="车辆类型">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.cart_type === 1 || scope.row.cart_type === 2 "
                                        :type="scope.row.cart_type === 1?'success':''">
                                    {{ scope.row.cart_type === 1 ? '新车' : scope.row.cart_type === 2 ? '二手车' : '' }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="error"
                                show-overflow-tooltip
                                label="提示信息">
                        </el-table-column>
                    </el-table>

                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialog.Data_box = false">取 消</el-button>
                        <el-button type="primary" @click="QueryAddData">上传选中</el-button>
                        <el-button type="primary" @click="QueryAddData">全部上传</el-button>
                    </span>
                </el-dialog>
                <span slot="footer" class="dialog-footer">

                    <el-button @click="DownLoadExcel">下载模板</el-button>
                             <el-button @click="lookHistory">查看历史</el-button>
                            <el-button @click="dialog.excel_box = false">取 消</el-button>
                            <el-button type="primary" @click="queryUpdata">确认上传</el-button>
                        </span>
            </el-dialog>
        </Content>
    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {mapActions, mapState} from "vuex";

export default {
    data() {
        return {
            taheight: window.innerHeight - 230,
            queryMapdata: []
        }
    },
    components: {
        Content
    },
    methods: {
        ...mapActions('myClue', ['AdminClueDataList', 'UpbatchUp', 'SelectUp', 'queryBatch']),
        ChangePage(e) {
            this.page.pageNumber = e
            this.AdminClueDataList()
        },
        // 获取到上传的excel文件
        ChangeUpdateExcel(e) {
            this.updata.file = e.raw
        },
        // 批量上传按钮   上传界面
        batchUp() {
            this.dialog.excel_box = true;
        },

        // 查看历史上传
        lookHistory() {
            this.SelectUp()
            this.dialog.Data_box = true
        },
        // 确认上传
        queryUpdata() {
            this.UpbatchUp()
        },

        // 禁用table 多选
        selected(row, index) {
            return row.error_type !== 1
        },
        // 表格列的状态
        tableRowClassName({row}) {
            return row.error_type === 1 ? 'warning-row' : ''
        },


        // 获取历史列表选中的数据
        handleSelectionChange(data) {
            if (data.length > 20) {
                this.$message.error('最多选 20 条线索上传')
                return false;
            }
            this.queryMapdata = data.map((e) => {
                return e.clue_id
            })
        },
        // 确认上传的数据历史数据界面
        QueryAddData() {
            if (this.queryMapdata.length) {
                this.queryBatch({data: this.queryMapdata.toString()})
            } else {
                this.queryBatch()
            }
        },
        // 下载 excel 表格
        DownLoadExcel() {
            let url = process.env.NODE_ENV === "production" ? `http://s.199909.xyz/` : "http://h.199909.xyz/"
            window.open(url + 'storage/excel/%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF%E6%96%87%E4%BB%B6.zip');
        }
    },
    computed: {
        ...mapState('myClue', ['ClueData', 'page', 'dialog', 'SelectUpData', 'updata'])
    },
    mounted() {
        this.AdminClueDataList()
    }
}
</script>

<style>
.el-table .warning-row {
    background: #F56C6C;
}

.upload-demo .el-upload-dragger {
    width: 412px;

}
</style>