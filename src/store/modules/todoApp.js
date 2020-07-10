const storage = {
    fetch() {
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },
};

const state = {
    todoItems: storage.fetch()
};

const getters = {
    storedTodoItems(state) {
        return state.todoItems
    }
};

const mutations = {
    addOneItem(state, todoItem) {
        const obj = {
            completed: false,
            item: todoItem
        };
        state.todoItems.push(obj);
        localStorage.setItem(todoItem, JSON.stringify(obj));
    },
    removeItem(state, payload) {
        state.todoItems.splice(payload.index, 1);
        localStorage.removeItem(payload.todoItem.item);
    },
    toggleItem(state, payload) {
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAll(state) {
        state.todoItems = [];
        localStorage.clear();
    }
};

export default {
    state,
    getters,
    mutations
}
