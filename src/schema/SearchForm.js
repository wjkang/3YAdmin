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
    // this.formComponent是通过ref方式获取到的一个react组件
    const obj = this.formComponent.getFieldsValue();

    // 还是要交给上层组件处理
    this.props.handleSubmit(obj);
  };

  /**
   * @description 清空表单
   * @param e
   */
  handleReset = (e) => {
    e.preventDefault();
    this.formComponent.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    console.log("SearchForm render");
    const { schema, uiSchema } = this.props;

    // 根据当前的schema, 获取对应的表单组件
    const FormComponent = searchFormSchemaUtil.getForm(schema, uiSchema);


    // 表单的前面是一堆输入框, 最后一行是按钮
    return (
      <div>
        <FormComponent style={{display: this.state.expand ? 'inline' : 'none'}} ref={(form) => { this.formComponent = form; }} />
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <span style={{ display: this.state.expand ? 'inline' : 'none' }}>
              <Button type="primary" htmlType="submit">查询</Button>
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