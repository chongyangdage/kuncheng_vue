<template>
   <div>
 <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>


   </div>
</template>

<script>
import cardVue from '@/components/default/card.vue';
import Config from '#/package.json';
export default {
    components: { cardVue },
    data() {
        return {
            dependenciesLoading: true,// 依赖盒子状态
            Config: {},// 获取到的配置
            activeNames: ['1'],
            newV: {
                state: false,
                v: '',
            },
        }
    },
    mounted() {
 

    },
    methods: {
    
    },
}
</script>

<style lang="scss" scoped>
.title {
    font-weight: 400;
    padding-bottom: 15px;
}

.link {
    >span {
        margin-right: 5px;
    }
}

p {
    margin: 5px 0;
}
</style>