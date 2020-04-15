<template>
    <div class="t-select">
        <div class="select-head">
            <p @click="noVisible" class="py-2 mb-0">{{selected}}</p>            
            <i class="material-icons icon" v-if="!isOptionVisible" @click="noVisible">keyboard_arrow_down</i>
            <i class="material-icons icon" v-else @click="noVisible">keyboard_arrow_up</i>
            <i class="material-icons icon" id="sort">sort_by_alpha</i>
        </div>
        <div class="options" v-if="isOptionVisible">
            <div class="pl-4 option"                 
                v-for="option in options" 
                :key="option.value" 
                @click="selectOption(option)">
                    
                <p class="py-2 mb-0">{{option.name}}</p>                    
            </div>
        </div>
    </div>

</template>

<script>



export default {
    name: "t-select",
    props:{
        options:{ 
            type: Array,
            default(){
                return[]
            }
        },
        selected:{
            type:String,
            default:''
        },
    },
    components: {
    },
    data(){
        return {
            isOptionVisible: false, 
        }
    },
    computed: {},
    methods:{
        selectOption(option){
            this.$emit('select', option)
            this.isOptionVisible = false
        },
        noVisible(){
            this.isOptionVisible = !this.isOptionVisible
            this.$emit('isvisble', this.isOptionVisible)
            //console.log(this.isOptionVisible) 
        }
    },


}
</script>


<style lang="sass">
// .options
//     height: 12rem

#sort
    position: absolute
    right: 1.3rem
    

</style>