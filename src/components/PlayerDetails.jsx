import { useContext } from "react"
import { useEffect, useState, useReducer } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import useForm from "../hooks/useForm"

import * as playersService from "../services/playersService"
import * as commentService from "../services/commentService"
import AuthContext from "./context/AuthContext"
import reducer from "../lib/reducer"
import styles from './Header.module.css'

export default function PlayerDetails(){
      
     const navigate = useNavigate()
     const { id } = useParams()
     const { userId, username } = useContext(AuthContext)
     const [comments, dispatch] = useReducer(reducer, [])
     const [ player,setPlayer ] = useState({})

useEffect(()=>{

   playersService.getOne(id)
   .then(setPlayer)
   
   commentService.getAll(id)
   .then((result)=> {

        dispatch({
            type: 'GET_ALL_COMMENTS',
            payload: result
        })
   })

},[id])

const addCommentHandler = async (values)=>{

    const newComment = await commentService.create(
        id,
        values['comment'],

    )
    newComment.owner =  { username }

    dispatch({
        type: 'ADD_COMMENT',
        payload:  newComment 
    });
}

const {values, onChange, onSubmit, onReset} = useForm(addCommentHandler, {comment: ""})


const removeHandler = async () =>{


    const hasConfirm = confirm(`${username}, are you sure you want to remove: ${player.title}?`)

    if(hasConfirm){
        await playersService.remove(id)
     

        navigate('/players')
    }


   
    
}


    return (
        <>
        <br />
        <br />
        <br />
        <br />
        <h1>{player.title}</h1>
        <br />
        <br />
        <img style={{width:"350px",borderRadius:"20px",marginLeft:"-1em"}} src={player.img} alt="pic1" />
        <br />
        <br />
        <br />
        <p style={{fontSize:"33px",fontWeight:'bold',color:'wheat'}}>{player.description}</p>
        <br />
        <br />
       
        <div className="details-comments">
                    <h2 >Comments:</h2>
                    <br />
                    <ul>
                        
                        {comments.map(({_id, text, owner:  { username } }) => (
                            <span key={_id} className="comment" style={{fontSize:'18px',color:'white'}}>
                                <p>{ username }: { text } </p>
                            </span>
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>
                <br />
                <br />
                <br />
                
               
        {player._ownerId === userId && 
        <div style={{marginLeft:'-5em'}}>
            <Link to={`/players/edit/${id}`} className={styles.buttons} >Edit</Link>
            <Link  className={styles.buttons} onClick={removeHandler}>Delete</Link>
        </div>
        }
         <br />
         <br />
         <br />
         <article className="create-comment">
                <label style={{fontSize:'22px'}}>Add new comment:</label>
                <form className="form" onSubmit={onSubmit}>
                    <textarea 
                    name="comment"
                    placeholder="Comment......"
                    onChange={onChange}
                    value={values['comment']}>
                     </textarea>
                    <input className="btn submit" type="submit" value="Add Comment"/>
                </form>
            </article>
        </>
    )
}