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



export default util;
