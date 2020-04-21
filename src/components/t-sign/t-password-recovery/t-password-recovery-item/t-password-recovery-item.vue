<template>
    <div class="t-password-recovery-item text-align-center">
        <h2 class="pl-3 main-item-head t-password-recovery-item__title my-4">Забыли пароль?</h2>
        <p class="t-password-recovery-item__text">Сообщение восстановления пароля отправлено на указанную почту</p>
        <div class="row justify-content-center mx-0 link">
            <div class="col-12 text-center">
                <hr class="t-password-recovery-item__hr">
                <router-link :to="{name: 'login'}">
                    <p class="t-password-recovery-item__link">Вернуться на страницу<br> входа</p>
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "t-password-recovery-item",
        components: {},
        data() {
            return {}
        },
        computed: {
            showForm(){ // сюда передаётся что-то из метода ниже
                return true
            }
        },
        methods: {
            refreshForm() { //обновляет форму при отправке емайла
                console.log(1);

            }
        }
    }
</script>


<style lang="sass">
    .t-password-recovery-item
        &__title
            text-align: center;
        &__text
            margin: 0 auto;
            max-width: 300px;
            width: 100%
            text-align: center;
            font-size: 15px;
            padding-left: 15px;
        &__hr
            border: 1px solid #C4C4C4;
        .link
            margin-bottom: 15px;

</style>