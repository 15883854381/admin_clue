<template>
    <div class="Content-body">
        <div>
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
</style>