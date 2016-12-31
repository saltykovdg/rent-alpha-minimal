import * as ObjectUtil from './ObjectUtil';

export const prepareEdit = (newData, isLoading, isRequestError, isSaved, isDeleted) => {
  return {
    list: {
      data: null,
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newData),
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
      data: ObjectUtil.cloneObject(newListData),
      isLoading,
      isRequestError,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
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
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};
