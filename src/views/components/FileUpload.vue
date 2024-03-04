<template>
    <div>
        <el-image style="width: 0px; height: 0px;z-index:9999" :src="url" ref="preview" class="bigImg upload-demo"
            :preview-src-list="srcList">
        </el-image>
        <el-upload accept=".png,.jpg" list-type="picture" :on-success="success" class="upload-demo" action="/uploadFile" :headers="headers" :data="filesData"
            :before-upload="beforeFiles" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" multiple :on-exceed="handleExceed" :file-list="fileList">
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
            url: "",
            srcList: [

            ],
            baseURL: process.env.VUE_APP_BASE_TOMCAT,
            fileList: [],
            filesData: { fileId: '1' },
            headers: { token: localStorage.getItem("token") },
            fileId: '1'
        };
    },
    created() {
        this.getFiles()
    },
    methods: {
        //上传成功
        success() {
            this.getFiles()
        },
        //获取附件

        getFiles() {
            // F:\\tomcat\\apache-tomcat-9.0.56\\webapps\\imgs
            this.fileList = []
            selectFile({ fileId: this.fileId }).then(res => {
                res.data.forEach(element => {
                    this.fileList.push({ url: this.baseURL + element.name, name: element.originalName, id: element.id, fileId: element.fileId })
                });
                console.log(this.fileList)
            })
        },
        //上传之前
        beforeFiles(file) {
     

        },
        //删除
        handleRemove(file, fileList) {
            deleFile({ id: file.id }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: res.message,
                    });
                    this.getFiles()
                }
            })
        },
        handlePreview(file) {
            this.srcList = []

            if (file.name.indexOf('.jpg') != -1 || file.name.indexOf('.png') != -1) {
                this.url =  file.url;
                this.srcList.push( file.url);
                console.log(this.srcList, 'ppp');
                setTimeout(() => {
                    this.$refs.preview.clickHandler();
                }, 100)

            } else {
                // console.log(this.baseURL + file.url)
                // return
                window.location.href =  file.url
            }


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

<style scoped>
.bigImg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
}
/deep/
.el-upload-list--picture .el-upload-list__item{
    width: 40% !important;
}
</style>