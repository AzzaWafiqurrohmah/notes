import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
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
    }
  }
})
