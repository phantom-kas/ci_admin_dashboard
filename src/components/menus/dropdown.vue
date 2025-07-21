<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const isOpen = ref(false)
const trigger = ref<HTMLElement | null>(null )
const dropdown = ref<HTMLElement | null>(null)
const dropdownPositionClass = ref('top-full') // default below

const toggleDropdown = async () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        await nextTick()
        adjustDropdownPosition()
    }
}

const adjustDropdownPosition = () => {
    const triggerEl = trigger.value
    const dropdownEl = dropdown.value

    if (!triggerEl || !dropdownEl) return

    const triggerRect = triggerEl.getBoundingClientRect()
    const dropdownRect = dropdownEl.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top

    // Check if dropdown fits below; if not and there's more space above, show above
    if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        dropdownPositionClass.value = 'bottom-full mb-2'
    } else {
        dropdownPositionClass.value = 'top-full mt-2'
    }
}

// Optional: close on outside click
const handleClickOutside = (e:any) => {
    if(!trigger.value)return

    
    if (
        !trigger.value.contains(e.target) &&
        !dropdown.value?.contains(e.target)
    ) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

watch(isOpen, (val) => {
    if (val) {
        window.addEventListener('resize', adjustDropdownPosition)
        window.addEventListener('scroll', adjustDropdownPosition, true)
    } else {
        window.removeEventListener('resize', adjustDropdownPosition)
        window.removeEventListener('scroll', adjustDropdownPosition, true)
    }
})
</script>

<template>
    <div ref="trigger" class="relative inline-block" @click="toggleDropdown">
        <button class="px-4 py-2 bg-blue-600 text-white1 rounded">Toggle Dropdown</button>

        <transition name="fade">
            <div v-if="isOpen" ref="dropdown"
                :class="['absolute z-50 mt-2 w-48 bg-white shadow-lg border rounded', dropdownPositionClass]">
                <ul>
                    <li class="p-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                    <li class="p-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                    <li class="p-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
                </ul>
            </div>
        </transition>
    </div>
</template>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
