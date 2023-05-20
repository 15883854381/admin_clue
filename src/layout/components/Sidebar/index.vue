<template>
    <div class="head-inner">
        <div class="head-left">
            <i @click="setNavCollapse" class="el-icon-s-fold"></i>

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <template v-for="item in sidebarlist">
                    <el-breadcrumb-item class="animate__animated animate__fadeIn" :key="item.path"
                        v-if="item.meta.title !== undefined">
                        {{ item.meta.title }}
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <i class="el-icon-s-tools"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            isCollapse: false,
            sidebarlist: [],
        }
    },
    methods: {
        setNavCollapse() {
            this.$bus.$emit('setNavCollapse', this.isCollapse = !this.isCollapse);
        }
    },
    mounted() {
        this.sidebarlist = this.$router.currentRoute.matched
        this.$bus.$on('handleActive', (data) => {
            this.$nextTick(() => {
                this.sidebarlist = data.matched
            })
        })
    }
}
</script>

<style lang="less" >
.head-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
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

    .el-breadcrumb {
        display: flex;
        align-items: center;
    }
}
</style>