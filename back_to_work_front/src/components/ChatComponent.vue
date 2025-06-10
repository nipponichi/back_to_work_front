<template>
  <div class="w-full max-w-xl border border-white/20 p-4 rounded-2xl shadow-lg bg-gradient-to-br from-blue-950 to-blue-800 text-white">
    <div class="h-96 overflow-y-auto border-b border-white/10 mb-4 p-2 bg-blue-900/30 rounded-md">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="[
          'mb-3 py-2 px-3 rounded-lg max-w-[70%]',
          message.sender_id === senderId
            ? 'ml-auto bg-blue-600/70 text-right text-white shadow'
            : 'mr-auto bg-blue-900/50 text-left text-white shadow'
        ]"
      >
        <div class="text-xs font-semibold mb-1" 
          :class="message.sender_id === senderId ? 'text-blue-200' : 'text-blue-300'">
          {{ message.sender_id === senderId ? 'Tú' : receiver?.user_name }}
        </div>
        <div class="text-gray-200 text-sm">{{ message?.message }}</div>
        <div class="text-xs text-blue-300 mt-1">{{ new Date(message?.created_at).toLocaleTimeString() }}</div>
      </div>  
    </div>
    
    <div class="flex items-center space-x-2">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Escribe un mensaje..."
        class="flex-1 px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-950 text-white placeholder-blue-200"
      />
      <button
        @click="sendMessage"
        class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
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