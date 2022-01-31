import React, { Children, ReactNode, useLayoutEffect, useState } from "react"
import { useGetLaunchesQuery } from "../../../client-api"
import { LaunchesData, QueryObj } from "../../../client-api"
import Spinner from "../../Spinner"

type Props = {
    children(data: LaunchesData | undefined): React.ReactNode
    query: QueryObj
    onScroll: () => void
}

const RenderList: React.FC<Props> = ({query, onScroll, children}) => {
    const {data, error, isLoading} = useGetLaunchesQuery(query)
    const listRef = React.createRef<HTMLDivElement>()
    // const [scrollPos, setScrollPos] = useState<number | undefined>()

    const calculateOffset = () => {
        if(listRef.current !== null) {
            const { scrollTop, clientHeight , scrollHeight } = listRef.current
            if(scrollTop + clientHeight  === scrollHeight) {
                // setScrollPos(scrollTop)
                console.log("bottom")
                onScroll()
            }
        }
    }

    useLayoutEffect(() => {
        if(query.options.limit === 4) {
            listRef.current?.scrollTo({top:0})
        }
        // console.log(scrollPos)
    }, [data])

    if(isLoading) return <Spinner />
    if(error) return <p>An error ocurred</p>
    return <div data-testid="launches-list" className="launches-list" onScroll={calculateOffset} ref={listRef}>
        {children(data)}
    </div>
}

export default RenderList