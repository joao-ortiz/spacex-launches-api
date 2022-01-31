import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Launch {
    id: string
    date_local: string
    name: string
    flight_number: number
    success?: boolean
    rocket: string 
    upcoming?: boolean 
    links:{
        patch:{
            small: string 
            large: string 
        }
    }
}

export interface LaunchesData {
    docs: Launch[]
}

export interface QueryObj {
    query?: {
        date_utc?: {
          $gte?: string
          $lte?: string
        }
        upcoming?: boolean
        success?: boolean
        _id?: {
            $in: string[]
        }
    }
    options:{
        limit: number
        offset?: number
        sort?: {
            date_unix: string
        }
        select?: {
            rocket: boolean
            success: boolean
            flight_number: boolean
            name: boolean
            date_local: boolean
            id: boolean
            links: boolean
            upcoming: boolean
        }
    } 
}

export interface Rocket {
    id: string
    name: string
}


export const launchesApi = createApi({
    reducerPath: 'launchesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.spacexdata.com/v4/"}),
    endpoints: (builder) => ({
        getLaunches: builder.query<LaunchesData, QueryObj>({
            query: (queryConfig) => {
                return {
                    url: "launches/query",
                    method: "POST",
                    body: queryConfig
                }
            }
        }),
        getRocket: builder.query<Rocket , string>({
            query: (id) => `rockets/${id}`
        })
    })
})

export const { useGetLaunchesQuery, useGetRocketQuery } = launchesApi