import React from 'react';
import { Input, Icon } from 'antd';

class SearchInput extends React.Component {
    state = {
        value: '',
        prefix: 'search'
    }
    onChangeValue = (e) => {
        this.setState({ value: e.target.value });
    }
    onFocus = (e) => {
        this.setState({ prefix: 'arrow-left' })
    }
    onBlur = (e) => {
        this.setState({ prefix: 'search' })
    }
    render() {
        const { value } = this.state;
        return (
            <Input
                placeholder="Search Input"
                prefix={<Icon type={this.state.prefix} style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={value}
                onChange={this.onChangeValue}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />
        );
    }
}
export default SearchInput;