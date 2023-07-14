<template>
    <div>

        <Content>
            <el-button size="small" type="primary" @click="centerDialogVisible = true;AddOREditState=true">添加案例</el-button>
            <div style="width: 100%">
                <el-table size="mini" :data="tableData" :height="taheight" style="width: 100%;">
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="create_time" label="上传时间"></el-table-column>
                    <el-table-column width="150" label="状态">
                        <template slot-scope="scope">
                            <el-tag size="mini" v-if="scope.row.flag === 1" type="success" effect="dark"> 展示</el-tag>
                            <el-tag size="mini" v-else type="error" effect="dark"> 隐藏</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="300" prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="PreviewData(scope)">预览</el-button>
                            <el-button size="mini" type="primary" @click="EditCaseData(scope)">编辑</el-button>
                            <el-button size="mini" @click="DeleteCaseData(scope)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog
                    title="添加案例"
                    :close-on-click-modal="false"
                    :visible.sync="centerDialogVisible"
                    :modal-append-to-body="false"
                    width="580px"
                    @close="closeContent"
            >
                <div class="demo-input-suffix">
                    <span class="titles">案例标题：</span>
                    <el-input
                            placeholder="请输入案例标题"
                            suffix-icon="el-icon-date"
                            v-model="datas.title">
                    </el-input>
                </div>
                <div class="demo-input-suffix">
                    <span class="titles">是否显示：</span>
                    <el-radio v-model="datas.flag" :label="1">显示</el-radio>
                    <el-radio v-model="datas.flag" :label="0">隐藏</el-radio>
                </div>
                <div style="border: 1px solid #ccc;">
                    <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editor"

                            :mode="mode"
                    />
                    <!--                    :defaultConfig="toolbarConfig"-->
                    <Editor
                            style="height: 500px; overflow-y: hidden;"
                            v-model="datas.content"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated"
                    />
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="queryData">确 定</el-button>
              </span>
            </el-dialog>
<!--            // 预览-->
            <el-dialog
                    title="预览"
                    :visible.sync="Preview"
                    :modal-append-to-body="false"
                    width="400px">
                <div style="height: 500px;overflow-y: scroll;overflow-x:hidden ">
                    <div>
                        <span class="Content_title">{{ PreviewContent.title }}</span>
                    </div>
                    <div class="Content_time">
                        <span>{{ PreviewContent.create_time }}</span>
                        <span class="Content_subTitle">汽车共享联盟</span>
                    </div>
                    <div v-html="PreviewContent.content"></div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Preview = false">取 消</el-button>
                </span>
            </el-dialog>


        </Content>
    </div>
</template>
<script>
import Vue from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import Content from "@/components/Content/index.vue";
import {AddCase, DeleteCase, SelectCase, EditCase} from "@/api/Success";

export default Vue.extend({
    components: {Content, Editor, Toolbar},
    data() {
        return {
            taheight: window.innerHeight - 210,
            tableData: [],
            editor: null,
            editorConfig: {placeholder: '请输入内容...'},
            mode: 'default', // or 'simple'
            centerDialogVisible: false,
            Preview: false,
            PreviewContent: {},
            AddOREditState: true, // 修改为 false  添加为 true
            datas: {
                content: '',
                title: '',
                flag: 1,
                id: 0,
            },
            items: {}
        }
    },
    methods: {
        // 编辑器需要使用的的
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        // 关闭弹窗时的回调
        closeContent() {
            this.datas.title = ""
            this.datas.content = ""
            this.datas.flag = 1
            this.datas.id = 0;
        },

        queryData() {
            if (this.datas.title === "" || this.datas.content === "") {
                this.$message({
                    type: 'error',
                    message: "请填写完整的案例信息"
                })
                return false;
            }
            if (this.AddOREditState) {
                // 新增
                AddCase(this.datas).then(res => {
                    console.log(this.datas)
                    if (res.data.code === 200) {
                        let data = JSON.parse(JSON.stringify(this.datas));
                        data.id = res.data.data
                        data.create_time = '现在'
                        this.tableData.push(data)
                        this.centerDialogVisible = false
                    }
                    this.$message({
                        type: res.data.code === 200 ? 'success' : 'error',
                        message: res.data.mes
                    })
                })
            } else {
                // 修改
                EditCase(this.datas).then(res => {
                    let {code, mes} = res.data
                    if (code === 200) {
                        this.centerDialogVisible = false
                        this.items.flag = this.datas.flag
                        window.location.reload();
                    }
                    this.$message({
                        type: code === 200 ? 'success' : 'error',
                        message: mes
                    })
                })
            }

        },
        // 查询文章案例
        SelectCaseData() {
            SelectCase().then(res => {
                // console.log(res)
                let {code, data, mes} = res.data
                if (code === 200) {
                    this.tableData = data
                } else {
                    this.$message({
                        type: 'error',
                        message: mes
                    })
                }


            })
        },
        // 删除案例
        DeleteCaseData(item) {
            let {row: {id}, $index} = item
            DeleteCase({id}).then(res => {
                let {code, mes} = res.data
                this.$message({
                    type: code === 200 ? 'success' : 'error',
                    message: mes
                })
                if (code === 200) {
                    this.tableData.splice($index, 1)
                }
            })
        },
        // 预览
        PreviewData(item) {
            // console.log(item)
            let {row} = item
            this.PreviewContent = row
            this.Preview = true;
        },
        // 编辑
        EditCaseData(item) {
            let {row} = item
            this.centerDialogVisible = true
            this.AddOREditState = false
            this.datas.content = row.content
            this.datas.title = row.title;
            this.datas.flag = row.flag;
            this.datas.id = row.id;
            this.items = row
        }
    },
    mounted() {
        this.SelectCaseData()
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
.demo-input-suffix {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.demo-input-suffix .titles {
    width: 100px;

}

.Content_title {
    font-size: 20px;
    font-weight: bold;
}

.Content_time {
    margin: 10px 0;
}

.Content_subTitle {
    margin-left: 10px;
    color: #0077aa;
}
</style>