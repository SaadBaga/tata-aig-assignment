import { Row, Col, Button, Input, Checkbox, message } from 'antd';


const logout = () => {
    document.cookie = "apiToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location = "/"
}

const header = (props) => {
    return (
        <Row type="flex">
            <Col span={24} className="sticky top-0 z-30">
                <div className="bg-pumpkin-orange p-4 text-white brandon-font text-white font-bold text-right cursor-pointer " onClick={() => logout()}>LOGOUT</div>
            </Col>            
        </Row>
    )
}

export default header;