export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('products');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};