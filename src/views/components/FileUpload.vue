<template>
    <div>
       
        <button @click="uploadFile()">上传文件</button>
    </div>    
</template>
<script>
import { uploadFile } from '@/api/user';

export default {
    name:"FileUpload",

    data() {
        return {
            disableShow:'true',
        }
    },
    created() {
        
    },
    methods: {
        uploadFile(){
            // var file = document.getElementById("fileInput").filters[0];
            console.log("点击上传");
        },
    },
}
</script>
<style scoped>

</style>