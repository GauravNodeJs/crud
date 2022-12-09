import Response from './response'
class Helper{
    error(res,data,statusCode=200) {
        return Response.error(res,data,statusCode)
    }

    success(res,data,statusCode=200) {
        return Response.success(res,data,statusCode)
    }
    
}
export default new Helper