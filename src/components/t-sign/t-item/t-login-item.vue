<template>
    <div class="t-login-item col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 px-0 px-sm-3">
        <h2 class="pl-3 main-item-head my-3 my-sm-4">Авторизация</h2>
        <form @submit.prevent="login_user">
            <div class="form-group mb-0 col-12">
                <label for="email">Email</label> 
                <input type="email" name="login" class="form-control" id="email" required v-model="logEmail" value = "Деда">
            </div>

            <div class="mb-sm-4 mx-3" v-if="ERRORS && error">
                <div class="" v-if="ERRORS[0].email">
                    <span class="error">{{ERRORS[0].email[0]}}</span>
                </div>
            </div>

            <div class="form-group col-12 mb-0">
                <label for="pass">Пароль</label> 
                <input v-bind:type="typeInput" name="pass" class="form-control t-login-item__eye" id="pass" required v-model="password">
                <i class="material-icons visibility" v-if="!visibility" v-on:click="type">visibility_off</i>
                <i class="material-icons visibility" v-else v-on:click="type">visibility</i>
                
            </div>
                <div class="mb-4 mx-3" v-if="ERRORS && error">
                    <div v-if="ERRORS.message">
                        <span class="error">{{ERRORS.message}}</span>
                    </div>
                    <div v-if="ERRORS[0].password">
                        <span class="error">{{ERRORS[0].password[0]}}</span>
                    </div>
                </div>            

            <div class="form-group my-4 col-12">
                <input type="submit" class="btn w-100 btn-sign" value="Вход">
            </div>
            <div class="col-12">
                <router-link :to="{name: 'forgot-pass'}">
                    <p class="forgot-pass-link mb-4">Забыли пароль?</p>
                </router-link>
            <hr class="t-login-item__hr">
            </div>
            <div class="row justify-content-center mx-0 link">
                <p class="t-login-item__text">Нет аккаунта?</p>
                <router-link :to="{name: 'sign-up'}">
                    <p class="" @click="refreshForm">Регистрация</p>
                </router-link>
            </div>
        </form>
    </div>

</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "t-login-item",
    components: {},
    data() {
        return {
            typeInput: 'password',
            visibility: false,
            logEmail: "",
            password: "",
            error: true
        }
    },
    computed: {
        valid(){
            return false
        },
        ...mapGetters([
            'ERRORS'
        ])
    },
    methods:{
        type(){
            if (this.typeInput === "password"){
                this.typeInput = "text";
                this.visibility = true
            }
            else{
                this.typeInput = "password";
                this.visibility = false
            }
        },
        ...mapActions([
            'LOGIN_USER'
        ]),
        login_user(){
            let user = {
                email: this.logEmail,
                password: this.password
            }
            this.LOGIN_USER(user)
            .then(() => {
                this.$router.push('/')
                this.refreshForm()
            })
            .catch(error => console.log(error))

        },
        refreshForm(){
            this.logEmail = ""
            this.password = ""
            this.error = false
        }
    },
}
</script>


<style lang="sass">
.t-login-item
    border-radius: 20px
    background-color: #FFF
    &__hr
        border: 1px solid #C4C4C4
    &__text
        margin-right: 20px



</style>