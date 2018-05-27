//action types
const SPIN_LOADING = "SPIN_LOADING"
//reducer
export default function (state, action) {
    if (!state) {
        state = {
            spinLoading: false
        }
    }
    switch (action.type) {
        case SPIN_LOADING:
            //全局loading
            return { ...state, spinLoading: action.spinLoading }
        default:
            return state
    }
}

// action creators
export const spinLoading = (loading) => {
    return { type: SPIN_LOADING, spinLoading: loading }
}
