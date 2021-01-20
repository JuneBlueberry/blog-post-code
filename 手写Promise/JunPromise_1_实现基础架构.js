/*
 * @Author: buleberry 
 * @Date: 2021-01-20 15:30:58 
 * @Last Modified by: buleberry
 * @Last Modified time: 2021-01-20 18:52:48
 */

 //实现基础架构

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
    //成功回调函数
    resolveCallback = undefined
    //失败回调函数
    rejectCallback = undefined

    //状态pending => fulfilled
    resolve = (value) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'fulfilled'
        this.successMessage = value
        console.log('resolve-runing')

        //成功回调已存在 则回调并返回成功值
        this.resolveCallback && this.resolveCallback(value)
    }

    //状态pending => rejected
    reject = (value) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'rejected'
        this.failMessage = value
        console.log('reject-runing')

        //失败回调已存在 则回调并返回失败值
        this.rejectCallback && this.rejectCallback(value)
    }

    //then方法
    then = (resolveCallback, rejectCallback) => {
        if(this.status == 'fulfilled') {
            resolveCallback(this.successMessage)
        } else if(this.status == 'rejected') {
            rejectCallback(this.failMessage)
        } else {
            //等待状态，记录回调函数，等待时间回调
            this.resolveCallback = resolveCallback
            this.rejectCallback = rejectCallback
        }
    }
 }

// module.exports = JunPromise