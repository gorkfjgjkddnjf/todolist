<template>
    <div class="t-main-block-wrapper">

                    <tTask/>

                <!-- <div class="col-12 col-md-8 mt-5">
                    <tSubTask/>
                </div> -->

    </div>

</template>

<script>

import tTask from './t-task/t-task'
//import tSubTask from './t-task/t-sub-task'

export default {
    name: "t-main-block-wrapper",
    components: {
        tTask,
        //tSubTask
    },
    data(){
        return {}
    },
    computed: {},
    methods:{

    }
}
</script>


<style lang="sass">

</style>