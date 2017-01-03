import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as DocumentTypePath from './../paths/DocumentTypePath';
import { ListComponent } from './../../../components/ListComponent';

class DocumentTypeList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.documentTypeFieldName, 'name'),
      this.getActionColumn(DocumentTypePath.DOCUMENT_TYPE_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="documentTypeTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="documentTypeTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(DocumentTypePath.DOCUMENT_TYPE_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(DocumentTypeList);
