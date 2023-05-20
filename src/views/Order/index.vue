<template>
    <div>
        <Content>
            <div style="width: 100%">
                <el-table @row-click="getorderitem" :data="new_order_flag" :height="taheight" style="width: 100%;">
                    <el-table-column prop="nickname" width="100" show-overflow-tooltip
                                     label="用户昵称"></el-table-column>
                    <el-table-column prop="phone_number" width="150" label="手机号"></el-table-column>
                    <el-table-column prop="price" width="100" align="center" label="线索价格"></el-table-column>
                    <el-table-column prop="buy_num" width="120" align="center" label="购买数量条数"></el-table-column>
                    <el-table-column prop="creat_time" show-overflow-tooltip label="创建时间"></el-table-column>
                    <el-table-column prop="payment_time" show-overflow-tooltip label="付款时间"></el-table-column>
                    <el-table-column prop="description" show-overflow-tooltip label="线索描述"></el-table-column>
                    <el-table-column prop="out_trade_no" label="商户订单号"></el-table-column>
                    <el-table-column prop="transaction_id" show-overflow-tooltip label="微信订单号"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.type">{{ scope.row.title }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" style="text-align: center">
                <el-pagination  @current-change="getChange" background
                               layout="prev, pager, next" :total="page.pageCount"
                               :page-size="page.pageSize"></el-pagination>
            </div>
        </Content>

        <el-dialog
                title="订单详情"
                :visible.sync="dialog.orderbox"
                width="60%"
                :modal-append-to-body="false"
        >
            <el-descriptions direction="horizontal" :column="2" border>
                <el-descriptions-item label="用户昵称">{{ data.itemData.nickname }}</el-descriptions-item>
                <el-descriptions-item label="用户手机">{{ data.itemData.phone_number }}</el-descriptions-item>
                <el-descriptions-item label="购买线索价格">{{ data.itemData.price }}</el-descriptions-item>
                <el-descriptions-item label="购买数量">{{ data.itemData.buy_num }}</el-descriptions-item>
                <el-descriptions-item label="订单创建时间">{{ data.itemData.creat_time }}</el-descriptions-item>
                <el-descriptions-item label="订单付款时间">{{ data.itemData.payment_time }}</el-descriptions-item>
                <el-descriptions-item label="商户订单号">{{ data.itemData.out_trade_no }}</el-descriptions-item>
                <el-descriptions-item label="微信订单号">{{ data.itemData.transaction_id }}</el-descriptions-item>
                <el-descriptions-item label="订单状态">
                    <el-tag size="small" :type="data.itemData.type">{{ data.itemData.title }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item  label="线索类型">
                    <el-tag>{{ data.itemData.cart_type === 1 ? '新车' : '二手车' }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item v-if="data.itemData.flat === 5" label="审核状态">
                    <el-radio-group @input="editFlat(data.itemData)" v-model="flat">
                        <el-radio :label="7">通过申述</el-radio>
                        <el-radio :label="6">驳回申述</el-radio>
                    </el-radio-group>
                </el-descriptions-item>
                <el-descriptions-item :span="3" label="申述描述">
                    <span>
                        {{ data.itemData.refund_reason }}
                    </span>
                </el-descriptions-item>
            </el-descriptions>

            <template v-if="data.itemData.flat === 5 || data.itemData.flat === 4|| data.itemData.flat === 6">
                <el-table
                        :data="notifyurlData"
                        height="300"
                        style="width: 100%;">
                    <el-table-column
                            prop="telA"
                            label="主叫号码"
                            width="180"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="telB"
                            label="被叫号码"
                            width="180"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="duration"
                            label="通话时长（秒）"
                            width="180"
                    >
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="begin_time"-->
                    <!--                            label="通话开始时间"-->
                    <!--                            >-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="end_time"-->
                    <!--                            label="通话结束时间"-->
                    <!--                            >-->
                    <!--                    </el-table-column>-->

                    <el-table-column label="录音">
                        <!--                        <template slot-scope="scope">-->
                        <!--                            <el-tag v-if="scope.row.status === '1'">接通</el-tag>-->
                        <!--                            <el-tag v-if="scope.row.status === '0'" type="danger">接通</el-tag>-->
                        <!--                        </template>-->
                        <template slot-scope="scope" v-if="scope.row.record_file_url">
                            <audio controls>
                                <source :src="scope.row.record_file_url" type="audio/wav">
                            </audio>
                        </template>
                    </el-table-column>

                    <el-table-column label="状态" width="100">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.status === '1'">接通</el-tag>
                            <el-tag v-if="scope.row.status === '0'" type="danger">未接通</el-tag>
                        </template>
                    </el-table-column>

                </el-table>
            </template>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.orderbox = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            taheight: window.innerHeight - 210,
            flat: ''
        }
    },
    mounted() {
        this.OrderCountData().then(res => {
            console.log(this.page)
        })
        this.OrderData()
    },
    methods: {
        ...mapActions('order', ['OrderData', 'EditOrderFlatData', 'SelectnotifyurlData', 'OrderCountData']),
        getorderitem(e) {
            console.log(e)
            this.data.itemData = e
            this.dialog.orderbox = true
            this.SelectnotifyurlData({out_trade_no: e.out_trade_no}).then(res => {
                console.log(this.notifyurlData)
            })
        },
        editFlat(e) {
            this.$confirm('请谨慎核对申述信息，此操作一旦操作就不再修改！！！', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.EditOrderFlatData({index: e.index, id: e.id, flat: this.flat})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        getChange(e) {
            this.page.pageNumber = e
            this.OrderData(this.page)


        }
    },
    computed: {
        ...mapState('order', ['orderlist', 'dialog', 'data', 'notifyurlData', 'page']),
        ...mapGetters('order', ['new_order_flag'])


    },
    components: {
        Content
    },

}
</script>

<style>

</style>