import React from 'react'
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import { RoomConsumer } from '../Context';
import Loading from '../components/Loading'

export default function RoomContainer() {
    return (
        <>
        <RoomConsumer>
            {
                (value) => {
                    //console.log(value)
                    const {loading,sortedRooms,rooms} = value
                    return(
                        <div>
                            hello from rooms container
                            <RoomFilter/>
                            <RoomList/>
                        </div>
                    )
                }
            }
        </RoomConsumer>
        
        </>
    )
}
