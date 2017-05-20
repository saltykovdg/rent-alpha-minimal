import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { notification, Table } from 'antd';
import moment from 'moment';

import * as HttpStatus from './../util/HttpStatus';
import * as ParameterType from './../util/ParameterType';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class ExtendedComponent extends Component {
  componentDidUpdate() {
    if (this.props.isRequestError && this.props.isRequestError === HttpStatus.CONFLICT) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorConflictDescription,
      });
    } else if (this.props.isRequestError) {
      notification.error({
        message: this.props.intl.messages.getRequestErrorTitle,
        description: this.props.intl.messages.getRequestErrorDescription,
      });
    }
    if (this.props.isSaved) {
      notification.success({
        message: this.props.intl.messages.saveDataSuccessTitle,
        description: this.props.intl.messages.saveDataSuccessDescription,
      });
    }
    if (this.props.isDeleted) {
      notification.success({
        message: this.props.intl.messages.deleteRecordTitle,
        description: this.props.intl.messages.deleteRecordSuccessDescription,
      });
    }
  }
  getColumn = (title, name) => {
    return { title, dataIndex: name, key: Math.random() };
  }
  getDateColumn = (title, name) => {
    return {
      title,
      dataIndex: name,
      key: Math.random(),
      render(text) {
        let value = text;
        if (value && value instanceof Object) {
          value = value.format(DATE_FORMAT);
        }
        return value;
      },
    };
  }
  getDateTimeColumn = (title, name) => {
    return {
      title,
      dataIndex: name,
      key: Math.random(),
      render(text) {
        let value = text;
        if (value && value instanceof Object) {
          value = value.format(DATE_TIME_FORMAT);
        } else if (value) {
          value = moment.utc(value).format(DATE_TIME_FORMAT);
        }
        return value;
      },
    };
  }
  getTableComponent(columns, expandedRowRender = null, data = this.props.data, isLoading = this.props.isLoading, onChangePage = this.props.onChangePage, bordered = false, size = 'default') {
    let dataSource = [];
    let pagination = false;
    if (data && data.content) {
      dataSource = data.content;
      dataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = Math.random();
      });
      if (data.page) {
        if (data.page.totalPages > 1) {
          pagination = {
            total: data.page.totalElements,
            current: data.page.number + 1,
            pageSize: data.page.size,
            onChange(current) {
              pagination.current = current;
              onChangePage(current - 1);
            },
          };
        }
      }
    }
    return (
      <Table
        className="table-nested"
        dataSource={dataSource}
        columns={columns}
        expandedRowRender={expandedRowRender}
        pagination={pagination}
        loading={isLoading}
        bordered={bordered}
        size={size}
      />
    );
  }
  getListForCurrentPeriod = (list) => {
    return this.getListForPeriod(list, this.props.currentWorkingPeriod);
  }
  getListForPeriod = (list, workingPeriod) => {
    let newList = list;
    if (list && workingPeriod) {
      newList = list.filter((item) => {
        const itemDateStart = new Date(item.dateStart).getTime();
        const itemDateEnd = new Date(item.dateEnd).getTime();
        const workingPeriodDateStart = new Date(workingPeriod.dateStart).getTime();
        const workingPeriodDateEnd = new Date(workingPeriod.dateEnd).getTime();
        return itemDateStart <= workingPeriodDateEnd && (!item.dateEnd || itemDateEnd >= workingPeriodDateStart);
      });
    }
    return newList;
  }
  getAccountTotalAreaForCurrentPeriod = (account) => {
    return this.getAccountTotalAreaForPeriod(account, this.props.currentWorkingPeriod);
  }
  getAccountTotalAreaForPeriod = (account, workingPeriod) => {
    let totalArea = 0;
    if (account && account.apartment && workingPeriod) {
      totalArea = account.apartment.totalArea;
      const currentParameters = this.getListForPeriod(account.parameters, workingPeriod);
      currentParameters.forEach((item) => {
        if (item.parameterType.code === ParameterType.TOTAL_AREA_CODE) {
          totalArea = item.value;
        }
      });
    }
    return totalArea;
  }
  getAccountPhoneNumbersForCurrentPeriod = (account) => {
    return this.getAccountPhoneNumbersForPeriod(account, this.props.currentWorkingPeriod);
  }
  getAccountPhoneNumbersForPeriod = (account, workingPeriod) => {
    let phoneNumbers = '';
    if (account && account.parameters && workingPeriod) {
      const currentParameters = this.getListForPeriod(account.parameters, workingPeriod);
      currentParameters.forEach((item) => {
        if (item.parameterType.code === ParameterType.PHONE_NUMBER_CODE) {
          phoneNumbers += (phoneNumbers.length === 0 ? '' : '; ') + item.value;
        }
      });
    }
    return phoneNumbers;
  }
  forwardTo = (url) => {
    browserHistory.push(url);
  }
  forwardToBack = () => {
    browserHistory.goBack();
  }
}

ExtendedComponent.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
  data: PropTypes.objectOf(PropTypes.shape),
  currentWorkingPeriod: PropTypes.objectOf(PropTypes.shape),
  isRequestError: PropTypes.any,
  isSaved: PropTypes.bool,
  isDeleted: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChangePage: PropTypes.func,
};

ExtendedComponent.defaultProps = {
  intl: {},
  data: null,
  currentWorkingPeriod: null,
  isRequestError: false,
  isSaved: false,
  isDeleted: false,
  isLoading: false,
  onChangePage: null,
};

ExtendedComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ExtendedComponent,
};
