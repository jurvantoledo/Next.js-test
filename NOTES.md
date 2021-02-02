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
