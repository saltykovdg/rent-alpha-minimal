import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin, Input } from 'antd';

import * as RecalculationTypePath from './../paths/RecalculationTypePath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class RecalculationTypeEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditRecalculationTypeTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    baseFields.push(this.getBaseFormField('code', object.code, <Input key="code" type="hidden" />));
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={RecalculationTypePath.RECALCULATION_TYPE_LIST}><FormattedMessage id="recalculationTypeTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.recalculationTypeFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <FormItem label={this.props.intl.messages.recalculationTypeFieldNameOrigin}>
              {this.getInputField('nameOrigin', object.nameOrigin, false, true)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(RecalculationTypePath.RECALCULATION_TYPE_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(RecalculationTypeEdit));
