<template>
    <div class="login-wrapper">
        <div class="tips-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>

        <div class="login-form-wrapper">
            <el-row class="choose-title">
                <el-col :span="12" :class="{'is-act': activeIndex==='1'}" @click.native.prevent="activeIndex='1'"><span class="words">短信验证码登陆</span></el-col>
                <el-col :span="12" :class="{'is-act': activeIndex==='2'}" @click.native.prevent="activeIndex='2'"><span class="words">密码登陆</span></el-col>
            </el-row>
            <el-row class="choose-form">
                <code-login-form v-show="activeIndex==='1'" @onSubmit="onSubmit" ref="codeLoginForm"></code-login-form>
                <pswd-login-form v-show="activeIndex==='2'" @onSubmit="onSubmit" ref="pswdLoginForm"></pswd-login-form>
            </el-row>
        </div>
    </div>
</template>

<script>
    import codeLoginForm from './components/codeLoginForm'  // 验证码登陆
    import pswdLoginForm from './components/pswdLoginForm'  // 密码登陆
    import Cookies from 'js-cookie'

    export default {
        components: {codeLoginForm, pswdLoginForm},
        name: 'login',
        data() {
            return {
                activeIndex: '2',   // 登录方式
                showDialog: false   // 是否显示弹窗
            }
        },

        methods: {
            // 登录 13333333333
            onSubmit(params, type) {
                // 测试数据
                params = {
                    username: 'admin',
                    password: '1234567'
                };
                this.$refs[type].loading = true;
                this.$store.dispatch('loginByPhone', params).then(() => {
                    this.$refs[type].loading = false;
                    if(type === 'pswdLoginForm') {
                        if(this.$refs[type].rememberPswd) {
                            Cookies.set('loginInfo', {phone: params.phone, password: params.password}, { expires: 7 });
                        } else {
                            Cookies.remove('loginInfo');
                        }
                    }
                    this.$router.replace({path: '/'})
                }).catch(() => {
                    this.$refs[type].loading = false;
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

        /*文字提示*/
        .tips-words {
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            padding-top: 30px;
            color: #fff;
        }

        /*登陆表单*/
        .login-form-wrapper {
            width: 30%;
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
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;

            /*选项切换头部*/
            .choose-title {
                padding: 0 25px;
                text-align: center;
                color: #fff;
                font-weight: 700;
                border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
                .el-col {
                    padding: 25px 0;
                    cursor: pointer;
                    &:hover {
                        color: #409EFF;
                    }
                }
                .words {
                    padding-bottom: 10px;
                }
                .is-act {
                    .words {
                        border-bottom: 2px solid #fff;
                    }
                }
            }

            /*选项切换表单*/
            .choose-form {
                padding: 20px 0;
                .login-form {
                    width: 80%;
                    margin: 0 auto;
                    .code-btn {
                        padding: 15px 0;
                        text-align: center;
                    }
                }
            }

            /*登陆按钮*/
            .loginBtn {
                display: block;
                width: 100%;
                margin: 0 auto;
            }
            .loginBtn.el-button--medium {
                padding: 15px 20px;
                font-size: 16px;
            }
            .code-btn {
                width: 100%;
                height: 47px;
            }
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
    }
</style>
