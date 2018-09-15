YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "adapter-application",
        "app.js",
        "authenticator-oslr",
        "authorizers-devise",
        "component-availability-invites",
        "component-email-account",
        "component-home-teaching-requests",
        "component-messages-list",
        "component-page-footer",
        "component-select-duration",
        "component-select-maxstudents",
        "component-select-private",
        "component-show-message",
        "controller-app.main.alerts.index",
        "controller-app.main.availabilities.index",
        "controller-app.main.availabilities.new",
        "controller-app.main.availabilities.new.preview",
        "controller-app.main.availabilities.show.edit",
        "controller-app.main.availabilities.show.index",
        "controller-app.main.availabilities.show.messages",
        "controller-app.main.availabilities.show.users",
        "controller-app.main.availability-requests-new",
        "controller-app.main.availability-requests.index",
        "controller-app.main.availability-requests.show",
        "controller-app.main.feedbacks.index",
        "controller-app.main.home.learn",
        "controller-app.main.home.log",
        "controller-app.main.home.more",
        "controller-app.main.home.teach",
        "controller-app.main.users.account",
        "controller-app.main.users.edit",
        "controller-app.main.users.index",
        "controller-auth.login",
        "controller-auth.registration",
        "initializers-globals",
        "initializers-simple-auth-setup",
        "model-alert",
        "model-alertable",
        "model-availability",
        "model-availability-request",
        "model-availability-request-vote",
        "model-availability-user",
        "model-conversation",
        "model-conversation-user",
        "model-job-title",
        "model-location",
        "model-message",
        "model-user",
        "model-user-location",
        "route app.main.availabilities.show.feedback",
        "route app.main.feedbacks.show",
        "route feedback-requests/show",
        "route-app.main.about",
        "route-app.main.alerts.index",
        "route-app.main.availabilities.index",
        "route-app.main.availabilities.new",
        "route-app.main.availabilities.new.from-request",
        "route-app.main.availabilities.new.preview",
        "route-app.main.availabilities.new.what",
        "route-app.main.availabilities.new.when",
        "route-app.main.availabilities.new.who",
        "route-app.main.availabilities.show.edit",
        "route-app.main.availabilities.show.index",
        "route-app.main.availabilities.show.messages",
        "route-app.main.availabilities.show.users",
        "route-app.main.availability-requests-new",
        "route-app.main.availability-requests.index",
        "route-app.main.availability-requests.show",
        "route-app.main.conversation.edit",
        "route-app.main.conversation.show",
        "route-app.main.conversations.index",
        "route-app.main.conversations.new",
        "route-app.main.feedbacks.index",
        "route-app.main.help",
        "route-app.main.home",
        "route-app.main.home.learn",
        "route-app.main.home.log",
        "route-app.main.home.more",
        "route-app.main.home.teach",
        "route-app.main.users.account",
        "route-app.main.users.edit",
        "route-app.main.users.index",
        "route-application",
        "route-auth",
        "route-auth.login",
        "route-index",
        "serializer-application"
    ],
    "modules": [
        "Alerts",
        "AppCore",
        "Availabilities",
        "AvailabilitiesSignUp",
        "AvailabilityRequests",
        "Directory",
        "Feedbacks",
        "Help",
        "Home",
        "Messages",
        "Unclassified",
        "Users"
    ],
    "allModules": [
        {
            "displayName": "Alerts",
            "name": "Alerts",
            "description": "The Alerts module handles browsing, viewing and responding to received alerts."
        },
        {
            "displayName": "AppCore",
            "name": "AppCore",
            "description": "The AppCore module describes fundamental files without which the app wouldn't work at all."
        },
        {
            "displayName": "Availabilities",
            "name": "Availabilities",
            "description": "The Availabilities module is the core module for creating and editing availabilities.\nIt includes setting times and descriptions.\n\nIt does not include signing up/inviting people, resources, feedback etc. which are covered in other modules."
        },
        {
            "displayName": "AvailabilitiesSignUp",
            "name": "AvailabilitiesSignUp",
            "description": "AvailabilitySignUp module\n\nThis model handles linking of users to teaching sessions. It includes:\n* Signing up\n* Inviting users\n* Accepting or declining invites\n* Administrator priviledges for a given teaching session\n* Who is a teacher and who is a student"
        },
        {
            "displayName": "AvailabilityRequests",
            "name": "AvailabilityRequests",
            "description": "This module handles teaching requests.\n\nFunctions:\n* A user can post a teaching request\n* Other users can up-vote that request\n* Teachers can respond to a request by creating a teaching session"
        },
        {
            "displayName": "Directory",
            "name": "Directory",
            "description": "Users Index controller\nAllows searching and browsing of users\nShould be able to search and filter users"
        },
        {
            "displayName": "Feedbacks",
            "name": "Feedbacks",
            "description": "Complete a feedback request\n\nThis route is NOT a sub-route of app.main because an unauthenticated user could access this to complete a request. Layout is different if someone is logged in.\n\nIf the request is completed it will still render the submitted feedback."
        },
        {
            "displayName": "Help",
            "name": "Help",
            "description": "Help page. Displays option for about, FAQ, walkthrough"
        },
        {
            "displayName": "Home",
            "name": "Home",
            "description": "Landing page for the app. Redirect to the teach page."
        },
        {
            "displayName": "Messages",
            "name": "Messages",
            "description": "Messages module\n\nHandles user to user messaging. Essentially a WhatsApp clone.\n\nThe same components are used to send messages within the show availability page - Conversations can be tagged with an availability."
        },
        {
            "displayName": "Unclassified",
            "name": "Unclassified",
            "description": "LEGACY - view for proposed sessions"
        },
        {
            "displayName": "Users",
            "name": "Users",
            "description": "List an email account on the account page with appropriate actions for editing"
        }
    ],
    "elements": []
} };
});