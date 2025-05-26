<template>
  <v-row justify="center" class="my-3">
    <h1>job scheduler with cmd</h1>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6" md="6">
      <v-row justify="space-around" class="my-3">

        <!--        <v-time-picker-->
        <!--            format="24hr"-->
        <!--            color="green-lighten-1"-->
        <!--            v-model="time"-->
        <!--        ></v-time-picker>-->
        <!--        -->
        <v-text-field
            label="Time"
            placeholder="HH:MM"
            v-model="time"
            type="time"
            class="green-lighten-1"
        ></v-text-field>
      </v-row>
      <v-row class="mx-5 mt-3">
        <v-textarea label="batch script to run" v-model="command"></v-textarea>
      </v-row>
      <v-row justify="end">
        <v-btn class="mx-5 my-2" @click="addJob" color="primary">add job</v-btn>
      </v-row>
    </v-col>
    <v-col>
      <v-alert class="mx-8" v-if="!items.length">no jobs scheduled</v-alert>
      <v-card
          class="mx-2 my-3"
          v-for="(item, index) in items"
          :key="item"

          width="400"
      >
        <template v-slot:title>
          <span class="font-weight-black">{{ item.time }}</span>
        </template>
        <v-row>
          <v-col cols="9">
            <v-card-text class="bg-surface-light pt-4">
              {{ item.command }}
            </v-card-text>
          </v-col>
          <v-col>
            <v-btn
                color="red"
                class="bg-surface-light pt-4"

                @click="handelDeleteJob(index)"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
  <v-col>
    <v-textarea label="batch script" cols="8" class="mx-8" v-model="code">
    </v-textarea>
    <v-row justify="end">
      <v-btn
          cols="2"
          class="mx-3"
          color="primary"
          @click="downloadScript"
          justify="end"
      >download script
      </v-btn>
    </v-row>
  </v-col>
</template>
<script setup>
import {ref, computed} from 'vue'

const time = ref('00:00')
const command = ref('')
const items = ref([])
const code = computed(() =>
    items.value
        .map(item => {
          const [hour, minute] = item.time.split(':')
          const command = item.command
              .split('\n')
              .map(line => line.trim())
              .filter(Boolean)
              .join(' && ')

          // Use PowerShell to calculate integer seconds until the scheduled time
          const psDelay = `[int](New-TimeSpan -Start (Get-Date) -End (Get-Date -Hour ${hour} -Minute ${minute})).TotalSeconds`
          const line = `for /f %%i in ('powershell -command "& {${psDelay}}"') do timeout /t %%i && ${command}`

          return line
        })
        .join('\n')
)

const addJob = () => {
  if (command.value) {
    items.value.push({time: time.value, command: command.value})
  }
}
const handelDeleteJob = index => {
  items.value.splice(index, 1)
}

const downloadScript = () => {
  const blob = new Blob([code.value], {type: 'text/plain;charset=utf-8'})
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'jobs.bat'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
</script>
