//不需要后台返回的菜单
export default [{
    name: 'example',
    title: '例子',
    leftMemu: true,
    children: [
        {
            name: 'permission_test',
            title: '权限测试页',
            icon: 'key',
            leftMemu: true,
        },
        {
            name: 'error',
            title: '错误页面',
            icon: 'warning',
            leftMemu: true,
            children: [
                {
                    name: 'error_404',
                    title: '404',
                    icon:'file-unknown',
                    leftMemu: true,
                },
                {
                    name: 'error_403',
                    title: '403',
                    icon:'lock',
                    leftMemu: true,
                }
            ]
        },
        {
            name: 'form',
            title: 'JSON表单',
            icon: 'form',
            leftMemu: true,
            children: [
                {
                    name: 'search_form',
                    title: 'Search Form',
                    icon:'search',
                    leftMemu: true,
                },
                {
                    name: 'common_form',
                    title: 'Common Form',
                    icon:'edit',
                    leftMemu: true,
                },
                {
                    name: 'dynamic_form',
                    title: 'Dynamic Form',
                    icon:'credit-card',
                    leftMemu: true,
                }
            ]
        }
    ]
}]