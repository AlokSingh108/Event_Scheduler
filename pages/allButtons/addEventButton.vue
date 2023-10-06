<template>
    <div>
        <!-- <v-btn @click="console.log(typeof(selection), selection)">Show selection</v-btn> -->
        <v-sheet class="d-flex" style="background-color: black; height:100%; width: 100%; ">
            <v-sheet style="background-color: black;">
                <div class="bord" align="center">
                    <div class="ma-3 userhead">
                        <h3> Users </h3>
                    </div>
                    <!-- <v-divider></v-divider> -->

                    <div v-for="use in userSort" :key="use.name">
                        <v-btn class="button ma-1" :variant="use.variant" :color="use.color" @click="addtoSort(use.name)"
                            :append-icon="use.icon">{{ use.name }}</v-btn>
                    </div>
                    <!-- <v-divider thickness="5" color="dark-green"></v-divider> -->
                    <v-btn class="button ma-1" variant="text" prepend-icon="mdi-plus"
                        @click="adduserdialog = !adduserdialog">add user</v-btn>
                    <v-dialog v-model="adduserdialog" width="500">
                        <v-card>
                            <v-toolbar title="Add user" color="indigo"></v-toolbar>
                            <!-- <label for="meeting members">Meeting members</label> -->
                            <div class="ma-4">
                                <v-text-field label="user name" v-model="newuser"></v-text-field>
                                <div class="d-flex justify-space-around ma-4">
                                    <v-btn @click="addUsr" color="blue">add user</v-btn>
                                    <v-btn @click="adduserdialog = false" color="red">cancel</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-dialog>

                </div>
                <div class="bord">
                    <v-btn class="ma-3" style="width: 160px;" @click="dialog = !dialog" color="#FFD700" variant="outlined">
                        add new event </v-btn>
                    <v-btn class="ma-3" style="width: 160px;" @click="suggestDialog = !suggestDialog" color="#FFD700"
                        variant="outlined">suggest a event</v-btn>
                </div>
            </v-sheet>

            <v-sheet class="mx-auto" style="background-color: black;">
                <!-- <v-col cols="1" style="min-width: 100px; max-width: 98%;" class="ma-4"> -->
                <v-sheet class="d-flex align-self-start justify-space-around" style="background-color: black;">

                    <v-dialog v-model="dialog" width="500">
                        <v-card style="background-color: rgb(221, 216, 216);">
                            <v-toolbar title="Add Meeting" color="#FFA500" style="color:black;"></v-toolbar>
                            <!-- <label for="meeting members">Meeting members</label> -->
                            <div class="ma-4">
                                <v-text-field label="Meeting Title" v-model="heading" variant="outlined"></v-text-field>
                                <v-combobox v-model="userAdded" :items="users_added" label="Meeting members" multiple
                                    chips variant="outlined"></v-combobox>
                                <v-text-field type="date" label="Date" v-model="date" variant="outlined"></v-text-field>
                                <!-- <v-date-picker></v-date-picker> -->

                                <v-text-field type="time" label="start time" v-model="startTime" variant="outlined"></v-text-field>
                                <v-text-field label="duration" v-model.number="duration" variant="outlined"></v-text-field>
                                <div class="d-flex justify-space-around ma-4">
                                    <v-btn @click="addEvt" color="green">add event</v-btn>
                                    <v-btn color="red" @click="closeall">cancel</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-dialog>


                    <v-dialog v-model="suggestDialog" width="500">
                        <v-card style="background-color: rgb(221, 216, 216);">
                                <v-toolbar title="Suggest Meeting" color="#FFA500" style="color:black;"></v-toolbar>
                            <!-- <label for="meeting members">Meeting members</label> -->
                            <div class="ma-4">

                                <v-text-field label="Meeting Title" v-model="heading" variant="outlined"></v-text-field>
                                <v-combobox v-model="userAdded" :items="users_added" label="Meeting members" multiple chips
                                    variant="outlined"></v-combobox>
                                <div class="bordered-div">
                                    <v-text-field type="time" class="start-end" label="Start" v-model="slotStart"
                                        variant="outlined"></v-text-field>
                                    <v-text-field type="time" class="start-end" label="End" v-model="slotEnd"
                                        variant="outlined"></v-text-field>
                                </div>
                                <v-text-field label="date" v-model="date" type="date" variant="outlined"></v-text-field>
                                <v-text-field label="duration" v-model.number="duration" variant="outlined"></v-text-field>
                            </div>
                            <div class="d-flex justify-space-around ma-4">
                                <v-btn @click="suggestEvt" color="green">suggest event</v-btn>
                                <v-btn color="red" @click="closeall">cancel</v-btn>
                            </div>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="modifydialog" width="500">
                        <v-card style="background-color: rgb(221, 216, 216);">
                                <v-toolbar title="Modify Meeting" color="#FFA500" style="color:black;"></v-toolbar>
                            <!-- <label for="meeting members">Meeting members</label> -->
                            <div class="ma-4">
                                <v-text-field label="Meeting Title" v-model="heading" variant="outlined"></v-text-field>
                                <v-combobox v-model="userAdded" :items="users_added" label="Meeting members" multiple
                                    chips variant="outlined"></v-combobox>
                                <v-text-field type="date" label="Date" v-model="date" variant="outlined"></v-text-field>
                                <!-- <v-date-picker></v-date-picker> -->

                                <v-text-field type="time" label="start time" v-model="startTime" variant="outlined"></v-text-field>
                                <v-text-field label="duration" v-model.number="duration" variant="outlined"></v-text-field>
                                <div class="d-flex justify-space-around ma-4">
                                    <v-btn color="green" @click="modifyEvt">Modify event</v-btn>
                                    <v-btn color="red" @click="closeall">cancel</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </v-dialog>




                </v-sheet>

                <v-col cols="1" style="min-width: 100px; max-width: 60%; " class="flex-grow-1 flex-shrink-0">
                    <div style="background-color: gray; margin-top:10px; padding-top:12px; padding-bottom:12px;">
                        
                        <v-btn :disabled="!showcompleted" @click="showcompleted = !showcompleted" color="white" class="mx-3"
                        :variant="showcompleted == true ? 'outlined' : 'text'" width="160px">Upcoming</v-btn>
                        <v-btn max-width="160px" :disabled="showcompleted" @click="showcompleted = !showcompleted" color="white"
                        :variant="showcompleted == true ? 'text' : 'outlined'">completed</v-btn>
                    </div>

                    <v-sheet width="600" style="background-color: gray; padding-top:1px;">
                        <div v-for="meet in sortFunc()" :key="meet.id" style="background-color:gray;">

                            <!-- <v-card > -->
                            <v-card
                                v-show="meet.showIt && toShow(meet) && toShowbyname(meet) && toShowByCalender(meet) && (showcompleted == false ? toShowbydate(meet) : showbeforedate(meet))"
                                class="ma-5 board" elevation="6" style="max-width:100% " outlined color="black"
                                variant="elevated">
                                <v-card-item>
                                    <div>
                                        <div class="text-h6 mb-1">
                                            <span class="font-weight-bold" style="color:#FFD700">Title:</span>
                                            {{ meet.title }}
                                        </div>
                                        <div>
                                            <span class="font-weight-bold" style="color:#FFD700">Date:</span>
                                            {{ meet.date }}
                                        </div>

                                        <div class><span class="font-weight-bold" style="color:#FFD700">Starting
                                                time:</span> {{ printTime(meet.start) }}
                                        </div>
                                        <div>
                                            <span class="font-weight-bold" style="color:#FFD700">Ending
                                                time: </span>{{ printTime(meet.end) }}
                                        </div>
                                        <div class="text-subtitle-1"><span class="font-weight-bold"
                                                style="color:#FFD700">Participants: </span>{{ printnames(meet.users) }}
                                        </div>
                                    </div>

                                    <v-btn color="green" variant="outlined" @click="modifyDialog(meet)">
                                        Modify event
                                    </v-btn>

                                    <v-btn color="green" variant="outlined" class="mx-4" @click="deleteEvt(meet)">
                                        Delete event
                                    </v-btn>
                                </v-card-item>
                                <!-- </v-card-actions> -->
                            </v-card>

                            <!-- </v-card> -->

                        </div>
                    </v-sheet>
                </v-col>

            </v-sheet>
            <v-sheet class="cal" width="500" style="background-color: black;">
                <calenDar />
            </v-sheet>
        </v-sheet>
    </div>
</template>

<script>
import { addDoc, collection, doc, getDocs, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";

import { setupFirebase } from "../../composables/firebasesetup.js";

import calenDar from "./calendar.vue";

import { provide } from 'vue'



export default {
    name: "addEventButton",
    components: {
        calenDar,
    },
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

        const selection = ref(null);
        provide('selection', selection)
        const dialog = ref(false);
        const suggestDialog = ref(false);
        const userAdded = ref([]);

        const startTime = ref(null);

        const start = ref(null);

        const slotStart = ref(null);
        const varStart = ref(null);
        const varEnd = ref(null);
        const slotEnd = ref(null);

        const duration = ref(null);
        // const end = ref(start.value + duration.value);
        const date = ref(null);
        const users_added = ref([]);
        const firestore = setupFirebase();
        const added_users = collection(firestore, "added_users");

        const adduserdialog = ref(false);
        const newuser = ref("");
        const showbyname = ref([]);
        const showbydate = ref(null);
        const showdate = ref(null);
        const heading = ref(null);
        let id = 0;
        const modifydialog = ref(false);
        let currdate = "2023-08-11";
        let dateStr = ref(null);
        provide('dateStr', dateStr)
        const userSort = ref([]);
        let oldmeet, newmeet;
        const showcompleted = ref(false)

        async function modifyEvt() {

            deleteEvt(oldmeet);
            if (await addEvt() == true) {
                return;
            }
            heading.value = oldmeet.title;
            console.log(oldmeet.users);
            userAdded.value = oldmeet.users;
            date.value = oldmeet.date;
            duration.value = oldmeet.end - oldmeet.start;
            startTime.value = fetchTime(oldmeet.start);
            addEvt();
            console.log("old meet readded ", oldmeet);
            return;
        }

        function modifyDialog(meet) {
            modifydialog.value = true;
            heading.value = meet.title;
            console.log(meet.users);
            userAdded.value = meet.users;
            date.value = meet.date;
            duration.value = meet.end - meet.start;
            startTime.value = fetchTime(meet.start);
            oldmeet = {
                title: meet.title,
                users: meet.users,
                start: meet.start,
                end: meet.end,
                date: meet.date,
            }
        }



        function addtoSort(use) {
            for (let i = 0; i < userSort.value.length; i++) {
                if (userSort.value[i].name == use && userSort.value[i].variant == 'outlined') {
                    userSort.value[i].variant = 'tonal';
                    userSort.value[i].color = '#00C853';
                    userSort.value[i].icon = ""
                    for (let j = 0; j < showbyname.value.length; j++) {
                        if (showbyname.value[j] == use) {
                            showbyname.value.splice(j, 1);
                            // console.log(showbyname.value);
                            return;
                        }
                    }
                    return;
                    // userSort.value.name
                }
                else if (userSort.value[i].name == use) {
                    userSort.value[i].variant = 'outlined';
                    userSort.value[i].color = '#00C853';
                    userSort.value[i].icon = ""
                    showbyname.value.push(use);
                    // console.log(showbyname.value);
                    return;
                }
            }
        }

        await getDocs(added_users)
            .then((snap) => {
                snap.docs.forEach((doc) => {
                    users_added.value.push(doc.id);
                    userSort.value.push({
                        name: doc.id,
                        variant: 'tonal',
                        color: '#00C853',
                        icon: ""
                    })
                })
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

        function getDocID(date, start, end, users) {
            let Id = "";
            Id = date + '-' + start + '-' + end;

            users.forEach((u) => {
                Id = Id + '-' + u;
            })

            return Id;

        }

        async function addEvt() {
            let count = 0;
            start.value = getTime(startTime.value);
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
                return Promise.resolve(false);
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
                        if (inter[j].start < start.value) {
                            s = inter[j].end;
                        }
                        else {
                            if (s == -1) {
                                if (inter[j].start > end) {
                                    count++;
                                }
                                s = 1500;
                                break;
                            }
                            else if (inter[j].start - s > end - start.value) {
                                count++;
                            }
                            s = 1500;
                            break;
                        }
                    }

                    if (s != 1500) {
                        if (start.value > s && 1500 - s > end - start.value)
                            count += 1;
                    }
                }
                if (count == userAdded.value.length) {
                    for (let i = 0; i < userAdded.value.length; i++) {
                        const uname = doc(added_users, userAdded.value[i]);
                        const datewise = collection(uname, "date");
                        const docid = getDocID(date.value, start.value, end, userAdded.value);
                        const idwise = doc(datewise, docid)
                        setDoc(idwise, {
                            users: userAdded.value,
                            start: start.value,
                            end: end,
                            date: date.value,
                            title: heading.value,
                        })
                            .then(() => {
                                all_meetings.value.push({
                                    start: start.value,
                                    end: end,
                                    date: date.value,
                                    users: userAdded.value,
                                    title: heading.value,
                                    showIt: true,
                                    id: docid,
                                })
                                userAdded.value = [];
                                start.value = null;
                                duration.value = null;
                                date.value = "";
                                dialog.value = false;
                                heading.value = "";
                                console.log("Success");
                                return Promise.resolve(true);
                            })

                            .catch(() => {
                                console.log("failure in adding");
                                return Promise.resolve(false);
                            });
                    }
                    // console.log("yes", count, start, end, userAdded, date, duration);
                } else {
                    console.log("failure due to unavailability of time");
                    return Promise.resolve(false);
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
            //   const q= new Queue();
            //   const q1= new Queue();
            //   q.enqueue(7);
            //   q1.enqueue(8);
            //   console.log(q);
            //   arr.push(q);
            //   arr.push(q1);
            //   console.log(arr);
            varStart.value = getTime(slotStart.value)
            varEnd.value = getTime(slotEnd.value)
            // console.log(varStart.value + "to" + varEnd.value)

            if (varEnd.value <= varStart.value) {
                return;
            }

            // start.value=getTime(startTime.value);
            let intervals = [];
            for (let i = 0; i < userAdded.value.length; i++) {
                // const q=new;
                const d = doc(added_users, userAdded.value[i]);
                const c = collection(d, "date");
                // console.log(user,date.value,c);

                // let s=0;
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
                // console.log(inter);

                //     // function 
                for (let i = 0; i < inter.length; i++) {
                    if (inter[i].end < varStart.value || inter[i].start > varEnd.value) {
                        inter.splice(i, 1);
                    }
                    else if (inter[i].start < varStart.value && inter[i].end > varStart.value) {
                        inter.start = Math.max(varStart.value, inter.start);
                        inter.end = Math.min(varEnd.value, inter.end)
                    }

                    else if (inter[i].start < varEnd.value && inter[i].end > varEnd.value) {
                        inter.start = Math.max(varStart.value, inter.start);
                        inter.end = Math.min(varEnd.value, inter.end)
                    }
                }

                // console.log(inter)

                let s = varStart.value
                const q = new Queue();
                inter.forEach((item) => {
                    if (s < item.start - 10) {
                        // console.log("yes"+s+" to "+item.start - 10)
                        q.enqueue({
                            start: s,
                            end: item.start - 10,
                        });
                    }
                    s = item.end + 10;
                });
                if (s < varEnd.value) {
                    q.enqueue({
                        start: s,
                        end: varEnd.value,
                    });
                }
                // console.log(q.peek());

                intervals.push(q);
            }

            while (checkNotEmpty(intervals)) {
                // console.log(intervals)
                let fmax = varStart.value,
                    fmin = varEnd.value,
                    lmax = varStart.value,
                    lmin = varEnd.value;
                // console.log(intervals[0].peek());
                for (let i = 0; i < intervals.length; i++) {
                    fmax = Math.max(fmax, intervals[i].peek().start);
                    fmin = Math.min(fmin, intervals[i].peek().start);
                    lmin = Math.min(lmin, intervals[i].peek().end);
                    lmax = Math.max(lmax, intervals[i].peek().end);
                }

                if (lmin - fmax >= duration.value) {
                    start.value = fmax;
                    startTime.value = fetchTime(fmax);
                    // console.log("founded time "+startTime.value)

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
            // console.log("yes entered")

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
                                all_meetings.value.push({ ...doc.data(), showIt: true, id: doc.id });
                            }
                        })
                    })
                // console.log(all_meetings.value);
            }

        }, (error) => {
            console.log("not captured", error);
        })

        function toShowbyname(meet) {
            if (showbyname.value.length == 0) {
                return true;
            }
            // console.log(showbyname);
            let count = 0;
            for (let i = 0; i < showbyname.value.length; i++) {
                for (let j = 0; j < meet.users.length; j++) {
                    if (showbyname.value[i] == meet.users[j]) {
                        count++;
                    }
                }
            }
            if (count == showbyname.value.length) {
                return true;
            }
            return false;
        }

        var today = new Date();
        // console.log(today);
        currdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var currtime = today.getHours() + ":" + today.getMinutes();
        // making currdate in proper format to compare
        if (currdate[5] != '0' && currdate[6] == '-') {
            currdate = currdate.split('');
            currdate.splice(5, 0, '0');
            currdate = currdate.join('');
        }

        if (currdate[8] != '0' && currdate.length == 9) {
            currdate = currdate.split('');
            currdate.splice(8, 0, '0');
            currdate = currdate.join('');
        }


        // toShowbydate function to show the meetings according to the selected date
        function toShowbydate(meet) {
            // console.log(meet,"yes");
            // currdate = new Date();
            // console.log(fetchTime(meet.start));
            // console.log(currdate);
            if ((meet.date == currdate && fetchTime(meet.start) > currtime) || (meet.date > currdate)) {
                return true;
            }
            else {
                return false;
            }
        }

        // console.log("selectedDate variable = ",selectedDate);
        // selectedDate = selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate();

        // if(selectedDate[5] != '0' && selectedDate[6] == '-'){
        //     selectedDate = selectedDate.split('');
        //     selectedDate.splice(5, 0, '0');
        //     selectedDate = selectedDate.join('');
        // }

        // if(selectedDate[8] != '0' && selectedDate.length == 9){
        //     selectedDate = selectedDate.split('');
        //     selectedDate.splice(8, 0, '0');
        //     selectedDate = selectedDate.join('');
        // }

        function toShowByCalender(meet) {
            // console.log("selection: : "+selection.value);
            // console.log("datestr: : "+dateStr.value + " " + typeof(dateStr));
            // console.log("meet date: : "+meet.date.toString() + typeof(meet.date));
            //     // currdate = new Date();
            //     console.log(fetchTime(meet.start));
            // console.log("in calender function filter",meet.date);
            // let s = meet.date.toString();
            if (dateStr.value == null)
                return true;
            if (dateStr.value != null && meet.date == dateStr.value) {
                return true;
            }
            else if (dateStr.value != null && meet.date != dateStr.value) {
                return false;
            }
        }


        function printnames(users) {
            if (users.length == 0) {
                return "undefined";
            }
            let names = users[0][0].toUpperCase() + users[0].slice(1);
            for (let i = 1; i < users.length; i++) {
                names = names + ", " + users[i][0].toUpperCase() + users[i].slice(1);
            }
            return names;
        }

        function printTime(time) {
            let min = time % 60;
            let hr = Math.floor(time / 60);
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
            if (hr != 12)
                hr -= 12;
            if (hr < 10) {
                newhr = '0' + hr;
            }
            else {
                newhr = hr;
            }
            return newhr + ":" + newmin + " PM"
        }

        function fetchTime(time) {
            let min = time % 60;
            let hr = Math.floor(time / 60);
            let newhr = hr;
            let newmin = min;
            return newhr + ":" + newmin;
        }


        function getTime(time) {
            if (time == null) {
                return null;
            }
            let hr = parseInt(time.slice(0, 2));
            let min = parseInt(time.slice(3, 5));
            return hr * 60 + min;
        }

        function toShow(meet) {
            if (meet.date == undefined || meet.start == undefined || meet.end == undefined || meet.users == undefined || meet.date == null || meet.start == null || meet.end == null || meet.users == null || meet.date == "" || meet.start == "" || meet.end == "" || meet.users == []) {
                return false;
            }
            // console.log(meet);
            return true;

        }

        function deleteEvt(meet) {
            console.log(meet);
            let docid = getDocID(meet.date, meet.start, meet.end, meet.users);
            console.log(docid);
            meet.users.forEach((user) => {
                const u = doc(added_users, user);
                const d = collection(u, "date");
                const deldoc = doc(d, docid);
                deleteDoc(deldoc);
                //console.log(deldoc);
            })
            all_meetings.value.forEach((m) => {
                if (m.id == docid) {
                    m.showIt = false;
                }
            })
        }

        function showbeforedate(meet) {
            if (!((meet.date == currdate && fetchTime(meet.start) > currtime) || (meet.date > currdate))) {
                return true;
            }
            else {
                return false;
            }
        }

        function closeall(){
            dialog.value=false;
            modifydialog.value=false;
            suggestDialog.value=false;
            heading.value="";
            userAdded.value=[];
            startTime.value="";
            date.value="";
            duration.value="";
            slotStart.value="";
            slotEnd.value="";
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
            toShowbyname,
            all_meetings,
            printnames,
            heading,
            printTime,
            getTime,
            startTime,
            currdate,
            toShowbydate, selection,
            toShowByCalender,
            dateStr,
            addtoSort,
            userSort,
            toShow,
            deleteEvt,
            modifydialog,
            modifyDialog,
            modifyEvt,
            showcompleted,
            showbeforedate,
            slotEnd,
            slotStart,
            closeall,
        };
    },
    methods: {
        sortFunc() {
            // console.log(this.showcompleted)
            if (this.showcompleted == true) {
                return this.all_meetings.slice().sort(function (a, b) {
                    if (a.date == undefined || a.start == undefined || a.end == undefined || a.users == undefined || a.date == null || a.start == null || a.end == null || a.users == null || a.date == "" || a.start == "" || a.end == "" || a.users == []) {
                        return -1;
                    }
                    if (b.date == undefined || b.start == undefined || b.end == undefined || b.users == undefined || b.date == null || b.start == null || b.end == null || b.users == null || b.date == "" || b.start == "" || b.end == "" || b.users == []) {
                        return -1;
                    }

                    if (a.date == b.date) {
                        if (a.start == b.start) {
                            a.end < b.end ? 1 : -1;
                        }
                        else {
                            return a.start < b.start ? 1 : -1;
                        }
                    }
                    else {

                        return a.date < b.date ? 1 : -1;
                    }
                });
            }
            else {
                return this.all_meetings.slice().sort(function (a, b) {
                    // console.log(a,b);
                    if (a.date == undefined || a.start == undefined || a.end == undefined || a.users == undefined || a.date == null || a.start == null || a.end == null || a.users == null || a.date == "" || a.start == "" || a.end == "" || a.users == []) {
                        return -1;
                    }
                    if (b.date == undefined || b.start == undefined || b.end == undefined || b.users == undefined || b.date == null || b.start == null || b.end == null || b.users == null || b.date == "" || b.start == "" || b.end == "" || b.users == []) {
                        return -1;
                    }

                    if (a.date == b.date) {
                        if (a.start == b.start) {
                            a.end > b.end ? 1 : -1;
                        }
                        else {
                            return a.start > b.start ? 1 : -1;
                        }
                    }
                    else {

                        return a.date > b.date ? 1 : -1;
                    }
                });
            }

        },
    },
    data() {
        return {
            users: ["krsna", "prabhupada", "chaitanya mahaprabhu"],
        };
    },

    watch: {
        // dialog(val) {
        //     console.log(val);
        // },
        // userAdded(val){
        //   console.log(val);
        // }
        // start(val){
        //     console.log(val);
        // }
    },
};
</script>

<style scoped>
.bord {
    width: 200px;
    margin: 25px;
    /* margin-top:; */
    border: thin solid white;
    padding: 8px;
    background: black;
    color: white;
}

.button {
    justify-content: center;
    min-width: 98%;

}

.cal {
    padding-top: 100px;
    background-color: black;
}


.board {
    border: 1.5px solid green;
}

.userhead {
    /* background-color: #FFD54F; */
    color: #FFD700;
}

.timeSlot {
    border: 1.5px solid black;
    /* display: inline-block; */



}

.start-end {
    width: 190px;
    margin-left: 10px;
    margin-right: 10px;
    display: inline-block;
}


.bordered-div {
    position: relative;
    border: 0.2px solid #000;
    padding-top: 30px;
    padding-left: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
}

/* Use the :before pseudo-element selector */
.bordered-div::before {
    content: "Time Slot";
    position: absolute;
    top: -12px;
    left: 12%;
    transform: translateX(-50%);
    background-color: rgb(221, 216, 216);
    padding: 0 8px;
    /* border: 0.5px solid #000; */
}</style>