<template>
  <div id="app">
    <h1>TODO</h1>
    <ToDoForm  @todo-added="addToDo"></ToDoForm>
    <hr>
    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for='item in filteredTodos' :key="item.id">
        <ToDoItem :label="item.label" :done="item.done" :id="item.id"
            @checkbox-changed="updateDoneStatus(item.id)"
            @item-deleted="deleteToDo(item.id)"
            @item-edited="editToDo(item.id, $event)">
        </ToDoItem>
      </li>
    </ul>
    <hr>
    <div class = 'subPanel'>
      <ul>
        <li v-for = "state in states" :key = "state.state">
          <ToDoFilter :filterLabel="state.label" 
            @filter-changed = "updateFilter(state.state)">
          </ToDoFilter>
        </li>
      </ul>
      
      <button @click = "clearActive">Clear completed</button>
      
      <p id = 'list-summary'>{{listSummary}}</p>
    </div>
  </div>
</template>

<script>
import ToDoItem from './components/ToDoItem.vue'
import ToDoForm from './components/ToDoForm';
import ToDoFilter from './components/ToDoFilter.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    ToDoItem,
    ToDoForm,
    ToDoFilter
  },
  methods: {
    addToDo(toDoLabel) {
      this.$store.dispatch('addToDo', toDoLabel)
      this.saveItems()
    },
    updateDoneStatus(toDoId) {
      this.$store.commit('updateDoneStatus', toDoId)
      this.saveItems()
    },
    editToDo(toDoId, newLabel) {
      this.$store.commit('editToDo', [toDoId, newLabel])
      this.saveItems()
    },
    updateFilter(st){
      this.$store.commit('updateFilter', st)
      this.saveItems()
    },
    clearActive(){
      this.$store.commit('clearActive', localStorage)
      this.saveItems()
    },
    saveItems() {
      const parsed = JSON.stringify(this.$store.getters.ToDoItems);
      localStorage.setItem('ToDoItems', parsed);
    },
    
  },
  computed: {
    ...mapGetters(['ToDoItems', 'states', 'filter', 'filteredTodos', 'listSummary'])
  },
  // mounted() {
  //   console.log(localStorage);
  //   if (localStorage.getItem('ToDoItems')) {
  //     try {
  //       this.$store.getters.ToDoItems = JSON.parse(localStorage.getItem('ToDoItems'));
  //     } catch(e) {
  //       localStorage.removeItem('ToDoItems');
  //     }
  //   }
  // },
  // async created() {
  //   if(localStorage.getItem('ToDoItems').length < 3){
  //     for(let i = 0; i < 3; i++){
  //       this.$store.dispatch('addToDo', '')
  //       this.saveItems()
  //     }
  //   }
  // }
}



</script>

<style lang="scss">
.btn {
  width: 40px;
  height: 40px;
  border: 0.2rem solid black;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 90%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}

.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app {
  form {
    max-width: 100%;
  }
}
#app {
  h1 {
    display: block;
    min-width: 100%;
    width: 100%;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
  }
}
</style>
