import { render, screen, fireEvent } from "@testing-library/react";
import store from '../../store';
import { Provider } from 'react-redux';
import Filters from "./Filters"
import LaunchCard from "./LaunchCard";
import Sections from "./Sections";

type Props ={
    children: React.ReactNode
}
const wrapper: React.FC<Props> = ({children}) => {
    return <Provider store={store}>{children}</Provider>
}

describe('launch card testing', () => {
    const mockLaunch = {
        links: {
            patch: {
                "small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
                "large": "https://images2.imgbox.com/40/e3/GypSkayF_o.png"
            },
            reddit: {
                "campaign": null,
                "launch": null,
                "media": null,
                "recovery": null
            },
            flickr: {
                "small": [],
                "original": []
            },
            presskit: null,
            webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
            youtube_id: "0a_00nJ_Y88",
            article: "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
            wikipedia: "https://en.wikipedia.org/wiki/DemoSat"
        },
        rocket: "5e9d0d95eda69955f709d1eb",
        success: false,
        flight_number: 1,
        name: "FalconSat",
        date_local: "2006-03-25T10:30:00+12:00",
        id: "5eb87cd9ffd86e000604b32a"
    }

    

    test('should have content', () => {
        render(<LaunchCard favourite launch={mockLaunch} />, {wrapper})

        expect(screen.getByTestId("launch-title")).toHaveTextContent("Mission: FalconSat - Fri Mar 24 2006")
        expect(screen.getByTestId("success")).toHaveTextContent("Failure")
        expect(screen.getByTestId("launch-number")).toHaveTextContent("№: 1")
    })
    
    test("should have remove from favourites button", () => {
        render(<LaunchCard favourite launch={mockLaunch} />, {wrapper})

        expect(screen.getByTestId("favourite-button")).toHaveTextContent("Remove from favourites")
    })

    test("should have add to favourites button", () => {
        render(<LaunchCard favourite={false} launch={mockLaunch} />, {wrapper})

        expect(screen.getByTestId("favourite-button")).toHaveTextContent("Add to favourites")
    })
})

describe("test filters component", () => {

    test("should display unsucceded or succeded buttons", () => {
        render(<Filters favouritesList={[]} onFilter={() => {}} />, {wrapper})
        expect(screen.getByTestId("buttons").childElementCount).toBe(3)
        screen.debug()
        fireEvent.click(screen.getByTestId("success-button"))
        expect(screen.getByTestId("fail-button").style.display).toBe("none")
    })

    test("should favourites button have active class", () => {
        render(<Filters favouritesList={[]} onFilter={() => {}} />, {wrapper})
        expect(screen.getByTestId("favourites-button").classList.contains("selected")).toBe(false)

        fireEvent.click(screen.getByTestId("favourites-button"))
        expect(screen.getByTestId("favourites-button").classList.contains("selected")).toBe(true)
    })

    test("should display clear filters olny when filters have been applied", () => {
        render(<Filters favouritesList={[]} onFilter={() => {}} />, {wrapper})
        expect(screen.getByTestId("clear-filters").style.display).toBe("none")
        
        fireEvent.click(screen.getByTestId("apply-filters"))
        expect(screen.getByTestId("clear-filters").style.display).toBe("none")
        fireEvent.click(screen.getByTestId("success-button"))
        fireEvent.click(screen.getByTestId("apply-filters"))
        expect(screen.getByTestId("clear-filters").style.display).toBe("block")
    })
})

describe("test sections test", () => {
    test("should have 2 buttons", () => {
        render(<Sections upcoming setFilters={() => {}} />)

        expect(screen.getByTestId("buttons-container").children).toHaveLength(2)
    })

    test("button for upcoming launches must have active class", () => {
        render(<Sections upcoming setFilters={() => {}} />)

        expect(screen.getByTestId("upcoming-button").classList.contains("active")).toBe(true)
    })

    test("button for past launches must have active class", () => {
        render(<Sections upcoming={false} setFilters={() => {}} />)

        expect(screen.getByTestId("past-button").classList.contains("active")).toBe(true)
    })
})
