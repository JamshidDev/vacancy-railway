<script setup>
import {Dismiss24Filled} from "@vicons/fluent"

const visible = defineModel("visible", {type:Boolean,default:false })
const emit = defineEmits(["click:close"])
const props = defineProps({
  width:{
    type:Number,
    default:400
  },
  title:{
    type:String,
    default:'no-title'
  },
  persistent: {
    type: Boolean,
    default: false
  }
})

const onClickClose = ()=>{
  visible.value=false
  emit('click:close')
}

</script>

<template>
  <n-modal
      v-model:show="visible"
      :close-on-esc="!persistent"
      :mask-closable="!persistent"
      class="ui__modal-element"
  >
    <n-card
        title="Modal"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        :style="{width:width+'px'}"
        closable
    >
      <template #default>
        <div class="flex flex-col p-2">
          <div class="w-full">
            <slot name="header">
              <div class="flex justify-between px-4 py-2">
                <slot name="header-title">
                  <h3 class="text-lg font-medium">{{title}}</h3>
                </slot>

                <n-icon
                    size="24"
                    @click="onClickClose"
                    class="text-black-tertiary cursor-pointer">
                  <Dismiss24Filled/>
                </n-icon>
              </div>
            </slot>
          </div>
          <div class="px-4">
            <slot name="default">
            </slot>
          </div>

        </div>
      </template>
    </n-card>
  </n-modal>
</template>