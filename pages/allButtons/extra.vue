<template>
    <div>

    </div>
</template>
<!-- 
<script>
    setup(){
        await getDocs(added_users)
            .then((snapshot) => {
                console.log("enetered");
                snapshot.docs.forEach((doc) => {
                    let count = 0;
                    users_added.forEach((u) => {
                        if (u === doc.id) {
                            count++;
                        }
                    });
                    if (count == 0) {
                        users_added.push(doc.id);
                    }
                });
                console.log(users_added);
            })
            .catch(() => {
                console.log("error in getting data");
            });
        

        async function addEvt() {
            let count = 0;
            console.log(userAdded.value);
            await getDocs(added_users).then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    for (let i = 0; i < userAdded.value.length; i++) {
                        console.log(doc.id, userAdded.value[i]);
                        if (doc.id == userAdded.value[i]) {
                            count += 1;
                        }
                    }
                });
            });
            if (count != userAdded.value.length) {
                console.log("undefined user");
            } else {
                count = 0;
                const end = start.value + duration.value;
                for (let i = 0; i < userAdded.value.length; i++) {
                    console.log(userAdded.value[i], "yes");
                    let s = -1;
                    const uname = doc(added_users, userAdded.value[i]);
                    const datewise = collection(uname, "date");

                    getDocs(datewise).then((snap) => {
                        snap.docs.forEach((doc) => {
                            if (doc.id == date) {
                                if (doc.end < start) {
                                    s = doc.end;
                                } else if (doc.start > end) {
                                    if (s == -1 || doc.start - s > end - start) {
                                        s = 1500;
                                        count += 1;
                                    }
                                }
                            }
                        });
                    });
                    if (s == -1) {
                        count += 1;
                    }
                }
                if (count == userAdded.value.length) {
                    for (let i = 0; i < userAdded.value.length; i++) {
                        const uname = doc(added_users, userAdded.value[i]);
                        console.log(userAdded.value[i]);
                        const datewise = collection(uname, date.value);
                        addDoc(datewise, {
                                users: userAdded.value,
                                start: start.value,
                                end: end,
                            })
                            .then(() => {
                                userAdded.value=[];
                                start.value=null;
                                duration.value=null;
                                date.value='';
                                dialog.value=false;
                                console.log("Success");
                            })
                            .catch(() => {
                                console.log("failure in adding");
                            });
                    }
                    console.log("yes", count, start, end, userAdded, date, duration);
                } else {
                    console.log("failure due to time not available", count);
                }
            }
        }
        function addUsr(){
            let count =0;
            getDocs(added_users)
                .then((snapshot)=>{
                    snapshot.docs.forEach((doc)=>{
                        if(doc.id==newuser.value){
                            count++;
                        }
                    })
                    if(count!=0){
                        console.log("user already exsit, failure");
                    }
                    else{
                        const a=doc(added_users,newuser.value);
                        setDoc(a,{});
                        newuser.value='';
                        adduserdialog.value=false;
                    }
                })
        }
    }
</script>

<style scoped>

</style> -->