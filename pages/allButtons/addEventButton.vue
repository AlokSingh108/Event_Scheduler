<template>
    <div>
        <v-sheet class="d-flex">
            <v-sheet>
                <div class="bord" align="center">
                    <div class="ma-3">Users</div>
                    <v-divider></v-divider>
                    <v-btn class="button ma-1" block flat t v-for="use in users_added" :key="use">{{
                        use }}</v-btn>
                    <v-btn flat prepend-icon="mdi-plus" @click="adduserdialog = !adduserdialog" block>add user</v-btn>
                    <v-dialog v-model="adduserdialog" width="500">
                        <v-card>
                            <v-toolbar title="Add user"></v-toolbar>
                            
                            <div class="ma-4">
                                <v-text-field label="user name" v-model="newuser"></v-text-field>
                                <div class="d-flex justify-space-around ma-4">
                                    <v-btn @click="addUsr">add user</v-btn>
                                    <v-btn @click="adduserdialog = false">cancel</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-dialog>
                </div>
            </v-sheet>

            <v-sheet class="mx-auto">
                <v-col cols="1" style="min-width: 100px; max-width: 100%;" class="ma-4">
                    <v-sheet class="d-flex align-self-start justify-space-around">

                        <v-btn class="mx-4" @click="dialog = !dialog"> add event </v-btn>
                        <v-dialog v-model="dialog" width="500">
                            <v-card>
                                <v-toolbar title="Add meeting"></v-toolbar>
                               
                                <div class="ma-4">
                                    <v-text-field label="Meeting Title" v-model="heading"></v-text-field>
                                    <v-combobox v-model="userAdded" :items="users_added" label="Meeting members" multiple
                                        chips></v-combobox>
                                    <v-text-field type="date" label="Date" v-model="date"></v-text-field>
                                 

                                    <v-text-field type="time" label="start time" v-model="startTime" ></v-text-field>
                                    <v-text-field label="duration" v-model.number="duration"></v-text-field>
                                    <div class="d-flex justify-space-around ma-4">
                                        <v-btn @click="addEvt">add event</v-btn>
                                        <v-btn>cancel</v-btn>
                                    </div>
                                </div>
                            </v-card>
                        </v-dialog>


                        <v-btn class="mx-4" @click="suggestDialog = !suggestDialog">suggest event</v-btn>
                        <v-dialog v-model="suggestDialog" width="500">
                            <v-card>
                                <v-toolbar title="suggest meeting"></v-toolbar>
                                <!-- <label for="meeting members">Meeting members</label> -->
                                <v-text-field label="Meeting Title" v-model="heading"></v-text-field>
                                <v-combobox v-model="userAdded" :items="users_added" label="Meeting members" multiple
                                    chips></v-combobox>
                                <v-text-field label="date" v-model="date"></v-text-field>
                                <v-text-field label="duration" v-model.number="duration"></v-text-field>
                                <div class="d-flex justify-space-around ma-4">
                                    <v-btn @click="suggestEvt">suggest event</v-btn>
                                    <v-btn>cancel</v-btn>
                                </div>
                            </v-card>
                        </v-dialog>




                    </v-sheet>
                </v-col>

                <v-col cols="1" style="min-width: 100px; max-width: 100%;" class="flex-grow-1 flex-shrink-0">

                    <!-- showing all cards in a big sheet   -->
                    <v-sheet class="ma-2 pa-2" min-width="600">
                        <div v-for="meet in all_meetings" :key="meet.id">

                           
                            <v-card v-show="toShow(meet) && toShowbydate(meet)" class="ma-5" style="max-width:100%" variant="outlined">
                                <v-card-item>
                                    <div>
                                        <div class="text-overline mb-1">
                                            {{ meet.date }}
                                        </div>
                                        <div class="text-h6 mb-1">
                                            {{ meet.title }}
                                        </div>
                                        <div class="text-caption">Starting time: {{ printTime(meet.start) }},&nbsp; Ending
                                            time: {{ printTime(meet.end) }}</div>
                                        <div class="text-subtitle-1">{{ printnames(meet.users) }}</div>
                                    </div>
                                </v-card-item>

                                <v-card-actions>
                                    <v-btn variant="outlined">
                                        Modify
                                    </v-btn>
                                    <v-btn variant="outlined">
                                        Delete
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                           
                        </div>
                    </v-sheet>
                </v-col>

            </v-sheet>
            <v-sheet max-width="200">calendar</v-sheet>
            <div type="date"></div>
        </v-sheet>
    </div>
</template>

<script>
import { addDoc, collection, doc, getDocs, setDoc, onSnapshot } from "firebase/firestore";

import { setupFirebase } from "../../composables/firebasesetup.js";
export default {
    name: "addEventButton",
    async setup() {
        class Queue {
            constructor() {
                this.items = [];
                this.frontIndex = 0;
                this.backIndex = 0;
            }
            enqueue(item) {
                this.items[this.backIndex] = item;
                this.backIndex++;
                return;
            }
            dequeue() {
                if (this.frontIndex == this.backIndex) {
                    return -1;
                }
                const item = this.items[this.frontIndex];
                delete this.items[this.frontIndex];
                this.frontIndex++;
                return item;
            }
            empty() {
                if (this.backIndex === this.frontIndex) {
                    return true;
                }
                return false;
            }
            peek() {
                return this.items[this.frontIndex];
            }
            get printQueue() {
                return this.items;
            }
        }
        const dialog = ref(false);
        const suggestDialog = ref(false);
        const userAdded = ref([]);
        const startTime = ref(null);
        const start = ref(null);
        const duration = ref(null);
        
        const date = ref(null);
        const users_added = ref([]);
        const firestore = setupFirebase();
        const added_users = collection(firestore, "added_users");

        const adduserdialog = ref(false);
        const newuser = ref("");
        const showbyname = ref(null);
        const showbydate = ref(null);
        const showdate = ref(null);
        const heading = ref(null);
        let id = 0;
        let currdate = "2023-08-11";


        onSnapshot(added_users, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                let count = 0;
                users_added.value.forEach((u) => {
                    if (u === doc.id) {
                        count++;
                    }
                });
                if (count == 0) {
                    users_added.value.push(doc.id);
                }
            });
        })


        function addUsr() {
            let count = 0;
            getDocs(added_users).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    if (doc.id == newuser.value) {
                        count++;
                    }
                });
                if (count != 0) {
                    console.log("user already exsit, failure");
                } else {
                    const a = doc(added_users, newuser.value);
                    setDoc(a, {});
                    newuser.value = "";
                    adduserdialog.value = false;
                }
            });
        }

        async function addEvt() {
            let count = 0;
            
            start.value=getTime(startTime.value);
            userAdded.value.sort();
            await getDocs(added_users).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    for (let i = 0; i < userAdded.value.length; i++) {
                        
                        if (doc.id == userAdded.value[i]) {
                            count += 1;
                        }
                    }
                });
            });
            if (count != userAdded.value.length) {
                dialog.value = false;
                console.log("undefined user");
            } else {
                count = 0;
                const end = start.value + duration.value;
                for (let i = 0; i < userAdded.value.length; i++) {
                    let s = -1;
                    const uname = doc(added_users, userAdded.value[i]);
                    const datewise = collection(uname, "date");
                    
                    const inter = [];
                    await getDocs(datewise).then((snapshot) => {
                        snapshot.docs.forEach((doc) => {
                            if (doc.data().date == date.value) {
                                inter.push({
                                    start: doc.data().start,
                                    end: doc.data().end,
                                });
                            }
                        });
                    });


                    inter.sort(function (a, b) {
                        return a.start - b.start;
                    });

                    for (let j = 0; j < inter.length; j++) {
                        if (inter[j].start < start) {
                            s = doc.end;
                        }
                        else {
                            if (s == -1) {
                                if (inter[j].start > end) {
                                    count++;
                                }
                                s = 1500;
                                break;
                            }
                            else if (inter[j].start - s > end - start) {
                                count++;
                            }
                            s = 1500;
                            break;
                        }
                    }
                    
                    if (s == -1) {
                        count += 1;
                    }
                }
                if (count == userAdded.value.length) {
                    for (let i = 0; i < userAdded.value.length; i++) {
                        const uname = doc(added_users, userAdded.value[i]);
                        const datewise = collection(uname, "date");
                        addDoc(datewise, {
                            users: userAdded.value,
                            start: start.value,
                            end: end,
                            date: date.value,
                            title: heading.value,
                        })
                        .then(() => {
                            all_meetings.value.push({
                                start:start.value,
                                end:end,
                                date:date.value,
                                users:userAdded.value,
                                title:heading.value,
                                showIt: true,
                                id: id
                            })
                            id++;
                            userAdded.value = [];
                            start.value = null;
                            duration.value = null;
                                date.value = "";
                                dialog.value = false;
                                heading.value = "";
                                console.log("Success");
                            })
                            .catch(() => {
                                console.log("failure in adding");
                            });
                        }
                    
                } else {
                    console.log("failure due to unavailability of time");
                }
            }
        }
        
        function checkNotEmpty(intervals) {
            for (let i = 0; i < intervals.length; i++) {
                if (intervals[i].empty()) {
                    return false;
                }
            }
            return true;
        }
        
        function Deque(intervals, f) {
            for (let i = 0; i < intervals.length; i++) {
                while (!intervals[i].empty() && intervals[i].peek().start < f) {
                    intervals[i].dequeue();
                }
            }
        }

        function Deque1(intervals, lmin) {
            for (let i = 0; i < intervals.length; i++) {
                if (intervals[i].peek().end == lmin) {
                    intervals[i].dequeue();
                }
            }
            return;
        }
        
        async function suggestEvt() {
            
            start.value=getTime(startTime.value);
            let intervals = [];
            for (let i = 0; i < userAdded.value.length; i++) {
                
                const d = doc(added_users, userAdded.value[i]);
                const c = collection(d, "date");
                
                const inter = [];
                await getDocs(c).then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        if (doc.data().date == date.value) {
                            inter.push({
                                start: doc.data().start,
                                end: doc.data().end,
                            });
                        }
                    });
                });

                inter.sort(function (a, b) {
                    return a.start - b.start;
                });
                

                let s = 0;
                const q = new Queue();
                inter.forEach((item) => {
                    if (s < item.start - 10) {
                        q.enqueue({
                            start: s,
                            end: item.start - 10,
                        });
                    }
                    s = item.end + 10;
                });
                if (s < 1440) {
                    q.enqueue({
                        start: s,
                        end: 1440,
                    });
                }
                intervals.push(q);
            }
            
            while (checkNotEmpty(intervals)) {
                let fmax = 0,
                    fmin = 1440,
                    lmax = 0,
                    lmin = 1440;
                
                for (let i = 0; i < intervals.length; i++) {
                    fmax = Math.max(fmax, intervals[i].peek().start);
                    fmin = Math.min(fmin, intervals[i].peek().start);
                    lmin = Math.min(lmin, intervals[i].peek().end);
                    lmax = Math.max(lmax, intervals[i].peek().end);
                }

                if (lmin - fmax >= duration.value) {
                    start.value = fmax;
                    addEvt();
                    return;
                }
                if (lmax - lmin >= duration.value) {
                    Deque1(intervals, lmin);
                }
                else if (fmax == fmin) {
                    if (lmax - lmin >= duration.value) {
                        Deque1(intervals, lmin);
                    }
                    else {
                        Deque(intervals, lmax);
                    }
                }
                else {
                    Deque(intervals, fmax);
                }
            }
            console.log("No common free space found");
            return;
        }

        
        const all_meetings = ref([]);
        onSnapshot(added_users, (snapshot) => {
            console.log("yes entered")

            for (let i = 0; i < users_added.value.length; i++) {
                const c = doc(added_users, users_added.value[i]);
                const d = collection(c, "date");
                getDocs(d)
                    .then((snap) => {
                        snap.docs.forEach((doc) => {
                            let count = 0;
                            // console.log(doc.data());
                            // console.log(all_meetings.value.length)
                            for (let j = 0; j < all_meetings.value.length; j++) {
                                if ((all_meetings.value[j].start != doc.data().start && all_meetings.value[j].end != doc.data().end || all_meetings.value[j].date != doc.data().date) && all_meetings.value[j].users != doc.data().users) {
                                    count += 1;
                                }
                            }
                            // console.log(count);
                            if (count == all_meetings.value.length) {
                                all_meetings.value.push({ ...doc.data(), showIt: true, id: id });
                                id++;
                            }
                        })
                    })
                // console.log(all_meetings.value);
            }

        },(error)=>{
            console.log("not captured",error);
        })

        // to show the card date wise -- ORIGINAL ONE
        function toShow(meet) {
            // console.log(meet,"yes");
            if (meet.date == showbydate.value || showbydate.value == null) {
                for (let i = 0; i < meet.users.length; i++) {
                    if (meet.users[i] == showbyname.value || showbyname.value == null) {
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            }
        }


        // new changes to show acc to input date

        // computer current date and time taken
        var today = new Date();
        console.log(today);
        currdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var currtime = today.getHours() + ":" + today.getMinutes()
        

        // making currdate in proper format to compare 
        if(currdate[5] != '0' && currdate[6] == '-'){
            currdate = currdate.split('');
            currdate.splice(5, 0, '0');
            currdate = currdate.join('');
        }

        if(currdate[8] != '0' && currdate.length == 9){
            currdate = currdate.split('');
            currdate.splice(8, 0, '0');
            currdate = currdate.join('');
        }
        

        // toShowbydate function to show the meetings according to the selected date 
        
        function toShowbydate(meet) {
            // console.log(meet,"yes");
            // currdate = new Date();
            console.log(fetchTime(meet.start));
            console.log(currdate);
            if ((meet.date == currdate && fetchTime(meet.start) > currtime) || (meet.date > currdate)) {    
                return true;
            }
            else {
                return false;
            }
        }

        function printnames(users) {
            let names = users[0][0].toUpperCase() + users[0].slice(1);
            for (let i = 1; i < users.length; i++) {
                names = names + ", " + users[i][0].toUpperCase() + users[i].slice(1);
            }
            return names;
        }


        function printTime(time) {
            let min = time % 60;
            let hr = Math.floor(time /60);
            let newhr, newmin;
            if (min < 10) {
                newmin = '0' + min;
            }
            else {
                newmin = min;
            }
            if (hr < 12) {
                if (hr < 10) {
                    newhr = '0' + hr;
                }
                else {
                    newhr = hr;
                }

                return newhr + ":" + newmin + " AM"
            }
            if(hr!=12)
                hr -= 12;
            if (hr < 10) {
                newhr = '0' + hr;
            }
            else {
                newhr = hr;
            }
            return newhr + ":" + newmin + " PM"
        }

        // to get time in 24hrs format to be used by toShowbydate function 
        function fetchTime(time) {
            let min = time % 60;
            let hr = Math.floor(time /60);
            let newhr = hr; 
            let newmin = min;
            return newhr + ":" + newmin;
        }

        
        function getTime(time) {
            if(time==null){
                return null;
            }
                let hr=parseInt(time.slice(0,2));
                let min=parseInt(time.slice(3,5));
                return hr*60+min;
        }

        return {
            showbyname,
            showbydate,
            dialog,
            userAdded,
            start,
            duration,
            date,
            adduserdialog,
            newuser,
            users_added,
            addUsr,
            addEvt,
            suggestDialog,
            suggestEvt,
            showdate,
            toShow,
            all_meetings,
            printnames,
            heading,
            printTime,
            getTime,
            startTime,
            toShowbydate,
            fetchTime,
        };
    },
    data() {
        return {
            users: ["krsna", "prabhupada", "chaitanya mahaprabhu"],
        };
    },

    watch: {
        start(val){
            console.log(val);
        }
    },
};
</script>

<style scoped>
.bord {
    width: 200px;
    margin: 15px;
    /* margin-top:; */
    border: thin solid black;
    padding: 2px;
}

.button {
    justify-content: center;
    min-width: 95%;
}
</style>
