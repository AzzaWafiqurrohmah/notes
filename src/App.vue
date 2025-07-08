<script setup>
import { ref } from 'vue'
import { useNotesStore } from './stores/notes'
import NoteModal from './components/NoteModal.vue'

const store = useNotesStore()
const showModal = ref(false)
const noteToEdit = ref(null)

function saveNote (payload) {
  if (payload.index !== undefined) {
    store.updateNote(payload.index, payload)
  } else {
    store.addNote({ title: payload.title, content: payload.content })
  }
  noteToEdit.value = null
}

function editNote (note, index) {
  noteToEdit.value = { ...note, index } 
  showModal.value = true
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center py-10">
    <div class="w-full max-w-6xl px-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold text-indigo-700">Notes App 📝</h1>
        <button
          @click="() => { showModal = true; noteToEdit = null }"
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
          class="bg-white p-5 rounded-lg border border-gray-300 shadow-md space-y-2"
        >
          <h2 class="text-xl font-bold text-indigo-800">
            {{ note.title }}
          </h2>
          <p class="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {{ note.content }}
          </p>  

          <!-- Tombol Edit & Hapus -->
          <div class="flex justify-end gap-2 pt-3 border-t pt-3">
            <button
              @click="editNote(note, index)"
              class="text-indigo-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              @click="store.deleteNote(index)"
              class="text-red-600 hover:underline text-sm"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>


      <!-- Modal -->
      <NoteModal
        :open="showModal"
        :note="noteToEdit"
        @close="() => { showModal = false; noteToEdit = null }"
        @save="saveNote"
      />

    </div>
  </div>
</template>
