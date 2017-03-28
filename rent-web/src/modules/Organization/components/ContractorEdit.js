import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Select, Row, Col } from 'antd';

import * as OrganizationPath from './../OrganizationPaths';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class ContractorEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditContractorTitle" /> : <FormattedMessage id="editPageCreateContractorTitle" />;
    const baseFields = this.getBaseFields(object);
    let values = null;
    if (this.props.contractorTypes && this.props.contractorTypes.content) {
      values = this.props.contractorTypes.content.map(contractorType => (
        <Select.Option key={contractorType.id} value={this.getLink(contractorType)}>{contractorType.name}</Select.Option>
      ));
    }
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="organizationTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={OrganizationPath.CONTRACTOR_LIST}><FormattedMessage id="contractorTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <h2>{this.props.intl.messages.contractorGroupGeneralInfo}</h2>
            <FormItem label={this.props.intl.messages.contractorTypeFieldName}>
              {this.getSelectField('contractorType', object.contractorType, values)}
            </FormItem>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.contractorFieldFullName}>
                  {this.getInputField('fullName', object.fullName)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={12}>
                <FormItem label={this.props.intl.messages.contractorFieldName}>
                  {this.getInputField('name', object.name)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.contractorFieldInn}>
                  {this.getInputField('inn', object.inn)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.contractorFieldKpp}>
                  {this.getInputField('kpp', object.kpp)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.contractorFieldOgrn}>
                  {this.getInputField('ogrn', object.ogrn)}
                </FormItem>
              </Col>
            </Row>
            <FormItem label={this.props.intl.messages.contractorFieldMailingAddress}>
              {this.getInputField('mailingAddress', object.mailingAddress)}
            </FormItem>
            <FormItem label={this.props.intl.messages.contractorFieldLegalAddress}>
              {this.getInputField('legalAddress', object.legalAddress)}
            </FormItem>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.contractorFieldPhone}>
                  {this.getInputField('phone', object.phone)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.contractorFieldFax}>
                  {this.getInputField('fax', object.fax)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.contractorFieldEmail}>
                  {this.getInputField('email', object.email)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={6}>
                <FormItem label={this.props.intl.messages.contractorFieldWebSite}>
                  {this.getInputField('webSite', object.webSite)}
                </FormItem>
              </Col>
            </Row>
            <h2>{this.props.intl.messages.contractorGroupBankInfo}</h2>
            <FormItem label={this.props.intl.messages.contractorFieldBankName}>
              {this.getInputField('bankName', object.bankName)}
            </FormItem>
            <FormItem label={this.props.intl.messages.contractorFieldBankAddress}>
              {this.getInputField('bankAddress', object.bankAddress)}
            </FormItem>
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.contractorFieldSettlementAccount}>
                  {this.getInputField('settlementAccount', object.settlementAccount)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.contractorFieldCorrespondentAccount}>
                  {this.getInputField('correspondentAccount', object.correspondentAccount)}
                </FormItem>
              </Col>
              <Col className="gutter-row" span={8}>
                <FormItem label={this.props.intl.messages.contractorFieldBankIdentificationCode}>
                  {this.getInputField('bankIdentificationCode', object.bankIdentificationCode)}
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(OrganizationPath.CONTRACTOR_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(ContractorEdit));
