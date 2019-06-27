<!--短信验证码登录-->
<template>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
        <el-form-item prop="phone">
            <el-input name="phone" v-model="loginForm.phone" maxlength="11" autoComplete="on" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-row>
            <el-col :span="17" style="padding-right: 20px;">
                <el-form-item prop="code">
                    <el-input name="code" v-model="loginForm.code" maxlength="6" autoComplete="on" placeholder="请输入验证码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-button v-if="seconds==60" type="primary" @click.native.prevent="getCode" class="code-btn">获取验证码</el-button>
                <el-button v-else type="primary" disabled class="code-btn">{{seconds}}s后重新获取</el-button>
            </el-col>
        </el-row>

        <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="onSubmit">{{$t('login.logIn')}}</el-button>
    </el-form>
</template>

<script>
    export default {
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
                } else if (!(/^\d+$/.test(value))) {
                    callback(new Error('验证码必须是数字'));
                } else {
                    callback();
                }
            }
            return {
                loading: false,     // 提交按钮loading
                seconds: 60,        // 获取验证码倒计时
                loginForm: {
                    phone: '',
                    code: ''
                },
                loginRules: {
                    phone: [{validator: validatePhone, trigger: 'blur'}],
                    code: [{validator: validateCode, trigger: 'blur'}],
                },
            }
        },

        methods: {
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
                aaa().then(res => {
                    if(res.code == 1) {

                    } else {

                    }
                }).catch(() => {

                })
            },

            // 登录
            onSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        aaa().then(res => {
                            if(res.code == 1) {

                            } else {
                                this.loading = false;
                            }
                        }).catch(() => {
                            this.loading = false;
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
