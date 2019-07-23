<!--忘记密码-->
<template>
    <div class="forget-psw-wrapper">
        <div class="tip-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>

        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-form ref="forgetPswForm" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="手机号" prop="phone">
                        <el-input placeholder="请输入手机号" v-model="form.phone" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <el-row>
                            <el-col :span="16" style="padding-right:10px;">
                                <el-input placeholder="请输入验证码" v-model="form.code" show-password maxlength="6"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button v-if="seconds==60" type="primary" @click.native.prevent="getCode" class="code-btn" :disabled="!/^1[3456789]\d{9}$/.test(form.phone)">获取验证码</el-button>
                                <el-button v-else type="primary" disabled class="code-btn">{{seconds}}s后重新获取</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPsw">
                        <el-input placeholder="请输入新密码" type="password" v-model="form.newPsw" show-password></el-input>
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
    import {forgetPsw, getCode}  from '@/api/login'
    export default {
        name: 'forgetPsw',
        props: {
            showDia: Boolean
        },
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
                seconds: 60,        // 获取验证码倒计时
                form: {
                    phone: '',      // 手机号
                    code: '',       // 验证码
                    newPsw: '',     // 新密码
                },
                loading: false,

                rules: {
                    phone: [
                        {validator: validatePhone, required: true, trigger: 'blur'}
                    ],
                    code: [
                        {validator: validateCode, required: true, trigger: 'blur'}
                    ],
                    newPsw: [
                        {validator: validateNewPsw, required: true, trigger: 'blur'}
                    ],
                }
            }
        },

        methods: {
            // 提交修改
            onSubmit() {
                this.$refs.forgetPswForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        forgetPsw(this.form).then(res => {
                            this.loading = false;
                            if(res.code === 200) {
                                this.$emit('completeAct');       // 关闭弹窗
                            } else {
                                this.$message.error(res.msg);
                            }
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                })
            },

            // 获取验证码
            getCode() {
                this.seconds--;
                let timer = setInterval(() => {
                    this.seconds--;
                    if(this.seconds ===0) {
                        clearInterval(timer);
                        this.seconds = 60;
                    }
                }, 1000)
                getCode({phone: this.form.phone}).then(res => {
                    if(res.code === 200) {
                        this.$message({
                            message: '验证码已发送',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        },

        watch: {
            // 弹窗关闭后清空表单
            showDia: function (val) {
                if(!val) {
                    this.resetForm('forgetPswForm');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .forget-psw-wrapper {
        .tip-words {
            text-align: center;
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 15px;
        }
        .code-btn {
            width: 100%;
        }
    }
</style>
