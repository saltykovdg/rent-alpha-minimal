import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Menu, Icon } from 'antd';

import './Header.less';

const SubMenu = Menu.SubMenu;

function Header() {
  const userName = 'Пользователь';
  return (
    <div className="header">
      <Link to="/" className="header-logo">
        <FormattedMessage id="headerTitle" />
      </Link>
      <Menu className="header-menu" mode="horizontal">
        <SubMenu title={<span><Icon type="user" />{userName}</span>}>
          <Menu.Item>
            <FormattedMessage id="headerMenuLogout" />
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Header;
