import * as ObjectUtil from './ObjectUtil';

export const prepare = (list, edit) => {
  return {
    list: ObjectUtil.cloneObject(list),
    edit: ObjectUtil.cloneObject(edit),
    isSaved: false,
    isDeleted: false,
  };
};

export const prepareListLoading = (newListData, newEditData) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: true,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};

export const prepareEditLoading = (newListData, newEditData) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: true,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};

export const prepareSuccess = (newListData, newEditData) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};

export const prepareListFailed = (newListData, newEditData) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: false,
      isRequestError: true,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: false,
  };
};

export const prepareEditFailed = (newListData, newEditData, showError = true) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: showError,
    },
    isSaved: false,
    isDeleted: false,
  };
};

export const prepareSaveSuccess = (newListData, newEditData) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: false,
    },
    isSaved: true,
    isDeleted: false,
  };
};

export const prepareDeleteSuccess = (newListData, newEditData) => {
  return {
    list: {
      data: ObjectUtil.cloneObject(newListData),
      isLoading: false,
      isRequestError: false,
    },
    edit: {
      data: ObjectUtil.cloneObject(newEditData),
      isLoading: false,
      isRequestError: false,
    },
    isSaved: false,
    isDeleted: true,
  };
};
