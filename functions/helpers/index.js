function getInitials(email){
    const parts = email.split("@");
    return parts[0];
}
const assignUser = (email) => {
    const initials = getInitials(email);
    if(initials==="jofh"){
        return ["teacher","admin"];
    } else if(['karc','fbe','kemm'].includes(initials)){
        return ["teacher","coord"]; 
    } else {
        return ["teacher"];
    }
}
module.exports = {
    assignUser
}