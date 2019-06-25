<template>
    <div class="change-psw-wrapper">
        <div class="tip-words">
            <p>TEAM CHINA</p>
            <p>增强使命感、责任感、荣誉感</p>
            <p>打造能征善战、作风优良的国家队</p>
        </div>

        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-form ref="forgetPswForm" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="手机号" prop="userName">
                        <el-input placeholder="请输入手机号" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="newPsw">
                        <el-input placeholder="请输入验证码" v-model="form.newPsw" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="confirmPsw">
                        <el-input placeholder="请输入确认密码" v-model="form.confirmPsw" show-password></el-input>
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
    import {forgePsw}  from '@/api/login'
    export default {
        data() {
            return  {
                form: {
                    userName: '',      // 初始密码
                    newPsw: '',        // 新密码
                    confirmPsw: '',    // 确认密码
                },
                loading: false,

                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    newPsw: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        // { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                    ],
                    confirmPsw: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' }
                    ],
                }
            }
        },

        methods: {
            onSubmit() {
                if(this.form.newPsw.trim() === this.form.confirmPsw.trim) {
                    this.$message({
                        message: '新密码与确认密码不一致，请重新输入',
                        type: 'warning'
                    });
                    return;
                }
                this.$refs.forgetPswForm.validate(valid => {
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
