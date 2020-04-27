<!--
 * @Author: your name
 * @Date: 2020-04-21 22:36:31
 * @LastEditTime: 2020-04-21 22:42:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\component\pieceCard.vue
 -->
<template>
    <div class="pieceCard">
        <slot name="title"></slot>
        <slot></slot>
        <slot name="footer"></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.pieceCard{
    background: #ffffff;
    border-radius: 10px;
    min-height: 30px;
    position: relative;
    min-height: 100px;
    padding: 30px;
}
</style>