<template>
    <v-app>
        <div style="background-color: black; height:100vh; width: 100vw; ">

            <toolBar />
            <addEventButton />
        </div>
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