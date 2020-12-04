module.exports = function getInitials(email){
    const parts = email.split("@");
    return parts[0];
}