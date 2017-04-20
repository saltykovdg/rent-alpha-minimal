import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Popconfirm, Table } from 'antd';

import { ExtendedComponent } from './ExtendedComponent';

class ListComponent extends ExtendedComponent {
  getActionColumn = (editPath, useButtonDelete = true) => {
    const messages = this.props.intl.messages;
    const onDelete = this.props.onDelete;
    const buttonDelete = (record) => {
      return (
        <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
          <Link><FormattedMessage id="buttonDelete" /></Link>
        </Popconfirm>
      );
    };
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link to={`${editPath}/${record.id}`}><FormattedMessage id="buttonEdit" /></Link>
            { useButtonDelete ? <span className="ant-divider" /> : null }
            { useButtonDelete ? buttonDelete(record) : null }
          </span>
        );
      },
    };
  }
  getTableComponent(columns, expandedRowRender = null) {
    let dataSource = [];
    const onChangePage = this.props.onChangePage;
    let pagination = false;
    if (this.props.data && this.props.data.content) {
      dataSource = this.props.data.content;
      dataSource.forEach((obj) => {
        const newObj = obj;
        newObj.key = newObj.id;
      });
      if (this.props.data.page) {
        if (this.props.data.page.totalPages > 1) {
          pagination = {
            total: this.props.data.page.totalElements,
            current: this.props.data.page.number + 1,
            pageSize: this.props.data.page.size,
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
        loading={this.props.isLoading}
      />
    );
  }
}

ListComponent.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape),
  intl: PropTypes.objectOf(PropTypes.shape),
  onChangePage: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ListComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  ListComponent,
};
