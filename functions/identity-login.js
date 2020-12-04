export const handler = async (req, _context) => {
    const body = JSON.parse(req.body)
    const eventType = body.event
    const user = body.user
  
    if (eventType === 'login') {
      console.log(`User: ${user.id} logged in`)
    }
    const validateUser = email => { 
        if (email.split("@")[1] === "kea.dk") { 
            return ["teacher"]; 
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