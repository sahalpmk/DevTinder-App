function validateData(req){
    const {firstName, lastName, emailID, password, gender} = req.body;
    if(!firstName || !lastName || !emailID || !password){
        throw new Error("Please fill all mandatory fields");
    }
}
module.exports = {validateData};