export default function debounce(func, ms) {
    let timer;

    return function (...args) {
        const funcCall = () => {
            func.apply(this, ...args);
        }

        clearTimeout(timer);
        timer = setTimeout(funcCall, ms);
    }
}