define(function (require, exports, module) {
    function Add() {
        this.accountNumber = 0;
    }

    module.exports = Add;

    //=============================
    // init
    //=============================
    Add.prototype.init = function () {

        this.addAcount();
        this.validator();

        $('button, input').tooltip();
    };

    //=============================
    // add account associate
    //=============================
    Add.prototype.addAcount = function () {
        var add = this;
        $('a.add-account').click(function (e) {
            add.accountNumber++;
            var $accountWrapper = $('<div class="account-wrapper" id="account' + add.accountNumber + '"></div>').appendTo('.accounts');
            $accountWrapper.append('<button class="btn btn-default account-close-btn">x</button><h4>账号' + add.accountNumber + '</h4><div class="clearfix"></div>');
            $accountWrapper.find('.account-close-btn').click(function () {
                $accountWrapper.remove();
            });
            var type = $('<div class="form-group"></div>').appendTo($accountWrapper);
            type.append('<label for="accountType'+add.accountNumber+'" class="col-sm-4 control-label">云服务提供商</label>');
            type.append('<div class="col-sm-7 checkbox"><label><input type="checkbox" name="accounts.type" id="accountType'+add.accountNumber+'" value="aws" checked>AWS</label></div>');
            var account = $('<div class="form-group"></div>').appendTo($accountWrapper);
            account.append('<label for="accountId'+add.accountNumber+'" class="col-sm-4 control-label">账户</label>');
            account.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountId'+add.accountNumber+'" name="accounts.id"></div>');
            var name = $('<div class="form-group"></div>').appendTo($accountWrapper);
            name.append('<label for="accountName'+add.accountNumber+'" class="col-sm-4 control-label">用户名</label>');
            name.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountName'+add.accountNumber+'" name="accounts.name"></div>');
            var password = $('<div class="form-group"></div>').appendTo($accountWrapper);
            password.append('<label for="accountPassword'+add.accountNumber+'" class="col-sm-4 control-label">密码</label>');
            password.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountPassword'+add.accountNumber+'" name="accounts.password"></div>');
            var accessKey = $('<div class="form-group"></div>').appendTo($accountWrapper);
            accessKey.append('<label for="accountAccessKey'+add.accountNumber+'" class="col-sm-4 control-label">AccessKeyId</label>');
            accessKey.append('<div class="col-sm-7"><input type="text" class="form-control" id="accountAccessKey'+add.accountNumber+'" name="accounts.accessKeyId"></div>');
            var secretKey = $('<div class="form-group"></div>').appendTo($accountWrapper);
            secretKey.append('<label for="accountSecretAccessKey'+add.accountNumber+'" class="col-sm-4 control-label">SecretAccessKey</label>');
            secretKey.append(' <div class="col-sm-7"><input type="text" class="form-control" id="accountSecretAccessKey'+add.accountNumber+'" name="accounts.secretAccessKey"></div>');
        });
    };

    //=============================
    // add account validator
    //=============================
    Add.prototype.validator = function () {
        $('#user-add-form').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'name': {
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '用户名长度必须为6~30位'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: '用户名只能由字母、数字、下划线组成'
                        },
                        callback: {
                            /*message: '此用户名已经存在',
                             callback: function (value, validator) {
                             var e = true;
                             $.ajax({
                             url: '',
                             async: false,
                             type: 'post',
                             data: {
                             'name': value
                             },
                             success: function (result) {
                             if (result.success) {
                             e = false;
                             } else {
                             e = true;
                             }
                             }
                             });
                             return e;
                             }*/
                        }
                    }
                },
                'password': {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 20,
                            message: '密码长度必须为6~20位'
                        }
                    }
                },
                'passwordConfirm': {
                    selector: '#passwordConfirm',
                    validators: {
                        notEmpty: {
                            message: '确认密码不能为空'
                        },
                        callback: {
                            message: '两次密码输入不一致',
                            callback: function (value, validator) {
                                var e = true;
                                if ($('#password').val() != value) {
                                    e = false;
                                }
                                return e;
                            }
                        }
                    }
                },
                'cellphone': {
                    validators: {
                        regexp: {
                            regexp: /^[0-9]+$/,
                            message: '电话格式错误'
                        }
                    }
                },
                'email': {
                    validators: {
                        emailAddress: {
                            message: '邮箱格式错误'
                        }
                    }
                }
            },
            submitButtons: '#user-add-submit',
            submitHandler: function (validator, form, submitButton) {
                var data = {
                    name: $('input[name="name"]').val(),
                    password: $('input[name="password"]').val(),
                    cellphone: $('input[name="cellphone"]').val(),
                    email: $('input[name="email"]').val(),
                    accounts: []
                };
                var accountWrappers = $('.account-wrapper');
                accountWrappers.each(function(i, v){
                    var account = {
                        type: $(v).find('input[name="accounts.type"]').val(),
                        id: $(v).find('input[name="accounts.id"]').val(),
                        password: $(v).find('input[name="accounts.password"]').val(),
                        awsAccessKeyId: $(v).find('input[name="accounts.accessKeyId"]').val(),
                        awsSecretAccessKey: $(v).find('input[name="accounts.secretAccessKey"]').val()
                    };
                    data.accounts[i] = account;
                });
                $.ajax({
                    url: API_URL.USERS,
                    type: 'post',
                    dataType: 'json',
                    data: data,
                    success: function(result){

                    }
                })
            }
        });
    };
});