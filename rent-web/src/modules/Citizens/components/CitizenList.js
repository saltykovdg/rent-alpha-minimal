import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button } from 'antd';

import * as CitizenPath from './../paths/CitizenPath';
import { ListComponent } from './../../../components/ListComponent';

class CitizenList extends ListComponent {
  render() {
    const columns = [
      this.getColumn(this.props.intl.messages.citizenFieldGenderType, 'genderType.name'),
      this.getColumn(this.props.intl.messages.citizenFieldFirstName, 'firstName'),
      this.getColumn(this.props.intl.messages.citizenFieldLastName, 'lastName'),
      this.getColumn(this.props.intl.messages.citizenFieldFatherName, 'fatherName'),
      this.getDateColumn(this.props.intl.messages.citizenFieldBirthday, 'birthday'),
      this.getActionColumn(CitizenPath.CITIZEN_EDIT),
    ];
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="citizensTitle" /></Breadcrumb.Item>
        </Breadcrumb>
        <h1>
          <FormattedMessage id="citizensTitle" />
        </h1>
        <Button type="primary" onClick={() => this.forwardTo(CitizenPath.CITIZEN_EDIT)}>
          <FormattedMessage id="buttonAddNewRecord" />
        </Button>
        {this.getTableComponent(columns)}
      </div>
    );
  }
}

export default injectIntl(CitizenList);
