<template>
    <div class="t-sign-up container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6 shadow sign my-5">
                <tSignUpItem/>
            </div>
        </div>
    </div>

</template>

<script>

import tSignUpItem from './t-item/t-sign-up-item'
export default {
    name: "t-sign-up",
    components: {
        tSignUpItem
    },
    data(){
        return {}
    },
    computed: {}
}
</script>


<style lang="sass">

</style>