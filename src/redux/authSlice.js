import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const loginUser=createAsyncThunk('auth/loginUser',
    async (credentials,{rejectWithValue})=> {
        console.log('Logged In')
        console.log(credentials)
        try {
            const response = await axios.post('/dummyjson.com/users',credentials)
            return response.data
        }
        catch(error){
        return rejectWithValue (error.response.data);
    }
    }

)

export const registerUser=createAsyncThunk('auth/registerUser',
    async (credentials,{rejectWithValue})=> {
        console.log('Registered')
        try {
            const response = await axios.post('/api/register',credentials)
            return response.data
        }
        catch(error){
        return rejectWithValue (error.response.data);
    }
    }
)


const authSlice =createSlice({
    name:'auth',
    initialState: {
        user:null,
        token:null,
        error:null,
        loading:false,
    },
    reducers:{
        logout: (state)=> {
            state.user=null;
            state.token=null;
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        //login
        builder
        .addCase(loginUser.pending,
            (state) => {
                state.loading=true;
                state.error=null;
            }
        )
        .addCase(loginUser.fulfilled, (state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.token=action.payload.token;
            
        })
        .addCase(loginUser.rejected,
            (state,action)=>{
                state.loading=false;
                state.error = action.payload.message;
            }
        )
        .addCase(registerUser.pending,
            (state) => {
                state.loading=true;
                state.error=null;
            }
        )
        .addCase(registerUser.fulfilled, (state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.token=action.payload.token;
            
        })
        .addCase(registerUser.rejected,
            (state,action)=>{
                state.loading=false;
                state.error = action.payload.message;
            }
        )
    }
});

export const {logout}=authSlice.actions;
export default authSlice.reducer;

    