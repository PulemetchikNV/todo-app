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

export default {
  name: 'App',
  components: {
    ToDoItem,
    ToDoForm,
    ToDoFilter
  },
  data() {
    return {
      ToDoItems: [],
      states: [
                {label: 'All', state : ''},
                {label: 'Active', state : false},
                {label: 'Completed', state : true},
      ],
      filter : ''
    };
  },
  methods: {
    async addToDo(toDoLabel) {
      let r = Math.round(Math.random() * 1000)
      if(toDoLabel.length > 0){
        this.ToDoItems.push({id: 'todo' + this._uid + r, label: toDoLabel, done: false});
        this.saveItems()
      }else{
        let item =await getRandomItem(this._uid + r)
        this.ToDoItems.push(item)
        this.saveItems()
      }
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find(item => item.id === toDoId)
      toDoToUpdate.done = !toDoToUpdate.done
      this.saveItems()
    },
    deleteToDo(toDoId) {
      const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
      this.ToDoItems.splice(itemIndex, 1);
      this.saveItems()
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
      toDoToEdit.label = newLabel;
      this.saveItems()
    },
    updateFilter(state){
      console.log(state);
      this.filter = state
    },
    clearActive(){
      this.ToDoItems = this.filteredTodos.filter(item => {
        console.log(item.done == false);
        return item.done == false
      })
      this.saveItems()
    },
    saveItems() {
      const parsed = JSON.stringify(this.ToDoItems);
      localStorage.setItem('ToDoItems', parsed);
    }
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter(item =>item.done).length
      return `${numberFinishedItems} out of ${this.ToDoItems.length}`
    },
    filteredTodos() {
      if(this.filter !== ''){
        return this.ToDoItems.filter(item => {
          return item.done == this.filter 
        })
      }else{
        return this.ToDoItems
      }
    }
  },
  mounted() {
    if (localStorage.getItem('ToDoItems')) {
      try {
        this.ToDoItems = JSON.parse(localStorage.getItem('ToDoItems'));
      } catch(e) {
        localStorage.removeItem('ToDoItems');
      }
    }
  },
  async created() {
    if(localStorage.getItem('ToDoItems').length < 3){
      for(let i = 0; i < 3; i++){
        let item = await getRandomItem(this._uid + i)
        this.ToDoItems.push(item)
        this.saveItems()
      }
    }
  }
}

async function getRandomItem(id){
  let n = Math.round(Math.random() * 100)
  let url = `http://jsonplaceholder.typicode.com/posts/${n}`
  let r = await fetch(url)
  r = await r.json()
  let item = {id: 'todo-' + id, label: r[`title`], done: false}
  return item
}

</script>

<style>
.btn {
  width: 40px;
  height: 40px;
  border: 0.2rem solid black;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
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
#app > * {

}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
