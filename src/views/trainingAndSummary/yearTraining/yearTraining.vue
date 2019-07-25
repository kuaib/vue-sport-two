<!--年训练管理-->
<template>
    <div class="year-training-wrapper">
        <!--搜索-->
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="planId">
                        <el-input placeholder="请输入年计划id" v-model="searchForm.planId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="sport">
                        <el-select v-model="searchForm.sport" placeholder="请选择项目 Select Sport">
                            <el-option v-for="item in sportItem" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="team">
                        <el-select v-model="searchForm.team" placeholder="选择队伍 Select Team" @change="changeC">
                            <el-option v-for="item in testItem" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button type="success" v-waves @click="handleFilter" style="float: right;">创建年计划</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="search-item">
                <el-col :span="6">
                    <el-form-item prop="coach">
                        <el-select v-model="searchForm.coach" placeholder="请选择教练 Select Coach" @change="changeC">
                            <el-option v-for="item in coachList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="year">
                        <el-select v-model="searchForm.year" placeholder="请选择训练年度 Select Year" @change="changeC">
                            <el-option v-for="item in yearList" :label="item.dicValue" :value="item.dicKey"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button type="primary" v-waves icon="el-icon-search" @click="handleSearch">搜索 Search</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item prop="name">
                        <el-button class="search" type="info" v-waves @click="resetForm('searchForm')">重置 Reset</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--表格-->
        <el-row>
            <div>搜索结果</div>
            <el-table :data="list" v-loading="listLoading" border fit highlight-current-row
                      style="width: 100%;">
                <el-table-column align="center" label="年计划id">
                    <template slot-scope="scope">
                        <span>{{scope.row.teamName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="项目">
                    <template slot-scope="scope">
                        <span>{{scope.row.specialName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="队伍">
                    <template slot-scope="scope">
                        <span>{{scope.row.categoryName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="训练年度">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="教练员">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="提交时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.organizationName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="toDetail(scope.row)">详情</el-button>
                        <el-button size="mini" type="success" @click="toEdit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="listQuery.current" :page-sizes="[10,20,30, 50]"
                               :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper"
                               :total="total">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sportItem: [],  // 项目列表
                coachList: [],  // 教练列表
                yearList: [],   // 年度列表
                searchForm: {
                    planId: '',
                    sport: '',
                    team: '',
                    coach: '',
                    year: ''
                },

                list: null,         // table列表
                total: null,        // 总条目数
                listLoading: true,  // 查询table的loading
                listQuery: {
                    current: 1,
                    pageSize: 10,
                    keyWord: null
                }
            }
        },

        methods: {
            // 去详情
            toEdit(row) {
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

            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .year-training-wrapper {

    }
</style>