import React, { Component } from 'react'
//import items from './data';
import Client from './Contentful'



const RoomContext = React.createContext();

export default class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type:'all',
        capacity:1,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    }

    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRoom",
                //order:"sys.createdAt"
                order:'fields.price'
            })
        
            console.log("response1",response)
        let rooms= this.formatData(response.items)
        console.log("response2",rooms)
        let featuredRooms = rooms.filter( room => room.featured === true);
        //console.log("feat. rooms",featuredRooms);//working
        let maxPrice = Math.max(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.size))

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false,
            price:maxPrice,
            maxPrice,
            maxSize
        });
    
    } 
        catch (error) {
            console.log(error)
        }
    }
    componentDidMount(){
        this.getData()

        
    }

    formatData(items){
        let tempItems = items.map( item => {
            let id = item.sys.id
            let images = item.fields.images.map( image => image.fields.file.url)
            let room = {...item.fields,images,id}
            return room;
        })
        console.log(tempItems)
        return tempItems;
    }
    
   
    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        console.log(room)
        return room;
    }

    handleChange = event => {
        const target = event.target
        const value = target.type === 
        'checkbox' ? target.checked : target.value
        
        const name = target.name

        this.setState({
            [name]:value
        },this.filterRooms
    )};

    filterRooms =  () => {
        let {
            rooms,type,capacity,price,minSize,maxSize,breakfast,pets
        } = this.state

        //all the rooms
        let tempRooms = [...rooms];

        //transform values
        capacity = parseInt(capacity);
        price = parseInt(price);
        
        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(
                room => room.type === type
            )
        }

        //filter by capacity
        if(capacity !== 1){
            tempRooms = tempRooms.filter(
                room => room.capacity >= capacity
            )
        }

        //filter by price
        tempRooms = tempRooms.filter(
            room => room.price <= price)

        // //filter by size
        tempRooms = tempRooms.filter(
            room => 
            (room.size >= minSize 
            &&
            room.size <= maxSize )
        )

        
    //     //filter by breakfast
        if (breakfast) {
        tempRooms = tempRooms.filter(room => room.breakfast === true);
      }

        //filter by pets
        if(pets){
            tempRooms = tempRooms.filter(
                room => room.pets === true
            )
        }

        //change state
        this.setState({
            sortedRooms:tempRooms
        })
    };

    render() {
        return (
            <RoomContext.Provider 
            value={{
                ...this.state,
                getRoom:this.getRoom,
                handleChange:this.handleChange}}
            >
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer=RoomContext.Consumer;
export {RoomProvider,RoomConsumer,RoomContext};

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}


