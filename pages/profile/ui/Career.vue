<script setup>
import {AddCircle32Regular, Edit20Filled, Delete20Filled, EyeOff20Filled, Eye24Regular} from "@vicons/fluent"
import {useUserInfoStore} from "../../../store/index.js"
import {rules} from "../../../utils/index.js"

const formRef = ref(null)
const store = useUserInfoStore()


const onSubmit = ()=>{
  formRef.value?.validate((error)=>{
    if(!error){

      const data = {
        ...store.careerPayload,
        from:utils.timeToZone(store.careerPayload.from),
        to:store.careerPayload.now? null : utils.timeToZone(store.careerPayload.to),
        now:undefined,
      }

      if(store.careerVisibleType){
        store.onCreate(data)
      }else{
        store.onUpdate(data)
      }
    }
  })
}

const onDelete = (v)=>{
  store.elementId = v.id
  store.onDelete()
}

const onEdit = (v)=>{
  store.elementId = v.id
  store.careerVisibleType = false
  store.careerPayload.from = utils.datePickerFormatter(v.from)
  store.careerPayload.to =utils.datePickerFormatter(v.to)
  store.careerPayload.now = !Boolean(v.to)
  store.careerPayload.position = v.position
  store.careerVisible = true
}

const onAdd = ()=>{
  store.resetCareerPayload()
  store.careerVisibleType = true
  store.careerVisible = true
}

const onChange = (v)=>{
  if(!v) return
  store.careerPayload.to = null
}

onMounted(()=>{
  store.onIndex()
})
</script>

<template>
<div class="grid grid-cols-12">
  <div class="col-span-6 font-semibold text-xl text-primary">
    {{$t('info.career.name')}}
  </div>
  <div class="col-span-6 flex justify-end">
    <n-button
        @click="onAdd"
        type="primary" secondary>
     {{$t('content.add')}}
      <template #icon>
        <AddCircle32Regular/>
      </template>
    </n-button>
  </div>

  <div class="col-span-12 mt-4">
    <n-spin :show="store.careerLoading">
      <UiNoResult v-if="store.careerList.length===0 && !store.careerLoading"
      />
      <n-table
          striped
          v-if="store.careerList.length>0"
      >
        <thead>
        <tr>
          <th class="w-[40px]">№</th>
          <th class="w-[120px]">{{$t('info.career.period')}}</th>
          <th>{{$t('content.organization')}}</th>
          <th class="w-[80px]">
            {{$t('content.action')}}
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item, index) in store.careerList">
          <tr>
            <td><span class="font-semibold">{{index+1}}</span></td>
            <td>{{utils.timeToUI(item.from)}} - {{utils.timeToUI(item.to) || $t('info.career.untilNow')}}</td>
            <td>{{item.position}}</td>
            <td>
              <div class="flex gap-2 justify-center">
                <n-button
                    @click="onEdit(item)"
                    type="primary" size="small" secondary>
                  <template #icon>
                    <Edit20Filled/>
                  </template>
                </n-button>

                <n-popconfirm
                    :positive-text="$t('content.yes')"
                    :negative-text="$t('content.no')"
                    @positive-click="onDelete(item)"
                >
                  <template #trigger>
                    <n-button
                        :loading="store.careerDeleteLoading"
                        type="error"
                        size="small"
                        secondary>
                      <template #icon>
                        <Delete20Filled/>
                      </template>
                    </n-button>
                  </template>
                  {{$t('content.confirmDelete')}}
                </n-popconfirm>

              </div>

            </td>
          </tr>
        </template>

        </tbody>
      </n-table>
    </n-spin>
  </div>
  <div class="col-span-12">
    <UiModal
        :width="500"
        v-model:visible="store.careerVisible"
        :title="store.careerVisibleType? $t('info.career.createTitle') : $t('info.career.updateTitle')"

    >
      <n-form
          class="w-full grid grid-cols-12"
          ref="formRef"
          :rules="rules.common($t)"
          :model="store.careerPayload"
      >
        <n-form-item
            class="col-span-12"
            :label="$t(`info.career.from`)"
            path="from"
            :rule-path="rules.names.requiredNumberField"
        >
          <n-date-picker
              clearable
              class="w-full"
              v-model:value="store.careerPayload.from"
              type="date"
              :format="appSetting.datePicketFormat"
          />
        </n-form-item>
        <n-form-item
            class="col-span-12"
            :label="$t(`info.career.to`)"
             path="to"
            :rule-path="store.careerPayload.now? undefined : rules.names.requiredNumberField "
            :show-feedback="!store.careerPayload.now"
        >
          <n-date-picker
              :disabled="store.careerPayload.now"
              class="w-full"
              clearable
              v-model:value="store.careerPayload.to"
              type="date"
              :format="appSetting.datePicketFormat"
          />
        </n-form-item>
        <div class="col-span-12 flex justify-end">
          <n-checkbox @update:checked="onChange" v-model:checked="store.careerPayload.now">
            {{$t('info.career.now')}}
          </n-checkbox>
        </div>
        <n-form-item
            class="col-span-12"
            :label="$t(`info.career.position`)"
            path="position"
            :rule-path="rules.names.requiredStringField"
        >
          <n-input
              type="textarea"
              :autosize="{
                 minRows: 3,
                 maxRows: 5,
              }"
              v-model:value="store.careerPayload.position"
          />
        </n-form-item>
        <n-button
            :loading="store.careerSaveLoading"
            class="col-span-12 !mt-6 uppercase !mb-4"
            @click="onSubmit"
            type="primary">
          {{$t('content.send')}}
        </n-button>
      </n-form>
    </UiModal>
  </div>

</div>
</template>
