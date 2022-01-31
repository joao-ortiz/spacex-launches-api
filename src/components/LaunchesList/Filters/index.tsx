import { useState } from 'react'
import { QueryObj } from '../../../client-api'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"

type Props ={
    onFilter: React.Dispatch<React.SetStateAction<QueryObj>>,
    favouritesList: string[]
}

const Filters: React.FC<Props> = ({onFilter, favouritesList}) => {
    const [success, setSuccess] = useState<undefined | boolean>()
    const [startDate, setStartDate] = useState<Date |  null>(null)
    const [endDate, setEndDate] = useState<Date |  null>(null)
    const [filtered, setFiltered] = useState<boolean>(false)
    const [favourites, setFavourites] = useState<boolean>(false)
    const applyFilters = () =>{
        if(success !== undefined || startDate !== null || endDate !== null || favourites) {
            onFilter(prev => {
                let newQuery: any = {}
                if(favourites) {
                    newQuery._id = {}
                    newQuery._id.$in = [...favouritesList]
                }
                if(success !== undefined){
                    newQuery.success = success
                }
                if(startDate !== null || endDate !== null){
                    newQuery.date_utc = {}
                    if(startDate !== null){
                        newQuery.date_utc.$gte = startDate.toISOString()
                    }
                    if(endDate !== null){
                        newQuery.date_utc.$lte = endDate.toISOString()
                    }
                }
                return{...prev,query:{...prev.query,...newQuery},options:{...prev.options,limit: 4}}})
            setFiltered(true)
        }
    }

    const clearFilters = () => {
        setSuccess(undefined)
        setStartDate(null)
        setEndDate(null)
        setFavourites(false)
        onFilter((prev => {
            console.log(filteredQuery(prev))
            return filteredQuery(prev)
        }))
        setFiltered(false)
    }

    const filteredQuery = (oldQuery: any) => {
        const nQuery = {...oldQuery,query:{upcoming:oldQuery?.query?.upcoming}}
        return nQuery
    }
    
    return <div className="filters-container">
            
            <div data-testid="buttons" className="success-selector-container">
            <span className='filter-label'>Mission succses</span>
                <button 
                    data-testid="success-button"
                    style={{display: `${(success === true || success === undefined) ? "block" : "none"}`}} 
                    onClick={() => 
                        setSuccess(prev => {
                            if(prev === undefined) return true
                            return undefined
                        }
                    )}
                >
                    Succeded
                </button>
                <button
                    data-testid="fail-button"
                    style={{display: `${(success === false || success === undefined) ? "block" : "none"}`}} 
                    onClick={() => 
                        setSuccess(prev => {
                            if(prev === undefined) return false
                            return undefined
                        }
                    )}
                >
                    Usucceded
                </button>
            </div>
            
            <div className="date-pickers-container">
                        <span className='filter-label'>Mission date</span>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
            <div className="check">
            <span className='filter-label'>Favourite missions</span>
            <button 
                    data-testid="favourites-button"
                    className={`${favourites ? "selected":""}`}
                    onClick={() => 
                        setFavourites(prev => !prev
                    )}
                >
                    Favourites
                </button>
            </div>
            <div className="filter-control-container">
                <button data-testid="apply-filters" onClick={applyFilters}>Apply filters</button>
                <button data-testid="clear-filters" style={{display: `${filtered ? "block":"none"}`}} onClick={clearFilters}>Clear filters</button>
            </div>
        </div>
}

export default Filters