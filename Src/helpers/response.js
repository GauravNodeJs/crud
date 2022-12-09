class Response {
    success(res, data, statusCode = 200) {
        let myPayload = {
            status: true,
            message: data.message,
            payload: data.payload
        }
        res.status(statusCode).send(myPayload);
    }

    error(res, data, statusCode = 200) {
        let myPayload = {
            status: false,
            message: data.message,
            payload: data.payload
        }
        res.status(statusCode).send(myPayload);
    }
}
export default new Response
