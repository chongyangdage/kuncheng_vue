<template>
    <div>
   
        

        <FileUpload></FileUpload>
    </div>    
</template>

<script>
import FileUpload from '../components/FileUpload.vue';
export default {
    name:"MaterialUpload",
    components:{ FileUpload },
    data(){
        return{
            value:'默认值',
        }
    },
    mounted (){

    },

}

</script>