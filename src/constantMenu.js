//不需要后台返回的菜单
export default [{
    name: 'example',
    title: '例子',
    leftMemu: true,
    children: [
        {
            name: 'permission_test',
            title: '权限测试页',
            leftMemu: true,
        },
        {
            name: 'error',
            title: '错误页面',
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
            title: '表单',
            leftMemu: true,
            children: [
                {
                    name: 'json_form',
                    title: 'json表单',
                    leftMemu: true,
                }
            ]
        }
    ]
}]