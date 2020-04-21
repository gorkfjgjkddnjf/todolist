<template>
    <div class="t-sign-up-item">
        <h2 class="pl-3 main-item-head my-4">Регистрация</h2>
        <form @submit.prevent="reg_user">
            <div class="form-group mb-4 col-12">
                <label for="username">Ваше имя</label> 
                <input type="text" name="username" class="form-control form-control-lg" id="username" required v-model="name">
            </div>
            <div class="form-group col-12">
                <label for="email">Email</label> 
                <input type="email" name="login" class="form-control form-control-lg" id="email" required v-model="email">
                <div class="mb-4" v-if="ERRORS">
                    <div class="" v-if="ERRORS.email">
                        <span class="error">Пользователь такой электронной почтой уже существует</span>
                    </div>
                </div>
            </div>
            <div class="form-group mb-4 col-12">
                <label for="pass">Пароль</label> 
                <input v-bind:type="type" name="pass" class="form-control form-control-lg t-sign-up-item__eye" id="pass" required v-model="password">
                <i class="material-icons visibility" v-if="!visibility" v-on:click="typeInput">visibility_off</i>
                <i class="material-icons visibility" v-else v-on:click="typeInput">visibility</i>
            </div>
            <div class="form-group mb-0 col-12">
                <label for="confirm-pass">Подтвердите пароль</label> 
                <input v-bind:type="type" name="confirm-pass" class="form-control form-control-lg t-sign-up-item__eye" id="confirm-pass" required v-model ="password_confirmation">
                <i class="material-icons visibility" v-if="!visibility" v-on:click="typeInput">visibility_off</i>
                <i class="material-icons visibility" v-else v-on:click="typeInput">visibility</i>
            </div>
            <div class="mb-4" v-if="ERRORS">
                <div class="" v-if="ERRORS.password">
                    <span class="error pl-3">Пароли не совпадают</span>
                </div>
            </div>
            <div class="row justify-content-center text-center mx-0 link">
                <div class="form-group col-8">
                    <p class="mb-0">Нажимая "Регистрация" Вы соглашаетесь с </p>
                    <router-link :to="{name: ''}">
                        <p class="mx-2"> Условиями использования</p>
                    </router-link>
                </div>
            </div>
            <div class="form-group mb-4 col-12">
                <input type="submit" class="btn w-100 btn-lg btn-sign" value="Регистрация">
            </div>
            <hr class="t-sign-up-item__hr">
            <div class="row justify-content-center mx-0 mb-4 link">
                <p class="mx-2">Уже зарегестрированны?</p>
                <router-link :to="{name: 'login'}">
                    <p class="mx-2">Войти в систему</p>
                </router-link>
            </div>
        </form>

    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "t-sign-up-item",
    components: {},
    data(){
        return {
            name : "",
            email : "",
            password : "",
            password_confirmation : "",
            type: 'password',
            visibility: false
        }
    },
    computed: {
        ...mapGetters([
            'ERRORS'
        ])
    },
    methods: {
        typeInput(){
            if (this.type === "password"){
                this.type = "text";
                this.visibility = true
            }
            else{
                this.type = "password";
                this.visibility = false
            }
        },
        ...mapActions([
            'REGISTER_USER'
        ]),
        reg_user(){
            let user = {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            }
            this.REGISTER_USER(user)
        }
    },
}
</script>


<style lang="sass">
.t-sign-up-item
    &__hr
        border: 1px solid #C4C4C4

.visibility
    position: absolute
    top: 50%
    left: 90%

</style>