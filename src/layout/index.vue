<template>
    <div class="Content-body">
        <div>
            <div class="headIcon" >
                <img src="../assets/logo.jpg" height="40" width="40"/>
                <div>
                    <span class="headIconFont" >
                        后台管理
                    </span>
                </div>
            </div>
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="Content-view">
            <Sidebar></Sidebar>
            <div class="Content-datail" >
                <AppMain></AppMain>
            </div>
            
        </div>
    </div>
</template>

<script>
import { AppMain, Sidebar,Breadcrumb } from './components'
export default {
    components: {
        Breadcrumb,
        AppMain,
        Sidebar,
    }
}
</script>

<style lang="less">
body {
    margin: 0;
    padding: 0;
}

.Content-body {
    display: flex;
    justify-self: start;
    overflow: hidden;
}

.Content-view {
    flex: 1;
}
.headIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
    padding: 5px 0;
    .headIconFont{
        font-size: 18px;
        font-weight: bold;
        margin-left: 20px;
        color: #3E3D40;
    }
}
</style>