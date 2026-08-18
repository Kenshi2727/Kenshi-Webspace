export function parseDataTypes(data, fields) {
    for (const key in fields) {
        if (data[key] !== undefined) {
            data[key] = fields[key](data[key]);
        }
    }
}