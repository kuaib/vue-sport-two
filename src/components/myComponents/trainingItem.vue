<!--训练项目-->
<template>
    <el-row class="row-item">
        <div style="margin-bottom: 10px;">
            <el-button type="primary" @click="addTab(editableTabsValue)">增加训练内容</el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
                    v-for="(item, index) in editableTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name">
                {{item.content}}
            </el-tab-pane>
        </el-tabs>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                editableTabsValue: '2',
                editableTabs: [
                    {title: 'Tab 1', name: '1', content: 'Tab 1 content'},
                    {title: 'Tab 2', name: '2', content: 'Tab 2 content'},
                    {title: 'Tab 2', name: '3', content: 'Tab 2 content'},
                    {title: 'Tab 2', name: '4', content: 'Tab 2 content'},
                    {title: 'Tab 2', name: '5', content: 'Tab 2 content'},
                    {title: 'Tab 2', name: '6', content: 'Tab 2 content'},
                    {title: 'Tab 2', name: '7', content: 'Tab 2 content'},

                    ],
                tabIndex: 2
            }
        },
        methods: {
            addTab(targetName) {
                let newTabName = ++this.tabIndex + '';
                this.editableTabs.push({
                    title: 'New Tab',
                    name: newTabName,
                    content: 'New Tab content'
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
</script>