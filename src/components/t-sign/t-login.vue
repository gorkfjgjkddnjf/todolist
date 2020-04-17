<template>
    <div class="t-login container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6 shadow sign">
                <tLoginItem/>
            </div>
        </div>
    </div>

</template>

<script>

import tLoginItem from './t-item/t-login-item'

export default {
    name: "t-login",
    components: {
        tLoginItem
    },
    data(){
        return {}
    },
    computed: {}
}
</script>


<style lang="sass">

</style>