<template>
    <div class="t-task px-0">

        <popup v-if="isVisiblePopup" @closePopup="closePopup" @deleteItem="removeTodoItem" :index="index1" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{todos[index1].title}}"</h2>
            </template>
            <p>Вместе с задачей будут удалены все подзадачи</p>
        </popup>

        <popup v-if="isVisiblePopup" @closePopup="closePopup" :index="index1" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{todos[index1].title}}"</h2>
            </template>
            <p>Вместе с задачей будут удалены все подзадачи</p>
        </popup>


        <div class="main-section">
            <div class="select">
            <t-select
            :options="options"
            @select="optionSelected"
            :selected="selectedTASK"
            @sorted="sorted"
            />
        </div>
       
        <div class="todo-item" v-for="(todo, index) in todos" :key="todo.id" @click="showSubTask(index)">               
            <div class="todo-item-left">
                <div class="check"></div>
                <p v-if="!todo.editing" class="ml-4 mb-0 py-2 todo-item-label">{{todo.title}}</p>
                <input v-else class="todo-item-edit ml-4 py-3" type="text" 
                    v-model="todo.title" 
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    v-focus>
            </div>
            <div class="edit-icon">
                <i class="material-icons shedule" >schedule</i>
                <i class="material-icons edit" @click="editTodoItem(todo)">edit</i>
                <i class="material-icons close" @click="confirmDeleteItem(index)">close</i>
            </div>
        </div>
    </div>
        <i class="material-icons shedule" @click="addTodo">add</i>
        <subtask :todos="todos" v-if="isVisibleSubTask" :index3="index1" :subtask="subtask"/></div> 
</template>

<script>

import tSelect from '../t-select'
import subtask from '../t-task/t-sub-task'
import popup from '../../popup/t-popup'

export default {
    name: "t-task",
    components: {
        tSelect,
        subtask,
        popup
    },
    data(){
        return {
            index1: 0,
            subtask:[],
            isVisibleSubTask: false,
            newTask: '',
            options:[
                {name: 'Все задачи', value:1},
                {name: 'Исполненные', value:2},
                {name: 'Не исполненные', value:3},
            ],
            isVisiblePopup: false,
            selectedTASK: 'Все',
            todos:[
                {
                    'id':1,
                    'title': 'Купить молоко',
                    'description': 'uighrg iuerw hrngurigh erugihrnfuo srhg uiergyhoe',
                    'editing': false,
                    'subtask':[
                        {
                            'id':1,
                            'title': 'Купить 1',
                            'editing': false,
                        },
                        {
                            'id':2,
                            'title': 'Купить 2',
                            'editing': false,
                        }
                    ]
                },
                {
                    'id':2,
                    'title': 'Пойти на работу',
                    'editing': false,
                    'description': 'uighrg iuerw  uiergyhoe',
                    'subtask':[
                        {
                            'id':1,
                            'title': 'Купить 1',
                            'editing': false,
                        },
                        {
                            'id':2,
                            'title': 'Купить 2',
                            'editing': false,
                        }
                    ]
                },
                {
                    'id': 3,
                    'title': 'А Пойти на работу 1',
                    'editing': false,
                    'description': 'uighrg iuerw hrngurigh erugihrnfuo srhg uiergyhoe uighrg iuerw hrngurigh erugihrnfuo srhg uiergyhoe',
                    'subtask':[

                    ]
                }
            ],
        }
    },
    directives:{
        focus:{
            inserted: function(el){
                el.focus()
            }
        }
    },
    computed: {},
    methods:{
        optionSelected(option){
            this.selectedTASK = option.name
        },
        editTodoItem(todo){
            todo.editing = true
        },
        doneEdit(todo){
            todo.editing = false
        },
        removeTodoItem(index){
            this.todos.splice(index,1)
            this.isVisiblePopup = false
        },
        confirmDeleteItem(index){
            this.isVisiblePopup = true
            this.index1 = index
        },
        closePopup(){
            this.isVisiblePopup = false
        },
        showSubTask(index){
            this.isVisibleSubTask = true
            this.index1 = index
            this.subtask = this.todos[index].subtask
        },
        sorted(){
            this.todos.sort(function(a,b){
                if(a.title<b.title){
                    return 1
                }
                else if(a.title>b.title){
                    return -1
                }
                return 0
            })
        },
        addTodo(){

        }
    },
    mounted(){
        this.todos.sort(function(a,b){
            if(a.title>b.title){
                return 1
            }
            if(a.title<b.title){
                return -1
            }
            return 0
        })  
        var now = new Date().toLocaleString();
        console.log(now)
        let dno = new Date()
        let day = dno.getDate();
        let month = dno.getMonth();
        let year = dno.getFullYear();
        let hourse = dno.getHours()
        let min = dno.getMinutes()
        console.log(day, month, year, hourse, min)
        let currentDate = day+'.'+ month +'.' + year +' ' + hourse +':' + min
        console.log(currentDate)

    }
}
</script>


<style lang="sass">
.main-section
    background: #F8F8F8

.select
    text-align: center

.add
    position: fixed

.todo-item
    display: flex
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid rgba(196, 196, 196, 0.4)

.edit-icon
    display: flex
    margin-right: 5px
    align-items: center


.edit
    cursor: pointer

.close
    cursor: pointer

.todo-item-left
    display: flex
    align-items: center

.todo-item-label
    cursor: pointer

.todo-item-edit
    width: 100%
    border: none
    //border-bottom: 1px solid rgba(196, 196, 196, 0.4)
    background: #F8F8F8
    &:focus
        outline: none

.tt
    font-weight: bold
    font-size: 25px

.check
    width: 10px
    background: red
    height: 41px

</style>