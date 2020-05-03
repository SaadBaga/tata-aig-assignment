import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const sidebar = () => (
    // <div className="bg-navy h-full text-white">Sidebar</div>
    <div>
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >

                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1', '2', '3']}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    style={{ height: '100%' }}
                >
                    <div className="custom-font font-bold text-4xl leading-tight text-navy text-center p-6">
                        Tata AIG
                    </div>
                    <SubMenu
                        key="sub1"
                        title={
                            <span className="custom-font text-xl ">
                                {/* <Icon type="user" /> */}
                                Meals
                            </span>
                        }
                    >
                        <Menu.Item key="18"><a className="custom-font text-lg" href="/meal/add">Add Meal</a></Menu.Item>
                        <Menu.Item key="19"><a className="custom-font text-lg" href="/meal/list">List of Meals</a></Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span className="custom-font text-xl ">
                                {/* <Icon type="laptop" /> */}
                                Users
                            </span>
                        }
                    >
                        <Menu.Item key="5"><a className="custom-font text-lg" href="/activity/add">Add User</a></Menu.Item>
                        <Menu.Item key="6"><a className="custom-font text-lg" href="/activity/list">List of Users</a></Menu.Item>

                    </SubMenu>
                </Menu>
            </Sider>
        </Layout>

    </div>
)

export default sidebar;