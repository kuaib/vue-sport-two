<template>
    <div class="change-psw-wrapper">
        <div class="tip-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>

        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-form ref="changePswForm" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="手机号" prop="phone">
                        <el-input placeholder="请输入手机号" v-model="form.phone" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-row>
                            <el-col :span="18" style="padding-right:10px;">
                                <el-input placeholder="请输入验证码" v-model="form.code" show-password maxlength="6"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" @click.native.prevent="getCode">获取验证码</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPsw">
                        <el-input placeholder="请输入新密码" v-model="form.newPsw" show-password></el-input>
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
        name: 'changePsw',
        data() {
            let validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback(new Error('手机号格式不正确'));
                } else {
                    callback();
                }
            };
            let validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (!/^\d+$/.test(value)) {
                    callback(new Error('验证码必须是数字'));
                } else {
                    callback();
                }
            };
            let validateNewPsw = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    callback();
                }
            };
            return  {
                form: {
                    phone: '',      // 手机号
                    code: '',       // 验证码
                    newPsw: '',     // 新密码
                },
                loading: false,

                rules: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCode, trigger: 'blur'}
                    ],
                    newPsw: [
                        {validator: validateNewPsw, trigger: 'blur'}
                    ],
                }
            }
        },

        methods: {
            onSubmit() {
                this.$refs.changePswForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        forgePsw(this.form).then(res => {
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
    .change-psw-wrapper {
        .tip-words {
            text-align: center;
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 15px;
        }
    }
</style>
