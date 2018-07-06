import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import searchFormSchemaUtil from './searchFormSchemaUtil';
class SearchForm extends React.PureComponent {
  state = {
    expand: true
  }

  /**
   * @description 处理表单提提交
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const obj = this.formRef.props.form.getFieldsValue();

    // 还是要交给上层组件处理
    this.props.handleSubmit(obj);
  };

  /**
   * @description 清空表单
   * @param e
   */
  handleReset = (e) => {
    e.preventDefault();
    this.formRef.props.form.resetFields();
    this.props.handleReset();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    console.log("SearchForm render");
    const { schema, uiSchema, noCacheSchema } = this.props;

    // 根据当前的schema, 获取对应的表单组件
    const FormComponent = searchFormSchemaUtil.getForm(schema, uiSchema, noCacheSchema);


    // 表单的前面是一堆输入框, 最后一行是按钮
    //使用wrappedComponentRef https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140
    return (
      <div>
        <FormComponent noCacheSchema={noCacheSchema} schema={schema} uiSchema={uiSchema} style={{ display: this.state.expand ? 'inline' : 'none' }} wrappedComponentRef={(instance) => { this.formRef = instance; }} />
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <span style={{ display: this.state.expand ? 'inline' : 'none' }}>
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                清空
                        </Button>
            </span>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              {this.state.expand ? '收起查询' : '展开查询'} <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchForm