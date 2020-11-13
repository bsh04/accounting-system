export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('offset');
        if (!serializedState) {
            return 0;
        }
        return serializedState;
    } catch (err) {
        return 0;
    }
};

export const updateOffset = (value) => {
    try {
        localStorage.setItem('offset', value.toString());
        return loadState()
    } catch (err) {
        return loadState();
    }
}