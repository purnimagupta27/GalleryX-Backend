class ApiResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
    }

    static ok(message = "ok", data = null) {
        return new ApiResponse(200, message, data)
    }

    static created(message = "Created", data = null) {
        return new ApiResponse(201, message, data)
    }

    static noContent(message = "No content", data = null) {
        return new ApiResponse(204, message, data)
    }
}

export default ApiResponse