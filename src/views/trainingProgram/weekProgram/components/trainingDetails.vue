<template>
    <div class="training-details-wrapper">
        <el-row class="item-row training-target">
            <h3><span>{{title}}</span> 本周训练目标：</h3>
            <el-input type="textarea" v-model="trainingTarget" resize="none" :autosize="{minRows: 3}" placeholder="请输入训练目标"></el-input>
        </el-row>
        <el-row class="item-row week">
            <ul class="clearfix">
                <li v-for="item in weekList">{{item.day}} ({{item.weekDay}})</li>
            </ul>
        </el-row>
        <el-row class="item-row">
            <training-item></training-item>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                trainingTarget: '',     // 训练目标
                weekList: [
                    {day: '2019-02-03', weekDay: '周一'},
                    {day: '2019-02-04', weekDay: '周二'},
                    {day: '2019-02-05', weekDay: '周三'},
                    {day: '2019-02-06', weekDay: '周四'},
                    {day: '2019-02-07', weekDay: '周五'},
                    {day: '2019-02-08', weekDay: '周六'},
                    {day: '2019-02-09', weekDay: '周日'},
                ],           // 一周展示
            }
        },

        props: {
            title: {
                type: String,
                default: '哈哈哈哈'
            }
        },

        methods: {
            // 获取一周列表
            getWeekList() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .training-details-wrapper {
        .training-target {
            h3 {
                margin-bottom: 10px;
                font-weight: normal;
                span {
                    color: #67C23A;
                    font-weight: 700;
                }
            }
        }

        .item-row {
            margin-bottom: 15px;
        }

        .week {
            ul {
                display: flex;
                justify-content: space-between;
                border: 1px solid #dcdfe6;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                li {
                    border-right: 1px solid #dcdfe6;
                    padding: 10px 15px;
                    &:last-child {
                        border: none;
                    }
                }
            }
        }
    }

</style>