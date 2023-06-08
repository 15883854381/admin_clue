<template>
    <div>
        <Content>
            <div>
                <el-form :inline="true" ref="form" label-width="80px">
                    <el-form-item label="手机号码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                    <!--                    <el-form-item>-->
                    <!--                        <el-select placeholder="请选择">-->
                    <!--                            <el-option label="通过审核" value="通过审核"></el-option>-->
                    <!--                            <el-option label="无效线索" value="无效线索"></el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </el-form-item>-->
                </el-form>


            </div>
            <div style="width: 100%">
                <el-table :data="outbound_list" :height="taheight" style="width: 100%;">
                    <el-table-column prop="nickname" show-overflow-tooltip label="发布者"></el-table-column>
                    <el-table-column label="用户（姓）">
                        <template slot-scope="scope">
                            <span v-if="scope.row.user_name">{{
                                scope.row.user_name
                                }}{{ scope.row.sex === 1 ? '先生' : '女士' }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="phone_number" label="手机号码"></el-table-column>
                    <el-table-column prop="PhoneBelongingplace" label="手机归属地"></el-table-column>
                    <el-table-column prop="CartBrand" show-overflow-tooltip label="意向品牌"></el-table-column>

                    <el-table-column prop="sales" show-overflow-tooltip label="购车地区">
                        <template slot-scope="scope">
                            <span>{{ scope.row.province }}{{ scope.row.city }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" prop="sales" label="售卖次数"></el-table-column>
                    <el-table-column width="80" prop="Tosell" label="以售卖"></el-table-column>
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
                            <el-tag v-if="scope.row.flag === 4">待上线</el-tag>
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
                <el-pagination background :page-size="pages.pageSize" @current-change="ChangePage"
                               layout="prev, pager, next" :total="pages.pageCount">
                </el-pagination>
            </div>

        </Content>

        <el-dialog
                title="完善线索信息"
                :visible.sync="dialog.ClueEditbox"
                width="600px"
                append-to-body
        >

            <el-form ref="form" :model="form_clue" label-width="100px">
                <el-form-item label="用户姓名">
                    <el-input v-model="form_clue.user_name"></el-input>
                </el-form-item>


                <el-form-item label="用户性别">
                    <el-radio-group v-model="form_clue.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="意向品牌">
                    <el-select
                            v-model="form_clue.CartBrandID"
                            @change="ChangeCarBrand"
                            filterable
                            collapse-tags
                            placeholder="请选择">
                        <el-option
                                v-for="item in $store.state.Ulit.CarBrandList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="线索标签">
                    <el-cascader
                            v-model="tagesMap"
                            @change="ChangeTags"
                            :options="userTags_list"
                            :props="props"
                            collapse-tags
                            clearable></el-cascader>
                </el-form-item>
                <el-form-item label="购买地区">
                    <el-cascader
                            v-model="data.BuyCarCityFrom"
                            :props="{value:'id',label:'text'}"
                            :options="citylist"
                            @change="getBuyCarCity"
                    ></el-cascader>
                </el-form-item>

                <el-alert
                        v-show="form_clue.flag === 2"
                        title="注意此处只能做【1】次修改，修改后便不能再次做出修改"
                        type="warning">
                </el-alert>
                <el-form-item v-if="form_clue.flag === 2" label="线索状态">
                    <el-radio-group v-model="form_clue.flag">
                        <el-radio :label="1">通过审核</el-radio>
                        <el-radio :label="0">无效线索</el-radio>
                        <!--                        <el-radio :label="3">下架线索</el-radio>-->
                        <!--                        <el-radio :label="2">线索审核</el-radio>-->
                    </el-radio-group>

                </el-form-item>

                <el-form-item label="线索类型">
                    <el-tag type="success" v-if="form_clue.cart_type === 1">新车</el-tag>
                    <el-tag type="danger" v-if="form_clue.cart_type === 2">二手车</el-tag>
                </el-form-item>
            </el-form>
            <el-table
                    :data="recordingData"
                    height="250"
                    border
                    style="width: 100%">
                <el-table-column align="center" width="55" label="选择">
                    <template slot-scope="scope">
                        <!-- 可以手动的修改label的值，从而控制选择哪一项 -->
                        <el-radio class="radio" @change="ChangeNotifyurl(scope.row)" v-model="form_clue.notifyurlid"
                                  :label="scope.row.id"
                        >&nbsp;
                        </el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="录音">
                    <template slot-scope="scope">
                        <audio controls style="width: 100%">
                            <source :src="scope.row.record_file_url" type="audio/wav" width="300">
                        </audio>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="120px">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status === '1'">接通</el-tag>
                        <el-tag type="danger" v-if="scope.row.status === '0'">未接通</el-tag>
                    </template>
                </el-table-column>
            </el-table>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.ClueEditbox = false">取 消</el-button>
                <el-button type="primary" @click="queryEditBtn">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {Clue_CallPhoneData, Clue_list_AuditData} from "@/api/Clue";
import {mapActions, mapState} from "vuex";
import {CarBrand, City} from "@/api/Ulit";

export default {
    data() {
        return {
            taheight: window.innerHeight - 250,
            ClickBtn: false,
            citylist: [],
            CarBrandList: [],
            props: {multiple: true, value: 'id', label: 'text'},
        };

    },
    components: {
        Content
    }
    ,
    methods: {
        // 拨打电话
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
        }
        ,
        // 编辑弹窗的界面
        EditClueBox(e) {
            for (let item in this.form_clue) {
                switch (item) {
                    case 'CartBrandID':
                        this.$set(this.form_clue, item, Number(e[item]) || null)
                        continue
                    case 'provinceID':
                        this.$nextTick(() => {
                            this.$set(this.data, 'BuyCarCityFrom', [e.provinceID, e.cityID])
                        })
                        this.$set(this.form_clue, 'provinceID', e.provinceID)
                        this.$set(this.form_clue, 'cityID', e.cityID)
                        continue
                    case  'cityID':
                        continue
                }
                this.$set(this.form_clue, item, e[item])
            }
            this.SelectnotifyurlData({out_trade_no: e.clue_id})
            this.singularTags({clue_id: e.clue_id})
            this.dialog.ClueEditbox = true

        },
        // 城市数据
        CityData() {
            City().then(res => {
                this.citylist = res.data.data
                console.log(this.citylist)
            })
        },
        // change 获取购车地区
        getBuyCarCity(e) {
            this.$set(this.form_clue, 'provinceID', e[0])
            this.$set(this.form_clue, 'cityID', e[1])
        },
        // 获取意向品牌
        ChangeCarBrand(e) {
            console.log(e)
        },
        // 确认编辑弹窗
        queryEditBtn() {

            let iFArr = [1, 4, 0];
            if (!iFArr.includes(this.form_clue.flag)) {
                this.$message.error('请选择线索状态')
                return false;
            }

            if (this.form_clue.flag === 1 || this.form_clue.flag === 4) {
                if (this.data.phoneData.status !== '1') {
                    this.$message.error('请选择有效的录音')
                    return false
                }
                for (let item in this.form_clue) {
                    if (this.form_clue[item] === '' || this.form_clue[item] === null) {
                        this.$message.error('请完善所有的数据')
                        return false;
                    }
                }
                if (this.form_clue.notifyurlid === undefined) {
                    this.$message.error('还没有通话录音，请选择录音')
                    return false;
                }
            }
            this.EditClueData(this.form_clue)
        },
        ChangeTags(tages) {
            this.form_clue.tages = tages.map(item => {
                return item[1]
            })
        },
        // 监听录音的选择
        ChangeNotifyurl(e) {
            if (e.status === '0') {
                this.$message.error('请选择有效的录音')
            }
            this.data.phoneData = e
        }
        ,
        ChangePage(e) {
            this.pages.pageNumber = e
            this.Clue_list_Audit(this.pages);
        }
        ,

        ...mapActions('Ulit', ['CarBrandData', 'SelectnotifyurlData', 'userTags']),
        ...mapActions('clue', ['Clue_list_Audit', 'EditClueData', 'singularTags'])
    }
    ,
    mounted() {
        this.Clue_list_Audit()
        this.CityData()
        this.CarBrandData()
        this.userTags()
    }
    ,
    computed: {
        ...
            mapState('clue', ['outbound_list', 'dialog', 'form_clue', 'data', 'pages', 'tagesMap']),
        ...
            mapState('Ulit', ['recordingData', 'userTags_list'])
    }
    ,
}
</script>

<style>
.el-select, .el-cascader {
    width: 100%;
}
</style>