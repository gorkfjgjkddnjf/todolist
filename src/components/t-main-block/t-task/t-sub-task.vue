<template>
    <div class="t-sub-task">
        <div class="head-sub-task text-center" >
               {{}}
        </div>
        <div class=" mb-0 description">
            <textarea class="form-control-lg w-100 mt-2" @keyup="textarea()" placeholder="краткое описание..." id="textarea">{{}}</textarea>
        </div>   
        <tSelect :selected="selected" @isvisble="isvisble1">  
        </tSelect >       
        <tSubTask v-if="isVisible"></tSubTask>
    </div>
</template>

<script>
import tSelect from '../t-select'
import tSubTask from '../t-task/t-task-item/t-sub-task-item'

export default {
    name: "t-sub-task",
    components: {tSubTask,tSelect},
    data(){
        return {
            selected: 'Подзадачи',
            isVisible: false
        }
    },
    computed: {

    },
    props:{

    },
    methods:{
        textarea(){
            let textarea = document.querySelector('textarea');

            textarea.addEventListener('keyup', function(){
                if(this.scrollTop > 0){
                    this.style.height = this.scrollHeight + "px";
                }
            });
        },
        isvisble1(isOptionVisible){
            this.isVisible = isOptionVisible
        }
    },   
}
</script>


<style lang="sass">
.head-sub-task
    background:  #91ACC6

#textarea
    background: none
    border: none
    padding-left: 2rem
    resize: none
    overflow: hidden
    &:focus
        outline: 0
.subtask
    display: flex

#sub-task
    text-align: left

#sub-task p
    padding-left: 2rem

.description
    background: #F8F8F8

</style>