## Pages & Routing

- Making new pages is really simple, just make a new file and put it in the page folder. New file now routes to name you gave it.

EXAMPLE: about.js navigates to => http://localhost:3000/about

## Head

Head is used for:

- custom titles
- meta tags
- keywords
- descriptions
  etc.

## Layout & CSS Modules

\_app.js:

- wraps around all page components on website
- can add layout if we want to \_app.js
- importing global styles in \_app.js

adding styles to page with: className={styles.container(whatever class you wanna use)}

Layout now wrapped around Component in \_app.js Everything you now add in layout will show on all pages