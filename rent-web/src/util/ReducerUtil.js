export const prepareEdit = (newData, isLoading, isRequestError, isSaved, isDeleted) => {
  const newObjectData = JSON.parse(JSON.stringify(newData));
  return {
    list: {
      data: null,
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: newObjectData,
      isLoading,
      isRequestError,
    },
    isSaved,
    isDeleted,
  };
};

export const prepareList = (newListData, newEditData, isLoading, isRequestError, isSaved, isDeleted) => {
  const newObjectListData = JSON.parse(JSON.stringify(newListData));
  const newObjectData = JSON.parse(JSON.stringify(newEditData));
  return {
    list: {
      data: newObjectListData,
      isLoading,
      isRequestError,
    },
    edit: {
      data: newObjectData,
      isLoading: false,
      isRequestError: false,
    },
    isSaved,
    isDeleted,
  };
};

export const prepareDefault = (list, newEditData) => {
  const newObjectData = JSON.parse(JSON.stringify(newEditData));
  return {
    list,
    edit: {
      data: newObjectData,
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};
