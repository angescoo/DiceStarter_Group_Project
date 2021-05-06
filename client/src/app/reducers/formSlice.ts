import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Inputs, FormState} from '../../types';
import {RootState} from '../store';

// {name: , price: , categories: }
const initialState: FormState = {
  form: {
    categories: [],
    description: '',
    colors: [],
    name: '',
    picture: '',
    price: 0,
    rating: 0,
    size: '',
    stock: 0,
  },
  status: 'idle',
};


export const sendDataThunk = createAsyncThunk(
    'formReducer/sendDataThunk',
    async (form: Inputs) => {
      const response = new Promise((resolve, reject) => {
        if (form.name !== 'error') {
          setTimeout(() => resolve(form), 2000);
        } else {
          setTimeout(() => reject(new Error('Error')), 2000);
        }
      });
      return response;
    },
);

export const formSlice = createSlice({ // Te creo al reducer, acciones y estados
  name: 'formReducer',
  initialState, // Le pasas el estado inicial
  reducers: {
    // Acá metes tus acciones normales de toda la vida
    saveForm: (state, action : PayloadAction<Inputs>) => {
      state.form = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
        .addCase(sendDataThunk.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(sendDataThunk.fulfilled, (state, action:any) => {
          state.form = action.payload;
          state.status = 'idle';
        })
        .addCase(sendDataThunk.rejected, (state) => {
          state.status = 'failed';
        });
  },
});

export const {saveForm} = formSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example:
// `useSelector((state: RootState) => state.counter.value)`
export const form = (state: RootState) => state.formReducer.form;

export default formSlice.reducer;