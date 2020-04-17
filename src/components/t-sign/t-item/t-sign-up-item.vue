<template>
    <div class="t-sign-up-item">
        <h2 class="pl-3 main-item-head mb-4">Регистрация</h2>
        <form action="" method="POST" class="needs-validation">
            <div class="form-group col-12">
                <label for="username">Ваше имя</label> 
                <input type="text" name="username" class="form-control form-control-lg" id="username" required>
            </div>
            <div class="form-group col-12">
                <label for="email">Email</label> 
                <input type="email" name="login" class="form-control form-control-lg" id="email" required>
            </div>
            <div class="form-group col-12">
                <label for="pass">Пароль</label> 
                <input v-bind:type="password" name="pass" class="form-control form-control-lg t-sign-up-item__eye" id="pass" required>
                <span class="t-sign-up-item__span" v-on:click="type"></span>
            </div>
            <div class="form-group col-12">
                <label for="confirm-pass">Подтвердите пароль</label> 
                <input v-bind:type="password" name="confirm-pass" class="form-control form-control-lg t-sign-up-item__eye" id="confirm-pass" required>
                <span class="t-sign-up-item__span" v-on:click="type"></span>
            </div>
            <div class="row justify-content-center mx-0 link">
                <p class="mb-0">Нажимая "Регистрация" Вы соглашаетесь с</p>
                <router-link :to="{name: ''}">
                    <p class="">Условиями использования</p>
                </router-link>
            </div>
            <div class="form-group col-12">
                <input type="submit" class="btn w-100 btn-lg btn-sign" value="Вход">
            </div>
            <hr class="t-sign-up-item__hr">
            <div class="row justify-content-center mx-0 link">
                <p class="mx-2">Уже зарегестрированны?</p>
                <router-link :to="{name: 'login'}">
                    <p class="mx-2">Войти в систему</p>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
// let k = 0;
export default {
    name: "t-sign-up-item",
    components: {},
    data(){
        return {password: 'password'}
    },
    computed: {},
    methods: {
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
    .t-sign-up-item
        &__hr
            border: 1px solid #C4C4C4;
        &__eye
            position: relative;
        &__span
            position: absolute
            background: url('../../../images/eye-inline.png') no-repeat;
            width: 31px;
            height: 27px;
            top: 50%;
            right: 30px;
</style>