<template>
    <div class="t-task px-0">
        <div class="select">
            <t-select
            :options="options"
            @select="optionSelected"
            :selected="selectedTASK"
           
            />
        </div>
        <t-task-item/>  
            
    </div>

</template>

<script>

import tTaskItem from '../t-task/t-task-item/t-task-item'
import tSelect from '../t-select'


export default {
    name: "t-task",
    components: {
        tTaskItem,
        tSelect,
    },
    data(){
        return {
            options:[
                {name: 'Все задачи', value:1},
                {name: 'Исполненные', value:2},
                {name: 'Не исполненные', value:3},
            ],
            selectedTASK: 'Все',
        }
    },
    computed: {},
    methods:{
        optionSelected(option){
            this.selectedTASK = option.name
        },
    },
}
</script>


<style lang="sass">
.t-task
    background: #F8F8F8

.select
    text-align: center

.add
    position: fixed

</style>