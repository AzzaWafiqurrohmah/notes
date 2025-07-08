<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  open: Boolean,
  note: Object
})

const emit = defineEmits(['save', 'close'])

const localTitle = ref('')
const localContent = ref('')

watch(
  () => props.note,
  (n) => {
    if (n) {
      localTitle.value = n.title
      localContent.value = n.content
    }
  },
  { immediate: true }
)

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && !props.note) {
      localTitle.value = ''
      localContent.value = ''
    }
  }
)

const editMode = computed(() => !!props.note)

function handleSave () {
  emit('save', {
    title: localTitle.value,
    content: localContent.value,
    index: props.note?.index
  })
  emit('close')
}
</script>

<template>
  <!-- overlay -->
  <div
    v-if="open"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-300"
  >
    <!-- modal card -->
    <form
        @submit.prevent="handleSave"
        class="bg-white w-full max-w-md rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl border border-gray-100 transition-all duration-300"
        >
        <!-- Judul Modal + Garis -->
        <div>
            <h2 class="text-2xl font-bold text-indigo-700">
            {{ editMode ? 'Edit Catatan' : 'Catatan Baru' }}
            </h2>
            <div class="h-px bg-gray-200 mt-2"></div>
        </div>

        <!-- Input Title -->
        <input
            v-model="localTitle"
            placeholder="Judul"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 transition-all"
            required
        />

        <!-- Input Content -->
        <textarea
            v-model="localContent"
            placeholder="Isi catatan"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-400 transition-all"
            required
        ></textarea>

        <!-- Tombol Aksi -->
        <div class="flex justify-end gap-3 pt-2">
            <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
            Batal
            </button>
            <button
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
            Simpan
            </button>
        </div>
    </form>

  </div>
</template>
