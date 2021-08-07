import React from 'react';
import{useContext} from 'react';
import { RoomContext } from '../Context';
import Title from '../components/Title'

//get all unique values
const getUnique = (items,value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext) //from which part of room context
    //console.log(context)
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context ;

    //get unique types
    let types = getUnique(rooms,'type');
    types= ['all',...types];

    //map to jsx
    types= types.map((item,index) => {
        return <option value={item} key={index}>
            {item}
            </option>
    });

    let people = getUnique(rooms,'capacity');
    people = people.map((item,index) => {
        return <option value={item} key={index}>
            {item}
        </option>
    })
    return (
        <section className='filter-container'>
            <Title title="search rooms"/>
            <form className='filter-form'>
                {/* select type */}
                <div clas="form-group">
                    <label htmlFor="type">
                        Room Type
                    </label>
                    <select 
                    name="type"
                    id="type"
                    value={type}
                    className="form-control"
                    onChange={handleChange}
                    >
                    {types}

                    </select>
                </div>
                {/* end select type */}

                 {/* guests */}
                 <div clas="form-group">
                    <label htmlFor="capacity">
                        Guests
                    </label>
                    <select 
                    name="capacity"
                    id="capacity"
                    value={capacity}
                    className="form-control"
                    onChange={handleChange}
                    >
                    {people}

                    </select>
                </div>
                {/* guests */}
            </form>
        </section>
    )
}
