<!--
 * @Author: your name
 * @Date: 2020-04-19 18:58:03
 * @LastEditTime: 2020-04-27 23:23:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\component\header\idnex.vue
 -->
<template>
	<header class="header">
        <div class="wp">
           <div class="container">
                <div class="header-main">
                    <div class="logo"><img src="@web/asset/images/logo.png"></div>
                    <div class="search">
                        <input type="text" placeholder="输入网址或者相关描述检索">
                    </div>
                    <div class="minapp">
                        
                    </div>
                </div>
           </div>
        </div>
    </header>
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
    .container{
        border-radius: 5px;
        overflow: hidden;
    }
    &-main{
        background-color: #ffffff;
        padding: 0 10px;
        height: 80px;
        display: flex;
        align-items: center;
        .logo{
            height: 80px;
            width: 220px;
            border-right: 1px solid #f6f8fa;
            display: flex;
            align-items: center;
            img{
                height: 60px;
            }
        }
        .search{
            padding-left: 20px;
            width: 40%;
            input{
                height: 60px;
                border: none;
                width: 100%;
                display: block;
            }
            input::-webkit-input-placeholder{
                color: #aab2bd;
                font-size: 16px;
            }
        }
    }
}
</style>
