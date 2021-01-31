import createDataContext from './createDataContext';
import auth from '@react-native-firebase/auth'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signout':
            return { ...state, id: null, email: '', error: null };
        case 'signin':
        case 'signup':
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                error: action.payload.error
            };
        default:
            return state;
    }
};

const signup = dispatch => {
    return ({ email, password }) => {
        let data = {
            type: 'signin',
            payload: {
                id: null,
                email: null,
                error: null
            },
        }
        
        auth().createUserWithEmailAndPassword(email, password).then((user) => {
            data.payload.id = user.user.uid;
            data.payload.email = user.user.email;
        }).catch((err) => {
            switch (err.code) {
                case 'auth/invalid-email': data.payload.error = 'Lütfen geçerli bir email adresi giriniz.'; break;
                default: break;
            }
        })
        dispatch(data);
    };
};

const signin = dispatch => {
    return ({ email, password }) => {
       

        auth().signInWithEmailAndPassword(email, password).then((user) => {

        }).catch((err) => {

        })
        console.log('giriş')
        dispatch({
            type: 'signin',
            payload: {
              token: 'some access token here',
              email,
            },
          });
    };
};

const signout = dispatch => {
    return () => {
        auth().signout();
        dispatch({ type: 'signout' });
    };
};

const defaultValue = () =>{

}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    { id: null, email: '', error: null },
);