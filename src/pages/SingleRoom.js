import React, { Component } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
constructor(props){
    super(props)
    //console.log(this.props)// props are being passed through react-router, how?? time 2:33::00
    this.state= {
        slug:this.props.match.params.slug,
        defaultBcg
    }

}

static contextType = RoomContext;

    render() {
        const {getRoom} = this.context
        const room = getRoom(this.state.slug)
        console.log("singleroom",room)

        if(!room){
            return <div className="error">
                <h3>no such room could be found..</h3>
                <Link to="/rooms" className="btn-primary">
                    Back to rooms
                </Link>
            </div>
        }

        const {name,description,capacity,size,price,extras,breakfast,pets,images} = room
        //console.log(images[0])

        const [mainImg,...defualtImg]= images
        return (
            <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                
                {/* <Hero hero='roomsHero'> */}
                <Banner title= {`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                    </Link>
                </Banner>
            {/* </Hero> */}
            </StyledHero>

            <section className='single-room'>
                <div className="single-room-images">
                    {defualtImg.map((item,index) => {
                       return <img key={index} src={item} alt={name}/>
                    })}
                </div>

                <div className='single-room-info'>
                    <article className='desc'>
                        <h3>details</h3>
                        <p>{description}</p>

                    </article>

                    <article className="info">
                        <h3>info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: {size}sqft</h6>
                        
                        <h6>
                            max capacity: {
                                capacity > 1 ? `${capacity} people`
                                : `${capacity} person`
                            }
                        
                        </h6>
                        
                        <h6>
                            {pets ? "pets allowed" : "no pets allowed"}
                        </h6>
                        
                        <h6>
                            {breakfast && "free breakfast included"}
                        </h6>
                    </article>
                </div>
            </section>

            <section className='room-extras'>
                <h6>extras</h6>
                <ul className='extras'>
                    {extras.map((item,index) => {
                        return <li key={index}>{item}</li>
                    })}
                </ul>
            </section>
            </>
            
        )
    }
}
