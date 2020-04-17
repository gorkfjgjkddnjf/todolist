<template>
    <div class="t-main-wrapper">
        <tHeader/>
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>

</template>

<script>
import tHeader from './t-sign/t-header/t-header';

export default {
    name: "t-main-wrapper",
    components: {
        tHeader
    },
    data(){
        return {}
    },
    computed: {}
}
</script>


<style lang="sass">

</style>