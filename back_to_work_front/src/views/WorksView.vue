<template>
    <div class="flex items-center justify-center mt-20 bg-white">   
        <WorksListComponent />
    </div>
</template>

<script>
import WorksListComponent from '../components/WorksListComponent.vue';

export default {
    components: {
        WorksListComponent,
    },
    data() {
        return {
            user: ''
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
    }
}
</script>