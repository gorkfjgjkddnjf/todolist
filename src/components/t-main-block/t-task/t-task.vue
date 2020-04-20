<template>
    <div class="t-task px-0">

        <transition name="animate">
            <p class="push" v-show="isVisiblePush">
                {{messages}}  
            </p>     
        </transition>   

        <popup v-if="isVisiblePopup" @closePopup="closePopup" @deleteItem="removeTodoItem" :index="index1" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{todos[index1].title}}"</h2>
            </template>
            <p>Вместе с задачей будут удалены все подзадачи</p>
        </popup>

        <popup v-if="isCreateTaskVisible" @closePopup="closePopup" @deleteItem="newTaskAdd" btnOk="Сохранить">
            <template v-slot:head>
                <h2 class="tt">Добавление задачи</h2>
            </template>
            <div class="form-group text-left mx-md-4">
                <label for="title">Название</label> 
                <input type="text" name="title" class="form-control form-control-lg" id="title" required v-model="newTask">
            </div>
            <div class="form-group text-left mx-md-4">
               <label for="description">Краткое описание</label>
               <textarea class="form-control form-control-lg" name="description" id="description" cols="30" rows="2" required v-model="newDescription"></textarea>
            </div>
        </popup>


        <div class="main-section">
            <div class="select">
            <t-select
            :options="options"
            @select="sortByStatus"
            :selected="selectedTASK"
            @addTodo="addTodo"
            />
        </div>
       
        <div class="todo-item" v-for="(todo, index) in filterTask" :key="todo.id" @click="showSubTask(index)">               
            <div class="todo-item-left">
                <div class="check" :class="{grey : todo.color == 'grey', green: todo.color == 'green'}"></div>
                <p v-if="!todo.editing" class="ml-2 mb-0 py-2 todo-item-label">{{todo.title}}</p>
                <input v-else class="todo-item-edit ml-2 py-2" type="text"
                    v-model="todo.title" 
                    @blur="doneEdit(todo)"
                    @keyup.enter="doneEdit(todo)"
                    @keyup.esc="cancelEdit(todo)"
                    v-focus>
            </div>
            <div class="edit-icon">
                <i class="material-icons shedule" >schedule</i>
                <p class="mb-0 date px-2">{{todo.date}}</p>
                <i class="material-icons edit" @click="editTodoItem(todo)">edit</i>
                <i class="material-icons close" @click="confirmDeleteItem(index)">close</i>
            </div>
        </div>
    </div>
        <subtask :todos="todos" 
        v-show="isVisibleSubTask" 
        :index3="index1" 
        :subtask="subtask"
        @changeColor="checkSubTask"
        :format="format"
        />
    </div> 
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
        popup,
    },
    data(){
        return {
            index1: 0,
            subtask:[],
            isVisibleSubTask: false,
            newTask: null,
            newDescription: null,
            color: 'white',
            sortedTask: [],
            beforeEdit: null,
            isVisiblePush: false,
            options:[
                {name: 'Все задачи', value:2},
                {name: 'Исполненные', value: 1},
                {name: 'Не исполненные', value:0},
            ],
            messages: null,
            format:{ 
                year: 'numeric',
                month: 'numeric', 
                day: 'numeric',
                hour: 'numeric', 
                minute: 'numeric',
                hour12: false
            },
            isVisiblePopup: false,
            isCreateTaskVisible: false,
            selectedTASK: 'Все',
            todos:[
                {
                    'id':1,
                    'title': 'Купить молоко',
                    'description': 'uighrg iuerw hrngurigh erugihrnfuo srhg uiergyhoe',
                    'editing': false,
                    'date': '16.04.2020 20:47',
                    'color': 'white',
                    'status': 0,
                    'subtask':[
                        {
                            'id':1,
                            'title': 'Купить 1',
                            'editing': false,
                            'date': '16.04.2020 20:47',
                            'fast': false
                        },
                        {
                            'id':2,
                            'title': 'Купить 2',
                            'editing': false,
                            'date': '16.04.2020 20:47',
                            'fast': false
                        }
                    ]
                },
                {
                    'id':2,
                    'title': 'Пойти на работу',
                    'editing': false,
                    'description': 'uighrg iuerw  uiergyhoe',
                    'date': '16.04.2020 20:47',
                    'color': 'white',
                    'status': 0,
                    'subtask':[
                        {
                            'id':1,
                            'title': 'Купить 1',
                            'editing': false,
                            'date': '16.04.2020 20:47',
                            'fast': false
                        },
                        {
                            'id':2,
                            'title': 'Купить 2',
                            'editing': false,
                            'date': '16.03.2020 20:47',
                            'fast': false
                        },
                    ]
                },
                {
                    'id': 3,
                    'title': 'А Пойти на работу 1',
                    'editing': false,
                    'description': 'uighrg iuerw iuerw hrngurigh erugihrnfuo srhg uiergyhoe',
                    'date': '16.04.2020 20:47',
                    'color': 'white',
                    'status': 0,
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
    computed: {
        filterTask(){
            if(this.sortedTask.length){
                return this.sortedTask
            }
            else{
                return this.todos
            }
        },

    },
    methods:{
        hidePush(){
            let vm = this
            setTimeout(function () {
                vm.isVisiblePush = false
            },2000)
        },
        sortByStatus(option){
            this.sortedTask = []
            let vm = this
            this.todos.map(function(item){
                if(item.status == option.value){
                    vm.sortedTask.push(item)
                }
            })
            this.selectedTASK = option.name
        },
        editTodoItem(todo){
            todo.editing = true
        },
        doneEdit(todo){

            todo.editing = false

            this.isVisiblePush = true
            this.messages = `Изменения успешно внесены`

            this.hidePush()
        },
        cancelEdit(todo){
            todo.title = this.beforeEdit
            todo.editing = false
        },
        removeTodoItem(index){
            let tmp = this.todos[index].title
            this.todos.splice(index,1)
            this.isVisiblePopup = false

            this.isVisiblePush = true
            this.messages = `Задача "${tmp}" была успешно удалена`

            this.hidePush()
        },
        confirmDeleteItem(index){
            this.isVisiblePopup = true
            this.index1 = index
        },
        closePopup(){
            this.isVisiblePopup = false
            this.isCreateTaskVisible = false
        },
        showSubTask(index){
            this.isVisibleSubTask = true;
            this.index1 = index;
            this.subtask = this.todos[index].subtask;
        },
        sorted(){
            this.todos.sort(function(a,b){
                if(a.title>b.title){
                    return 1
                }
                if(a.title<b.title){
                    return -1
                }
                return 0
            })
        },
        addTodo(){
            this.isCreateTaskVisible = true
        },
        newTaskAdd(){
            let idNewTask = this.todos.length + 1
            let date = new Date()
            date = new Intl.DateTimeFormat('ru', this.format).format(date)
            let goodDate = date.replace(/[,]/g, '')

            if(this.newTask.trim().length == 0 || this.newDescription.trim().length == 0) {
                this.isCreateTaskVisible = false
                this.messages = `Задача не была добавлена за нарушения`
                this.isVisiblePush = true
                return
            }
            this.todos.push({
                id: idNewTask,
                title: this.newTask,
                editing: false,
                description: this.newDescription,
                date: goodDate,
                subtask: []
            })
            this.messages = `Задача "${this.newTask}" была успешно добавлена`
            this.isVisiblePush = true

            this.newTask = null
            this.newDescription = null
            this.isCreateTaskVisible = false

            this.hidePush()
        },
        checkSubTask(){ // выдаю нужный цвет, (НЕ ЗАБУДЬ ЧТО ДЕЛАТЬ ДАЛЬШЕ) придумать как задавать его (СУКА УЖЕ ЗАБЫЛ) Наверное надо объеденить эти ф-ции и в зависимости от completed присваивать цвет
            this.todos.forEach(function(elem) {
                let color = ""
                let countChecked = 0;
                    
                if(elem.subtask.length == 0){
                    color = "white"
                    elem.status = 0
                }
                else{
                    elem.subtask.forEach((task) =>{
                        if(task.completed == false || task.completed == undefined){
                            color = "green"
                            elem.status = 0
                        }
                        else if(task.completed == true){
                            countChecked++
                        }
                    })
                    if(countChecked == elem.subtask.length){               
                        color = "grey"
                        elem.status = 1
                    }
                }
                elem.color = color
            })
        }
    },
    mounted(){
        this.sorted() 
        this.checkSubTask()
    }
}
</script>


<style lang="sass">

.push
    background: #ffffff
    border-radius: 10px
    position: fixed
    right: 3%
    top: 6%
    z-index: 1000
    padding: 15px

.animate-enter-active 
    transition: all .9s ease

.animate-leave-active 
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.animate-enter, .animate-leave-to
    transform: translateX(10px)
    opacity: 0

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
    max-height: 41px 
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
    min-width: 10px
    height: 41px
    background: white
.date
    color: #c4c4c4

.grey
    background: grey !important

.green
    background: green !important

</style>