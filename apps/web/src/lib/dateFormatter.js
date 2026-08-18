export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export function formatDate(date_input) {
    const date = new Date(date_input);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
}

export function formatOnlyNumericDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}