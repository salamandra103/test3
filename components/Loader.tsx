import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
    return isLoading ? (<div className='loader'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}></Spin>
    </div>) : null
}