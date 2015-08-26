import createReducer from '../createReducer';
import { Events } from '../actions/ActionTypes';

const initialState = {
  items: [{ name: 'Foo' }]
};

export default createReducer(initialState, {
  [Events.LOAD_ALL_SUCCESS]: (state, action) => ({ ...state, items: action.payload })
});
