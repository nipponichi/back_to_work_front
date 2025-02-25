<script seturp>
      import {RouterView, RouterLink} from 'vue-router';
</script>
<template>
    <div>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        &nbsp;
        <RouterLink :to="{ name: 'about'}">About</RouterLink>
        &nbsp;
        <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
    </div>
</template>