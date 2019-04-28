import { createStore } from "redux";

const getByID = (arr, _id) => arr.filter(({ id }) => id === _id)[0];

const updateState = (action) => (...actionConstants) => {
	const { type, payload } = action;

	if (!reducer.actions) {
		reducer.actions = actionConstants.reduce((acc, cur) => {
			acc[cur] = (payload) => ({ type: cur, payload });
			return acc;
		}, {});
	}

	return actionConstants.includes(type) ? payload : {};
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
	const newState = updateState(action)(
		"UPDATE_PRODUCTS",
		"TOGGLE_SPINNER",
		"REMOVE_FILE",
	);

	return { ...state, ...newState };
}

const { store, actions } = getStore();

export { getByID, store, actions as default };
