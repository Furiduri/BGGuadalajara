<script setup>
  import { ref, toRefs, watch } from 'vue'
  import { supabase } from '../supabase'

  const prop = defineProps(['path', 'sizes'])
  const { path, sizes } = toRefs(prop)

  const emit = defineEmits(['upload', 'update:path'])
  const uploading = ref(false)
  const src = ref('')
  const files = ref()

  const downloadImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path.value)
      if (error) throw error
      src.value = URL.createObjectURL(data)
    } catch (error) {
      console.error('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (evt) => {
    files.value = evt.target.files
    try {
      uploading.value = true
      if (!files.value || files.value.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = files.value[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError
      emit('update:path', filePath)
      emit('upload')
    } catch (error) {
      alert(error.message)
    } finally {
      uploading.value = false
    }
  }

  watch(path, () => {
    if (path.value) downloadImage()
  })
</script>

<template>
  <div>
    <label class="button primary block" for="single">
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="p-avatar p-avatar-circle"
      :style="{ height: sizes + 'em', width: sizes + 'em' }"
    />
    <div
      v-else
      class="p-avatar p-avatar-circle"
      :style="{ height: sizes + 'em', width: sizes + 'em' }"
    />
    <br>
       <span class="p-button p-button-info">
         {{ uploading ? "Subiendo..." : "Cambiar imagen" }}
       </span>
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
</template>

<style scoped>
  .avatar {
  border-radius: var(--custom-border-radius);
  overflow: hidden;
  max-width: 100%;
}
.avatar.image {
  object-fit: cover;
}
.avatar.no-image {
  background-color: #333;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
}
</style>