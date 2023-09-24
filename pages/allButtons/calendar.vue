<template>
    <div>
        <v-card width="320px" elevation="12">

            <div class="calendar">
                <div class="calendar-header">
                    <!-- <span class="month-picker" id="month-picker">{{ month }}</span> -->
                    <div class="year-picker">
                        <span class="year-change" id="prev-year">
                            <!-- <pre @click="nextMonth()"> {{ prevArrow }} </pre> -->
                        </span>
                        <!-- <span id="year">{{year}}</span> -->
                        <span class="month-picker" id="month-picker">{{ month }}</span>
                        <span class="year-change" id="next-year">
                            <!-- <pre @click="prevMonth()">{{ nextArrow }}</pre> -->
                        </span>

                        <span id="year">{{ year }}</span>

                    </div>
                </div>
                <div class="calendar-body">
                    <div class="calendar-week-day">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <!-- {{ first_day }} -->
                    <div class="calendar-days">
                        <!-- {{ first_day}} -->
                        <div v-for="i in first_day" :key="i"></div>
                        <div v-for="i in 31" :key="i" :id="i + '-' + (monthIndex + 1) + '-' + year"
                            @click="selectDate(i + '-' + (monthIndex + 1) + '-' + year)"
                            :class="selection == `${i + '-' + (monthIndex + 1) + '-' + year}` ? 'black' : ((currdate == `${i + '-' + (monthIndex + 1) + '-' + year}`) ? 'today' : 'white')">
                            {{ i }}
                            <!-- :class="selection == `${i + '-' + (monthIndex + 1) + '-' + year}` ? black : white" -->
                            <span></span><span></span><span></span><span></span>
                        </div>
                    </div>
                </div>

                <div class="month-list"></div>
            </div>

        </v-card>
    </div>
</template>

<script type="module">

import { ref, inject } from "vue";
export default {
    name: "calenDar",
    setup() {
        const selection = ref(inject('selection'))
        let dateStr = ref(inject('dateStr'))
        let first_day = ref(0);

        const month_names = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const prevArrow = "<"
        const nextArrow = ">"
        // const colorVar = ref('red')
        var today = new Date();
        let currdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        console.log(currdate);

        function isLeapYear(year) {
            return (
                (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
                (year % 100 === 0 && year % 400 === 0)
            );
        }


        function getFebDays(year) {
            return isLeapYear(year) ? 29 : 28;
        };

        function nextMonth() {
            ++monthIndex;
        }
        function prevMonth() {
            --monthIndex;
            month.value = month_names[monthIndex];
        }


        function selectDate(date) {
            if (selection.value == date) {
                selection.value = null
                dateStr.value = null
                return;
            }

            // console.log("selected ", date)
            selection.value = date;
            dateStr.value = selection.value;
            if (dateStr.value != null) {
                const dateArr = dateStr.value.split('-')
                if (dateArr[0].length == 1)
                    dateArr[0] = '0' + dateArr[0];
                if (dateArr[1].length == 1)
                    dateArr[1] = '0' + dateArr[1];
                dateStr.value = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
            }
        }
        const month = ref("");
        const monthIndex = ref(0);
        const year = ref("");



        let days_of_month = [
            31,
            getFebDays(year),
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];

        // calendar_days.innerHTML = "";

        let currDate = new Date();
        // console.log(currDate.getMonth());

        monthIndex.value = currDate.getMonth();
        month.value = month_names[currDate.getMonth()];

        year.value = currDate.getFullYear();
        // console.log(year.value);

        const day = new Date(year.value, currDate.getMonth(), 1)
        first_day.value = day.getDay();
        // console.log()
        // console.log(days_of_month[currDate.getMonth()])


        return {
            month_names,
            isLeapYear,
            getFebDays,
            month,
            year,
            monthIndex,
            first_day,
            prevArrow,
            nextArrow,
            selectDate,
            selection,
            dateStr,
            currdate
        }
    },
}
</script>

<style scoped>
.calendar {
    height: max-content;
    width: max-content;
    background-color: var(--bg-main);
    /* border-radius: 30px; */
    padding: 10px;
    position: relative;
    overflow: hidden;
}

.light .calendar {
    box-shadow: var(--shadow);
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    color: var(--color-txt);
    padding: 5px;
}

.calendar-body {
    padding: 5px;
}

.calendar-week-day {
    height: 50px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: 600;
}

.calendar-week-day div {
    display: grid;
    place-items: center;
    color: var(--bg-second);
}

.calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    color: var(--color-txt);
}

.calendar-days div {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: relative;
    cursor: pointer;
    font-size: 13px;
    animation: to-top 1s forwards;
}

.calendar-days div span {
    position: absolute;
}

.calendar-days div:hover span {
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}

.calendar-days div span:nth-child(1),
.calendar-days div span:nth-child(3) {
    width: 2px;
    height: 0;
    background-color: var(--color-txt);
}

.calendar-days div:hover span:nth-child(1),
.calendar-days div:hover span:nth-child(3) {
    height: 100%;
}

.calendar-days div span:nth-child(1) {
    bottom: 0;
    left: 0;
}

.calendar-days div span:nth-child(3) {
    top: 0;
    right: 0;
}

.calendar-days div span:nth-child(2),
.calendar-days div span:nth-child(4) {
    width: 0;
    height: 2px;
    background-color: var(--color-txt);
}

.calendar-days div:hover span:nth-child(2),
.calendar-days div:hover span:nth-child(4) {
    width: 100%;
}

.calendar-days div span:nth-child(2) {
    top: 0;
    left: 0;
}

.calendar-days div span:nth-child(4) {
    bottom: 0;
    right: 0;
}

.calendar-days div:hover span:nth-child(2) {
    transition-delay: 0.2s;
}

.calendar-days div:hover span:nth-child(3) {
    transition-delay: 0.4s;
}

.calendar-days div:hover span:nth-child(4) {
    transition-delay: 0.6s;
}

.calendar-days div.curr-date,
.calendar-days div.curr-date:hover {
    background-color: var(--blue);
    color: var(--white);
    /* border-radius: 50%; */
}

.calendar-days div.curr-date span {
    display: none;
}

.month-picker {
    padding: 5px 10px;
    /* border-radius: 10px; */
    cursor: pointer;
}

.month-picker:hover {
    background-color: var(--color-hover);
}

.year-picker {
    display: flex;
    align-items: center;
}

.year-change {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 10px;
    cursor: pointer;
}

.year-change:hover {
    background-color: var(--color-hover);
}

.calendar-footer {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.toggle {
    display: flex;
}

.toggle span {
    margin-right: 10px;
    color: var(--color-txt);
}

.month-list {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--bg-main);
    padding: 5px;
    grid-template-columns: repeat(3, auto);
    gap: 5px;
    display: grid;
    transform: scale(1.5);
    visibility: hidden;
    pointer-events: none;
}

.month-list.show {
    transform: scale(1);
    visibility: visible;
    pointer-events: visible;
    transition: all 0.2s ease-in-out;
}

.month-list>div {
    display: grid;
    place-items: center;
}

.month-list>div>div {
    width: 100%;
    padding: 5px 10px;
    /* border-radius: 10px; */
    text-align: center;
    cursor: pointer;
    color: var(--color-txt);
}

.month-list>div>div:hover {
    background-color: var(--color-hover);
}

.black {
    color: white;
    font: bold;
    border: 1px solid black;
    background-color: grey;
    border-radius: 50%;
}


.white {
    color: black;
}

.today {
    /* color:white;
    background-color:blue; */
    border: 1px solid black;
    border-radius: 50%;
}

.calendar {
    /* height: ; */
    border: 1px solid black;
    background-color: white;
}
</style>