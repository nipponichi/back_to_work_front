<template>
    <div class="flex items-center justify-center mt-20 bg-white">   
        <ServicesListComponent />
    </div>
</template>

<script>
import ServicesListComponent from '../components/ServicesListComponent.vue';

export default {
    components: {
        ServicesListComponent,
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