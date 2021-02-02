import {server} from "../../../config"
import Link from "next/link"
import {useRouter} from "next/router"
import Meta from "../../../components/Meta"

export default function Article({article}) {
    // const router = useRouter()
    // const {id} = router.query

    return (
     <>
     <Meta title={article.title} description={article.excerpt}/>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
        <Link href="/">Go Back</Link>
     </>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch
    (`${server}/api/articles/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch
    (`${server}/api/articles`)

    const articles = await res.json()

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => ({params: {id: id.toString()}}))
    // Using toString because id needs to be a string to get the Link working

    return {
        paths,
        fallback: false
    }
}

/* export const getStaticProps = async (context) => {
    const res = await fetch
    (`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch
    (`https://jsonplaceholder.typicode.com/posts`)

    const articles = await res.json()

    const ids = articles.map(article => article.id)

    const paths = ids.map(id => ({params: {id: id.toString()}}))
    // Using toString because id needs to be a string to get the Link working

    return {
        paths,
        fallback: false
    }
} */

// Doing it like this will make it faster.
// You need fallback false when doing it like this  