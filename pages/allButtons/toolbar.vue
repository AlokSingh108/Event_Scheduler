<template>
    <div>
        <nav>
            <v-toolbar color="#757575" app>
                <v-toolbar-title >
                    
                    <span class="text-h3 font-weight-bold">
                        <v-icon size="50" icon="mdi-calendar" ></v-icon>
                        Meeting Scheduler
                    </span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn size="large" @click="$emit('showlogin')">Logout</v-btn>
            </v-toolbar>

        </nav>
    </div>
</template>

<script>
    export default {
        name:'toolBar1'
    }
</script>

<style  scoped>

</style>