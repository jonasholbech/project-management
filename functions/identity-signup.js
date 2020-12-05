const getInitials = require('./helpers/initials')
exports.handler  = async (req, _context) => {
    const body = JSON.parse(req.body)
    const user = body.user
  
    const assignUser = (email) => {
        const initials = getInitials(email);
        if(['karc','fbe','kemm'].includes(initials)){
            return ["coord"]; 
        } else {
            return ["teacher"];
        }
    }
    const validateUser = email => { 
        if (email.split("@")[1] === "kea.dk") { 
            return {
                statusCode: 200,
                body: JSON.stringify({app_metadata: { 
                    roles:assignUser(user.email)
                }})
            };
        } else { 
            return {
                statusCode: 403,
                body: JSON.stringify({bugger:"off"})
            };
        }
    }; 
    return validateUser(user.email);
}
  