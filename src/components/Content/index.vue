<template>
    <div>
        <el-card class="box-card">
            <div class="title">{{  ContentTitle  }}</div>
            <div class="content">
                <slot></slot>
            </div>
            <slot class="footer" name="footer"></slot>
        </el-card>
    </div>
</template>

<script>
export default {

    data() {
        return {
            ContentTitle: ''
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        }
    },

    mounted() {
        if (!this.title) {        
            this.ContentTitle = this.$route.meta.title        
        } else {            
            this.ContentTitle = this.title
        }
    }
}
</script>

<style>
.content {
    margin-top: 20px;
    flex: 1;
    overflow: hidden;
}

.footer {
    height: 60px;
    background: #0081ff;
}

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
    height: 100%;
    display: contents;
}

.box-card {
    min-height: calc(100vh - 126px);
    margin: 20px 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
</style>