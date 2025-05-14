import styles from './NotFound.module.css'

export default function NotFound(){
    return (<div className={styles.main}>
        <h1>Page Not Found</h1>
        <div><span>Error 404 -{'>'} </span><span>Try open other page</span></div>
    </div>)
}