import React from 'react'
import { Table, Input, Button, Icon, message } from 'antd';
import cookies from 'next-cookies';
import _ from 'lodash';
import { mealList, inactiveMeal } from '../../api/meal';
import Layout from '../../components/layout/navbar';
import Highlighter from 'react-highlight-words';
import TestData from '../../test.json'
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {},
            loading: false,
            searchText: '',
            selectedRowKeys: [],
        }
    }

    static async getInitialProps(req) {
        const { apiToken } = cookies(req);
        if (_.isEmpty(apiToken)) {
            req.res.writeHead(302, { Location: '/' });
            req.res.end()
            return;
        }
        let experiences = await mealList(apiToken);
        return { experiences, apiToken };
    }
    componentDidMount() {
        this.fetch();
    }
    start = async () => {
        // ajax request after empty completing        

        if (!_.isEmpty(this.state.selectedRowKeys)) {
            this.setState({ loading: true });
            const mealInactiveApi = await inactiveMeal(this.props.apiToken, this.state.selectedRowKeys);
            if (mealInactiveApi && mealInactiveApi.data) {
                setTimeout(() => {
                    this.setState({
                        selectedRowKeys: [],
                        loading: false,
                    });
                }, 1000);
                message.success("Meal Successfully Deleted.", 7);
                window.location.reload();
            } else {
                this.setState({ loading: false });
                message.error("Some Error occurred", 7)
            }
        }
    };

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex] ?
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()) : ''
        ,

        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            text ?
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                /> : ''
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        let count = _.isEmpty(params) ? TestData.data.length : 0;

        pagination.total = count;
        this.setState({
            loading: false,
            data: TestData.data,
            pagination,
        });
    };

    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                key: 'date',
                title: 'Date',
                dataIndex: 'date',
                ...this.getColumnSearchProps('date'),
                // filteredValue: null,
                // onFilter: (value, record) => record.title.includes(value),
                sorter: (a, b) => a.title.localeCompare(b.title),
                // sortDirections: ['descend', 'ascend'],
                // filters: [{ text: 'title', value: 'title' }],
                // width: '20%',




            },
            {
                title: 'Text',
                dataIndex: 'name',
                ...this.getColumnSearchProps('name'),
                // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                // width: '20%',
                sorter: (a, b) => a.cityName.localeCompare(b.cityName),
            },
            {
                title: 'No of Calories',
                dataIndex: 'no_of_calories',
                ...this.getColumnSearchProps('no_of_calories'),
                sorter: (a, b) => a.countryName.localeCompare(b.countryName),
                // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
                // { return moment(a.publishedAt).unix() - moment(b.publishedAt).unix()}
                // sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Action',
                dataIndex: '_id',
                key: '_id',
                render: _id => <a href={`/meal/edit/` + _id}>EDIT</a>,
            },
        ];
        return (
            <div>
                <Layout>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                            Delete Checked
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        rowKey={record => record._id}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                    // scroll={{ y: 440 }}
                    // pagination={this.props.experiences.data.length}
                    />
                </Layout>
            </div>

        )
    }

}

export default List
