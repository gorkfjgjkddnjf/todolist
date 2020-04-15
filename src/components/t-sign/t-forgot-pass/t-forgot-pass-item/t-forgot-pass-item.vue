<template>
    <div class="t-forgot-pass-item">
        <h2 class="pl-3 main-item-head mb-4">Забыли пароль?</h2>
        <form action="" method="POST" class="needs-validation" v-if="showForm">
            <div class="form-group col-12">
                <label for="email">Email</label>
                <input type="email" name="login" class="form-control form-control-lg" id="email" required>
            </div>
            <div class="form-group col-12">
                <input type="submit" class="btn w-100 btn-lg btn-sign" value="Сбросить пароль" @click="refreshForm">
            </div>

        </form>
        <div v-else class="col-12">
            <p>Письмо с сылкой на смену пароля было отправлено на вашу почту</p>
        </div>
        <div class="row justify-content-center mx-0 link">
            <div class="col-12 text-center">
                <hr class="mt-4">
                <router-link :to="{name: 'login'}">
                    <p class="">Вернуться на страницу входа</p>
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

</style>