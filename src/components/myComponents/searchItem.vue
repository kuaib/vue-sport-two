<!--训练计划页面左侧搜索插件-->
<template>
    <div class="select-item-wrapper">
        <div class="row-item">
            <el-select clearable v-model="listQuery.bigId" placeholder="大项">
                <el-option v-for="item in bigList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey" @change="changeBig"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.smallId" placeholder="小项">
                <el-option v-for="item in smallList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.teamId" placeholder="队伍">
                <el-option v-for="item in teamList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-select clearable v-model="listQuery.groupId" placeholder="分组">
                <el-option v-for="item in groupList" :label="item.dicValue" :value="item.dicKey"
                           :key="item.dicKey"></el-option>
            </el-select>
        </div>
        <div class="row-item">
            <el-date-picker v-model="startDate" type="date" placeholder="开始时间" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="row-item">
            <el-date-picker v-model="endDate" type="date" placeholder="结束时间" value-format="yyyy-MM-dd"></el-date-picker>
        </div>
        <div class="row-item">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="请输入组名关键字" v-model="listQuery.searchKey">
            </el-input>
        </div>
        <div class="row-item act-btn">
            <el-button class="search" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索 Search</el-button>
        </div>


        <div class="row-item">
            <div class="title">组列表 Group List</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row @row-click="selectRow"
                      style="width: 100%" ref="groupTable">
                <el-table-column align="center" :render-header="renderHeader" label="组名 Group">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :render-header="renderHeader" label="队伍 Team">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.current" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="prev, pager, next"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import { getTeamList } from '@/api/team'
    export default ({
        directives: {waves},
        data() {
            return {
                list: [],           // table列表
                listLoading: false, // table loading

                startDate: '',      // 开始时间
                endDate: '',        // 结束时间

                total: null,        // 总条目数
                listQuery: {        // 查询条件
                    current: 1,
                    pageSize: 10,
                    searchKey: null,
                    bigId: null,
                    smallId: null,
                    teamId: null,
                    groupId: null
                }
            }
        },
        created() {
            this.getBigList();
        },
        methods: {
            // 获取队伍列表
            getList() {
                this.listLoading = true;
                // getTeamList(this.listQuery.current, this.listQuery.pageSize, this.listQuery.keyWord).then(res => {
                getTeamList({
                    specialId: this.listQuery.specialId,
                    orgId: this.listQuery.organizationId,
                    cateId: this.listQuery.categoryId,
                    currentPage: this.listQuery.current,
                    pageSize: this.listQuery.pageSize,
                    keyWord: this.listQuery.searchKey,
                }).then(res => {
                    this.listLoading = false;
                    if (res.data.code === 200) {
                        const data = res.data.data;
                        this.list = data.list;
                        this.total = data.pagination.total;
                        this.listQuery.current = data.pagination.current;
                        this.$nextTick(() => { // 默认选择第一行数据
                            this.$refs.groupTable.setCurrentRow(this.list[0]);
                            this.selectRow(this.list[0])
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        })
                    }
                }).catch(rej => {
                    this.listLoading = false;
                })
            },

            // 点击行
            selectRow(row) {
                this.$emit('getTeamInfo', row)
            },

            // 点击搜索
            handleFilter() {
                this.listQuery.current = 1;
                this.getList()
            },

            // 改变每页显示条目数
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList()
            },

            // 跳转到指定页数
            handleCurrentChange(val) {
                this.listQuery.currentPage = val;
                this.getList()
            },

            // 格式化表头
            renderHeader(h, column) {
                let title = column.column.label.split(' ');
                return [h('p', {}, [title[0]]),h('p', {}, [title[1]])]
            },

            //-----------------切换搜索项------------
            changeBig(a) {
                console.log(this.listQuery.bigId)
            }
        }
    })
</script>

<style lang="scss" scoped>
    .select-item-wrapper {
        .el-pager li {
            min-width: 25.5px !important;
        }
        .row-item {
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
            .el-input {
                width: 100% !important;
            }
            .title {
                text-align: center;
                color: #333;
                margin-bottom: 10px;
            }
        }
        .act-btn {
            text-align: center;
            .search {
                width: 80%;
            }
        }
    }

</style>