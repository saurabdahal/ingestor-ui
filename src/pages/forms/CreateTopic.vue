<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import topicSettings from "../../composables/topicSettings";
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.go(-1)
}

const $q = useQuasar();


const formData = ref({});
topicSettings.forEach((field) => {
  formData.value[field.model] = field.type === "number" ? 1 : ""; // Default values
});

const showAdvanced = ref(false);

const onSubmit = () => {
  console.log("Submitted Data:", formData.value);
  $q.notify({ message: "Form Submitted!", type: "positive" });
};

const onReset = () => {
  topicSettings.forEach((field) => {
    formData.value[field.model] = field.type === "number" ? 1 : "";
  });
  showAdvanced.value = false;
};
</script>

<template>
  <div class="q-pa-md">
    <q-banner inline-actions class="text-white q-mb-lg">
      <template v-slot:action>
        <q-btn outline icon="arrow_back" color="white" label="Back" @click=goBack />
      </template>
    </q-banner>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-card>
        <q-card-section>
          <div v-for="field in topicSettings.filter(f => f.essential)" :key="field.model">
            <q-input
              v-if="field.type === 'text' || field.type === 'number'"
              filled
              :type="field.type"
              v-model="formData[field.model]"
              :label="field.label + ' *'"
              lazy-rules
              :rules="[val => val !== null && val !== '' || 'This field is required']"
            />
          </div>
          <!-- Advanced Configuration (Hidden by Default) -->
          <q-expansion-item v-model="showAdvanced" expand-separator label="Advanced Configuration" header-class="text-primary">
            <div class="q-pa-sm">
              <div v-for="field in topicSettings.filter(f => !f.essential)" :key="field.model">
                <q-input
                  v-if="field.type === 'text' || field.type === 'number'"
                  filled
                  :type="field.type"
                  v-model="formData[field.model]"
                  :label="field.label"
                />

                <q-select
                  v-if="field.type === 'select'"
                  filled
                  v-model="formData[field.model]"
                  :options="field.options"
                  :label="field.label"
                />
              </div>
            </div>
          </q-expansion-item>
        </q-card-section>
        <q-card-actions>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>
