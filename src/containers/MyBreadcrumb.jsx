import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb, Icon } from 'antd';
import MenuToRouter from '@/menuMapToRouter';
import util from '@/utils/util';

class MyBreadcrumb extends React.PureComponent {
    state = {
        map: [{
            name: "home",
            title: "首页",
            icon: "home",
            path: "/app/home"
        }]
    }
    componentWillReceiveProps(nextProps) {
        let newMap = [
            {
                name: "home",
                title: "首页",
                icon: "home",
                path: "/app/home"
            }
        ];
        let name = Object.keys(MenuToRouter).find(key => MenuToRouter[key] === nextProps.location.pathname);
        if (name) {
            let parents = util.getParentMenusByName(this.props.openAccessMenu, name);
            for (let p of parents) {
                newMap.push({
                    title: p.title,
                    name: p.name
                });
            }
            this.setState({
                map: newMap
            })
        }

    }
    render() {
        console.log("MyBreadcrumb render")
        return (
            <Breadcrumb style={this.props.style}>
                {this.state.map.map(
                    item =>
                        <Breadcrumb.Item key={item.name}>
                            {item.path ?
                                <Link to={item.path}><Icon type={item.icon} /><span>{item.title}</span></Link>
                                :
                                <span>{item.title}</span>}
                        </Breadcrumb.Item>
                )}
            </Breadcrumb>

        );
    }
}
const mapStateToProps = state => {
    return {
        openAccessMenu: state.app.openAccessMenu
    }
}
export default withRouter(connect(mapStateToProps)(MyBreadcrumb));
