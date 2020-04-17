<template>
    <div class="t-forgot-pass containet">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6 shadow sign">
                <tForgotPass/>
            </div>
        </div>
    </div>

</template>

<script>

import tForgotPass from './t-forgot-pass-item/t-forgot-pass-item'

export default {
    name: "t-forgot-pass",
    components: {
        tForgotPass
    },
    data(){
        return {}
    },
    computed: {}
}
</script>


<style lang="sass">

</style>