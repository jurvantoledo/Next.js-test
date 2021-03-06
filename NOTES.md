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

can use jsx styling in Next.js but only if u have some kind of conditional styling
EXAMPLE:
const x = 5

<style jsx>
    {`
        .title {
            color: ${x > 3 ? 'red' : 'blue'}
        }
    `}
</style>

## nav components & Link

Dont use <a> tag but use Link from "next/link" same as 'React-router-dom'

Import Nav.js in Layout.js

## Custom Document

    if you dont make a _document.js file, Next.js will automatically take the default _document.js code.

    Can take default _document.js code from Next.js documentation (https://nextjs.org/docs/advanced-features/custom-document) and you can make changes to it in your file.

    IN MOST CASES YOU DONT NEED THIS !

## Data Fetching

Can add functions above or below the component

3 methods to fetch data:

- getStatic props => allows us to fetch it build time
- serverSide props => fetch data on every request (slower)
- getStatic path => dynamically generate paths based on data we're fetching

## getStaticProps

    Example:
    export const getStaticProps = async () => {
    const res = await fetch
     (`https://jsonplaceholder.typicode.com/posts?_limit=6`)
    const articles = await res.json()

    <p>You return an object with props and then data which is passed in as props this case: Articles</p>
     return {
      props: {
       articles
     }

}
}

## Nested Routing

- Create folder for this project it's called article
- create another folder called [id]
- make index file
- if you click on link now and you return some text you will see the text when you click on the link

export const getStaticProps = async (context) => {
const res = await fetch
(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }

}

<p>This is so you can get the ids of the articles so the link will go to the right article</p>

export const getStaticPaths = async () => {
const res = await fetch
(`https://jsonplaceholder.typicode.com/posts`)

    const articles = await res.json()

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => ({params: {id: id.toString}}))

    return {
        paths
    }

}

<p>Using this is needen when you Link to a new article with <strong>getStaticProps</strong> its nice because it loads faster this way. Else use <strong>serverSide props</strong> in the same way as getStaticProps and you can leave <strong>getStaticPaths</strong> out. But it will make the website slower</p>

## Export Static Website

- in package.json add "build": "next build && next export" in the scripts
- use npm run build
- if its alright there is now a folder named "out"
- install serve with "npm -g server"
- then do "serve -s out -p 8000"
- if you now go to http://localhost:8000 u have your super fast website

## API Routes

Look a lot like express server routes

Have a data.js file where we are exporting articles. Import it in your index file in the articles folder in the api folder, and send an handler with a (req, res) with status (200)

import {articles} from "../../../data"

export default function handler(req, res) {
res.status(200).json(articles)
}

<h2>Single article</h2>
To get a single article:
- make a file called [id].js
- filter the articles so you can only find the right id for the right article you are actually saying <strong>IF article.id is equal to id show info of that article</strong>

import {articles} from "../../../data"

export default function handler({query: {id}}, res) {
const filtered = articles.filter(article => article.id === id)

    if(filtered.length > 0) {
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({message: `Article with the id of ${id} is not found`})
    }

}

<p>You can use for the get request this in the handler: {query: {id}} or just use req.query.id and keep it like handler(req, res)</p>

## Using the API data

- Make a config folder
- Make a index file
- add this const dev = process.env.NODE_ENV !== 'production'
- add this export const server = dev ?
  'http://localhost:3000' : 'https://yourwebsite.com'
- make your routes like this (`${server}/api/articles`) because:

  - server is the URL
  - api is the server where you get the right data
  - articles is the name of the folder in the api folder
  - so if we also would have had a posts folder in the api folder it would have looked like this (`${server}/api/posts`)

## Custom meta component

- Make a file called Meta.js and use Head there
- Put it in Layout
- Improt Meta on pages if you want Meta to change on that page. It wont duplicate if you do this
