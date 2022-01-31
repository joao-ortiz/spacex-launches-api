import { QueryObj } from "../../../client-api"
import "./index.css"
type Props = {
    upcoming?: boolean 
    setFilters: React.Dispatch<React.SetStateAction<QueryObj>>
}

const Sections: React.FC<Props> = ({upcoming, setFilters}) => {
    return <div data-testid="buttons-container" className="selection-container">
        <button data-testid="past-button" className={!upcoming ? "section-button active" : "section-button"} onClick={() => setFilters(prev => ({...prev, query:{...prev.query,upcoming: false}, options:{...prev.options, limit: 4}}))}>Past</button>
        <button data-testid="upcoming-button" className={upcoming ? "section-button active" : "section-button"} onClick={() => setFilters(prev => ({...prev, query:{...prev.query,upcoming: true}, options:{...prev.options, limit: 4}}))} >Upcoming</button>
    </div>
}

export default Sections