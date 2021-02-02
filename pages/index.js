import Head from 'next/head'
import ArticleList from "../components/ArticleList"

export default function Home({articles}) {
  return (
    <div>
      <Head>
        <title>WebDev Newz</title>
        <meta 
        name="keywords" 
        content="webdevelopment, programming" 
        />
      </Head>

      <ArticleList articles={articles}/>
    </div>
  )
}

// Pass in a prop of articles in <ArticleList /> component 
// so it is:<ArticleList articles={articles}/>


export const getStaticProps = async () => {
  const res = await fetch
  (`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json()

  return {
    props: {
      articles
    }
  }
}