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
  n => {
    localTitle.value = n?.title || ''
    localContent.value = n?.content || ''
  },
  { immediate: true }
)

const editMode = computed(() => !!props.note)

function handleSave () {
  emit('save', {
    title: localTitle.value,
    content: localContent.value,
    index: props.note?.index // dipakai untuk edit
  })
  emit('close')
}
</script>

<template>
  <!-- overlay -->
  <div
    v-if="open"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <!-- modal card -->
    <form
      @submit.prevent="handleSave"
      class="bg-white w-11/12 max-w-md rounded-lg p-6 space-y-4 shadow-lg"
    >
      <h2 class="text-xl font-semibold text-indigo-700">
        {{ editMode ? 'Edit Catatan' : 'Catatan Baru' }}
      </h2>

      <input
        v-model="localTitle"
        placeholder="Judul"
        class="w-full p-3 border rounded"
        required
      />
      <textarea
        v-model="localContent"
        placeholder="Isi catatan"
        rows="4"
        class="w-full p-3 border rounded"
        required
      ></textarea>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border rounded"
        >
          Batal
        </button>
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>
