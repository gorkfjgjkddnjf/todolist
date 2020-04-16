<template>
    <div class="t-sub-task">

        <popup v-if="isVisiblePopup" @closePopup="closePopup" @deleteItem="removeTodoItem" :index="index4" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{subtask[index4].title}}" из списка "{{todos[index3].title}}"</h2>
            </template>
        </popup>

        <div class="main-section">
            <div class="head-sub-task text-center py-2">
               {{todos[index3].title}}
        </div>
        <div class=" mb-0 description">
            <textarea class="form-control-lg w-100 mt-2" @keyup="textarea()" v-model="todos[index3].description" id="decription" placeholder="краткое описание..." ></textarea>
        </div>   
        <tSelect :selected="selected" @isvisble="isvisble1">  
        </tSelect >       
        <div class="sub" v-if="isVisible">
            <div class="todo-item" v-for="(task, index) in subtask" :key="task.id">               
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
            index4: 0
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
            console.log(task.completed) 
        },
        doneEdit(todo){
            todo.editing = false
        },
        removeTodoItem(index){
            this.subtask.splice(index, 1)
            this.isVisiblePopup = false
        },
        confirmDeleteItem(index){
            this.isVisiblePopup = true
            this.index4 = index
        },
        closePopup(){
            this.isVisiblePopup = false
        },
        // checkSubTask(){
        //     let color = ""
        //     if(this.subtask.lenght === 0){
        //         color = "white"
        //     }
        //     else{
        //         this.subtask.map(function(){
        //             if(task.completed != undefined || task.completed == false){
        //                 color = "green"
        //             }
        //             else{
        //                 color = "grey"
        //             }
        //         })
        //     }
        //     console.log(color)
        //     console.log(this.subtask.length) 
        //     this.$emit('changeColor', color)
        // }

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

</style>