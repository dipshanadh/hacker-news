import {
	SET_LOADING,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case SET_LOADING:
			return { ...state, isLoading: true }

		case SET_STORIES:
			return {
				...state,
				isLoading: false,
				hits: payload.hits,
				nbPages: payload.nbPages,
			}

		case REMOVE_STORY:
			return {
				...state,
				hits: state.hits.filter(story => story.objectID !== payload),
			}

		case HANDLE_SEARCH:
			return {
				...state,
				query: payload,
				page: 0,
			}

		case HANDLE_PAGE:
			if (payload === 'inc') {
				let nextPage = state.page + 1

				// Comparing with nbPages + 1 because the API has only 49 pages even though the nbPages is 50
				if (nextPage > state.nbPages - 1) nextPage = 0

				return { ...state, page: nextPage }
			}
			if (payload === 'dec') {
				let prevPage = state.page - 1

				// Assigning prevPage = state.nbPages - 1 to go to the last page
				if (prevPage < 0) prevPage = state.nbPages - 1

				return { ...state, page: prevPage }
			}

		default:
			throw new Error(`No matching "${action.type}" action type`)
	}
}

export default reducer
