export const diffeningFunction = (old, updated) => {
    const diff = {};
    for (const key in updated) {
        if (updated[key] !== old[key]) {
            diff[key] = updated[key];
        }
    }
    return diff;
}