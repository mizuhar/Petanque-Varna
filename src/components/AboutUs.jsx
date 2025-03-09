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
                <img  src={"public/img/8.JPG"} alt="pic1" />
                <img  src={"public/img/2.JPG"}alt="pic2" />
                <img  src={"public/img/3.JPG"} alt="pic3" />
                <img  src={"public/img/4.JPG"}alt="pic3" />
                <img  src={"public/img/6.JPG"} alt="pic3" />
                <img  src={"public/img/7.JPG"} alt="pic3" />
                <img  src={"public/img/1.JPG"} alt="pic3" />
            </ul>
        </section>
        </div>
    )
}