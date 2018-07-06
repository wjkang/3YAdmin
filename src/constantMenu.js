//不需要后台返回的菜单
export default [{
    name: 'example',
    title: '例子',
    leftMemu: true,
    children: [
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
        }
    ]
}]