import { useContext, useEffect, useReducer, createContext } from 'react'

import {
	SET_LOADING,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH,
} from './actions'

import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search'

const initialState = {
	isLoading: false,
	hits: [],
	query: 'react',
	page: 0,
	nbPages: 0,
}

const AppContext = createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const { query, page } = state

	const fetchStories = async url => {
		dispatch({ type: SET_LOADING })

		try {
			const res = await fetch(url)
			const data = await res.json()

			const { hits, nbPages } = data

			dispatch({ type: SET_STORIES, payload: { hits, nbPages } })
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchStories(`${API_ENDPOINT}?query=${query}&page=${page}`)
	}, [])

	return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
