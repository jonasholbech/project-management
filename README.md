# TODO
- hvem kan assigne?
  - admins, coords, createdBy
- Hvem kan ænre assigned status
  - admins, coords, createdBy, assignee
- View own tasks
- admin mode
- settings
  - toggles buttons do nothing for now
  - https://rsuitejs.com/components/toggle/
- design
- only change own assigned unless initials=assignedBy???
- split App.js into components
- limit description on table width
  - ... if more than x chars, otherwise full
- markdown (or at least line breaks) in description
  - https://gist.github.com/yidas/41cc9272d3dff50f3c9560fb05e7255e

- auth: 
  - https://docs.netlify.com/functions/functions-and-identity/#trigger-serverless-functions-on-identity-events
  
  - use initials as key in cloud functions
 - pagination på overview
- filters on overview
- hide settings unless logged in
- show login button directly on frontpage
- hide nav items when not logged in
- from AddTask: redirect to newly created task
- https://css-tricks.com/netlify-functions-for-sending-emails/
  - I guess I need to store user data in mongo as well
  - https://www.w3schools.com/nodejs/nodejs_email.asp
# Completed, could be improved
- set roles on signup/ and/or possibly login/validate
- move completed task to other collection
- createdby in db