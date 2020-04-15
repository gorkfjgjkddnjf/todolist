<template>
    <div class="t-popup">
        <div class="content">
            <slot></slot>
            ttttttt
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <button>Да</button>
            </div>
            <div class="col-12 col-md-6">
                <button>Отментиь</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 't-popup',
    props:{

    },
    data(){
        return{

        }
    },
    computed:{

    }
}

</script>


<style lang="sass">

</style>