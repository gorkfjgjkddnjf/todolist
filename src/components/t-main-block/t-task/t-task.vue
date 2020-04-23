<template>
    <div class="t-task px-0">

        <transition name="animate">
            <p class="push" v-show="isVisiblePush">
                {{messages}}  
            </p>     
        </transition>   

        <popup v-if="isVisiblePopupDelete" @closePopup="closePopup" @confirm="deleteTodoList" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{TODO_LIST[listIndex].name}}"</h2>
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


        <!-- <div class="main-section">
            <div class="select">
            <t-select
            :options="options"
            @select="sortByStatus"
            :selected="selectedTASK"
            @addTodo="addTodo"
            />
        </div> -->
       
        <div class="list">
            <div class="" v-for="(todo, index) in TODO_LIST" :key="todo.id">
                <div class="todo-item">
                    <div class="todo-item-left">
                        <div class="check"></div>
                        <p class="ml-2 mb-0 py-2 todo-item-label" @click="showSubTask">{{todo.name}}</p>
                        <!-- <input v-else class="todo-item-edit ml-2 py-2" type="text"
                            v-model="todo.name" 
                            @keyup.enter="doneEdit"
                        > -->
                    </div>

                    <div class="edit-icon">
                        <i class="material-icons shedule">schedule</i>
                        <p class="mb-0 date px-2">{{todo.created_at}}</p>
                        <i class="material-icons edit">edit</i>
                        <i class="material-icons close" @click="confirmDeleteItem(todo.id, index)">close</i>
                    </div>
                </div> 
                
                
                <div class="subtask" v-if="isVisibleSubTask">
                    <div class="tasks" v-for="tasks in todo" :key="tasks.id">
                        <p>{{tasks.mark}}</p>
                        {{tasks.mark}}
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'
//import tSelect from '../t-select'
//import subtask from '../t-task/t-sub-task'
import popup from '../../popup/t-popup'
export default {
    name: "t-task",
    components: {
        //tSelect,
        //subtask,
        popup,
    },
    data(){
        return {
            list_id: null,
            listIndex: null,
            isVisibleSubTask: false,
            newTask: null,
            newDescription: null,
            color: 'white',
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
            isVisiblePopupDelete: false,
            isCreateTaskVisible: false,
            selectedTASK: 'Все',
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
        ...mapGetters([
            'TODO_LIST'
        ]),
    },
    methods:{
        ...mapActions([
            'GET_TODO_LIST',
            'DELETE_TODO_LIST',
            'DELETE_FROM_STATE'
        ]),
        closePopup(){
            this.isVisiblePopupDelete = false
            this.isCreateTaskVisible = false
        },
        confirmDeleteItem(list_id, index){
            this.isVisiblePopupDelete = true
            this.list_id = list_id   
            this.listIndex = index      
        },
        deleteTodoList(){
            let tmp = this.TODO_LIST[this.listIndex].name
            
            this.DELETE_TODO_LIST(this.list_id)
            this.DELETE_FROM_STATE(this.listIndex)
            this.isVisiblePopupDelete = false

            this.isVisiblePush = true
            this.messages = `Задача "${tmp}" была успешно удалена`

            this.hidePush()  
        },
        showSubTask(){
            this.isVisibleSubTask = !this.isVisibleSubTask
        },
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
        
    },
    mounted(){
        this.GET_TODO_LIST()
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



.close
    cursor: pointer

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