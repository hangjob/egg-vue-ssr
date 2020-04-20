<!--
 * @Author: your name
 * @Date: 2020-04-19 18:58:03
 * @LastEditTime: 2020-04-21 00:15:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\component\header\idnex.vue
 -->
<template>
	<div class="header">
            <div class="container">
                <div class="grid">
                    <div class="mini-x6 small-x4 middle-x2 big-x2">
                        <div class="logo">logo</div>
                    </div>
                    <div class="mini-hidden small-show middle-show big-show mini-x6 small-x8 middle-x10 big-x10">
                        <ul class="nav">
                            <li><a>首页</a></li>
                            <li><a>专栏</a></li>
                            <li><a>热榜</a></li>
                            <li><a>搜一搜</a></li>
                            <li><a>关于</a></li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
</template>
<script type="text/babel">
export default {
	components: {},
  	computed: {},
  	hook: {},
  	mounted() {}
};
</script>
<style lang="less" scoped>
.header{
    background-color: #ffffff;
    height: 120px;
    max-height: 120px;
    line-height: 120px;
    background-color: #ffffff;
    .nav{
        li{
            display: inline-block;
            font-size: 0;
            vertical-align: top;
            height: 120px;
            line-height: 120px;
            a{
                padding: 0 50px;
                font-size: 30px;  
            }
        }
    }
}
</style>
