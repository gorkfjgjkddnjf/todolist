<template>
    <div class="t-sub-task-item">
            <div class="todo-item" v-for="(todo, index) in todosSub" :key="todo.id">               
                <div class="todo-item-left">
                    <input type="checkbox" v-model="todo.completed" class="ml-3">
                    <p v-if="!todo.editing" class="ml-3 mb-0 py-2 todo-item-label" :class="{completed : todo.completed}">{{todo.title}}</p>
                    <input v-else class="todo-item-edit ml-4 py-3" type="text" 
                        v-model="todo.title" 
                        @blur="doneEdit(todo)"
                        @keyup.enter="doneEdit(todo)"
                        v-focus
                        >
                </div>
                <div class="edit-icon">
                    <i class="material-icons shedule" >schedule</i>
                    <i class="material-icons flag" >flag</i>
                    <i class="material-icons edit" @click="editTodoItem(todo)">edit</i>
                    <i class="material-icons close" @click="removeTodoItem(index)">close</i>
                </div>
            </div>
    </div>

</template>

<script>



export default {
    name: "t-sub-task-item",
    components: {},
    data(){
        return {
            newTodo:'',
            todosSub:[
                {
                    'id':1,
                    'title': 'Купить 1',
                    'editing': false
                },
                {
                    'id':2,
                    'title': 'Пойти 1',
                    'editing': false
                }
            ]
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
            this.todosSub.splice(index,1)
        },

    },
}
</script>


<style lang="sass">
.completed
    text-decoration: line-through
    color: grey

.shedule
    color: grey

.t-sub-task-item
    background: #F8F8F8

</style>