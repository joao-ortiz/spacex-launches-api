import { useGetRocketQuery, Rocket } from "../../../../client-api"
import Spinner from "../../../Spinner"

type Props = {
    id: string
}

const RocketName: React.FC<Props>  = ({id}) => {
    const {data, isLoading, error} = useGetRocketQuery(id)
    if(isLoading) return <Spinner />
    if(error) return <p>Error</p>
    return <p className="launch-rocket">Rocket Name: {data?.name}</p>
}

export default RocketName