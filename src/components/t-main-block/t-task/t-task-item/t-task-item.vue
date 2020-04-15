<template>
    <div class="t-task-item">
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
                    <i class="material-icons edit" @click="editTodoItem(todo)">edit</i>
                    <i class="material-icons close" @click="removeTodoItem(index)">close</i>
                </div>
            </div>
    </div>

</template>

<script>


export default {
    name: "t-task-item",
    components: {
    },
    props:{

    },   
    data(){
        return {
            newTodo:'',
            todos:[
                {
                    'id':1,
                    'title': 'Купить молоко',
                    'editing': false
                },
                {
                    'id':2,
                    'title': 'Пойти на работу',
                    'editing': false
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
        editTodoItem(todo){
            todo.editing = true
        },
        doneEdit(todo){
            todo.editing = false
        },
        removeTodoItem(index){
            //showPopup()
            this.todos.splice(index,1)
        },
    }
}
</script>


<style lang="sass">
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