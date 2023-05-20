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
                    <el-button type="primary">批量上传</el-button>
                    <el-button type="primary">批量下载</el-button>
                </el-form-item>
            </el-form>
            <div style="width: 100%">
                <el-table :data="clue_list" :height="taheight" style="width: 100%;" @row-click="getItemData">

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

    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {mapState, mapActions} from "vuex";

export default {
    data() {
        return {
            centerDialogVisible: false,
            taheight: window.innerHeight - 250,
            itemData: {},
            flat: '-1'
        }
    },
    components: {
        Content
    },

    methods: {
        ...mapActions('clue', ['CLue_list', 'EditClueFlag', 'ClueCountData']),
        getItemData(e) {
            this.itemData = e
            this.centerDialogVisible = true;

        },
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
        getChange(e) {
            this.page.pageNumber = e
            this.CLue_list(this.page)
        },
        getflat(e) {
            this.flat = e
            if (e === '-1') {
                this.CLue_list()
            } else {
                this.CLue_list({flag: e})
            }
        }
    },
    mounted() {
        this.CLue_list()
        // this.ClueCountData()
    },
    computed: {
        ...mapState('clue', ['clue_list', 'Editstate', 'page'])
    },
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
</style>