<template>
  <div class="w-96 border border-gray-300 p-4 rounded-lg shadow-md bg-amber-50">
    <div class="h-60 overflow-y-auto border-b border-gray-300 mb-4 p-2">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="[
          'mb-3 py-2 px-3 rounded-lg max-w-[70%]', 
          message.sender_id === senderId 
            ? 'ml-auto bg-amber-200 text-right shadow-sm' 
            : 'mr-auto bg-white text-left shadow-sm'
        ]"
      >
        <div class="text-xs font-semibold mb-1" 
            :class="message.sender_id === senderId ? 'text-amber-700' : 'text-gray-600'">
          {{ message.sender_id === senderId ? 'Tú' : receiver?.user_name }}
        </div>
        <div class="text-gray-800 text-sm">{{ message.message }}</div>
      </div>
    </div>
    
    <div class="flex items-center space-x-2">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Escribe un mensaje..."
        class="flex-1 px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
      />
      <button
        @click="sendMessage"
        class="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition disabled:bg-amber-300"
        :disabled="!newMessage.trim()"
      >
        Enviar
      </button>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import UserService from '../services/api/user.service';

export default {
  props: {
    ad_id: Number,
    receiver: Object,
    sender: Object,
    roomId: {
      type: Number,
      default: () => 123
    } 
  },
  data() {
    return {
      socket: null,
      newMessage: "",
      messages: [],
      senderId: null,
      is_read: false,
      chatId: null,
    };
  },
  mounted() {
    this.senderId = this.sender.id;
    console.log("Sender", this.sender);
    console.log("Receiver", this.receiver);
    if (this.sender?.is_pro) {
      this.chatId = this.receiver.id;
    } else {
      this.chatId = this.receiver.id;
    }

    this.fetchMessages();
    this.initSocket();
  },
  methods: {
    initSocket() {
      this.socket = io(import.meta.env.VITE_CHAT_API_URL, {
        path: '/socket.io',
        transports: ['websocket', 'polling']
      });
      
      this.socket.on('connect', () => {
        console.log('Conectado al socket con ID:', this.socket.id);
        console.log('Room ID:', this.roomId);
        this.socket.emit('join-room', '1234');
      });
      
      this.socket.on('chat-message', msg => {
        this.messages.push(msg);
        this.scrollToBottom();
      });
      
      this.socket.on('disconnect', () => {
        console.log('Desconectado del socket');
      });
    },
    
    async sendMessage() {
      if (!this.newMessage.trim()) return;
      const message = {
        user_name: this.sender.user_name || this.sender.name,
        message: this.newMessage,
        sender_id: this.sender.id,
        receiver_id: this.receiver.id,
        ad_id: this.ad_id,
        roomId: '1234',
        is_read: this.is_read,
        timestamp: new Date().toISOString(),
      };

      try {
        const savedMsg = await UserService.set("chats", message);
        if (savedMsg.data.success) {
          message.id = savedMsg.data.id;
          this.socket.emit("chat-message", message);
          this.newMessage = "";
          this.scrollToBottom();
        }
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },

    async fetchMessages() {
      try {
        const response = await UserService.show("chats", this.ad_id+"-"+this.chatId);
        console.log(response)
        if (response.data.success) {
          this.messages = response.data.data;
          this.scrollToBottom();
        }
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".h-60");
        if (container) container.scrollTop = container.scrollHeight;
      });
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
</script>

<style scoped>
.h-60::-webkit-scrollbar {
  width: 6px;
}
.h-60::-webkit-scrollbar-track {
  background: #fef6e6;
}
.h-60::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 3px;
}
.h-60::-webkit-scrollbar-thumb:hover {
  background: #b45309;
}
</style>