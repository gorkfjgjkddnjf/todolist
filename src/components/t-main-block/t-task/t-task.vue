<template>
    <div class="t-task px-0 mt-5 row flex-md-nowrap">

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
                <h2 class="tt">Вы действительно хотите удалить "{{taskName}}" из списка ""{{TODO_LIST[listIndex].name}}"</h2>
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
                <label for="fast" class="pl-2">Выберите срочность</label> 
                <select id="fast" class="form-control form-control-lg" required v-model="urgency">
                    <option selected value="1">Не выбрано</option>
                    <option value="2">Не срочно</option>
                    <option value="3">Поторопись</option>
                    <option value="4">Срочно</option>
                    <option value="5">Очень срочно</option>
                </select>
                <div class="error" v-if="ERRORS && error">
                    <div class="" v-if="ERRORS.urgency">
                        <span class="error">{{ERRORS.urgency[0]}}</span>
                    </div>
                </div>
            </div>
        </popup>        

        <div class="list col-12 mr-2 px-0" :class="{'col-md-4' : size, 'col-md-12' : !size}">
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

        
            <div class="" v-for="(todo, index) in fiterTask" :key="todo.id">
                <div class="todo-item" >
                    <div class="todo-item-left" @click="showSubTask(index, todo)">
                        <div class="check" :class="{grey : todo.success == todo.every && todo.every != 0, green: todo.success != todo.every}"></div>
                        <div class="col-12">
                            <p v-if="!todo.editing" class="ml-2 mb-0 py-2 todo-item-label">{{todo.name}}</p>
                            <input v-else class="todo-item-edit ml-2 py-2" type="text"
                                v-model="todo.name" 
                                @blur="doneEdit(todo)"
                                @keyup.enter="doneEdit(todo)"
                                v-focus
                            >
                            <div class="row edit-icon pl-4">
                                <i class="material-icons shedule">schedule</i>
                                <p class="mb-0 date px-2">{{todo.created_at}}</p>
                            </div>
                        </div>
                    </div>

                    <div class="edit-icon">
                        <i class="material-icons edit" @click="editTodoItem(todo)">edit</i>
                        <i class="material-icons close" @click="confirmDeleteTodo(todo.id, index)">close</i>
                    </div>
                </div> 
            </div>
        </div>


        <div class="col-8 subtask px-0 ml-2" v-if="isVisibleSubTask">
                
            <div class="head-sub-task text-center py-2">
                {{todo.name}}
            </div>

            <div class="description">
                <p class="mb-0 pl-2 py-2 todo-item-label">
                    {{todo.description}}
                </p>
            </div>

            <div class="select">
                <t-select
                    :selected="selected"
                    @isvisble="isVisbleItem"
                    @addTodo="addSubTask(todo.id)"
                />
            </div>                
                
            <div class="" v-for="(tasks) in subtask" :key="tasks.id" >                
                <div class="todo-item" v-show="isVisibleItem1">
                    <div class="todo-item-left">
                        <input type="checkbox" v-model="tasks.mark" class="ml-3" @click="checkSubTask(tasks.id, todo)">
                        <p v-if="!tasks.editing" class="ml-2 mb-0 py-2 todo-item-label" :class="{completed : tasks.mark}">{{tasks.name}}</p>
                        <input v-else class="todo-item-edit ml-2 py-2" type="text"
                            v-model="tasks.name" 
                            @blur="doneEdit(tasks)"
                            @keyup.enter="doneEdit(tasks)"
                            v-focus
                        >
                        <i class="material-icons no-select" v-if="tasks.urgency == '1'">flag</i>
                        <i class="material-icons no-urgency" v-if="tasks.urgency == '2'">flag</i>
                        <i class="material-icons fast" v-if="tasks.urgency == '3'">flag</i>
                        <i class="material-icons urgency" v-if="tasks.urgency == '4'">flag</i>
                        <i class="material-icons very-urgency" v-if="tasks.urgency == '5'">flag</i>
                    </div>
                        
                    <div class="edit-icon">
                        <i class="material-icons shedule">schedule</i>
                        <p class="mb-0 date px-2">{{tasks.created_at}}</p>
                        <i class="material-icons edit" @click="editTodoItem(tasks)">edit</i>
                        <i class="material-icons close" @click="confirmDeleteTask(tasks)">close</i>
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
            todo: null,
            size: false,
            beforeEditName: null,
            beforeEditDes: null,

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
            'CREATE_SUB_TASK',
            'EDIT_TODO',
            'EDIT_TASK'
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
        confirmDeleteTask(tasks){
            this.isVisiblePopup = true
            this.task_id = tasks.id
            this.taskName = tasks.name
        },
        deleteTodoList(){
            let tmp = this.TODO_LIST[this.listIndex].name
            
            this.DELETE_TODO_LIST(this.list_id)
            this.DELETE_FROM_STATE(this.listIndex)
            .then(()=>{
                if(this.todo.id == this.list_id){
                    this.size = false
                    this.isVisibleSubTask = false
                }
                this.isVisiblePopupDelete = false
                this.isVisiblePush = true
                this.messages = `Задача "${tmp}" была успешно удалена`

                this.hidePush()  
            })

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
        showSubTask(index, todo){
            this.isVisibleSubTask = !this.isVisibleSubTask
            this.size = !this.size
            this.subtask = this.TODO_LIST[index].tasks
            this.todo = todo
            this.listIndex = index
            this.isVisibleItem1 = false
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
        editTodoItem(item){
            this.beforeEditName = item.name
            this.beforeEditDes = item.description
            item.editing = true
        },
        doneEdit(item){
            console.log(2)
            if(item.name.length != 0 && item.name.trim().length != 0 && item.description.length != 0 && item.description.trim().length != 0){
                if(item.urgency){
                    let task = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        urgency: item.urgency
                    }
                    this.EDIT_TASK(task)
                    .then(() => {
                        item.editing = false
                        this.isVisiblePush = true
                        this.messages = `Изменения успешно внесены`
                        this.hidePush()
                    })
                    
                }
                else{
                    let todo = {
                        id: item.id,
                        name: item.name,
                        description: item.description
                    }
                    this.EDIT_TODO(todo)
                    .then(() => {
                        this.isVisiblePush = true
                        item.editing = false
                        this.messages = `Изменения успешно внесены`
                        this.hidePush()
                    })                
                    return
                }
            } 
            else {
                item.editing = false
                item.name = this.beforeEditName
                item.description = this.beforeEditDes

                this.isVisiblePush = true
                this.messages = `Изменения не были внесены`
                this.hidePush()                
            }
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
                description: 0,
                urgency: this.urgency,
                list_index: this.listIndex
            }
            this.CREATE_SUB_TASK(subtask)
            .then(() => {

                this.GET_TODO_LIST()
            })
            if(this.newSubTask != null && this.urgency != null){

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
    height: 4.6rem
    background: white
.date
    color: #c4c4c4
    font-size: 16px

.grey
    background: #9A9A9A 

.green
    background: #45BE93 

</style>