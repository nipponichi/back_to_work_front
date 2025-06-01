<template>
    <div>
        <ResetPasswordComponent />        
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
    import ResetPasswordComponent from '../components/ResetPasswordComponent.vue';
    import ChatComponent from '../components/ChatComponent.vue';
    import Dialog from 'primevue/dialog';

    
    export default {
        name: 'ContactView',
        components: {
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
    };
</script>
