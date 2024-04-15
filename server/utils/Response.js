const response = (error_code, error_message, output_schema) => {
    return {
        error_schema: {
            error_code: error_code,
            error_message: error_message
        },
        output_schema
    }
}

const error_response = (error_message) => response(500, error_message)

module.exports = {
    response,
    error_response
}