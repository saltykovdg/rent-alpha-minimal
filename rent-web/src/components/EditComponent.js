import React, { PropTypes } from 'react';
import { Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';
import { ExtendedComponent } from './ExtendedComponent';

class EditComponent extends ExtendedComponent {
  getBaseFormField = (name, value, input) => {
    return this.props.form.getFieldDecorator(name, { initialValue: value })(input);
  };
  getBaseFields = (object) => {
    const fields = [];
    fields.push(this.getBaseFormField('id', object.id, <Input key="id" type="hidden" />));
    fields.push(this.getBaseFormField('creationDate', object.creationDate, <Input key="creationDate" type="hidden" />));
    fields.push(this.getBaseFormField('lastModifiedDate', object.lastModifiedDate, <Input key="lastModifiedDate" type="hidden" />));
    fields.push(this.getBaseFormField('version', object.version, <Input key="version" type="hidden" />));
    return fields;
  };
  getInputField = (name, value, required = true, disabled = false) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(!disabled ? <Input /> : <Input disabled />);
  };
  getInputNumberField = (name, value, step = 1, required = true) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        type: 'number',
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(<InputNumber min={0} step={step} />);
  };
  getDateField = (name, value, required = true, disabled = false) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value ? moment(value) : null,
      rules: [{
        type: 'object',
        required,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(!disabled ? <DatePicker /> : <DatePicker disabled />);
  };
  getLink = (object) => {
    let link = '';
    if (object && object.links) {
      link = object.links[0].href.replace('{?projection}', '');
    }
    return link;
  };
  getSelectWithSearchField = (name, value, values, onChange = () => {}) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: value,
      rules: [{
        required: true,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(
      <Select
        showSearch
        placeholder={this.props.intl.messages.findPlaceholder}
        optionFilterProp="children"
        onChange={onChange}
        notFoundContent=""
      >
        {values}
      </Select>
    );
  };
  getSelectField = (name, value, values) => {
    return this.props.form.getFieldDecorator(name, {
      initialValue: this.getLink(value),
      rules: [{
        required: true,
        message: this.props.intl.messages.fieldIsEmptyError,
      }],
    })(<Select notFoundContent="">{values}</Select>);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error && !this.props.isLoading) {
        this.props.onSave(values);
      }
    });
  };
}

EditComponent.propTypes = {
  intl: PropTypes.objectOf(PropTypes.shape),
  form: PropTypes.objectOf(PropTypes.shape),
  isLoading: PropTypes.bool,
  onSave: PropTypes.func,
};

EditComponent.contextTypes = {
  router: PropTypes.object,
};

module.exports = {
  EditComponent,
};
