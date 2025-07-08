<script setup>
import { ref } from 'vue'
import { useNotesStore } from './stores/notes'
import NoteModal from './components/NoteModal.vue'

const store = useNotesStore()
const showModal = ref(false)

function saveNote (payload) {
  if (payload.index !== undefined) {
    // (opsional) logika edit
    store.updateNote(payload.index, payload)
  } else {
    store.addNote({ title: payload.title, content: payload.content })
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center py-10">
    <div class="w-full max-w-6xl px-4">
      <!-- Judul + tombol tambah -->
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-indigo-700">Notes App 📝</h1>
        <button
          @click="showModal = true"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Catatan Baru
        </button>
      </div>

      <!-- Daftar Catatan -->
      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="(note, index) in store.notes"
          :key="index"
          class="bg-white p-5 rounded-lg border border-gray-300 shadow-md"
        >
          <h2 class="text-xl font-bold text-indigo-800 mb-2">
            {{ note.title }}
          </h2>
          <p class="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {{ note.content }}
          </p>
        </div>
      </div>

      <!-- Modal -->
      <NoteModal
        :open="showModal"
        @close="showModal = false"
        @save="saveNote"
      />
    </div>
  </div>
</template>
