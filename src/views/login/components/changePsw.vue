<template>
    <div class="change-psw-wrapper">
        <div class="tip-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>

        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="初始密码" prop="initPsw">
                        <el-input placeholder="请输初始密码" type="password" v-model="form.initPsw" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPsw">
                        <el-input placeholder="请输入新密码" type="password" v-model="form.newPsw" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPsw">
                        <el-input placeholder="请输入确认密码" type="password" v-model="form.confirmPsw" show-password></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">更改密码</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {changePsw}  from '@/api/login'

    export default {
        data() {
            let validateNewPsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.form.newPsw !== '') {
                        this.$refs.form.validateField('confirmPsw');
                    }
                    callback();
                }
            };
            let validateConfirmPsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPsw) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return  {
                input: '',
                form: {
                    initPsw: '',       // 初始密码
                    newPsw: '',        // 新密码
                    confirmPsw: '',    // 确认密码
                },
                loading: false,

                rules: {
                    initPsw: [
                        { required: true, message: '请输入初始密码', trigger: 'blur' }
                    ],
                    newPsw: [
                        { validator: validateNewPsw, required: true, trigger: 'blur' }
                    ],
                    confirmPsw: [
                        { validator: validateConfirmPsw, required: true, trigger: 'blur' }
                    ],
                }
            }
        },

        methods: {
            onSubmit() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        changePsw(this.form).then(res => {
                            this.loading = false;
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import url("//unpkg.com/element-ui@2.10.0/lib/theme-chalk/index.css");
    .change-psw-wrapper {
        .tip-words {
            text-align: center;
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 15px;
        }
    }
</style>
