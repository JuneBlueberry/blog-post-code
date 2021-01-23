/*
 * @Author: buleberry 
 * @Date: 2021-01-20 15:30:58 
 * @Last Modified by: blueberry
 * @Last Modified time: 2021-01-23 17:36:17
 */

 /**
  * 实现基础架构
  * 1.三种状态
  * 2.resolve,reject,then方法
  */


 class JunPromise {
    //构造函数
    constructor(execute){
        execute(this.resolve, this.reject)
    }

    //状态 (pending-等待，fulfilled-完成，rejected-失败)
    status = 'pending'
    //回调成功的值
    successMessage = undefined
    //回调失败的值
    failMessage = undefined

    //状态pending => fulfilled
    resolve = (value) => {
        //状态已经一旦改变便不可逆
        if(this.status != 'pending'){
            return
        }
        this.status = 'fulfilled'
        this.successMessage = value
    }

    //状态pending => rejected
    reject = (value) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'rejected'
        this.failMessage = value
    }

    //then方法
    then = (resolveCallback, rejectCallback) => {
        if(this.status == 'fulfilled') {
            resolveCallback(this.successMessage)
        } else if(this.status == 'rejected') {
            rejectCallback(this.failMessage)
        }
    }
 }

// module.exports = JunPromise