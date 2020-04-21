<template>
    <header class="container-fluid">
        <div class="row justify-content-between">
            <div class="col-4">
            <h2 class="header-title">
                T<img src="../../assets/images/header-check.png" alt="header check">Dolist
            </h2>
            </div>
            <div class="col-3 logout justify-content-end" v-if="isLogged">
                <i class="material-icons">person</i>
                <button class="btn-logout pl-1" @click="logout_user">Выйти</button>
            </div>
        </div>
    </header>
    
</template>
<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "t-header",
    components: {},
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'IS_LOGGED'
        ]),
        isLogged(){
            return this.IS_LOGGED
        }
    },
    methods:{
        ...mapActions([
            'LOGOUT'
        ]),
        logout_user(){
            this.LOGOUT()
            this.$router.push('/login')
        }
    }
}
</script>


<style lang="sass">
header
    background: #6FA0D9

.logout
    display: flex
    align-items: center

.btn-logout, .logout
    color: #ffffff
    font-size: 1.5rem
    font-weight: bold
    background: none
    border: none
    &:hover
        color: #ffffff

</style>