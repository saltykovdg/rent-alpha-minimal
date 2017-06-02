import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Menu, Icon, Spin } from 'antd';

import './Header.less';
import { ExtendedComponent } from './../../../../components/ExtendedComponent';

const SubMenu = Menu.SubMenu;

class Header extends ExtendedComponent {
  onLogout = (e) => {
    if (e.key === 'logout') {
      this.props.onLogout();
    }
  }
  render() {
    const userName = this.props.userName;
    const currentWorkingPeriod = this.props.currentWorkingPeriod ? this.props.currentWorkingPeriod.name : '';
    return (
      <div className="header">
        <Link to="/" className="header-logo">
          <FormattedMessage id="appTitle" />
        </Link>
        <Menu className="header-menu" mode="horizontal" onClick={this.onLogout}>
          <SubMenu title={<span><Icon type="user" />{userName}</span>}>
            <Menu.Item key="logout">
              <FormattedMessage id="buttonLogout" />
            </Menu.Item>
          </SubMenu>
          <Menu.Item disabled className="header-working-period">
            <Spin spinning={this.props.isLoading}>
              <FormattedMessage id="currentWorkingPeriodTitle" />
              {currentWorkingPeriod}
            </Spin>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default injectIntl(Header);
