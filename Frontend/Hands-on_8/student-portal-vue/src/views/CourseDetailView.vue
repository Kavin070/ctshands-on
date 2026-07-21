<template>

<div class="container">

<h2>Course Details</h2>

<div v-if="course">

<p><strong>ID:</strong> {{ course.id }}</p>

<p><strong>Name:</strong> {{ course.name }}</p>

<p><strong>Code:</strong> {{ course.code }}</p>

<p><strong>Credits:</strong> {{ course.credits }}</p>

<p><strong>Grade:</strong> {{ course.grade }}</p>

<button @click="enrollCourse">
Enroll
</button>

</div>

</div>

</template>

<script setup>

import { useRoute,useRouter } from 'vue-router'

const route=useRoute()

const router=useRouter()

const courses=[

{id:1,name:'Mathematics',code:'MAT101',credits:4,grade:'A'},

{id:2,name:'Data Structures',code:'CSE201',credits:3,grade:'A+'},

{id:3,name:'Operating Systems',code:'CSE301',credits:4,grade:'B+'},

{id:4,name:'Database Systems',code:'CSE302',credits:3,grade:'A'},

{id:5,name:'Artificial Intelligence',code:'AI401',credits:4,grade:'A+'}

]

const course=courses.find(c=>c.id==route.params.id)

function enrollCourse(){

alert("Course Enrolled Successfully!")

router.push('/profile')

}

</script>

<style scoped>

.container{

padding:20px;

}

button{

margin-top:20px;

padding:10px 20px;

}

</style>