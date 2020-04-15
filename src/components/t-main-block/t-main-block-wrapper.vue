<template>
    <div class="t-main-block-wrapper">
        <tHeader/>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <tTask/>
                </div>
                <div class="col-12 col-md-8 mt-5">
                    <tSubTask/>
                </div>
            </div>           
        </div>
    </div>

</template>

<script>

import tHeader from './t-header'
import tTask from './t-task/t-task'
import tSubTask from './t-task/t-sub-task'

export default {
    name: "t-main-block-wrapper",
    components: {
        tHeader,
        tTask,
        tSubTask
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