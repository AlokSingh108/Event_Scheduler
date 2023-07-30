<template>
    <v-app>
        <toolBar />
        <addEventButton />
    </v-app>
</template>

<script>
import toolBar from './toolbar.vue'
import addEventButton from './allButtons/addEventButton.vue'
    export default {
        components:{
            toolBar,
            addEventButton
        }
    }
</script>

<style scoped>

</style>