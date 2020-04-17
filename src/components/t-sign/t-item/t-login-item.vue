<template>
    <div class="t-login-item">
        <h2 class="pl-3 main-item-head mb-4">Авторизация</h2>
        <form action="" method="POST" class="needs-validation">
            <div class="form-group col-12">
                <label for="email">Email</label> 
                <input type="email" name="login" class="form-control form-control-lg" id="email" required>
            </div>
            <div class="form-group col-12">
                <label for="pass">Пароль</label> 
                <input v-bind:type="password" name="pass" class="form-control form-control-lg t-login-item__eye" id="pass" required>
                <span class="t-login-item__span" v-on:click="type"></span>
                <small v-show="valid" class="invalid-login">Неверный логин или пароль</small>
            </div>
            <div class="form-group col-12">
                <input type="submit" class="btn w-100 btn-lg btn-sign" value="Вход">
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
    export default {
        name: "t-login-item",
        components: {},
        data() {
            return {password: 'password'}
        },
        computed: {
            valid(){
                return false
            }
        },
        methods:{
            type(){
                if (this.password === "password"){
                    this.password = "text";
                }
                else{
                    this.password = "password";
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
        &__eye
            position: relative
        &__span
            position: absolute
            background: url('../../../images/eye-inline.png') no-repeat;
            width: 31px;
            height: 27px;
            top: 50%;
            right: 30px;
</style>