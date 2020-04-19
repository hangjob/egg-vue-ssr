<!--
 * @Author: your name
 * @Date: 2020-04-18 23:31:45
 * @LastEditTime: 2020-04-19 19:12:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg\app\web\component\layout\index\main.vue
 -->
<template>
  	<div class="wp">
		<HeaderTop></HeaderTop>
    	<slot name="main"></slot>
  	</div>
</template>
<script>
import header from '../../header/idnex'
export default {
	components:{
		HeaderTop:header
	}
};
</script>
