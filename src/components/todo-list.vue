<template>
    <div class="todo-list">

        <popup 
            v-if="isVisiblePopupDelete" 
            @closePopup="closePopup" 
            btnOk="Удалить"
        >
        </popup>

    
      <h1 @click="getTodo">kek</h1>

        
    <div class="list">
        <div class="todo-item" v-for="todo in TODO_LIST" :key="todo.id">
            <div class="todo-item-left">
                <div class="check"></div>
                <p class="ml-2 mb-0 py-2 todo-item-label">{{todo.name}}</p>
                <!-- <input v-else class="todo-item-edit ml-2 py-2" type="text"
                    v-model="todo.name" 
                    @keyup.enter="doneEdit"
                > -->
            </div>

            <div class="edit-icon">
                <i class="material-icons shedule" >schedule</i>
                <p class="mb-0 date px-2">{{todo.created_at}}</p>
                <i class="material-icons edit">edit</i>
                <i class="material-icons close" @click="confirmDeleteItem(todo.id)">close</i>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import popup from '../components/popup/t-popup'
export default {
    name: "todo-list",
    data(){
        return{
            isVisiblePopupDelete: false
        }
    },
    components:{
        popup
    },
    computed:{
        ...mapGetters([
            'TODO_LIST'
        ])
    },
    methods:{
        ...mapActions([
            'GET_TODO_LIST',
            'DELETE_TODO_LIST'
        ]),
        getTodo(){
            this.GET_TODO_LIST()
        },
        // editTodoItem(){
        //     this.editing = true
        // },
        // doneEdit(){
        //     this.editing = false
        // }
        closePopup(){
            this.isVisiblePopupDelete = false
            this.isCreateTaskVisible = false
        },
        confirmDeleteItem(list_id){
            this.isVisiblePopupDelete = true
            console.log(list_id, this.isVisiblePopupDelete)
            //this.DELETE_TODO_LIST(list_id)
        }
    },
    mounted(){

    },

}

</script>

<style lang="sass">

</style>