<template>
    <div class="t-login-item">
        <h2 class="pl-3 main-item-head mb-4">Авторизация</h2>
        <form action="" method="POST" class="needs-validation" @submit.prevent="login">
            <div class="form-group col-12">
                <label for="email">Email</label> 
                <input type="email" name="login" class="form-control form-control-lg" id="email" required v-model="logEmail" value = "Деда">
            </div>
            <div class="form-group col-12">
                <label for="pass">Пароль</label> 
                <input v-bind:type="typeInput" name="pass" class="form-control form-control-lg t-login-item__eye" id="pass" required v-model="password">
                <i class="material-icons visibility" v-if="!visibility" v-on:click="type">visibility_off</i>
                <i class="material-icons visibility" v-else v-on:click="type">visibility</i>
                <small v-show="valid" class="invalid-login">Неверный логин или пароль</small>
            </div>
            <div class="form-group col-12">
                <input type="submit" class="btn w-100 btn-lg btn-sign" value="Вход" v-on:click="login">
            </div>
            <div class="col-12">
                <router-link :to="{name: 'forgot-pass'}">
                    <p class="forgot-pass-link">Забыли пароль?</p>
                </router-link>
            <hr class="t-login-item__hr">
            </div>
            <div class="row justify-content-center mx-0 link">
                <p class="t-login-item__text">Нет аккаунта?</p>
                <router-link :to="{name: 'sign-up'}">
                    <p class="">Регистрация</p>
                </router-link>
            </div>
        </form>
    </div>

</template>

<script>
    import router from "../../../router/router";
    import array from "./array.json";
     export default {
        name: "t-login-item",
        components: {},
        data() {
            return {
                typeInput: 'password',
                visibility: false,
                logEmail: "",
                password: ""
            }
        },
        computed: {
            valid(){
                return false
            }
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
            login(){
                JSON.parse(JSON.stringify(array));
                for(let i = 0; i < array.user.length; i++){
                    if(array.user[i].username == this.logEmail && array.user[i].password == this.password){
                        router.push({ path: '/' });
                    }
                }
                
            }
        }
    }
</script>


<style lang="sass">
.t-login-item
    &__hr
        border: 1px solid #C4C4C4
    &__text
        margin-right: 20px

.visibility
    position: absolute
    top: 50%
    left: 90%

</style>