class ApiResponse {
    constructor(statusCode, data, message = null, errors = null) {
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.errors = errors,
        this.success = statusCode < 400
    }
}

export { ApiResponse }