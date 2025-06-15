<template>
  <div class="fixed top-0 right-0 w-[400px] h-screen bg-blue-900/90 flex flex-col z-50">
    <div class="flex items-center space-x-4 p-4 border-b border-white/10 bg-gradient-to-r from-blue-950 to-blue-800 shadow-lg">
      <img :src="getUserImage(receiver)" alt="Avatar" class="w-20 h-20 rounded-full border border-white/20 object-cover" />
      <h2 class="text-white font-semibold text-2xl">Chat con {{ receiver.user_name }}</h2>
    </div>
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-5 bg-blue-900/30 flex flex-col-reverse">
      <div class="flex flex-col gap-2 min-h-fit">
        <div v-for="(message, index) in messages" :key="index"
          :class="['mb-3 py-2 px-3 rounded-lg max-w-[70%]',
            message.sender_id === senderId ? 'ml-auto bg-blue-600/70 text-right text-white shadow' : 'mr-auto bg-blue-700/50 text-left text-white shadow']">
          <div class="text-xs font-semibold mb-1"
            :class="[message.sender_id === senderId ? 'text-blue-200 text-right' : 'text-blue-300 text-left']">
            {{ message.sender_id === senderId ? 'Tú' : receiver?.user_name }}
          </div>
          <div class="text-gray-200 text-sm"
            :class="message.sender_id === senderId ? 'mr-2 text-right' : 'ml-2 text-left'">
            {{ message?.message }}
          </div>
          <div class="text-xs text-blue-300 mt-1">{{ formatTime(message?.created_at) }}</div>
        </div>
      </div>
    </div>
    <div class="p-4 border-t border-white/10 bg-blue-900/30 flex items-center space-x-2">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Escribe un mensaje..."
        class="flex-1 px-3 py-6 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-950 text-white placeholder-blue-200"
      />
      <button
        @click="sendMessage"
        class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-50"
        :disabled="!newMessage.trim()"
      >
        <i class="pi pi-send py-4"></i>
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
      baseImgUrl: import.meta.env.VITE_IMG_URL,
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
    getUserImage(user) {
      const fallback = 'https://cdn-icons-png.flaticon.com/512/11461/11461171.png';
      if (!user || !user?.image) return fallback;
      return `${this.baseImgUrl}/${user?.image}`;
    },
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
        const container = this.$refs.chatContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
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