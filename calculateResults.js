module.exports = async function (context, req) {

const results = req.body

context.log("Calculating results")

context.res = {
body: {
message:"Results calculated",
data:results
}
}

}