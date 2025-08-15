<template>
  <v-card class="task-form-card" elevation="3">
    <v-card-title class="text-center">
      <v-icon color="primary" size="large" class="mr-2">mdi-plus-circle</v-icon>
      Add New Task
    </v-card-title>
    
    <v-card-text>
      <v-form @submit.prevent="handleSubmit" ref="formRef">
        <v-text-field
          v-model="taskTitle"
          label="Task Title"
          placeholder="Enter your task here... (e.g., Learn Vue.js fundamentals)"
          variant="outlined"
          color="primary"
          :rules="titleRules"
          required
          clearable
          counter
          maxlength="100"
          prepend-inner-icon="mdi-clipboard-text"
          @keyup.enter="handleSubmit"
          class="mb-2"
        ></v-text-field>
        
        <div class="form-actions">
          <v-btn
            type="submit"
            color="primary"
            variant="elevated"
            :disabled="!taskTitle || !taskTitle.trim() || taskTitle.trim().length < 3"
            :loading="isSubmitting"
            size="large"
            block
          >
            <v-icon left>mdi-plus</v-icon>
            Add Task
          </v-btn>
        </div>
      </v-form>
    </v-card-text>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSuccess"
      color="success"
      timeout="2000"
      location="top"
    >
      <v-icon>mdi-check-circle</v-icon>
      Task added successfully!
    </v-snackbar>
  </v-card>
</template>

<script setup>
// Nuxt auto-imports ref, nextTick - no import needed!
import { useTaskStore } from '~/stores/TaskStore'

const taskStore = useTaskStore()
const taskTitle = ref('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const formRef = ref(null)

// Form validation rules
const titleRules = [
  value => {
    if (!value || value === null || value === undefined || !value.trim()) {
      return 'Task title is required'
    }
    if (value.trim().length < 3) {
      return 'Task title must be at least 3 characters'
    }
    if (value.trim().length > 100) {
      return 'Task title must be less than 100 characters'
    }
    return true
  }
]

// Handle form submission
const handleSubmit = async () => {
  console.log('Form submitted with title:', taskTitle.value) // Debug log
  
  // Check if taskTitle.value is null or undefined
  if (!taskTitle.value || !taskTitle.value.trim() || taskTitle.value.trim().length < 3) {
    console.log('Validation failed: title too short, empty, or null')
    return
  }

  // Validate form
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    if (!valid) {
      console.log('Form validation failed')
      return
    }
  }

  isSubmitting.value = true
  console.log('Adding task to store...') // Debug log
  
  try {
    // Store the title before operations
    const titleToAdd = taskTitle.value
    
    // Add task to store
    taskStore.addTask(titleToAdd)
    console.log('Task added successfully, current tasks:', taskStore.tasks) // Debug log
    
    // Reset form properly
    taskTitle.value = ''
    
    // Don't call formRef.reset() as it's causing issues
    // if (formRef.value) {
    //   formRef.value.reset()
    // }
    
    // Show success message
    showSuccess.value = true
    
  } catch (error) {
    console.error('Error adding task:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.task-form-card {
  max-width: 500px;
  margin: 20px auto;
  border-radius: 12px !important;
}

.task-form-card .v-card-title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  padding: 20px;
  font-size: 1.3em;
  font-weight: 600;
}

.form-actions {
  margin-top: 10px;
}

.v-text-field {
  margin-bottom: 0;
}

/* Custom focus styles */
.v-text-field:deep(.v-field--focused) {
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2); 
}

/* Loading state */
.v-btn--loading {
  pointer-events: none;
}
</style>