export const IDGenerator = () => {
    return (Date.now() * Math.random()).toFixed()
}