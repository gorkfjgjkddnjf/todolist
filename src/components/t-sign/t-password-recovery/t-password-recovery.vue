<template>
    <div class="t-password-recovery containet">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6 shadow sign">
                <tPasswordRecoveryItem/>
            </div>
        </div>
    </div>

</template>

<script>

import tPasswordRecoveryItem from './t-password-recovery-item/t-password-recovery-item'

export default {
    name: "t-password-recovery",
    components: {
        tPasswordRecoveryItem
    },
    data(){
        return {}
    },
    computed: {}
}
</script>


<style lang="sass">
    .t-password-recovery
        .sign
            max-width: 506px;
            width: 100%;
</style>