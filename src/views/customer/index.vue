<template>
    <div>
        <Content>
            <div style="width: 100%">
                <el-button type="primary" @click="BoxShow.showDiagal=true">添加客服</el-button>
                <el-table :data="customer" :height="taheight" style="width: 100%;">
                    <el-table-column prop="nickname" label="姓名"></el-table-column>
                    <el-table-column prop="WatchCode" label="二维码">
                        <template slot-scope="scope">
                            <el-avatar style="width: 60px; height: 60px" shape="square" size="large"
                                       :src="scope.row.WatchCode"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column prop="phone_number" label="手机号"></el-table-column>
                    <el-table-column prop="region" label="分配省份"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                    @change="EditFlag({flag:scope.row.flag,index:scope.$index,id:scope.row.id})"
                                    :value="Boolean(scope.row.flag)"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="DeleteCustomerData({...scope.row,index:scope.$index})">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--            <div slot="footer" style="text-align: center">-->
            <!--                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>-->
            <!--            </div>-->
        </Content>

        <el-dialog
                title="上传客服信息"
                :visible.sync="BoxShow.showDiagal"
                :modal-append-to-body="false"
                width="30%">

            <el-form ref="form" :model="updata" label-width="80px">
                <el-form-item label="用户昵称">
                    <el-input v-model="updata.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input type="number" v-model="updata.phone_number"></el-input>
                </el-form-item>

                <el-form-item label="对接省份">
                    <el-select style="width: 100%" v-model="updata.region" placeholder="请选择客服对接省份">
                        <el-option label="全部" value="0"></el-option>
                        <el-option v-for="item in CityData" :key="item.text" :label="item.text"
                                   :value="item.text"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="auto" label="客服二维码">
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
                <el-form-item label="是否上线">
                    <el-switch v-model="updata.flag"></el-switch>
                </el-form-item>
            </el-form>

            <el-button @click="BoxShow.showDiagal = false">取 消</el-button>
            <el-button type="primary" @click="AddCustomerData">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script>
import Content from "@/components/Content/index"
import {mapActions, mapState, mapMutations} from "vuex";
import {City} from "@/api/Ulit";


export default {
    data() {
        return {
            taheight: window.innerHeight - 210,
            showDiagal: false,
            image: '',
            CityData: [],
        }
    },
    mounted() {
        this.getCustomerData()
        this.City()
    },
    methods: {
        ...mapActions('custromer', ['getCustomerData', 'DeleteCustomerData', 'AddCustomerData', 'EditFlag']),
        ...mapMutations('custromer', ['FlagType']),
        handleAvatarSuccess(res) {
            this.updata.WatchCode = res.raw;
            this.image = window.URL.createObjectURL(res.raw)
        },
        City() {
            City().then(res => {
                this.CityData = res.data.data
            })
        }
    }
    ,
    computed: {
        ...mapState('custromer', ['customer', 'updata', 'BoxShow'])
    }
    ,
    components: {
        Content,
    }
    ,

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


.el-card__body {
    padding: 10px;
}


</style>