<script setup>
import { ref, computed } from 'vue'
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
  showModal.value = false
}

function editNote (note, index) {
  noteToEdit.value = { ...note, index }
  showModal.value = true
}

const searchKeyword = ref('')
const filteredNotes = computed(() => {
  if (!searchKeyword.value) return store.notes

  return store.notes.filter(note =>
    note.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
    note.content.toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

const noMatch = computed(() =>
  searchKeyword.value && filteredNotes.value.length === 0 && store.notes.length > 0
)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex justify-center py-10">
    <div class="w-full max-w-6xl px-4">
      <!-- Header -->
      <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 class="text-3xl font-bold text-indigo-700 text-center md:text-left">
          Notes App 📝
        </h1>
        <button
          @click="() => { showModal = true; noteToEdit = null }"
          class="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          +  Catatan Baru
        </button>
      </div>

      <!-- Search -->
      <div class="mb-8">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="Cari catatan..."
          class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
        />
      </div>

      <!-- Notes Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Kondisi kosong -->
        <div
          v-if="store.notes.length === 0"
          class="col-span-full text-center text-gray-500 italic py-10"
        >
          Belum ada catatan. Yuk bikin catatan baru! ✍️
        </div>

        <!-- Tidak ditemukan -->
        <div
          v-else-if="noMatch"
          class="col-span-full text-center text-gray-500 italic py-10"
        >
          Tidak ada catatan yang cocok dengan “{{ searchKeyword }}”.
        </div>

        <!-- Card Catatan -->
        <div
          v-for="(note, index) in filteredNotes"
          :key="index"
          class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 space-y-3"
        >
          <h2 class="text-lg font-semibold text-indigo-800">
            {{ note.title }}
          </h2>
          <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {{ note.content }}
          </p>
          <div class="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              @click="editNote(note, index)"
              class="text-indigo-600 hover:underline text-xs font-medium"
            >
              ✏️ Edit
            </button>
            <button
              @click="store.deleteNote(index)"
              class="text-red-600 hover:underline text-xs font-medium"
            >
              🗑️ Hapus
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
