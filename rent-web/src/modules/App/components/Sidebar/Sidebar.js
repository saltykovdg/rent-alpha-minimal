import React from 'react';
import { Link, browserHistory } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Menu } from 'antd';

import './Sidebar.less';

import * as AddressPath from '../../../Address/AddressPaths';
import * as OrganizationPath from '../../../Organization/OrganizationPaths';
import * as ServiceTypePath from '../../../Service/paths/ServiceTypePath';
import * as ServicePath from '../../../Service/paths/ServicePath';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

function Sidebar() {
  const location = browserHistory.getCurrentLocation().pathname;
  let defaultOpenKey = '';

  if (location.indexOf('/address/') !== -1) {
    defaultOpenKey = 'sidebarAddress';
  } else if (location.indexOf('/organization/') !== -1) {
    defaultOpenKey = 'sidebarOrganizations';
  } else if (location.indexOf('/service/') !== -1) {
    defaultOpenKey = 'sidebarServices';
  }

  return (
    <div className="sidebar">
      <Menu
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        selectedKeys={[location]}
      >
        <SubMenu key="sidebarOrganizations" title={<FormattedMessage id="organizationTitle" />}>
          <Item key={OrganizationPath.CONTRACTOR_TYPE_LIST}>
            <Link to={OrganizationPath.CONTRACTOR_TYPE_LIST}>
              <FormattedMessage id="contractorTypeTitle" />
            </Link>
          </Item>
          <Item key={OrganizationPath.CONTRACTOR_LIST}>
            <Link to={OrganizationPath.CONTRACTOR_LIST}>
              <FormattedMessage id="contractorTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarAddress" title={<FormattedMessage id="addressTitle" />}>
          <Item key={AddressPath.STREET_TYPE_LIST}>
            <Link to={AddressPath.STREET_TYPE_LIST}>
              <FormattedMessage id="streetTypeTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.STREET_LIST}>
            <Link to={AddressPath.STREET_LIST}>
              <FormattedMessage id="streetTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.BUILDING_LIST}>
            <Link to={AddressPath.BUILDING_LIST}>
              <FormattedMessage id="buildingTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.APARTMENT_LIST}>
            <Link to={AddressPath.APARTMENT_LIST}>
              <FormattedMessage id="apartmentTitle" />
            </Link>
          </Item>
        </SubMenu>
        <Item key="sidebarAccounts">
          <Link to="/account/list">
            <FormattedMessage id="accountsTitle" />
          </Link>
        </Item>
        <SubMenu key="sidebarNorms" title={<FormattedMessage id="normsTitle" />}>
          <Item key="sidebarNormsGroupsNorms">
            <Link to="/norms/group/list">
              <FormattedMessage id="normsGroupsNormsTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarServices" title={<FormattedMessage id="serviceTitle" />}>
          <Item key={ServiceTypePath.SERVICE_TYPE_LIST}>
            <Link to={ServiceTypePath.SERVICE_TYPE_LIST}>
              <FormattedMessage id="serviceTypeTitle" />
            </Link>
          </Item>
          <Item key={ServicePath.SERVICE_LIST}>
            <Link to={ServicePath.SERVICE_LIST}>
              <FormattedMessage id="serviceTitle" />
            </Link>
          </Item>
        </SubMenu>
        <SubMenu key="sidebarOther" title={<FormattedMessage id="otherTitle" />}>
          <Item key="sidebarOtherTypePlate">
            <Link to="/other/plate/type/list">
              <FormattedMessage id="otherTypePlateTitle" />
            </Link>
          </Item>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default injectIntl(Sidebar);
