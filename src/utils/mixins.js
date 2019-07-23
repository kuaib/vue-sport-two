/**
 * 全局混入
 */

import {getBigItem, getSmallItem, getTeamItem, getGroupItem} from '@/api/common'
export default {
    data() {
        return {
            bigList: [],      // 大项列表
            smallList: [],    // 小项列表
            teamList: [],     // 队伍列表
            groupList: [],    // 分组列表
        }
    },

    methods: {
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // // 获取大项列表
        getBigList() {
            getBigItem().then(res => {
                if(res.code === 200) {
                    this.bigList = res.data.cateList;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },

        // 获取小项列表
        getSmallList() {
            getSmallItem().then(res => {
                if(res.code === 200) {
                    this.smallList = res.data.specialList;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },

        // 获取队伍列表
        getTeamList() {
            getTeamItem().then(res => {
                if(res.code === 200) {
                    this.teamList = res.data.orgList;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },

        // 获取组列表
        getGroupList() {
            getGroupItem().then(res => {
                if(res.code === 200) {
                    this.groupList = res.data.orgList;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
    }
}