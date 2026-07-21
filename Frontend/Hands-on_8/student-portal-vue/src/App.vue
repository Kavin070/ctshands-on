<template>

<div>

<Header />

<nav>

<RouterLink to="/">Home</RouterLink>

<RouterLink to="/courses">Courses</RouterLink>

<RouterLink to="/profile">Profile</RouterLink>

</nav>

<RouterView />

</div>

</template>

<script setup>

import Header from './components/Header.vue'

import { RouterLink, RouterView } from 'vue-router'

</script>

<style>

body{

margin:0;

font-family:Arial, Helvetica, sans-serif;

}

nav{

background:#333;

padding:15px;

display:flex;

gap:20px;

}

nav a{

color:white;

text-decoration:none;

font-weight:bold;

}

nav a.router-link-active{

color:#42b883;

}

</style>