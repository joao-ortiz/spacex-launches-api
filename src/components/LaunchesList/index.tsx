import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"

import { QueryObj } from "../../client-api"
import RenderList from "./RenderList"
import LaunchCard from "./LaunchCard"
import Filters from "./Filters"
import Sections from "./Sections"

import "./index.css"

const LaunchesList = () => {
    const [filters, setFilters] = useState<QueryObj>({
        query: {
            upcoming: false
        },
        options: {
          limit: 4,
          offset: 0,
          select: {
            rocket: true,
            success: true,
            flight_number: true,
            name: true,
            date_local: true,
            id: true,
            links: true,
            upcoming: true
          },
          sort: {
              date_unix: "desc"
          }
        }
      })

    const favourites = useSelector((state: any) => state.favourites)

    const onScroll = () =>{
        setFilters(prev => ({...prev,options:{...prev.options, limit: (prev.options.limit + 4)}}))
           
    }

    return (<>
    <div className="controls-section">
        <Sections upcoming={filters.query?.upcoming} setFilters={setFilters}/>
        <Filters favouritesList={favourites} onFilter={setFilters}/>
    </div>
        <RenderList query={filters} onScroll={onScroll} >
            {(data) => {
                
                return (
                    data?.docs.map(launch => {
                        const favourite = favourites.indexOf(launch.id) > -1
                        return <LaunchCard favourite={favourite} key={launch.id} launch={launch}/>
                })
                )
            }}
        </RenderList >
</>)}

export default LaunchesList