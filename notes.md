## Purpose of app
This app will allow teachers to create different lists of flashcards that are shared with specific "student" (nonpublishing) users.


## Team
- [Jordan](https://github.com/jmoldyvan), from Bay area
- [Naomy](https://github.com/ndorvillearnold), Miami
- Tea
- [Daniel Schmidt](https://github.com/SeaFilmz) - python, sql
- [Kate/Katrielle Parnes](https://github.com/Noni-no)
- [Ribbal](https://github.com/r-Dev03)
- [Helen](https://github.com/h-yung)

**Comms**: GitHub and Discord

## Setup

### Models
Notes on schemas, some details proposed/tbc

**User**
- _id, system generated
- userName, required
- email, required
- password, required
- lastActiveDate, system generated
- profileImg, required (eventually default will be system generated)
- group (_proposed_), required
- passcode* (_proposed_), if teacher role
- lists* (_array of collection names_)

*these keys will only be non-null or populated for a Teacher/Editor user role. The passcode for the system would be provided on invitation to the teacher/individual, outside of the app itself.


The proposed _group_ field anticipates group usage that distinguishes between different schools/learning groups that should not share lists.


The _lists_ array entries are user-provided. TBC whether to set up by collection name or as an array of subarray consisting of [collectionNameInDB, userProvidedListName].
- collectionNameInDB can be system generated to avoid users running afoul of db collection naming restrictions (including uniqueness)
- userProvidedListName may need a system-generated default (or equiv to collectionNameInDB) until user edits it. Will still need validation to prevent repeated names, spacing/errors, and empty strings.


**Cards**
- _id, system generated, used for routing/url as well
- front, required
- back, required
- group (_tbd - possibly sufficient to link with userID_)
- userId (of creator), required
- isReversed, default=false, system generated
- isPublished, default=false, system generated
- collectionName (need this for creation; later, possibly sufficient to specify collectionName on retrieval of all docs in the list)

### Make a default user account
Create a user account in the database with the following:

- userName: default
- email: default@gmail.com
- password: default123
- group: Firstgroup
- profileImg: **be sure to upload an image - this is required for now. This image will also be initially assigned to users who do not upload an image, so this account is not solely for development/testing.**
passcode: **123default321**

The passcode identifies the user as someone with access to the "teacher/editor" dashboard view.

For testing, also consider creating a non-teacher user account.


## Issues
1. A teaching user will be redirected to teacher dashboard view on login.
  
     1a. Create UI on signup view to capture a passcode.
  
     1b. Create validation for passcode match on signup.
  
     1c. Adapt current/existing 'todo' view to teacher dashboard view.
  
     1d. Top bar should greet user by name, include minified avatar/image, and tell them it is the dashboard.
2. A student user will be redirected to student dashboard view on login.
  
    2a. Uses the passcode UI and validation logic from previous issue.
    
    2b. Create student dashboard view with no create/update/delete card functionality.
  
    2c. Top bar should greet user by name, include minified avatar/image, and tell them it is the dashboard.
3. **UI placeholders and layout only:** The teacher dashboard should show create, update, and delete options for cards.
  
    3a. Create UI placeholders for update functionality. Organize the C/U/D functionality in one specific section on the page.

4. **NEEDS CLARIFICATION** Teacher dashboard: Create an option to choose whether creating new list or adding cards to existing list.
  
    4a. UI placeholder, above card-editing options. Toggle button?
    
    4b. Should capture within the same form as card POST reqs.
  
    4c. Functionality should show the user either input for new list name, or select existing list from a dropdown that shows all existing list names.
    - allowing user to name lists (not just have an auto-generated collection name) becomes even more important if we build it out this way
    - consider what UI actually makes the most sense here
5. **NEEDS CLARIFICATION** Teacher dashboard: Build out the functionality to update cards for:
- whether Published (a boolean that lets them appear for student users of the same school/group)
- updating the flashcards
- open question: should individual cards be unpublished or should initial dashboard prioritize a list-wide "isPublished" update 

6. Student dashboard: show lists of cards available to them to study
  
    6a. Build the UI to show the list, based on Group (exact logic tbd) and _isPublished_ status for the cards.
7. Create the single-flashcard view
   
   7a. should include proper routing using dynamic routes that include card id (e.g., `/student-dash/cards/{CARD_ID}`)
   
   7b. Build UI placeholders so user can navigate to Next Card, Previous Card, Back to Dashboard
  - open question: should teacher's edit view be similar to final output (so they can see how students would experience the card), or have a different design?
8. Single flashcard view: Build functionality for user to go to next or previous card, or back to Dashboard (list of card lists, etc)


## Stretch goals/optimizations?
- If a teaching individual did not have a passcode to submit on signup but later needs access added, build a way for this to be remedied.
  - create UI in the "student" dashboard view that lets them enter a passcode at any time, if they have one, to change their view.
- Anything useful from showing the dates of creation and update for the cards (in single flashcard view or edit view, for teacher/editor user roles)?

- Create a way for users to edit their profile image after signup.
  - create UI in all dashboard views that lets them submit PUT/update request for this User field.

## Discussion
- Decide on approach: A teacher currently sees only the lists and cards they created on that account. Should they be able to see other teachers' lists, provided they are all in the same group?
- Data organization: Should there be a log of all the existing groups in the database in some way?


## Current approach
- Image handling currently managed with `express-fileupload` middleware, although there may be benefits to switching to a combination of multer + Cloudinary.
- Be aware of ejs comment syntax: <%#comments %>. Your IDE may continue to use "<\!-- -->\" if you use shortcut keys and result in errors when the server tries to render the page.



# Old notes

## Misc.
Sign in/signout flow
Sign up flow
Creating a todo item that also passes user id
What models are relevant when overall

In Login page
Entering data
validated
submit => GET req

routes/main.js has the login, logout, and signup routes as well.



## Optimizations
- customized greeting
- show number of times logged in
- checklist - selectively styled and show count of done - % done
- edit, add, delete for each item
- add pics - enable pic upload - img
- date submitted
- date completed
- filter for tasks (dates)
- movies instead of 

## Learnings

 [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
(in auth.js controller)
cannot call both res.send() and res.redirect()

