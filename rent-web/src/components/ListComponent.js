import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Popconfirm, Input, Table } from 'antd';

import { ExtendedComponent } from './ExtendedComponent';

const Search = Input.Search;

class ListComponent extends ExtendedComponent {
  getFilterField(textHint, ref, handler) {
    return (
      <div>
        <Search placeholder={textHint} ref={ref} onSearch={handler} />
      </div>
    );
  }
  getColumn = (title, name) => {
    return { title, dataIndex: name, key: name };
  }
  getActionColumn = (editPath) => {
    const messages = this.props.intl.messages;
    const onDelete = this.props.onDelete;
    return {
      title: this.props.intl.messages.tableColumnActions,
      key: 'action',
      render(text, record) {
        return (
          <span>
            <Link to={`${editPath}/${record.id}`}><FormattedMessage id="buttonEdit" /></Link>
            <span className="ant-divider" />
            <Popconfirm title={messages.confirmDelete} onConfirm={() => onDelete(record)} >
              <Link><FormattedMessage id="buttonDelete" /></Link>
            </Popconfirm>
          </span>
        );
      },
    };
  }
  getTableComponent(columns) {
    let dataSource = [];
    const onChangePage = this.props.onChangePage;
    let pagination = false;
    if (this.props.data && this.props.data.content) {
      dataSource = this.props.data.content;
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
        dataSource={dataSource}
        columns={columns}
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
