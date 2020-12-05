const helpers = require('./helpers')
exports.handler  = async (req, _context) => {
    const body = JSON.parse(req.body)
    const user = body.user
  
    
    const validateUser = email => { 
        if (email.split("@")[1] === "kea.dk") { 
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        app_metadata: { 
                            roles:helpers.assignUser(user.email)
                        }
                    }
                )
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
  