import { Launch } from "../../../client-api"
import RocketName from './RocketName'
import { useDispatch } from "react-redux"
import {add, remove} from '../../../store'
import "./index.css"
import patch from "../../../assets/unnamed.png"
type Props = {
    launch: Launch
    favourite: boolean
}

const LaunchCard: React.FC<Props> = ({launch, favourite}) => {
    const {success,name,date_local,flight_number,rocket,links,upcoming,id} = launch
    const date = new Date(date_local)
    console.log(links.patch.small)
    const dispatch = useDispatch()
    const action = favourite ? remove : add
    console.log(favourite)
    return <div className="launch-card-container">
        <span data-testid="launch-number" className="launch-number">№: {flight_number}</span>
        <h2 data-testid="launch-title" className="launch-title">Mission: {name} - {date.toDateString()}</h2>
        <RocketName id={rocket} />
        <div  data-testid="launch-patch" style={{backgroundImage: `url(${links.patch.small !== null ? links.patch.small : patch})`}} className="launch-patch" />
        {!upcoming ? <span data-testid="success" className={`${success ? "launch-success" :"launch-success failure"}`}>{success ? "Success 🙌" : "Failure 😔"}</span> : <div className="launch-success"/> }
        <button data-testid="favourite-button" className={!favourite? "favourite isFavourite": "favourite notFavourite"} onClick={() => dispatch(action(id))}>{!favourite? "Add to favourites" : "Remove from favourites"}</button>
    </div>
}

export default LaunchCard