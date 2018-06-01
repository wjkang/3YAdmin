import React from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';

class MyBreadcrumb extends React.Component {
    render() {
        return (
            <Breadcrumb style={this.props.style}>
                <Breadcrumb.Item>
                    <Link to="/app/home"><Icon type="home" /></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Icon type="user" />
                    <span>Application List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Application
                 </Breadcrumb.Item>
            </Breadcrumb>

        );
    }
}
export default MyBreadcrumb;