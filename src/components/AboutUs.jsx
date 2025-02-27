export default function AboutUs(){



    return(
        <>
        <br />
        <br />
        <br />
        <h1 style={{textAlign:"center"}}>About Us</h1>
        <br />
        <br />
        <br />
        <p style={{fontSize:"25px"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
       Libero reiciendis eaque repellat incidunt vitae minus recusandae laudantium, 
       voluptas quasi itaque sint impedit harum ducimus esse cupiditate 
       pariatur consequatur enim sapiente.
        

        </p>
        <br />
        <br />
            <h1 style={{fontSize:"43px",color:'orange',marginBottom:"2em",marginLeft:"-0.5em",fontFamily:"cursive",width:"200%"}}>We are champions from petanque club Varna!</h1>
        <section style={{textAlign:"center",display:"flex"}}>
            <ul>
                <img style={{width:"300px",height:"300px", margin:"5px",borderRadius:"10%"}}  src={"public/img/8.JPG"} alt="pic1" />
                <img style={{width:"300px",height:"300px", margin:"5px",borderRadius:"10%"}}  src={"public/img/2.JPG" }alt="pic2" />
                <img style={{width:"300px",height:"300px", margin:"5px",borderRadius:"10%"}} src={"public/img/3.JPG"} alt="pic3" />
                <img style={{width:"300px",height:"300px", margin:"5px",borderRadius:"10%"}} src={"public/img/4.JPG" }alt="pic3" />
                <img style={{width:"300px",height:"300px", margin:"5px",borderRadius:"10%"}} src={"public/img/6.JPG"} alt="pic3" />
                <img style={{width:"300px",height:"300px", margin:"5px",borderRadius:"10%"}} src={"public/img/7.JPG"} alt="pic3" />
                <img style={{width:"350px",height:"300px", margin:"5px",borderRadius:"10%"}} src={"public/img/1.JPG"} alt="pic3" />
            </ul>
        </section>
        </>
    )
}