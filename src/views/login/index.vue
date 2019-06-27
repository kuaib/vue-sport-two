<template>
    <div class="login-wrapper">
        <div class="tips-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>

        <el-card class="login-form-wrapper">
            <div slot="header" class="clearfix">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">短信验证码登陆</el-menu-item>
                    <el-menu-item index="2">密码登陆</el-menu-item>
                </el-menu>
            </div>
            <code-login-form v-show="activeIndex==='1'"></code-login-form>
            <pswd-login-form v-show="activeIndex==='2'" @onSubmit="onSubmit"></pswd-login-form>
        </el-card>

        <el-dialog :title="$t('login.forgetPswd')" :visible.sync="showDialog" append-to-body>
            <forget-psw/>
        </el-dialog>
    </div>
</template>

<script>
    import codeLoginForm from './components/codeLoginForm'
    import pswdLoginForm from './components/pswdLoginForm'
    import forgetPsw from './forgetPsw'
    import Cookies from 'js-cookie'

    export default {
        components: {codeLoginForm, pswdLoginForm, forgetPsw},
        name: 'login',
        data() {
            return {
                activeIndex: '1',   // 登录方式
                showDialog: false
            }
        },
        methods: {
            // 切换登录方式
            handleSelect(key) {
                this.activeIndex = key
            },

            // 登录
            onSubmit(params) {
                this.$store.dispatch('LoginByUsername', params).then(() => {
                    this.loading = false;
                    this.$router.push({path: '/'})
                }).catch(() => {
                    this.loading = false
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
            .login-form {
                width: 55%;
                margin: 0 auto;
            }
            .loginBtn {
                display: block;
                width: 80%;
                margin: 0 auto;
            }
            .code-btn {
                width: 100%;
                height: 47px;
            }
        }

        /*样式重绘*/
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
