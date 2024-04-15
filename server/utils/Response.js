const resp = (error_code, error_message, output_schema) => {
    return {
        error_schema: {
            error_code: error_code,
            error_message: error_message
        },
        output_schema
    }
}

module.exports = {
    resp
}