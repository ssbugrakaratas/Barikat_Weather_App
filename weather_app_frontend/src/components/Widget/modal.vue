<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-container">
      <div class="backdrop cursor-pointer" @click="closeModal"></div>
      <div class="modal-content py-3 px-4 bg-white rounded-lg">
        <div class="mb-3">
          <span
            class="pull-right mb-0 text-right h2 fw-normal cursor-pointer close-button"
            @click="closeModal"
            >&#10005;</span
          >
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
  },
};
</script>

<style scoped>
.modal-container {
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.backdrop {
  background-color: #181c21;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
.modal-content {
  width: fit-content;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-in-out;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
