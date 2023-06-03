<template>
    <div>
        <Content>
            <div style="width: 100%">
                <el-table :data="outbound_list" :height="taheight" style="width: 100%;">
                    <el-table-column prop="user_name" label="用户（姓）">
                        <template slot-scope="scope">
                            <span v-if="scope.row.user_name">{{
                                scope.row.user_name
                                }}{{ scope.row.sex === 1 ? '先生' : '女士' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone_number" label="手机号码"></el-table-column>
                    <el-table-column prop="PhoneBelongingplace" label="手机归属地"></el-table-column>
                    <el-table-column prop="sales" label="购车地区">
                        <template slot-scope="scope">
                            <span>{{ scope.row.province }}{{ scope.row.city }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" prop="sales" label="售卖次数"></el-table-column>
                    <el-table-column prop="sales" label="售卖价格">
                        <template slot-scope="scope">
                            <span>{{
                                `${scope.row.unitPrice_1}/${scope.row.unitPrice_2}/${scope.row.unitPrice_3}`
                                }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="线索状态">
                        <template slot-scope="scope">
                            <el-tag type="info" v-if="scope.row.flag === 0">无效线索</el-tag>
                            <el-tag type="success" v-if="scope.row.flag === 1">审核通过</el-tag>
                            <el-tag type="warning" v-if="scope.row.flag === 2">正在审核</el-tag>
                            <el-tag type="danger" v-if="scope.row.flag === 3">已下架</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="110" v-if="outbound_list[0].username" prop="username"
                                     label="线索审核人员"></el-table-column>
                    <el-table-column label="操作" align="right">
                        <template slot-scope="scope">
                            <el-button :disabled="ClickBtn" size="small" @click="callPhoneBtn(scope.row)"
                                       icon="el-icon-phone-outline"
                                       type="success" v-if="scope.row.flag===2">拨打电话
                            </el-button>
                            <el-button @click="EditClueBox(scope.row)" size="small" icon="el-icon-setting"
                                       type="primary">编辑
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
                :visible.sync="dialog.ClueEditbox"
                width="30%"
                append-to-body
        >


            <el-form ref="form" :model="form_clue" label-width="100px">
                <el-form-item label="用户（姓）">
                    <el-input v-model="form_clue.username"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="form_clue.sex">
                        <el-radio label="男" value="1"></el-radio>
                        <el-radio label="女" value="0"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="意向品牌">
                    <el-select
                            v-model="form_clue.region"
                            multiple
                            filterable
                            collapse-tags
                            style="margin-left: 20px;"
                            placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="购买地区">
                    <el-cascader
                            v-model="form_clue.brand"
                            value="id"
                            label="text"
                            :options="citylist"
                            @change="handleChange"></el-cascader>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {Clue_CallPhoneData, Clue_list_AuditData} from "@/api/Clue";
import {mapActions, mapState} from "vuex";
import {City} from "@/api/Ulit";

export default {
    data() {
        return {
            taheight: window.innerHeight - 210,
            ClickBtn: false,
            citylist: [],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            optionsData: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                }, {
                    value: 'daohang',
                    label: '导航',
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }]
        }
    },
    components: {
        Content
    },
    methods: {
        callPhoneBtn(e) {
            this.ClickBtn = true
            Clue_CallPhoneData({clue_id: e.clue_id}).then(res => {
                let {code, mes} = res.data
                this.$notify({
                    title: code === 200 ? '成功' : '拨打失败',
                    message: mes,
                    type: code === 200 ? 'success' : 'error'
                });
                setTimeout(() => {
                    this.ClickBtn = false
                }, 2000)
            })
        },
        EditClueBox(e) {
            console.log(e)
            this.dialog.ClueEditbox = true
        },
        CityData() {
            City().then(res => {
                this.citylist = res.data.data
                console.log(this.citylist)
            })
        },
        ...mapActions('clue', ['Clue_list_Audit'])
    },
    mounted() {
        this.Clue_list_Audit()
        this.CityData()
    },
    computed: {
        ...mapState('clue', ['outbound_list', 'dialog', 'form_clue'])
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