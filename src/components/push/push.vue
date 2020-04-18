<template>


    <transition name="" class="">
        <div class=" text-center">
                <div class="content p-3">
                    <slot></slot>
                </div>
        </div>
    </transition>


</template>

<script>



export default {
    name: "push",
    components: {

    },
    data(){
        return {}
    },
    computed: {},
    methods:{
        hidePush(){
            //let vm = this
            setTimeout(function () {

            }),3000
        }
    }
}
</script>


<style lang="sass" scoped>

// .push
//     background: #ffffff
//     border-radius: 10px
//     position: fixed
//     right: 3%
//     top: 6%
//     z-index: 1000

// .animate-enter-active 
//     transition: all .9s ease

// .animate-leave-active 
//     transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

// .animate-enter, .animate-leave-to
//     transform: translateX(10px)
//     opacity: 0

// .animate-enter
//     transform: translateX(100px)
//     opacity: 0
// .animate-enter-active
//     transition: all .9s ease
// .animate-enter-to
//     opacity: 1
// .animate-leave
//     opacity: 1
// .animate-leave-active
//     transition: opacity .9s
// .animate-leave-to
//     transform: translateX(100px)
//     opacity: 0
</style>