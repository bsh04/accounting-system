export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('products');
        if (!serializedState) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('products', serializedState);
    } catch (err) {
        return loadState();
    }
};

export const removeItem = (index) => {
    try {
        let arr = loadState().filter((_, i) => i !== index)
        localStorage.setItem('products', JSON.stringify(arr))
        return loadState()
    } catch (err) {
        return loadState();
    }
}

export const addItem = (item) => {
    if (loadState().length !== 0) {
        let arr = loadState()
        arr.push({name: item.name, count: item.count})
        localStorage.setItem('products', JSON.stringify(arr))
        return loadState()
    } else {
        localStorage.setItem('products', JSON.stringify([{name: item.name, count: item.count}]))
        return loadState()
    }
}

export const updateItem = (item) => {
    try {
        let newStore = loadState()

        newStore[item.index].count = item.count
        newStore[item.index].name = item.name

        localStorage.setItem('products', JSON.stringify(newStore))
        return loadState()
    } catch (err) {
        return loadState()
    }
}