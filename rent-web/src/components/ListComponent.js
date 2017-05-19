import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Popconfirm } from 'antd';

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
