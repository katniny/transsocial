<img src="https://transs.social/assets/imgs/All_transparent.png" />
🌎 <a href="https://transs.social/" target="_blank">TransSocial</a> is an open source social media platform built from the ground up with Firebase! 🚀

--- 

## 🚀 Features
- Privacy-Focused\
TransSocial is 100% privacy focused! TransSocial does not track you across the web, force an algorithm on you, just pure TransSocial.
- Experiments\
Try TransSocial features before they're fully released! Go to your Settings > Personalization then "Experiments"!
- Themes\
Try multiple themes! Such as the classic Dark and Light modes, but also Midnight Purple, Mint, and more! You can even create your own themes! 🎨
### and much more to come!

<br />

## How to Install/Use
This needs to be rewritten as we've upgraded and changed our hosting provider to Firebase Hosting. Please bear with me.
But until I decide to do that, please note:
- To contribute to server-side code, you need a Firebase project with the Blaze Plan as Firebase Functions are unavailable otherwise. Otherwise, a Spark Plan project should suffice (but I haven't tested, please let me know if I'm wrong).
- You need the Firebase CLI installed and connected to a project. You can install it with `npm i -g firebase-tools` (please don't replace our firebase.json, we use it to host!)
- To test locally, run `firebase emulators:start`. The Firebase Functions will start as well testing hosting. This will ensure things run as you would see on our site. If you don't do this and attempt to visit a page (e.g. /u/katniny) and it doesn't work, don't complain about it to me. If you do that and it doesn't work, then I'll help. 
   - NOTE: When making changes to the client, you must MANUALLY refresh the page for your changes to take effect (if your changes don't take effect, refresh without cache (Ctrl + Shift + R))! When changing hosting settings or server-side code, you may sometimes need to Ctrl + C out and run `firebase emulators:start` again.
   - `firebase serve` might work too, I have not tested it though.

<br />

## License

Copyright (c) 2025 katniny and contributors. All rights reserved.

Transsocial is licensed under CC BY-NC-SA 4.0: <https://creativecommons.org/licenses/by-nc-sa/4.0/>\
The license is also available in the [LICENSE](/LICENSE) file in the root of this repository.

A full list of contributors can be found at <https://transs.social/contributors>

The above copyright notice covers all contents of this repository barring the following exceptions:
- assets/emojis:\
  Twemoji <https://github.com/twitter/twemoji>\
  Copyright 2019 Twitter, Inc and other contributors\
  Licensed under CC-BY 4.0: <https://creativecommons.org/licenses/by/4.0/>

Further copyright related information can be found at <https://transs.social/opensource>

## Thank you to everyone that's contributed to TransSocial!
