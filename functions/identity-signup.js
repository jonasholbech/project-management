
exports.handler  = async (req, _context) => {
    const body = JSON.parse(req.body)
    const user = body.user
  
    const validateUser = email => { 
        if (email.split("@")[1] === "kea.dk") { 
            return {
                statusCode: 200,
                body: JSON.stringify({all:"good"})
            };
        } else { 
            return {
                statusCode: 403,
                body: JSON.stringify({bugger:"off"})
            };
        }
    }; 
    return validateUser(user.email);
    /*
    const responseBody = { 
        app_metadata: { 
            roles:validateUser(user.email), 
            something: "test" 
        }, 
        user_metadata: { ...user.user_metadata, extra: "test" } 
    }; */
    //basically, i can attach anything to app_metadata and user_metadata, but
    //roles are special (as they show up in netlify admin)
    
    
  }
  /*
exports.handler = function(event, context) { 
    const data = JSON.parse(event.body); 
    const { user } = data; 
    console.log(user.email); 
    console.log("identity yourself", context.clientContext.identity); 
    const validateUser = email => { 
        if (email.split("@")[1] === "netlify.com") { 
            return ["editor"]; 
        } else { 
            return ["visitor"]; 
        }
    }; 
    const roles = validateUser(user.email); 
    const responseBody = { 
        app_metadata: { 
            roles, 
            my_user_info: "this is user info that the user can’t change from the UI" 
        }, 
        user_metadata: { ...user.user_metadata, custom_data_from_function: "hurray this is some extra metadata" } 
    }; 
    return {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
    
}; 
*/