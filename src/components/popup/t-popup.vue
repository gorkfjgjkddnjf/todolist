<template>

<div class="popup-wrapper">
    <div class="t-popup shadow col-11 col-md-10 col-lg-8 col-xl-6">
        <div class="popup-head text-center mb-4 pt-3">
            <slot name="head"></slot>
        </div>
        <div class="content text-center mb-4">
            <slot></slot>
        </div>
        <div class="row justify-content-center pb-4">
            <div class="col-12 col-sm-5 col-md-3 mb-3 mb-sm-0">
                <button class="btn w-100" id="No" @click="closePopup">Отментиь</button>
            </div>
            <div class="col-12 col-sm-5 col-md-3 ">
                <button class="btn w-100" id="Yes" @click="deleteItem(index)">{{btnOk}}</button>
            </div>
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


.popup-wrapper
    position: fixed
    display: flex
    justify-content: center
    align-items: center
    right: 0
    left: 0
    top: 0
    bottom: 0
    background: rgba(0, 0, 0, .25)
    z-index: 1000

</style>