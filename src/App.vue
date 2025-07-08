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
}

function editNote (note, index) {
  noteToEdit.value = { ...note, index } 
  showModal.value = true
}

// search
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

      <!-- Input Search -->
      <div class="mb-6">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="Cari catatan..."
          class="w-full p-3 border rounded text-base"
        />
      </div>

      <!-- Daftar Catatan -->
      <div class="grid sm:grid-cols-2 gap-6">
        <!-- Kondisi: belum ada catatan -->
        <div
          v-if="store.notes.length === 0"
          class="col-span-full text-center text-gray-500 italic py-10"
        >
          Belum ada catatan. Yuk bikin catatan baru! ✍️
        </div>

        <!-- Kondisi: hasil pencarian tidak cocok -->
        <div
          v-else-if="noMatch"
          class="col-span-full text-center text-gray-500 italic py-10"
        >
          Tidak ada catatan yang cocok dengan “{{ searchKeyword }}”.
        </div>

        <!-- Daftar catatan -->
        <div
          v-for="(note, index) in filteredNotes"
          :key="index"
          class="bg-white p-5 rounded-lg border border-gray-300 shadow-md space-y-2"
        >
          <h2 class="text-xl font-bold text-indigo-800">
            {{ note.title }}
          </h2>
          <p class="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {{ note.content }}
          </p>
          <div class="flex justify-end gap-3 pt-3 border-t border-gray-200">
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
