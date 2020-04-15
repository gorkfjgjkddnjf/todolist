<template>
    <div class="t-task px-0">
        <div class="select">
            <t-select
            :options="options"
            @select="optionSelected"
            :selected="selectedTASK"
           
            />
        </div>
       
        <div class="todo-item" v-for="(todo, index) in todos" :key="todo.id">               
            <div class="todo-item-left">
                <p v-if="!todo.editing" class="ml-4 mb-0 py-2 todo-item-label">{{todo.title}}</p>
                <input v-else class="todo-item-edit ml-4 py-3" type="text" 
                    v-model="todo.title" 
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    v-focus>
            </div>
            <div class="edit-icon">
                <i class="material-icons shedule" >schedule</i>
                <i class="material-icons edit" @click="editTodoItem(todo, index)">edit</i>
                <i class="material-icons close" @click="removeTodoItem(index)">close</i>
            </div>
        </div>
        <subtask :todos="todos"/> 
    </div>

</template>

<script>

import tSelect from '../t-select'
import subtask from '../t-task/t-sub-task'


export default {
    name: "t-task",
    components: {
        tSelect,
        subtask 
    },
    data(){
        return {
            options:[
                {name: 'Все задачи', value:1},
                {name: 'Исполненные', value:2},
                {name: 'Не исполненные', value:3},
            ],
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
                    'title': 'Пойти на работу 1',
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
        doneEdit(todo, index){
            todo.editing = false
            console.log(todo)
            console.log(todo.id)
            console.log(index)
        },
        removeTodoItem(index){
            //showPopup()
            console.log(index)
            this.todos.splice(index,1)
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

.todo-item-edit
    width: 100%
    border: none
    //border-bottom: 1px solid rgba(196, 196, 196, 0.4)
    background: #F8F8F8
    &:focus
        outline: none

</style>