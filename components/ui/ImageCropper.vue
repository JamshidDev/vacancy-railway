<script setup>
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import {
  Crop24Regular,
  Dismiss24Regular,
  ZoomIn24Regular,
  ZoomOut24Regular,
  ArrowRotateClockwise24Regular,
  ArrowRotateCounterclockwise24Regular,
  ArrowReset24Regular
} from "@vicons/fluent"

const visible = defineModel("visible", { type: Boolean, default: false })
const emit = defineEmits(["crop"])

const props = defineProps({
  imageFile: {
    type: [File, null],
    default: null
  },
  ratioWidth: {
    type: Number,
    default: 3
  },
  ratioHeight: {
    type: Number,
    default: 4
  },
  minWidth: {
    type: Number,
    default: 120
  },
  minHeight: {
    type: Number,
    default: 160
  }
})

const cropperRef = ref(null)
const imageUrl = ref('')
const loading = ref(false)
const fileLoading = ref(false)
const previewUrl = ref('')

watch(() => props.imageFile, (file) => {
  if (file) {
    fileLoading.value = true
    previewUrl.value = ''
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      fileLoading.value = false
    }
    reader.readAsDataURL(file)
  }
}, { immediate: true })

const onCrop = () => {
  if (!cropperRef.value) return

  loading.value = true
  cropperRef.value.getCropBlob((blob) => {
    const file = new File([blob], props.imageFile?.name || 'cropped-image.jpg', {
      type: 'image/jpeg'
    })
    emit('crop', file)
    loading.value = false
    onClose()
  })
}

const onClose = () => {
  visible.value = false
  imageUrl.value = ''
  previewUrl.value = ''
}

const zoomIn = () => {
  cropperRef.value?.changeScale(1)
}

const zoomOut = () => {
  cropperRef.value?.changeScale(-1)
}

const rotateLeft = () => {
  cropperRef.value?.rotateLeft()
}

const rotateRight = () => {
  cropperRef.value?.rotateRight()
}

const resetCrop = () => {
  cropperRef.value?.refresh()
}

const updatePreview = () => {
  if (!cropperRef.value) return
  cropperRef.value.getCropData((data) => {
    previewUrl.value = data
  })
}

const onImgLoad = () => {
  setTimeout(updatePreview, 100)
}
</script>

<template>
  <n-modal
    v-model:show="visible"
    :mask-closable="false"
    class="image-cropper-modal"
  >
    <n-card
      :bordered="false"
      size="small"
      role="dialog"
      aria-modal="true"
      :style="{ width: '460px', maxWidth: '95vw' }"
    >
      <template #default>
        <div class="flex flex-col">
          <!-- Header -->
          <div class="flex justify-between items-center px-4 py-3 border-b border-surface-line">
            <h3 class="text-base font-semibold text-black-secondary">{{ $t('content.cropImage') }}</h3>
            <button
              @click="onClose"
              class="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
            >
              <n-icon size="18"><Dismiss24Regular /></n-icon>
            </button>
          </div>

          <!-- Loading state -->
          <div v-if="fileLoading" class="p-4">
            <div class="w-full h-[250px] flex items-center justify-center bg-gray-50 rounded-lg">
              <n-spin size="medium" />
            </div>
          </div>

          <!-- Cropper area -->
          <div v-else class="p-4">
            <div class="flex gap-3">
              <!-- Main cropper -->
              <div class="flex-1">
                <div class="w-full h-[250px] bg-gray-900 rounded-lg overflow-hidden relative">
                  <VueCropper
                    v-if="imageUrl"
                    ref="cropperRef"
                    :img="imageUrl"
                    outputType="jpeg"
                    :outputSize="0.9"
                    :autoCrop="true"
                    :fixedBox="false"
                    :fixed="true"
                    :fixedNumber="[ratioWidth, ratioHeight]"
                    :limitMinSize="[minWidth, minHeight]"
                    :centerBox="true"
                    :canMoveBox="true"
                    :canMove="true"
                    :canScale="true"
                    :full="false"
                    :infoTrue="true"
                    :high="true"
                    :enlarge="2"
                    mode="contain"
                    @imgLoad="onImgLoad"
                    @realTime="updatePreview"
                  />
                </div>

                <!-- Controls -->
                <div class="flex justify-center items-center mt-3">
                  <div class="inline-flex items-center bg-gray-100 rounded-full px-1 py-1 gap-1">
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <button
                          @click="zoomOut"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                        >
                          <n-icon size="18"><ZoomOut24Regular /></n-icon>
                        </button>
                      </template>
                      {{ $t('content.zoomOut') }}
                    </n-tooltip>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <button
                          @click="zoomIn"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                        >
                          <n-icon size="18"><ZoomIn24Regular /></n-icon>
                        </button>
                      </template>
                      {{ $t('content.zoomIn') }}
                    </n-tooltip>

                    <div class="w-px h-5 bg-gray-300 mx-1"></div>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <button
                          @click="rotateLeft"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                        >
                          <n-icon size="18"><ArrowRotateCounterclockwise24Regular /></n-icon>
                        </button>
                      </template>
                      {{ $t('content.rotateLeft') }}
                    </n-tooltip>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <button
                          @click="rotateRight"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                        >
                          <n-icon size="18"><ArrowRotateClockwise24Regular /></n-icon>
                        </button>
                      </template>
                      {{ $t('content.rotateRight') }}
                    </n-tooltip>

                    <div class="w-px h-5 bg-gray-300 mx-1"></div>

                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <button
                          @click="resetCrop"
                          class="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:text-orange-500 hover:shadow-sm transition-all"
                        >
                          <n-icon size="18"><ArrowReset24Regular /></n-icon>
                        </button>
                      </template>
                      {{ $t('content.reset') }}
                    </n-tooltip>
                  </div>
                </div>
              </div>

              <!-- Preview -->
              <div class="w-[75px] flex-shrink-0">
                <p class="text-xs text-black-tertiary mb-1.5 text-center">{{ $t('content.preview') }}</p>
                <div class="w-[75px] h-[100px] rounded-lg overflow-hidden bg-gray-100 border border-dashed border-gray-300">
                  <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    class="w-full h-full object-cover"
                    alt="preview"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <n-spin size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-2 px-4 py-3 border-t border-surface-line">
            <n-button @click="onClose" tertiary size="medium">
              {{ $t('content.cancel') }}
            </n-button>
            <n-button
              type="primary"
              size="medium"
              :loading="loading"
              :disabled="fileLoading || !imageUrl"
              @click="onCrop"
            >
              <template #icon>
                <n-icon size="16"><Crop24Regular /></n-icon>
              </template>
              {{ $t('content.save') }}
            </n-button>
          </div>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style>
.image-cropper-modal .n-card__content {
  padding: 0 !important;
}

.image-cropper-modal .vue-cropper {
  background: #1a1a1a;
}

.image-cropper-modal .cropper-view-box {
  outline: 2px solid #18a058;
}

.image-cropper-modal .crop-point {
  background-color: #18a058;
  width: 8px !important;
  height: 8px !important;
  border-radius: 50%;
}
</style>
