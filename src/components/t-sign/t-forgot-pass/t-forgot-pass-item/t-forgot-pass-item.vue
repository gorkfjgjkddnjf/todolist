<template>
    <div class="t-forgot-pass-item col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 px-0 px-sm-3">
        <h2 class="pl-3 main-item-head my-3 my-sm-4">Забыли пароль?</h2>
        <form @submit.prevent="refreshForm" v-if="showForm">
        <p class="t-forgot-pass-item__text">Введите адрес электронной почты</p>
            <div class="form-group mb-4 col-12">
                <label for="email">Email</label>
                <input type="email" name="login" class="form-control" id="email" required>
            </div>
            <div class="form-group col-12">
                <input type="submit" class="btn w-100 btn-sign" value="Сбросить пароль">
            </div>

        </form>
        <div v-else class="row justify-content-center">
            <div  class="col-8 text-center">
                <p>Сообщение востановления пароля было отправлено на указаннную почту</p>
            </div>
        </div>
        <div class="row justify-content-center mx-0 link">
            <div class="col-12 text-center">
                <hr class="t-forgot-pass-item__hr">
                <router-link :to="{name: 'login'}" >
                    <p class="t-forgot-pass-item__link" @click="backToForm">Вернуться на страницу входа</p>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "t-forgot-pass-item",
        components: {},
        data() {
            return {
                showForm: true
            }
        },
        computed: {

        },
        methods: {
            refreshForm() { //обновляет форму при отправке емайла
                this.showForm = false
            },
            backToForm(){
                this.showForm = true
            }
        },
    }
</script>


<style lang="sass">
.t-forgot-pass-item
    border-radius: 20px
    background-color: #FFF
    &__text
        font-size: 15px
        padding-left: 15px
        &__hr
            border: 1px solid #C4C4C4
        .link
            margin-bottom: 15px

</style>