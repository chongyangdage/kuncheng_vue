<template>
    <div>
        <el-upload class="upload-demo" action="/uploadFile" :headers="headers" :data="filesData"
            :before-upload="beforeFiles" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" multiple  :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import { uploadFile, selectFile, deleFile } from "@/api/user";
export default {
    data() {
        return {
            baseURL: process.env.VUE_APP_BASE_TOMCAT,
            fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
            filesData: { fileId: '1' },
            headers: { token: localStorage.getItem("token") },
            fileId:'1'
        };
    },
    created(){
this.getFiles()
    },
    methods: {
        getFiles(){
            // F:\\tomcat\\apache-tomcat-9.0.56\\webapps\\imgs
            this.fileList=[]
            selectFile({fileId:this.fileId}).then(res=>{
                res.data.forEach(element => {         
                    this.fileList.push({url:element.name,name:element.originalName,id:element.id,fileId:element.fileId})
                });
                console.log(this.fileList)
            })
        },
        //上传之前
        beforeFiles(file) {
            console.log(file)

        },
        //删除
        handleRemove(file, fileList) {
            deleFile({ id: file.id }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: res.message,
                    });
                }
            })
        },
        handlePreview(file) {
            console.log(file,'ppp');
             window.location.href=this.baseURL+file.url
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定删除 ${file.name}？`);
        }
    }
}
</script>