import React, { Component } from 'react'
import Title from './Title'
import { FaCocktail,FaHiking,FaShuttleVan,FaBeer } from 'react-icons/fa'

export default class Services extends Component {

    state = {
        services: [
            {
                icon:<FaCocktail/>,
                title:"Free Cocktails",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor vehicula eros non lobortis. Quisque pharetra pretium quam. "
            },
            {
                icon:<FaHiking/>,
                title:"Endless Hiking",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor vehicula eros non lobortis. Quisque pharetra pretium quam. "
            },
            {
                icon:<FaShuttleVan/>,
                title:"Free Shuttle",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor vehicula eros non lobortis. Quisque pharetra pretium quam. "
            },
            {
                icon:<FaBeer/>,
                title:"Free beers",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor vehicula eros non lobortis. Quisque pharetra pretium quam. "
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services"></Title>
                <div className="services-center">
                    {this.state.services.map( (item,index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>

                        </article>
                    })} 
                </div>
                
            </section>
        )
    }
}
