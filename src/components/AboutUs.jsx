import  styles from './AboutUs.module.css'

export default function AboutUs(){



    return(
        <div>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:"center"}}>About Us</h1>
        <br />
        <br />
        <br />
        <p >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
       Libero reiciendis eaque repellat incidunt vitae minus recusandae laudantium, 
       voluptas quasi itaque sint impedit harum ducimus esse cupiditate 
       pariatur consequatur enim sapiente.
        

        </p>
        <br />
        <br />
            <h1 style={{fontSize:"43px",color:'orange',marginBottom:"2em",marginLeft:"-0.5em",fontFamily:"cursive",width:"200%"}}>We are champions from petanque club Varna!</h1>
        <section style={{textAlign:"center",display:"flex"}}>
            <ul >
                <img  src="/img/8.jpg" alt="pic1" />
                <img  src="/img/2.jpg" alt="pic2" />
                <img  src="/img/3.jpg" alt="pic3" />
                <img  src="/img/4.jpg" alt="pic3" />
                <img  src="/img/6.jpg" alt="pic3" />
                <img  src="/img/7.jpg" alt="pic3" />
                <img  src="/img/1.jpg" alt="pic3" />
            </ul>
        </section>
        </div>
    )
}