import { createStore } from "redux";

const getByID = (arr, _id) => arr.filter(({ id }) => id === _id)[0];

const addLookup = (lookup, type) => {
	if (!reducer.actions) {
		reducer.actions = Object.keys(lookup).reduce((acc, cur) => {
			acc[cur] = (payload) => ({ type: cur, payload });
			return acc;
		}, {});
	}

	return lookup[type];
};

const getStore = () => {
	reducer();

	const { actions } = reducer,
		store = createStore(reducer);

	return { actions, store };
};

const initialState = {
	products: [],
	isLoading: true,
};

function reducer(state = initialState, action = {}) {
	const { type, payload } = action;

	const lookup = addLookup(
		{
			UPDATE_PRODUCTS: payload,
			TOGGLE_SPINNER: payload,
		},
		type,
	);

	return { ...state, ...lookup };
}

const { store, actions } = getStore();

export { getByID, store, actions as default };
