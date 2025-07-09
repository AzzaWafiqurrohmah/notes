import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes') || '[]')
  }),
  actions: {
    addNote(note) {
      this.notes.push({
        title: note.title,
        content: note.content,
      })
    },

    deleteNote(index) {
      this.notes.splice(index, 1)
    },
    updateNote(index, updatedNote) {
      this.notes[index] = updatedNote
    },
    initLocalStorageWatcher() {
      watch(
        () => this.notes,
        (val) => {
          localStorage.setItem('notes', JSON.stringify(val))
        },
        { deep: true }
      )
    }
  }
})
