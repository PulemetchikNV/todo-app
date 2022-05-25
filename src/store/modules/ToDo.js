var getRandomItem = require('../../helper')
export default {
    actions: {
        addToDo: async function(ctx, toDoLabel){
            let r = Math.round(Math.random() * 1000)
            var item
            if(toDoLabel.length > 0){
                item = {id: 'todo' + Date.now() + r, label: toDoLabel, done: false}
            }else{
                item =await getRandomItem.default(Date.now() + r)
            }
            ctx.commit('addToDo', item)
        }
        
    },
    mutations: {
        updateFilter(state, st){
            state.filter = st
            console.log(state);
        },
        clearActive(state){
            state.ToDoItems = state.ToDoItems.filter(item => {
                return item.done == false
            })
            
        },
        addToDo(state, item){
            state.ToDoItems.push(item)
        },
        updateDoneStatus(state, toDoId){
            const toDoToUpdate = state.ToDoItems.find(item => item.id === toDoId)
            toDoToUpdate.done = !toDoToUpdate.done
        },
        editToDo(state, data){
            const [toDoId, newLabel] = data
            const toDoToEdit = state.ToDoItems.find(item => item.id === toDoId);
            toDoToEdit.label = newLabel;
        }
        
    },
    state: {
        ToDoItems: [],
        states: [
                    {label: 'All', state : ''},
                    {label: 'Active', state : false},
                    {label: 'Completed', state : true},
        ],
        filter : ''
    },
    getters: {
        ToDoItems(state){
            return state.ToDoItems
        },
        states(state){
            return state.states
        },
        filter(state){
            return state.filter
        },
        filteredTodos(state) {
            if(state.filter !== ''){
                return state.ToDoItems.filter(item => {
                    return item.done == state.filter 
                })
            }else{
                return state.ToDoItems
            }
        },
        listSummary(state) {
            const numberFinishedItems = state.ToDoItems.filter(item =>item.done).length
            return `${numberFinishedItems} out of ${state.ToDoItems.length}`
        }
    },
}