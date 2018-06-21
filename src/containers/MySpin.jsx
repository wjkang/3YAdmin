import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';

class MySpin extends React.PureComponent {
    render() {
        const PageRouters = this.props.pageRouters;
        return (
            <Spin size="large" spinning={this.props.spinLoading}>
                <PageRouters>
                </PageRouters>
            </Spin>
        );
    }
}

const mapStateToPorps = state => {
    const { spinLoading } = state.app;
    return { spinLoading };
};
export default connect(mapStateToPorps, null)(MySpin)


