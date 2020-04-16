<template>
    <div class="t-popup shadow col-11 col-md-10">
        <div class="popup-head text-center mb-4 pt-3">
            <slot name="head"></slot>
        </div>
        <div class="content text-center mb-5">
            <slot></slot>
        </div>
        <div class="row justify-content-center pb-4">
            <div class="col-12 col-md-3">
                <button class="btn w-100" id="No" @click="closePopup">Отментиь</button>
            </div>
            <div class="col-12 col-md-3">
                <button class="btn w-100" id="Yes" @click="deleteItem(index)">{{btnOk}}</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 't-popup',
    props:{
        btnOk:{
            type: String,
            default: 'popupname'
        },
        index:{
            type:Number,
            default: 0
        }
    },
    data(){
        return{

        }
    },
    computed:{

    },
    methods:{
        closePopup(){
            this.$emit('closePopup')
        },
        deleteItem(index){
            this.$emit('deleteItem', index)
        },

    }
}

</script>


<style lang="sass">
#Yes
    background: #6FA0D9
    border-radius: 20px
    color: #ffffff
#No
    background: #C74B4B
    border-radius: 20px
    color: #ffffff

.t-popup
    background: #ffffff
    border-radius: 15px



</style>