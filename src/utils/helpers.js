function getInitials(email){
    return email.split("@")[0];
}
export function canDeleteTask(user, createdBy){
    if(getInitials(user.email)===createdBy){
        return true;
    }
    if(user.app_metadata.roles.includes('admin') || user.app_metadata.roles.includes('coord')){
        return true;
    }
    return false;
}