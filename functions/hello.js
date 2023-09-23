const items = [
    
]

exports.handler = async function(event, context){
    console.log("called")
    return {
        statusCode: 200,
        body: 'Hello World'
    }
}