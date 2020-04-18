<template>
    <div class="t-sub-task">

        <popup v-if="isVisiblePopup" @closePopup="closePopup" @deleteItem="removeTodoItem" :index="index4" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{subtask[index4].title}}" из списка "{{todos[index3].title}}"</h2>
            </template>
        </popup>

        <popup v-if="isCreateTaskVisible" @closePopup="closePopup" @deleteItem="newTaskAdd" btnOk="Сохранить">
            <template v-slot:head>
                <h2 class="tt">Добавление подзадачи</h2>
            </template>
            <div class="form-group text-left mx-md-4">
                <label for="title">Название</label> 
                <input type="text" name="title" class="form-control form-control-lg" id="title" required v-model="newSubTask">
            </div>
            <div class="form-group text-left mx-md-4">
                <input type="checkbox" name="fast" id="fast">
                <label for="fast" class="pl-2">Это срочно?</label> 
            </div>
        </popup>

        <div class="main-section" >
            <div class="head-sub-task text-center py-2">
               {{todos[index3].title}}
        </div>
        <div class=" mb-0 description">
            <textarea class="form-control-lg w-100 mt-2" @keyup="textarea()" v-model="todos[index3].description" id="decription" placeholder="краткое описание..." ></textarea>
        </div>  

        <tSelect  
        :selected="selected"
        @isvisble="isvisble1"
        @addTodo="addTodo"/>  
    
        <div class="sub" v-show="isVisible">
            <div class="todo-item" v-for="(task, index) in subtask" :key="task.id">               
                <div class="todo-item-left">
                    <input type="checkbox" v-model="task.completed" @change="checkSubTask" class="ml-3">
                    <p v-if="!task.editing" class="ml-4 mb-0 py-2 todo-item-label" :class="{completed : task.completed}">{{task.title}}</p>
                    <input v-else class="todo-item-edit ml-4 py-3" type="text" 
                    v-model="task.title" 
                    @blur="doneEdit(task)"
                    @keyup.enter="doneEdit(task)"
                    v-focus>
                </div>
                <div class="edit-icon">
                    <i class="material-icons shedule">schedule</i>
                    <p class="mb-0 date px-2">{{task.date}}</p>
                    <i class="material-icons" v-if="task.fast">flag</i>
                    <i class="material-icons edit" @click="editTodoItem(task)">edit</i>
                    <i class="material-icons close" @click="confirmDeleteItem(index)">close</i>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

import tSelect from '../t-select'
import popup from '../../popup/t-popup'

export default {
    name: "t-sub-task",
    components: {
        tSelect,
        popup
        },
    data(){
        return {
            selected: 'Подзадачи',
            isVisible: false,
            isVisiblePopup: false,
            index4: 0,
            isCreateTaskVisible: false,
            newSubTask: null,

        }
    },
    props:{
        todos:{
            type: Array,
            default(){
                return[]
            }
        },
        index3:{
            type:Number,
            default: 0
        },
        subtask:{
            type: Array,
            default(){
                return[]
            }
        },
        format:{
            type: Object,
            default(){
                return {}
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
            textarea.addEventListener('keyup', function(){
                if(this.scrollTop > 0){
                    this.style.height = this.scrollHeight + "px";
                }
            });
        },
        isvisble1(isOptionVisible){
            this.isVisible = isOptionVisible
        },
        editTodoItem(task){
            task.editing = true
        },
        doneEdit(todo){
            todo.editing = false
        },
        removeTodoItem(index){
            this.subtask.splice(index, 1)
            this.isVisiblePopup = false
            this.checkSubTask()
        },
        confirmDeleteItem(index){
            this.isVisiblePopup = true
            this.index4 = index
        },
        closePopup(){
            this.isVisiblePopup = false
            this.isCreateTaskVisible = false
        },
        addTodo(){
            this.isCreateTaskVisible = true
        },
        newTaskAdd(){
            let idNewTask = this.subtask.length
            let checkbox = document.querySelector('#fast')
            let urgency = false
            let date = new Date() 
            date = new Intl.DateTimeFormat('ru', this.format).format(date)
            let goodDate = date.replace(/[,]/g, '')

            if(this.newSubTask.trim().length == 0){
                return
            }
            if(checkbox.checked){
                urgency = true
            }
            this.subtask.unshift({
                id: idNewTask + 1,
                title: this.newSubTask,
                editing: false,
                date: goodDate,
                fast: urgency
            })
            this.newSubTask = null
            this.isCreateTaskVisible = false
            this.checkSubTask()
        },
        checkSubTask(){
            this.subtask.forEach((task) =>{
                this.$emit('changeColor', task.completed)
            })           
        },
    },
    mounted(){
        this.checkSubTask()        
    },
  
}
</script>


<style lang="sass">
.head-sub-task
    background:  #91ACC6

#decription
    background: none
    border: none
    padding-left: 2rem
    resize: none
    overflow: hidden
    color: #C4C4C4
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


#no-select
#not-important
    color: #51C36A
#important
    color: #ECDD57
#fast-no-important
    color: #46AAE2
#fast-important
    color: #C74B4B

.flag
    display: flex
</style>