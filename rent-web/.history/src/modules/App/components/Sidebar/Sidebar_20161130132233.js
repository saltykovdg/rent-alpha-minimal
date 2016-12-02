import React from 'react';
import { Link, browserHistory } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Menu } from 'antd';

import './Sidebar.less';

import * as AddressPath from '../../../Address/AddressPaths';
import * as OrganizationPath from '../../../Organization/OrganizationPaths';
import * as ServiceTypePath from '../../../Service/paths/ServiceTypePath';

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
          <Item key={AddressPath.DISTRICT_LIST}>
            <Link to={AddressPath.DISTRICT_LIST}>
              <FormattedMessage id="districtTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.BUILDING_MATERIAL_LIST}>
            <Link to={AddressPath.BUILDING_MATERIAL_LIST}>
              <FormattedMessage id="buildingMaterialTitle" />
            </Link>
          </Item>
          <Item key={AddressPath.BUILDING_TYPE_LIVABILITY_LIST}>
            <Link to={AddressPath.BUILDING_TYPE_LIVABILITY_LIST}>
              <FormattedMessage id="buildingsTypesLivabilityTitle" />
            </Link>
          </Item>
          <Menu.Divider />
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
        <SubMenu key="sidebarServices" title={<FormattedMessage id="servicesTitle" />}>
          <Item key={ServiceTypePath.SERVICE_TYPE_LIST}>
            <Link to={ServiceTypePath.SERVICE_TYPE_LIST}>
              <FormattedMessage id="servicesServicesTypesTitle" />
            </Link>
          </Item>
          <Item key="sidebarServicesServices">
            <Link to="/service/list">
              <FormattedMessage id="servicesTitle" />
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
