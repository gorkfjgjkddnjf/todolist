<template>
    <div class="t-login">
        <div class="sign">
            <tLoginItem/>
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