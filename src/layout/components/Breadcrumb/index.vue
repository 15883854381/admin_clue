<template>
    <div class="body">
        <div>
            <el-menu router class="el-menu-vertical-demo" background-color="#304156" unique-opened text-color="#BFCBD9"
                :default-active="defaultActive" style="height:100vh" :collapse="isCollapse">
                <template v-for="(item, index) in this.$router.options.routes">
                    <el-submenu :index="index + 1 + ''" v-if="!item.hidden && item.meta !== undefined" :key="index">
                        <template slot="title">
                            <i :class="item.meta.icon"></i>
                            <span slot="title">{{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="(children, indexj) in item.children"
                            :index="resolvePath(item.path, children.path)" :key="indexj">
                            {{ children.meta.title }}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else-if="!item.hidden" :index="resolvePath(item.path, item.children[0].path)"
                        :key="index + '1'">
                        <i :class="item.children[0].meta.icon"></i>
                        <span slot="title">{{ item.children[0].meta.title }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isCollapse: false,
            defaultActive: '',
        };
    },
    mounted() {
        this.defaultActive = this.$route.path
        this.$bus.$on('setNavCollapse', (data) => {
            this.isCollapse = data
        })
    },
    methods: {
        setNavCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        resolvePath(fPath, cPath) {
            if (cPath !== undefined) {
                if (fPath == '/') {
                    return fPath + cPath
                }
                return fPath + '/' + cPath
            }
            return fPath
        }
    },
}
</script>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.head {

    flex: 1;

    .head-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        background-color: aquamarine;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        .head-left {
            display: flex;
            align-items: center;
        }

        i {
            font-size: 20px;
            color: #303133;
            margin: 0 15px;
        }
    }



}

.el-breadcrumb {
    display: flex;
    align-items: center;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}


.body {
    // display: flex;
    // height: 100vh;

}

.el-submenu [class^=iconfont] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
}

</style>