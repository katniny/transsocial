# 👋 Welcome to the TransSocial contributing guide!
This is a temporary contributing guide, as TransSocial is being rewritten (available [here](https://github.com/katniny/transsocial/tree/rewritten)), but for the current codebase in the main tree, this is the current contributing guide.

## 📃 Rules
- Please do not use political ideology
   - We try to accept all PRs regardless of race, gender, sexual orientation, etc., so please do not open a PR adding things such as racist language, language to bring down a group or individual, or anything that would be deemed as rude, targeted, or other such things as it'll be seen as a troll and closed, as we avoid using such language.
- Please be professional
   - You don't have to be corporate level of professional, but please do not use overly NSFW wording, the occasional "shit" or "piss", low level swearing (e.g. "this shit is pissing me off"), is fine, but please do not be like, "FUCK, this REALLY FUCKING PISSED me OFF. WHO THE FUCK WROTE THIS?".
- Please be respectful
   - No one is paid to work on TransSocial and contributors use their own *free time* to review your issues and pull requests, they are not paid an hourly wage to do so.
- Follow our code indentation
   - While we don't have a specific one like Prettier and our current code base is pretty mixed on spacing on whatnot, we generally use an indentation that is equivalent to 3 spaces.
   An example of this is:

   ```js 
   function test() {
      console.log("This is a test");
   }
   ```

   As previously mentioned, this is pretty mixed in the current codebase so please try to stick with the general indentation of that file. However, this will be required when the rewrite is merged with the main branch, as we will strictly be merging and coding with 3 spaces-equivalent indentation.

- No AI code or speech.
   - While AI is okay to use as an assistant to help guide you if you are truly stuck on a problem, please do not use it to create your speech or entire code blocks.

## 👩‍💻 Recommendations
These are just recommendations, but they will help aid you while contributing to TransSocial.
- HTML/CSS/JavaScript experience (Node experience is also recommended)
   - Moderate experience in JavaScript at minimum, as we rely heavily on JavaScript, but this also depends on *what* you're contributing.
- Experience with Firebase tools (any version before 9, but version 9+ should be okay as well but please note we use 8.6.8, so it is slightly different from versions 9 and up)
   - This is less necessary, as Firebase has documentation at https://firebase.google.com/docs/. We use authentication, realtime database, storage, and functions, just as a reference point.

## ✨ Required
We only have **one** requirement for contributing to TransSocial (dependencies), as we build most things ourselves.
- NodeJS

## 🛠 Setup
Firstly, you need TransSocial itself, of course. We recommend using Git, as this can be used to easily send PRs and keep up to date with the codebase.

Use `git clone https://github.com/katniny/transsocial` and it will begin cloning TransSocial. TransSocial is around ~65MB in size, so it won't take long.

Once it finishes, run `cd transsocial` to navigate into the directory.

Run `npm install` to install everything we need from NPM, mainly server-side.

This does not get installed automatically, so run `npm install -g firebase-tools` if you do not have the Firebase CLI installed already and run `firebase login`, then login with your Google account which should have a Firebase project with the Blaze plan (more information below).

In the Firebase console under Project Settings, get your Firebase Configuration and navigate to assets/js/ts_fas_acih.js and replace the firebaseConfig values with your own values. Such as:

```js
const firebaseConfig = {
   apiKey: "A09IsIKGAsf5456",
   authDomain: "example.firebaseapp.com",
   databaseURL: "https://example-default-rtdb.firebaseio.com",
   projectId: "example",
   storageBucket: "example.appspot.com",
   messagingSenderId: "92848195831",
   appId: "1:39438539285329:web:948di3958454",
   measurementId: "G-34823IDU34"
};
```
> [!NOTE]
> This is not an actual Firebase configuration, do not try it

Now, in your terminal, CD into the directory if you aren't already and run `firebase emulators:start`. This will start hosting, RTDB, functions, etc.

Please note that TransSocial **requires** that your project has the Blaze plan, as we rely on functionality from Firebase that requires the plan.

You, alone, should not reach the free-to-use limits of the Blaze plan as it takes multiple people and active usage to do so, and using `firebase emulators:start` *runs* all the functionality for you, so it does not count against you (e.g. billing for how much a function has been used).

## ❓ Why do I need the Firebase Blaze plan?
We use Firebase Functions and Storage. To access functions at all, it is required that you have the Blaze plan, the same thing with storage now.

Unfortunately, this is not a decision on our part, but a decision on Firebase's.

## 📝 Please note
TransSocial is being rewritten *for a reason*. The current codebase is not fun to work with, and if you have a element (e.g. our sidebar) that you need on every page, you manually have to add that to every page.

The current codebase has *every* line of JavaScript in one file (well, pretty much every line), all the CSS in one file (again, pretty much all the CSS), and it's overall messy, has a messy indentation scheme, etc. 

Our rewrite will handle this automatically via a JavaScript file, so all you have to do is add it to our ScriptLoader, and it'll load the file for you, including additional functionality, styling you may do with JavaScript, etc. A good example of this being, again, [our sidebar](https://github.com/katniny/transsocial/blob/rewrite/assets/js/sidebar.js). We also seperate our files. We import one CSS file per page from `all.css`, so it acts as one, but it's much cleaner than just one.

If you're looking to contribute to the rewrite tree, please note that we do not have a contributing guide for it yet, as it is too unstable for one and it'll end up likely being outdated very quickly, but I do appreciate any and all help!