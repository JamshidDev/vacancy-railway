<script setup>
import {AddCircle32Regular, Edit20Filled, Delete20Filled} from "@vicons/fluent"
import {useUserInfoStore} from "../../../store/index.js"
import {rules} from "../../../utils/index.js"

const formRef = ref(null)
const store = useUserInfoStore()


const onSubmit = ()=>{
  formRef.value?.validate((error)=>{
    if(!error){

      const data = {
        ...store.educationPayload,
        from:utils.timeToZone(store.educationPayload.from),
        to:store.educationPayload.now? null : utils.timeToZone(store.educationPayload.to),
        now:undefined,
      }

      if(store.educationVisibleType){
        store.onEducationCreate(data)
      }else{
        store.onEducationUpdate(data)
      }
    }
  })
}

const onDelete = (v)=>{
  store.elementId = v.id
  store.onEducationDelete()
}

const onEdit = (v)=>{
  store.elementId = v.id
  store.educationVisibleType = false
  store.educationPayload.from = utils.datePickerFormatter(v.from)
  store.educationPayload.to = utils.datePickerFormatter(v.to)
  store.educationPayload.now = !Boolean(v.to)
  store.educationPayload.university = v.university
  store.educationVisible = true
}

const onAdd = ()=>{
  store.resetCareerPayload()
  store.educationVisibleType = true
  store.educationVisible = true
}

const onChange = (v)=>{
  if(!v) return
  store.educationPayload.to = null
}

onMounted(()=>{
  store.onEducationIndex()
})
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-6 font-semibold text-xl text-primary">
      {{$t('info.education.name')}}
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
      <n-spin :show="store.loading">
        <UiNoResult v-if="store.educationList.length===0 && !store.loading"
        />
        <n-table
            striped
            v-if="store.educationList.length>0"
        >
          <thead>
          <tr>
            <th class="w-[40px]">№</th>
            <th class="w-[120px]">{{$t('info.career.period')}}</th>
            <th>{{$t('info.education.university')}}</th>
            <th class="w-[80px]">
              {{$t('content.action')}}
            </th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(item, index) in store.educationList">
            <tr>
              <td><span class="font-semibold">{{index+1}}</span></td>
              <td>{{utils.timeToUI(item.from)}} - {{utils.timeToUI(item.to) || $t('info.education.untilNow')}}</td>
              <td>{{item.university}}</td>
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
                          :loading="store.deleteLoading"
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
          v-model:visible="store.educationVisible"
          :title="store.educationVisibleType? $t('info.education.createTitle') : $t('info.education.updateTitle')"

      >
        <n-form
            class="w-full grid grid-cols-12"
            ref="formRef"
            :rules="rules.common($t)"
            :model="store.educationPayload"
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
                v-model:value="store.educationPayload.from"
                type="date"
                :format="appSetting.datePicketFormat"
            />
          </n-form-item>
          <n-form-item
              class="col-span-12"
              :label="$t(`info.career.to`)"
              path="to"
              :rule-path="store.educationPayload.now? undefined : rules.names.requiredNumberField "
              :show-feedback="!store.educationPayload.now"
          >
            <n-date-picker
                :disabled="store.educationPayload.now"
                class="w-full"
                clearable
                v-model:value="store.educationPayload.to"
                type="date"
                :format="appSetting.datePicketFormat"
            />
          </n-form-item>
          <div class="col-span-12 flex justify-end">
            <n-checkbox @update:checked="onChange" v-model:checked="store.educationPayload.now">
              {{$t('info.education.now')}}
            </n-checkbox>
          </div>
          <n-form-item
              class="col-span-12"
              :label="$t(`info.education.university`)"
              path="university"
              :rule-path="rules.names.requiredStringField"
          >
            <n-input
                type="textarea"
                :autosize="{
                 minRows: 3,
                 maxRows: 5,
              }"
                v-model:value="store.educationPayload.university"
            />
          </n-form-item>
          <n-button
              :loading="store.saveLoading"
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
