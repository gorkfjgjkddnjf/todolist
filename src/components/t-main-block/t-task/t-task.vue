<template>
    <div class="t-task px-0 mt-5">

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

        <popup v-if="isVisiblePopup" @closePopup="closePopup" @confirm="deleteSubTask" btnOk="Удалить">
            <template v-slot:head>
                <h2 class="tt">Вы действительно хотите удалить "{{taskName}}" из списка "{{TODO_LIST[listIndex].name}}"</h2>
            </template>
        </popup>

        <popup v-if="isCreateTaskVisible" @closePopup="closePopup" @confirm="newTaskAdd" btnOk="Сохранить">
            <template v-slot:head>
                <h2 class="tt">Добавление задачи</h2>
            </template>
            <div class="form-group text-left mx-md-4">
                <label for="title">Название</label> 
                <input type="text" name="title" class="form-control form-control-lg" id="title" required v-model="newTask">
                <div class="error" v-if="ERRORS && error">
                    <div class="" v-if="ERRORS.name">
                        <span class="error">{{ERRORS.name[0]}}</span>
                    </div>
                </div>
            </div>
            <div class="form-group text-left mx-md-4">
               <label for="description">Краткое описание</label>
               <textarea class="form-control form-control-lg" name="description" id="description" cols="30" rows="2" required v-model="newDescription"></textarea>
                <div class="error" v-if="ERRORS && error">
                    <div class="" v-if="ERRORS.description">
                        <span class="error">{{ERRORS.description[0]}}</span>
                    </div>
                </div>
            </div>
        </popup>

        <popup v-if="isCreateSubTaskVisible" @closePopup="closePopup" @confirm="newSubTaskAdd" btnOk="Сохранить">
            <template v-slot:head>
                <h2 class="tt">Добавление подзадачи</h2>
            </template>
            <div class="form-group text-left mx-md-4">
                <label for="title">Название</label> 
                <input type="text" name="title" class="form-control form-control-lg" id="title" required v-model="newSubTask">
                <div class="error" v-if="ERRORS && error">
                    <div class="" v-if="ERRORS.name">
                        <span class="error">{{ERRORS.name[0]}}</span>
                    </div>
                </div>
            </div>
            <div class="form-group text-left mx-md-4">
                <label for="fast" class="pl-2">Это срочно?</label> 
                <input type="text" name="title" class="form-control form-control-lg" id="fast" required v-model="urgency">
                <div class="error" v-if="ERRORS && error">
                    <div class="" v-if="ERRORS.urgency">
                        <span class="error">{{ERRORS.urgency[0]}}</span>
                    </div>
                </div>
            </div>
        </popup>        


        <div class="main-section">
            <div class="select">
                <t-select
                    :selected="selectedTASK"
                    :options="options"
                    @select="sortByStatus"
                    @addTodo="addTodo"
                />
            </div>
        </div>

        <div class="list">
            <div class="" v-for="(todo, index) in fiterTask" :key="todo.id">
                <div class="todo-item" @click="showSubTask(index)">
                    <div class="todo-item-left">
                        <div class="check" :class="{grey : todo.success == todo.every && todo.every != 0, green: todo.success != todo.every}"></div>
                        <p class="ml-2 mb-0 py-2 todo-item-label">{{todo.name}}</p>
                        <!-- <input v-else class="todo-item-edit ml-2 py-2" type="text"
                            v-model="todo.name" 
                            @keyup.enter="doneEdit"
                        > -->
                    </div>

                    <div class="edit-icon">
                        <i class="material-icons shedule">schedule</i>
                        <p class="mb-0 date px-2">{{todo.created_at}}</p>
                        <i class="material-icons edit">edit</i>
                        <i class="material-icons close" @click="confirmDeleteTodo(todo.id, index)">close</i>
                    </div>
                </div> 

                <div class="" v-show="isVisibleSubTask">
                    
                    <div class="head-sub-task text-center py-2">
                        {{todo.name}}
                    </div>
                    <div class="description">
                        <p class="ml-2 mb-0 py-2 todo-item-label">{{todo.description}}</p>
                    </div>
                    <div class="select">
                        <t-select
                            :selected="selected"
                            @isvisble="isVisbleItem"
                            @addTodo="addSubTask(todo.tasks[index].listt_id)"
                        />
                    </div>                
                </div>               
                    <div class="subtask">
                        <div class="" v-for="(tasks) in subtask" :key="tasks.id" >

                            <div class="todo-item" v-show="isVisibleItem1 && todo.id == tasks.listt_id">
                                <div class="todo-item-left">
                                    <input type="checkbox" v-model="tasks.mark" class="ml-3" @click="checkSubTask(tasks.id, todo)">
                                    <p class="ml-2 mb-0 py-2 todo-item-label" :class="{completed : tasks.mark}">{{tasks.name}}</p>
                                    <!-- <input v-else class="todo-item-edit ml-2 py-2" type="text"
                                        v-model="todo.name" 
                                        @keyup.enter="doneEdit"
                                    > -->
                                </div>
                        
                                <div class="edit-icon">
                                    <i class="material-icons shedule">schedule</i>
                                    <p class="mb-0 date px-2">{{todo.created_at}}</p>
                                    <i class="material-icons edit">edit</i>
                                    <i class="material-icons close" @click="confirmDeleteTask(tasks.id, index, tasks.name)">close</i>
                                </div>
                            </div>   
                        </div>                                     
                    </div>                    
            </div>
        </div>
    </div>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import tSelect from '../t-select'
//import subtask from '../t-task/t-sub-task'
import popup from '../../popup/t-popup'
export default {
    name: "t-task",
    components: {
        tSelect,
        //subtask,
        popup,
    },
    data(){
        return {
            list_id: null,
            task_id: null,
            listIndex: null,
            taskName: null,

            isVisibleSubTask: false,
            isVisibleItem1: false,
            isCreateSubTaskVisible: false,
            newSubTask: null,
            urgency: null,
            subtask:[],
            selected: 'Подзадачи',

            newTask: null,
            newDescription: null,
            error: true,

            color: 'white',
            
            options:[
                {name: 'Все задачи', value:2},
                {name: 'Исполненные', value: true},
                {name: 'Не исполненные', value: false},
            ],
            selectedTASK: 'Все',
            sortedTask: [],
            
            format:{ 
                year: 'numeric',
                month: 'numeric', 
                day: 'numeric',
                hour: 'numeric', 
                minute: 'numeric',
                hour12: false
            },
            isVisiblePopup: false,
            isVisiblePopupDelete: false,
            isCreateTaskVisible: false,

            isVisiblePush: false,
            messages: null,      
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
            'TODO_LIST',
            'ERRORS'
        ]),
        fiterTask(){
            if(this.sortedTask.length){
                return this.sortedTask
            }
            else{
                return this.TODO_LIST
            }
        }
    },
    methods:{
        ...mapActions([
            'GET_TODO_LIST',
            'DELETE_TODO_LIST',
            'DELETE_FROM_STATE',
            'CREATE_TASK',
            'CHECK_SUBTASK',
            'DELETE_SUBTASK',
            'CREATE_SUB_TASK'
        ]),
        closePopup(){
            this.isVisiblePopupDelete = false
            this.isVisiblePopup = false
            this.isCreateTaskVisible = false
            this.isCreateSubTaskVisible = false
            this.error = false
        },
        confirmDeleteTodo(id, index){
            this.isVisiblePopupDelete = true
            this.list_id = id 
            this.listIndex = index      
        },
        confirmDeleteTask(id, index, name){
            this.isVisiblePopup = true
            this.task_id = id
            this.taskName = name
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
        deleteSubTask(){
            this.DELETE_SUBTASK(this.task_id)
            .then(() => {
                this.GET_TODO_LIST()
                this.isVisiblePopup = false

                this.isVisiblePush = true
                this.messages = `Подзадача "${this.taskName}" была успешно удалена`

                this.hidePush() 
            })
        },
        showSubTask(index){
            this.isVisibleSubTask = !this.isVisibleSubTask
            this.subtask = this.TODO_LIST[index].tasks
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
            this.TODO_LIST.map(function(item){
                if((item.success == item.every && item.every != 0) == option.value){
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
        addSubTask(list_id){
            this.isCreateSubTaskVisible = true
            this.list_id = list_id

        },
        newTaskAdd(){

            let task = {
                name: this.newTask,
                description: this.newDescription,
            }
            this.CREATE_TASK(task)
            if(this.newTask != null && this.newDescription != null){
                this.GET_TODO_LIST()
                this.messages = `Задача "${this.newTask}" была успешно добавлена`
                this.isVisiblePush = true

                this.newTask = null
                this.newDescription = null

                this.isCreateTaskVisible = false
                this.error = false
                this.hidePush()
            }           
        },
        newSubTaskAdd(){
            let subtask = {
                name: this.newSubTask,
                listt_id: this.list_id,
                urgency: this.urgency
            }
            //console.log(this.newSubTask,this.urgency, this.list_id)
            //console.log(subtask)
            this.CREATE_SUB_TASK(subtask)
            if(this.newSubTask != null && this.urgency != null){
                this.GET_TODO_LIST()

                this.messages = `Подзадача "${this.newSubTask}" была успешно добавлена`
                this.isVisiblePush = true

                this.newSubTask = null
                this.urgency = null

                this.isCreateSubTaskVisible = false
                this.error = false

                this.hidePush()
            }
        },
        checkSubTask(id){
            this.CHECK_SUBTASK(id)
            .then(() => {
                this.GET_TODO_LIST()
            })

        },
        isVisbleItem(isOptionVisible){
            this.isVisibleItem1 = isOptionVisible
        }
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

.completed
    text-decoration: line-through
    color: grey

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