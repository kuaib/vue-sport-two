<!--密码登录-->
<template>
    <div>
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
                 label-position="left">
            <el-form-item prop="phone">
                <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="off" placeholder="手机号" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="off" placeholder="密码" maxlength="12"></el-input>
                <span class="show-pwd" @click="showPwd">
                <svg-icon v-show="passwordType==='password'" icon-class="eyeclose"/>
                <svg-icon v-show="!passwordType" icon-class="eye"/>
            </span>
            </el-form-item>

            <el-row class="act-area" style="margin-bottom: 20px;">
                <el-col :span="8">
                    <el-checkbox v-model="rememberPswd">记住密码</el-checkbox>
                </el-col>
                <el-col :span="8" @click.native="showDialog('change')">修改密码</el-col>
                <el-col :span="8" @click.native="showDialog('forget')">忘记密码？</el-col>
            </el-row>
            <el-button class="loginBtn" type="primary" :loading="loading" @click.native.prevent="onSubmit">{{$t('login.logIn')}}</el-button>
        </el-form>

        <!--修改密码弹窗-->
        <el-dialog :title="dialogTitle" :visible.sync="show" append-to-body>
            <change-psw v-show="dialogTitle==='修改密码'" @completeAct="show=false" :showDia="show" />
            <forget-psw v-show="dialogTitle==='忘记密码'" @completeAct="show=false" :showDia="show" />
        </el-dialog>
    </div>

</template>

<script>
    import forgetPsw from './forgetPsw'
    import changePsw from './changePsw'
    import Cookies from 'js-cookie'

    export default {
        components: {forgetPsw, changePsw},
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
            return {
                dialogTitle: '',           // 弹窗名称
                show: false,               // 是否显示弹窗
                loading: false,
                rememberPswd: false,       // 是否记住密码
                passwordType: 'password',  // 密码是否明文
                loginForm: {
                    phone: '',
                    password: ''
                },
                loginRules: {
                    phone: [{validator: validatePhone, trigger: 'blur'}],
                    password: {required: true, message: '请输入密码', trigger: 'blur'}
                },
            }
        },

        created() {
            let rememberData = Cookies.get('loginInfo');
            if(rememberData) {
                rememberData = JSON.parse(rememberData);
                this.rememberPswd = true;
                this.loginForm.phone = rememberData.phone;
                this.loginForm.password = rememberData.password;
            }
        },

        methods: {
            // 登录
            onSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.$emit('onSubmit', {phone: this.loginForm.phone, password: this.loginForm.password}, 'pswdLoginForm');
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

            // 显示修改密码、忘记密码弹窗
            showDialog(key) {
                this.show = true;
                if(key === 'change') {
                    this.dialogTitle = '修改密码';
                } else {
                    this.dialogTitle = '忘记密码';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login-form {
        /*眼睛*/
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: #889aa4;
            cursor: pointer;
            user-select: none;
        }

        /*操作区域*/
        .act-area {
            font-size: 14px;
            color: #fff;
            cursor: pointer;
            .el-col {
                text-align: center;
            }
            .el-checkbox {
                color: #fff;
            }
        }
    }
</style>
