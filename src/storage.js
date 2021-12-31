export function restore(key, fallback) {
    const data = localStorage.getItem(`mesh-gradient-generator:${key}`);
    return data ? JSON.parse(data) : fallback;
}

export function persist(key, data) {
    localStorage.setItem(`mesh-gradient-generator:${key}`, JSON.stringify(data));
}
