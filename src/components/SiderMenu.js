import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Item } = Menu;

const renderMenuItem =
    ({ name, title, icon, link}) =>
        <Item
            key={name || link}
           
        >
            <span> {title}</span>
        </Item>;

const renderSubMenu =
    ({ name, title, icon, link, children }) =>
        <SubMenu
            key={name || link}
            title={
                <span>
                    {icon && <Icon type="user" />}
                    <span>{title}</span>
                </span>
            }
            
        >
            {children && children.map(item => renderMenuItem(item))}
        </SubMenu>;

export default ({ menus, ...props }) => <Menu {...props}>
    {menus && menus.map(
        item => item.children && item.children.length ?
            renderSubMenu(item) : renderMenuItem(item)
    )}
</Menu>;