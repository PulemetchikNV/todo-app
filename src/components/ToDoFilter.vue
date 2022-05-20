<template>
    <button @click="$emit('filter-changed')" >{{filterLabel}}</button>
</template>

<script>
    export default {
    props: {
        filterLabel: {
            required: true, 
            type: String
        }
    },
    methods: {
        onSubmit() {
            if(this.label === "") {
                return;
            }
            this.$emit("filter-changed", this.filterLabel);
            this.label = "";
        },
        
    }
  };
</script>
<style scoped>
button{
    cursor: pointer
}
</style>