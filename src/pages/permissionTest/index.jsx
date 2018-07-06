import React from 'react';
import '@/style/page403.less';

class Page403 extends React.PureComponent {
    render() {
        return (

            <div id='error-page'>
                <div id='error-inner'>
                    <h1>你没有权限访问这个页面！</h1>
                    <div className="pesan-eror">403</div>
                    <div className="balik-home">
                      <p className='balik-home-content'>Back to Home, your handsome dad here!</p>
                    </div><br />
                </div>
            </div>

        )
    }
}
export default Page403;