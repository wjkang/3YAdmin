//action types
const SPIN_LOADING = "SPIN_LOADING"
const UPDATE_TOPATH = "UPDATE_TOPATH"
//reducer
export default function (state, action) {
    if (!state) {
        state = {
            spinLoading: false,
            toPath: '/'
        }
    }
    switch (action.type) {
        case SPIN_LOADING:
            //全局loading
            return { ...state, spinLoading: action.spinLoading }
        case UPDATE_TOPATH:
            //登陆后跳转地址
            return { ...state, toPath: action.toPath }
        default:
            return state
    }
}

// action creators
export const spinLoading = (loading) => {
    return { type: SPIN_LOADING, spinLoading: loading }
}

export const updateToPath = (toPath) => {
    return { type: UPDATE_TOPATH, toPath: toPath }
}
