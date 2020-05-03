import Sidebar from './sidebar';
import Header from './header';
import { Row, Col, Layout } from 'antd';
// const { Header, Footer, Sider, Content } = Layout;

class LayoutCms extends React.Component {
    render() {
        return (
            <Row type="flex">                
                {/* <Col offset={4} span={20} className="sticky top-0 z-30">
                    <Header />
                </Col> */}
                <Col span={24}>
                    <Row type="flex">
                        <Col span={5}>
                            <Sidebar />
                        </Col>
                        <Col span={17} offset={1}>
                            <div className="py-8">
                                {this.props.children}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default LayoutCms;


{/* <Layout>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout> */}
