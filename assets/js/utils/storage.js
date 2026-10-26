const saveToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const loadFromStorage = (key) => JSON.parse(localStorage.getItem(key));
