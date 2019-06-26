<template>
    <div class="login-wrapper">
        <div class="tips-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>


        <el-card class="login-form-wrapper">
            <div slot="header" class="clearfix">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="1">短信验证码登陆</el-menu-item>
                    <el-menu-item index="2">密码登陆</el-menu-item>
                </el-menu>
            </div>
            <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                     label-position="left">
                <el-form-item prop="username">
                    <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入手机号"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="17" style="padding-right: 20px;">
                        <el-form-item prop="password">
                            <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin"
                                      v-model="loginForm.password" autoComplete="on"
                                      placeholder="请输入验证码"></el-input>
                            <span class="show-pwd" @click="showPwd">
                                <svg-icon v-show="passwordType==='password'" icon-class="eyeclose"/>
                                <svg-icon v-show="!passwordType" icon-class="eye"/>
                            </span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-button v-if="seconds==60" type="primary" @click.native.prevent="getCode" class="code-btn">获取验证码</el-button>
                        <el-button v-else type="primary" disabled class="code-btn">{{seconds}}s后重新获取</el-button>
                    </el-col>
                </el-row>

                <div class="tips">
                    <span @click="showDialog=true">{{$t('login.forgetPswd')}}？</span>
                </div>
                <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
            </el-form>
        </el-card>




        <el-dialog :title="$t('login.forgetPswd')" :visible.sync="showDialog" append-to-body>
            <forget-psw/>
        </el-dialog>

    </div>
</template>

<script>
    import LangSelect from '@/components/LangSelect'
    // import forgetPswd from './forgetPswd'
    import forgetPsw from './forgetPsw'

    export default {
        components: {LangSelect, forgetPsw},
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('请输入用户名'))
                } else if (this.syncTextUser) {
                    callback(new Error(this.$t('login.usernameW2')))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else if (value.length < 6) {
                    callback(new Error('密码长度不能小于6位'))
                } else {
                    callback()
                }
            }
            return {
                activeIndex: '1',
                seconds: 60,
                loginForm: {
                    username: 'admin',
                    password: '1234567'
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                loading: false,
                showDialog: false
            }
        },
        methods: {
            // 密码可见性切换
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                            this.loading = false;
                            this.$router.push({path: '/'})
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    $bg: #283443;
    $light_gray: #eee;
    $cursor: #fff;
    $dark_gray: #889aa4;
    .login-wrapper {
        position: fixed;
        height: 100%;
        width: 100%;
        background: url('../../assets/images/background.jpeg') no-repeat;
        background-size: cover;

        .tips-words {
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            padding-top: 30px;
            color: #fff;
        }

        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .login-form-wrapper {
            width: 50%;
            position: absolute;
            left: 50%;
            top: 150px;
            background: rgba(255,255,255, 0.2);
            border: none !important;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            transform: translateX(-50%);

            .el-card__header {
                border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
                .el-menu--horizontal {
                    border-bottom: none !important;
                    background: transparent;
                }
            }

            .el-menu--horizontal>.el-menu-item.is-active {
                font-weight: 700;
                color: #fff;
                font-size: 18px;
                border-bottom: 2px solid rgba(255, 255, 255, 0.3) !important;
            }
            .el-menu--horizontal>.el-menu-item {
                color: #fff;
            }

            .el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
                background: transparent !important;
                color: #fff;
            }


            .login-form {
                width: 55%;
                margin: 0 auto;
            }



            .tips {
                font-size: 14px;
                color: #fff;
                cursor: pointer;
            }
            .svg-container {
                padding: 6px 5px 6px 15px;
                color: $dark_gray;
                vertical-align: middle;
                width: 30px;
                display: inline-block;
                &_login {
                    font-size: 20px;
                }
            }
            .title-container {
                position: relative;
                .title {
                    font-size: 26px;
                    color: $light_gray;
                    margin: 0px auto 40px auto;
                    text-align: center;
                    font-weight: bold;
                }
                .set-language {
                    color: #fff;
                    position: absolute;
                    top: 5px;
                    right: 0px;
                }
            }
            .show-pwd {
                position: absolute;
                right: 10px;
                top: 7px;
                font-size: 16px;
                color: $dark_gray;
                cursor: pointer;
                user-select: none;
            }
            .loginBtn {
                position: absolute;
                right: 35px;
                bottom: 0;
                width: 140px;
            }

            .code-btn {
                width: 100%;
                height: 47px;
            }
        }
    }
</style>
