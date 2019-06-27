<!--密码登录-->
<template>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
        <el-form-item prop="phone">
            <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="on" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"></el-input>
            <span class="show-pwd" @click="showPwd">
                <svg-icon v-show="passwordType==='password'" icon-class="eyeclose"/>
                <svg-icon v-show="!passwordType" icon-class="eye"/>
            </span>
        </el-form-item>

        <el-row>
            <el-col :span="8">
                <el-checkbox v-model="remerberPswd">记住密码</el-checkbox>
            </el-col>
            <el-col :span="8">修改密码</el-col>
            <el-col :span="8">忘记密码？</el-col>
        </el-row>

        <div class="tips-item">
            <span @click="showDialog=true">{{$t('login.forgetPswd')}}？</span>
        </div>
        <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="onSubmit">{{$t('login.logIn')}}</el-button>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                remerberPswd: false     // 是否记住密码
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
                        this.$emit('onSubmit', {phone: this.loginForm.phone, password: this.loginForm.password})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 密码可见性切换
            showPwd() {
                this.passwordType = this.passwordType === 'password' ? '' : 'password'
            },
        }
    }
</script>

<style lang="scss" scoped>
    .login-form {
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: #889aa4;
            cursor: pointer;
            user-select: none;
        }

        .tips-item {
            font-size: 14px;
            color: #fff;
            cursor: pointer;
        }
    }
</style>
