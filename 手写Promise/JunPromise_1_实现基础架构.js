/*
 * @Author: buleberry 
 * @Date: 2021-01-20 15:30:58 
 * @Last Modified by: buleberry
 * @Last Modified time: 2021-01-28 16:39:31
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
    value = undefined
    //回调失败的值
    reason = undefined

    //状态pending => fulfilled
    resolve = (value) => {
        //状态已经一旦改变便不可逆
        if(this.status != 'pending'){
            return
        }
        this.status = 'fulfilled'
        this.value = value
    }

    //状态pending => rejected
    reject = (reason) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'rejected'
        this.reason = reason
    }

    //then方法
    then = (resolveCallback, rejectCallback) => {
        if(this.status == 'fulfilled') {
            resolveCallback(this.value)
        } else if(this.status == 'rejected') {
            rejectCallback(this.reason)
        }
    }
 }

// module.exports = JunPromise