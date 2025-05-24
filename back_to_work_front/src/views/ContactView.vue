<template>
    <div>
        <h1 class="bg-green-500">CONTACT</h1>
        <ResetPasswordComponent />
        <button class="bg-blue-500 p-4" @click="goToPayment()">Pagar</button>
        <button class="bg-green-500 p-4" @click="openChatModal()">Chatear</button>
        
        <Dialog      
            v-model:visible="showChatModal"
            header="Chat"
            :modal="true"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            headerClass="border-b border-gray-200 p-4 font-semibold text-lg"
            contentClass="p-4"
        >
            <ChatComponent 
            :adId="1" 
            roomId="chat-123-456" 
            />
        </Dialog>
    </div>
</template>

<script>
    import ContactFormComponent from '../components/ContactFormComponent.vue';
    import ResetPasswordComponent from '../components/ResetPasswordComponent.vue';
    import ChatComponent from '../components/ChatComponent.vue';
    import Dialog from 'primevue/dialog';

    
    export default {
        name: 'ContactView',
        components: {
            ContactFormComponent,
            ResetPasswordComponent,
            ChatComponent,
            Dialog
        },
        data() {
            return {
                showChatModal: false, 
                chatId: null,
                adId: null,
                userId: null,
                userName: null,
                accessToken: null
            };
        },
        methods: {
            goToPayment() {
                const externalUrl = 'http://localhost:5174/payment';
                if (externalUrl.startsWith('http://localhost')) {
                    window.open(externalUrl, '_blank'); 
                }
            },
            openChatModal() {
                console.log('Opening chat modal');
                this.showChatModal = true;
            }
        }
    };
</script>