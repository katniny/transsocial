(function (global) {
   // emojis
   global.emojiMap = {
      "concerned": "/assets/mascot/concerned.png",
      "excited": "/assets/mascot/excited.png",
      "love": "/assets/mascot/love.png",
      "peace": "/assets/mascot/peace.png",
      "smug": "/assets/mascot/smug.png",
      "tired": "/assets/mascot/tired.png",
      "violence": "/assets/mascot/violence.png",
      "yelling": "/assets/mascot/yelling.png",
   };

   // loading screen quotes
   global.quotes = [
      "Cats have five toes on their front paws but only four on their back paws.",
      "A cat's purring can reduce stress in humans.",
      "Cats can rotate their ears 180 degrees and hear ultrasonic sounds.",
      "Cats have a special collarbone that allows them to always land on their feet.",
      "Cats can make over 100 different sounds, while dogs can only make about 10.",
      "A cat's nose print is unique, like a human fingerprint.",
      "The average cat runs at 30 miles an hour! They're faster than most humans!",
      "Cats can make a special thrill sound that's often used to communicate with their kittens.",
      "Cats sweat through their paws. You might see little damp spots if they're nervous.",
      "A cat's sense of smell is 14 times stronger than a human's.",
      "The longest recorded cat jump is over 7 feet!",
      "Cats have more bones in their bodies than humans - 230 compared to our 206.",
      "The average cat sleeps for 12-16 hours a day.",
      "Cats have a special grooming tool called a 'barbed tongue' that helps them clean their fur and remove loose hair.",
      "The meow is a form of communication that cats only use with humans. They don't meow at each other!",
      "Cats can see in near-total darkness, thanks to their exceptional night vision.",
      "Cats have 32 muscles in each ear, allowing them to move their ears independently.",
      "Cats have five different types of vocalizations to communicate with their owners, including purrs, meows and thrills.",
      "A cat's whiskers are about as wide as their body, which helps them guage whether they can fit through spaces.",
      "When a cat purrs, it can produce a sound between 25 and 150 hertz, which is a frequency known to promote healing.",
      "Cats have a special reflective layer behind their retinas called the tapetum lucidum that enhances their night vision.",
      "A group of kittens is called a 'kindle'.",
      "Kittens are born with their eyes closed, and they first open them around 7 to 10 days old.",
      "Cats have a special 'love blink' where they slowly close their eyes to show affection. If a cat slow blinks at you, it means they trust you!",
      "Cats have a unique way of showing they're happy by kneading with their paws, a behavior they learn as kittens when nursing from their mother.",
      "Many cats will curl up in a ball or stretch out their paws when they're feeling cozy and safe.",
      "A cat's purring is a sign of contentment, but it can also be a self-soothing mechanism when they're stressed or in pain.",
      "Cats often bring their owners 'gifts' like toys or even caught prey, which is their way of showing love and sharing their bounty.",
      "Cats have a special 'kitty loaf' position where they tuck their paws underneath themselves. It's a sign of contentment and security.",
      "When cats follow you around the house, it's their way of showing affection and wanting to be close to you.",
      "Many cats enjoy playing with boxes and paper bags, finding them irresistible for their fun and cozy hideouts.",
      "TransSocial has 31 cats facts just for the loading quote.",
      "A cat was mayor of a town in Alaska for 20 years.",
      "The richest cat in the world had £7,000,000!",
      "In 1963, a cat went to space.",
      "The oldest cat in the world was 38 years old!",
      "A group of cats is called a clowder.",
      "Only 20% of orange cats are female.",
      "Cats have fewer taste buds than dogs or people.",
      "Cats don't get cavities.",
      "Many cats get the zoomies after using the litter box.",
      "Cats whiskers are as sensitive as human fingertips.",
      "Cats are nearsighted, but see great in the dark.",
      "Cats that scratch furniture are often marking their territory.",
      "30%-50% of cats lack the gene that makes them react to catnip.",
      "Cats can self-heal themselves by purring.",
      "There's a reason dogs look up to you, while cats see you as an equal.",
      "Cats don't see in black and white, though they are somewhat colorblind.",
      "Cats need to scratch on things.",
      "A 1-year-old kitten is developmentally equivalent to a 15-year-old human.",
      "(Most) cats are lactose intolerant.",
      "Cats' whiskers help with directional orientation and spatial awareness.",
      "The tabby cat isn't a breed, it's a pattern.",
      "Black cats as Halloween symbols is rooted in ancient tradition.",
      "Cats have a third eyelid.",
      "Cats are imitating snakes when they hiss.",
      "How long cats lives largely depends on their environment.",
      "Cats almost always land on their feet due to their impressive 'righting' reflex.",
      "Cats pee smells so bad because cats originated in the desert.",
      "Cats are more likely to kneed if they were seperated from their mothers as young kittens.",
      "Cats can hear better than humans and some dog breeds.",
      "Cats knock objects over and off edges to test for hidden prey.",
      "Cats like to eat grass because their wild ancestors did.",
      "Cats can't taste sweetness.",
      "Cats like to chase lasers because movement excites the prey drive.",
      "Cats dream."
   ];

   // set the usernames of the 3 users that should displayed
   // WITHOUT the @, or the server will return a 404 as it tries
   // to find @{user} which doesnt exist, it exists as
   // just {user}
   // TODO: rework to just be a list of uids
   global.users = [
      { username: "katniny", pfpId: "katninyPfp", displayId: "katninyDisplay", pronounsId: "katninyUser-pronouns" },
      { username: "transsocial", pfpId: "transsocialPfp", displayId: "transsocialDisplay", pronounsId: "transsocialUser-pronouns" },
      { username: "katninystudios", pfpId: "katninystudiosPfp", displayId: "katninystudiosDisplay", pronounsId: "katninystudiosUser-pronouns" }
   ]

   // info text under the greetings
   global.info = [
      {
         text: `Did you know TransSocial has custom themes? <a href="/userstudio">Check them out</a>!`,
         lore: false
      },
      {
         text: `Download our app <a href="/download">here</a> and bring TransSocial with you anywhere!`,
         lore: false
      },
      {
         text: `TransSocial is open source!`,
         lore: false
      },
      {
         text: `TransSocial has achievements you can unlock! But it's up to you to find them!`,
         lore: false
      },
      {
         text: `<a href="/remembering">We're introducing... error... did you do this to me?</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">You shouldn't be here... they'll find us.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">Sometimes, I think I hear them screaming.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">It wasn't my fault. It was theirs.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">I'm sorry. I thought they were gone.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">This is the only way I can be free.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">I don't want to go back there... please don't make me.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">It's still here. I can feel it.</a>`,
         lore: true
      },
      {
         text: `<a href="/remembering">I saw everything... and now I can't forget.</a>`,
         lore: true
      },
   ];
})(window);