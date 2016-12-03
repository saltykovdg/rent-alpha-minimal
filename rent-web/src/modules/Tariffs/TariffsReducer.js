// import Tariffs from './modules/Tariffs/TariffsReducer';
// import tempReducer from './reducers/TempReducer';

// Initial State
const data = {
  list: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  edit: {
    data: null,
    isLoading: false,
    isRequestError: false,
  },
  isSaved: false,
  isDeleted: false,
};

const initialState = {
  tempReducer: data,
};

const TariffsReducer = (state = initialState, action) => {
  return {
    tempReducer: null,
  };
};

/* Selectors */


// Export Reducer
export default TariffsReducer;
