//不需要后台返回的菜单
export default [{
    name: 'example',
    title: '例子',
    leftMemu: true,
    children: [
        {
            name: 'permission_test',
            title: '权限测试页',
            icon: 'user',
            leftMemu: true,
        },
        {
            name: 'error',
            title: '错误页面',
            icon: 'user',
            leftMemu: true,
            children: [
                {
                    name: 'error_404',
                    title: '404',
                    leftMemu: true,
                },
                {
                    name: 'error_403',
                    title: '403',
                    leftMemu: true,
                }
            ]
        },
        {
            name: 'form',
            title: 'JSON表单',
            icon: 'user',
            leftMemu: true,
            children: [
                {
                    name: 'search_form',
                    title: 'Search Form',
                    leftMemu: true,
                },
                {
                    name: 'common_form',
                    title: 'Common Form',
                    leftMemu: true,
                },
                {
                    name: 'dynamic_form',
                    title: 'Dynamic Form',
                    leftMemu: true,
                }
            ]
        }
    ]
}]