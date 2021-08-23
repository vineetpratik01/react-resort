
import React, { Component } from "react";
import Title from "./Title";
import { RoomContext } from "../Context";
import Room from "./Room";
import Loading from "./Loading";
export default class FeaturedRooms extends Component {
  static contextType = RoomContext;

  render() {
    let { loading, featuredRooms: rooms } = this.context;

    //console.log("featured rooms",rooms)
    rooms = rooms.map(room => {
     //console.log("inside map",room.id,room)
       return (
          <Room key={room.id} room={room} />
        )
    });
    
    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        
        <div className="featured-rooms-center">
          {loading ? <Loading /> : rooms}
        </div>
      
      </section>
    );
  }
}