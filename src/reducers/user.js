//action types
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const GET_USERINFO_SUCCESS = "GET_USERINFO_SUCCESS"
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"

//reducer
export default function (state, action) {
    if (!state) {
        state = {
            token: '',
            name: 'admin',
            avatar: '',
            isAdmin: 0,
            permission: []
        }
    }
    switch (action.type) {
        case LOGIN_SUCCESS:
            //登录
            return { ...state, token: action.token }
        case GET_USERINFO_SUCCESS:
            //获取用户信息
            return { ...state, name: action.name, avatar: action.avatar, isAdmin: action.isAdmin, permission: action.permission }
        case LOGOUT_SUCCESS:
            // 登出
            return {
                token: state.token,
                name: '',
                avatar: '',
                isAdmin: 0,
                permission: []
            }
        default:
            return state
    }
}

// action creators
export const login = (token) => {
    return { type: LOGIN_SUCCESS, token: token }
}

export const updateUserInfo = (userInfo) => {
    return { type: GET_USERINFO_SUCCESS, ...userInfo }
}


export const logout = () => {
    return { type: LOGOUT_SUCCESS }
}