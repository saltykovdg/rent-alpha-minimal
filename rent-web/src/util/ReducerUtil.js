export const prepareEdit = (newData, isLoading, isRequestError, isSaved, isDeleted) => {
  return {
    list: {
      data: null,
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: newData,
      isLoading,
      isRequestError,
    },
    isSaved,
    isDeleted,
  };
};

export const prepareList = (newListData, newEditData, isLoading, isRequestError, isSaved, isDeleted) => {
  return {
    list: {
      data: newListData,
      isLoading,
      isRequestError,
    },
    edit: {
      data: newEditData,
      isLoading: false,
      isRequestError: false,
    },
    isSaved,
    isDeleted,
  };
};

export const prepareDefault = (list, newEditData) => {
  return {
    list,
    edit: {
      data: newEditData,
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};
