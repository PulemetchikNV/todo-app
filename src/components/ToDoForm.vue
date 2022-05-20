<template>
    <form @submit.prevent ='onSubmit' class ='inputForm'>
        <button type="submit" class="btn">
         + 
        </button>
        <input
        type="text"
        id="new-todo-input"
        name="new-todo"
        autocomplete="off"
        v-model.lazy.trim="label"
        class="input__lg" />
        
    </form>
</template>

<script>
  export default {
    methods: {
        onSubmit() {
            this.$emit("todo-added", this.label);
            this.label = "";
        },
        
    },
    data() {
            return {
                label: ""
            };
        }
  };
</script>
<style scoped>
    .inputForm{
        display: flex;
        justify-content: space-between;
    }
</style>