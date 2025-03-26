import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export default function PlayersItem({
    title,
    img,
    _id

}){




    return (
        <section style={{display:"inline-block",margin:"10px"}}>
            <br />
            <br />
        <h1 style={{marginLeft:"2em"}}>{title}</h1>
   
       
       
        <img style={{width:"200px",height:"250px",borderRadius:"10px",marginLeft:"2em"}} src={img} alt="pic1" />
        <br />
        <br />
        <div style={{marginLeft:'2.1em'}}>

        <Link className={styles.buttons} to={`/players/${_id}`}>Details</Link>
        </div>
        </section>
    )
}