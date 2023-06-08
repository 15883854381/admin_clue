<template>
    <div>
        <Content>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="线索状态">
                    <el-select @change="getflat" :value="flat" placeholder="线索状态">
                        <el-option value="-1" label="全部"></el-option>
                        <el-option value="1" label="审核通过"></el-option>
                        <el-option value="2" label="正在审核"></el-option>
                        <el-option value="3" label="下架线索"></el-option>
                        <el-option value="0" label="无效线索"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialog.Clue_distribution= true">线索分配</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="batchUp">批量上传</el-button>
                    <el-button type="primary">批量下载</el-button>
                </el-form-item>
            </el-form>
            <div style="width: 100%">
                <el-table :data="clue_list" :height="taheight" style="width: 100%;" @row-click="getItemData">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column prop="nickname" show-overflow-tooltip label="发布者"></el-table-column>
                    <el-table-column prop="user_name" label="称呼"></el-table-column>
                    <el-table-column prop="brand" :show-overflow-tooltip="true" label="品牌"></el-table-column>
                    <el-table-column prop="address" :show-overflow-tooltip="true" label="城市"></el-table-column>
                    <el-table-column prop="phone_number" label="手机号码"></el-table-column>
                    <el-table-column prop="PhoneBelongingplace" :show-overflow-tooltip="true"
                                     label="号码归属地"></el-table-column>
                    <el-table-column prop="sales" label="售卖次数" width="80"></el-table-column>
                    <el-table-column prop="Tosell" label="已卖条数" width="80"></el-table-column>
                    <el-table-column prop="price" label="售卖三次价格">
                        <template slot-scope="scope">
                            <span>{{
                                `${scope.row.unitPrice_1}/${scope.row.unitPrice_2}/${scope.row.unitPrice_3}`
                                }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createtime" :show-overflow-tooltip="true" label="上传时间"></el-table-column>
                    <el-table-column prop="address" label="线索状态">
                        <template slot-scope="scope">
                            <el-tag type="info" v-if="scope.row.flag === 0">无效线索</el-tag>
                            <el-tag type="success" v-if="scope.row.flag === 1">审核通过</el-tag>
                            <el-tag type="warning" v-if="scope.row.flag === 2">正在审核</el-tag>
                            <el-tag type="danger" v-if="scope.row.flag === 3">已下架</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" style="text-align: center">
                <el-pagination background :page-size="page.pageSize" @current-change="getChange"
                               layout="prev, pager, next" :total="page.pageCount">
                </el-pagination>
            </div>
        </Content>

        <!--线索详情-->
        <el-dialog
                title="线索信息"
                :visible.sync="centerDialogVisible"
                :modal-append-to-body="false"
                width="30%">

            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="称呼">{{ itemData.user_name }}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{ itemData.phone_number }}</el-descriptions-item>
                <el-descriptions-item label="号码归属地">{{ itemData.PhoneBelongingplace }}</el-descriptions-item>
                <el-descriptions-item label="意向品牌">{{ itemData.brand }}</el-descriptions-item>
                <el-descriptions-item label="第【1】价格">{{ itemData.unitPrice_1 }}</el-descriptions-item>
                <el-descriptions-item label="第【2】价格">{{ itemData.unitPrice_2 }}</el-descriptions-item>
                <el-descriptions-item label="第【3】价格">{{ itemData.unitPrice_3 }}</el-descriptions-item>
                <el-descriptions-item label="合计价格">{{ itemData.amount }}</el-descriptions-item>
                <el-descriptions-item label="上传时间" :span="2">{{ itemData.createtime }}</el-descriptions-item>
                <el-descriptions-item label="购车地址" :span="2">{{ itemData.address }}</el-descriptions-item>

                <el-descriptions-item :span="4" label="线索类型">
                    <el-tag>{{ itemData.cart_type === 1 ? '新车' : '二手车' }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item :span="4" label="修改状态">
                    <el-radio-group :value="itemData.flag" @input="FlafRadio">
                        <el-radio :label="1">通过审核</el-radio>
                        <el-radio :label="0">无效线索</el-radio>
                        <el-radio :label="3">下架线索</el-radio>
                        <el-radio :label="2">线索审核</el-radio>
                    </el-radio-group>
                </el-descriptions-item>
            </el-descriptions>

            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">关 闭</el-button>
  </span>
        </el-dialog>
        <!--批量上传得界面-->
        <el-dialog
                title="批量上传"
                append-to-body
                :visible.sync="dialog.excel_box"
                width="400px">
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
                        :data="UpDataArray"
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
                            width="180">
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
                    <el-table-column
                            prop="phone_number"
                            label="手机号码"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="sales"
                            label="售卖次数">
                    </el-table-column>
                    <el-table-column
                            prop="unitPrice_1"
                            label="价格【1】">
                    </el-table-column>
                    <el-table-column
                            prop="unitPrice_2"
                            label="价格【2】">
                    </el-table-column>
                    <el-table-column
                            prop="unitPrice_3"
                            label="价格【3】">
                    </el-table-column>
                    <el-table-column
                            prop="PhoneBelongingplace"
                            label="号码归属地"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="cart_type"
                            label="车辆类型">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.cart_type === 1?'success':''">
                                {{ scope.row.cart_type === 1 ? '新车' : '二手车' }}
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
                    <el-button type="primary" @click="QueryAddData">确认添加</el-button>
                </span>
            </el-dialog>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="lookHistory">查看历史</el-button>
                <el-button @click="dialog.excel_box = false">取 消</el-button>
                <el-button type="primary" @click="queryUpdata">确认上传</el-button>
            </span>
        </el-dialog>
        <!--线索分配-->
        <el-dialog
                title="线索分配"
                :visible.sync="dialog.Clue_distribution"
                append-to-body
                width="30%">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="线索均分">
                    <el-select
                            @change="StaffChange"
                            v-model="distribution_form.staff_list"
                            multiple
                            collapse-tags
                            style="margin-left: 20px;"
                            placeholder="请选择">
                        <el-option
                                v-for="item in $store.state.personnel.support_staff_list"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.Clue_distribution = false">取 消</el-button>
                <el-button type="primary" @click="queryAllocation">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {mapState, mapActions} from "vuex";
import fa from "element-ui/src/locale/lang/fa";

export default {
    data() {
        return {
            centerDialogVisible: false,
            taheight: window.innerHeight - 250,
            itemData: {},
            flat: '-1',
            Execelfile: {},
            queryMapdata: [],
        }
    },
    components: {
        Content
    },

    methods: {


        getItemData(e) {
            this.itemData = e
            this.centerDialogVisible = true;

        },
        // 修改审核状态
        FlafRadio(e) {
            let data = {
                clue_id: this.itemData.clue_id,
                flag: e,
                type: this.itemData.cart_type
            }
            this.EditClueFlag(data).then(res => {
                if (this.Editstate) {
                    this.itemData.flag = e
                }
            })
        },
        // 查看历史
        lookHistory() {
            this.SelectUpDatas()
            this.dialog.Data_box = true;
        },
        // 确认上传 文件
        queryUpdata() {
            if (this.Execelfile?.name === undefined) {
                this.$message({
                    type: 'error',
                    message: '请先上传excel表格'
                })
                return false;
            }
            this.UpdateExcel(this.Execelfile).then(() => {
                this.$refs.uploadExcel.clearFiles()
            })

        },
        // 确认上传 数据
        QueryAddData() {
            this.queryBatch(this.queryMapdata)
        },


        getChange(e) {
            this.page.pageNumber = e
            this.CLue_list(this.page)
        },
        // 监听上传文件
        ChangeUpdateExcel(e) {
            this.Execelfile = e
        },
        // 查询状态
        getflat(e) {
            this.flat = e
            if (e === '-1') {
                this.CLue_list()
            } else {
                this.CLue_list({flag: e})
            }
        },
        batchUp() {
            this.dialog.excel_box = true;
        },
        // 查看历史  获取选中的数据
        handleSelectionChange(data) {
            this.queryMapdata = data.map((e) => {
                return e.clue_id
            })
        },
        // 禁用table 多选
        selected(row, index) {
            if (row.error_type === 1) {
                return false //不可勾选
            } else {
                return true; //可勾选
            }
        },
        // 状态
        tableRowClassName({row}) {
            if (row.error_type === 1) {
                return 'warning-row';
            } else
                return '';
        },
        // 监听选中客服人员列表
        StaffChange(e) {
            console.log(e)
        },
        // 确认分配
        queryAllocation() {
            this.a_queryAllocation()
        },
        ...mapActions('clue', ['CLue_list', 'EditClueFlag', 'ClueCountData', 'UpdateExcel', 'SelectUpDatas', 'queryBatch', 'a_queryAllocation']),
        ...mapActions('personnel', ['supportStaff'])
    }
    ,
    mounted() {
        this.CLue_list()
        this.supportStaff()
    }
    ,
    computed: {
        ...
            mapState('clue', ['clue_list', 'Editstate', 'page', 'dialog', 'UpDataArray', 'distribution_form'])
    }
    ,
}
</script>

<style>
.title {
    position: relative;
    top: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #202a34;
}

.title:before {
    content: "";
    width: 24px;
    height: 16px;
    border-left: 3px solid #0081ff;
    margin-right: 10px;
}

.el-card__body {
    padding: 10px;
}

.box-card {
    min-height: calc(100vh - 126px);
    margin: 20px 10px;
    padding: 10px;
}

.el-table .warning-row {
    background: #F56C6C;
}
</style>