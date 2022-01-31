import { useSelector } from "react-redux"
import { useState } from "react"
import RenderList from "../LaunchesList/RenderList"
import { QueryObj } from "../../client-api"
import LaunchCard from "../LaunchesList/LaunchCard"
import "./index.css"

const Favourites: React.FC = () => {
    const favourites = useSelector((state: any) => state.favourites)

    const [queryObj, setQuery] = useState<QueryObj>({
        query: {
            upcoming: false,
            _id: {$in: [...favourites]}
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


      const onScroll = () =>{
        setQuery(prev => ({...prev,options:{...prev.options, limit: (prev.options.limit + 4)}}))
           
    }
    return <div className="favourites">
        <h2 className="favourite-title">
            Favourites
        </h2>
        <RenderList query={queryObj} onScroll={onScroll}>
                {(data: any) => {
                    return data.docs.map((launch: any) => {
                        <LaunchCard launch={launch} favourite/>
                    })
                }}
        </RenderList>
    </div>
}

export default Favourites