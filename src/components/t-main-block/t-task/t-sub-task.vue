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

        <div class="" v-for="(todo, index1) in todos" :key="todo.id">               
            <div class="todo-item" v-for="(task, index) in todo.subtask" :key="task.id">               
                <div class="todo-item-left">
                    <input type="checkbox" v-model="task.completed" class="ml-3">
                    <p v-if="!task.editing" class="ml-4 mb-0 py-2 todo-item-label" :class="{completed : task.completed}">{{task.title}}</p>
                    <input v-else class="todo-item-edit ml-4 py-3" type="text" 
                    v-model="task.title" 
                    @blur="doneEdit(task)"
                    @keyup.enter="doneEdit(task)"
                    v-focus>
                </div>
                <div class="edit-icon">
                    <i class="material-icons shedule" >schedule</i>
                    <i class="material-icons edit" @click="editTodoItem(task, index1, index)">edit</i>
                    <i class="material-icons close" @click="task.splice(index,1)">close</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import tSelect from '../t-select'

export default {
    name: "t-sub-task",
    components: {
        tSelect
        },
    data(){
        return {
            selected: 'Подзадачи',
            isVisible: false
        }
    },
    props:{
        todos:{
            type: Array,
            default(){
                return[]
            }
        }
    },
    directives:{
        focus:{
            inserted: function(el){
                el.focus()
            }
        }
    },
    methods:{
        textarea(){
            let textarea = document.querySelector('textarea');
            console.log(subtask)
            textarea.addEventListener('keyup', function(){
                if(this.scrollTop > 0){
                    this.style.height = this.scrollHeight + "px";
                }
            });
        },
        isvisble1(isOptionVisible){
            this.isVisible = isOptionVisible
        },
        editTodoItem(task, index1, index){
            task.editing = true
            console.log(task)
            console.log(task.title)
            console.log(index)
            console.log(index1)
        },
        doneEdit(todo){
            todo.editing = false
        },
        removeTodoItem(task, index){
            //showPopup()
            console.log(index)
            task.splice(index,1)

        },

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

.completed
    text-decoration: line-through
    color: grey

.shedule
    color: grey

.t-sub-task-item
    background: #F8F8F8

</style>