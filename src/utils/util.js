let util = {

};
util.title = function (title) {
    title = title || 'vue.quasar.admin';
    window.document.title = title;
};

util.getMenuByName = function (name, menulist) {
    let menu = {};
    let forFn = function (name, menulist) {
        for (var item of menulist) {
            if (item.name === name) {
                menu = item;
            } else {
                if (item.children && item.children.length > 0) {
                    forFn(name, item.children)
                }
            }
            if (menu.name) {
                break;
            }
        }
    }
    forFn(name, menulist);
    return menu;
}

util.getTreeEleByPropertyValue = function (value, property, list) {
    let ele = {};
    let forFn = function (value, property, list) {
        for (var item of list) {
            if (item[property] === value) {
                ele = item;
            } else {
                if (item.children && item.children.length > 0) {
                    forFn(value, property, item.children)
                }
            }
            if (ele[property]) {
                break;
            }
        }
    }
    forFn(value, property, list);
    return ele;
}

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};
util.getParentMenusByName = function (openAccesseMenu, name) {
    let temp = [];
    let forFn = function (openAccesseMenu, name) {
        for (var item of openAccesseMenu) {
            if (item.name === name && item.path !== "/") {
                temp.push(item);
                forFn(openAccesseMenu, item.parentName);
            }
        }
    };
    forFn(openAccesseMenu, name);
    temp.reverse()
    return temp;
};

util.getTreeEleWithParent = function (id, list) {
    let temp = [];
    let forFn = function (id, list) {
        for (var item of list) {
            if (item.id == id) {
                let newItem = { ...item }
                temp.push(newItem);
                forFn(item.parentId, list);
            }
        }
    };
    forFn(id, list);
    temp.reverse()
    return temp;
};

util.handleTitle = function (vm, item) {
    return item.title;
};


util.openAccesseMenu = function (accesseMenu) {
    let openAccesseMenu = [];
    let forFn = function (menulist, parentName) {
        for (var item of menulist) {
            item.parentName = parentName;
            openAccesseMenu.push(item)
            if (item.children && item.children.length > 0) {
                forFn(item.children, item.name)
            }
        }
    }
    forFn(accesseMenu, '');
    return openAccesseMenu;
}

util.openTreeData = (data) => {
    let openAccesseMenu = [];
    let forFn = function (data) {
        for (var item of data) {
            openAccesseMenu.push({ ...item })
            if (item.children && item.children.length > 0) {
                forFn(item.children)
            }
        }
    }
    forFn(data);
    return openAccesseMenu;
}

export default util;

export function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
