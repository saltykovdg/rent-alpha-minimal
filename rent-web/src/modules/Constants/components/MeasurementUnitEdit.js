import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Breadcrumb, Icon, Button, Form, Spin } from 'antd';

import * as MeasurementUnitPath from './../paths/MeasurementUnitPath';
import { EditComponent } from './../../../components/EditComponent';

const FormItem = Form.Item;

class MeasurementUnitEdit extends EditComponent {
  render() {
    const object = this.props.data;
    const titleItem = this.props.id ? <FormattedMessage id="editPageEditTitle" /> : <FormattedMessage id="editPageCreateTitle" />;
    const baseFields = this.getBaseFields(object);
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/"><Icon type="home" /></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item><FormattedMessage id="constantsTitle" /></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={MeasurementUnitPath.MEASUREMENT_UNIT_LIST}><FormattedMessage id="measurementUnitTitle" /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>{titleItem}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{titleItem}</h1>
        <Spin spinning={this.props.isLoading}>
          <Form vertical onSubmit={this.handleSubmit}>
            {baseFields}
            <FormItem label={this.props.intl.messages.measurementUnitFieldName}>
              {this.getInputField('name', object.name)}
            </FormItem>
            <FormItem label={this.props.intl.messages.measurementUnitFieldNameOrigin}>
              {this.getInputField('nameOrigin', object.nameOrigin, false, true)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit"><FormattedMessage id="buttonSave" /></Button>
              <Button className="pull-right" onClick={() => this.forwardTo(MeasurementUnitPath.MEASUREMENT_UNIT_LIST)}>
                <FormattedMessage id="buttonCancel" />
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Form.create()(injectIntl(MeasurementUnitEdit));
