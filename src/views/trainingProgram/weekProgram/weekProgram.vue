<template>
    <div class="week-program-wrapper">
        <el-row :gutter="10">
            <el-col :span="6">
                <search-item></search-item>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeTab" type="card" @tab-click="tabChange">
                    <el-tab-pane label="成组训练 Group Training" name="group">
                        <training-details></training-details>
                    </el-tab-pane>
                    <el-tab-pane label="个人训练 Personal Training" name="personal">
                        <training-details></training-details>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import trainingDetails from './components/trainingDetails'
    export default {
        name: 'weekProgram',
        components: {trainingDetails},
        data() {
            return {
                activeTab: 'group',     // 组/个人标签切换
            }

        },

        methods: {
            // 组/个人标签切换
            tabChange() {

            }
        }
    }
</script>
