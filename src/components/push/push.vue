<template>


        <div class="push text-center">
            <transition name="animate" class="">
                <div class="push__content p-3">
                    <slot></slot>
                </div>
            </transition>
        </div>


</template>

<script>



export default {
    name: "push",
    components: {

    },
    data(){
        return {}
    },
    computed: {}
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

</style>