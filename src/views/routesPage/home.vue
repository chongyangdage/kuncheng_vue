<template>
  <div>
    <!--块类统计-->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <h3>商品本月销量</h3>
          <div>
            <i class="el-icon-s-shop" style="color: purple"></i>
            <span>2424132</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h3>累计用户数</h3>
          <div>
            <i class="el-icon-user-solid" style="color: green"></i>
            <span>12763</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h3>消费增长率</h3>
          <div>
            <i class="el-icon-s-flag" style="color: red"></i>
            <span>28%</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <h3>入驻商家数</h3>
          <div>
            <i class="el-icon-star-on" style="color: blue"></i>
            <span>358</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--acharts统计图-->
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <echarts1 />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <echarts2 />
        </el-card>
        <el-card class="box-card">
          <echarts3 />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import echarts1 from '@/views/ECharts/echarts1'
import echarts2 from '@/views/ECharts/echarts2'
import echarts3 from '@/views/ECharts/echarts3'
 
export default {
  name: 'home',
  components: {
    echarts1,
    echarts2,
    echarts3
  }
}
</script>
 
<style scoped>
.el-card{
  margin-bottom: 20px;
  text-align: center;
}
 
</style>