/*
 * @Author: buleberry 
 * @Date: 2021-01-22 11:10:08 
 * @Last Modified by: buleberry
 * @Last Modified time: 2021-01-27 17:52:28
 */

 /**
  * 实现Promise.resolve()和Promise.reject()
  * Promise.resolve可将现有对象转化为一个Promise对象
  * 1.参数是 Promise 实例，将不做任何修改、原封不动地返回这个实例。
  * 2.参数是一个thenable对象，将返回一个Promise对象，并立即执行then函数
  * 3.参数是一个原始值，或者是一个不具有then()方法的对象，将返回一个新的 Promise 对象，状态为fulfilled
  * 4.没有参数，将直接返回一个fulfilled状态的 Promise 对象
  * 
  * Promise.reject可将现有对象转化为一个Promise对象
  * 
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
    //成功回调函数
    resolveCallback = []
    //失败回调函数
    rejectCallback = []

    //状态pending => fulfilled
    resolve = (value) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'fulfilled'
        this.successMessage = value

        //成功回调已存在 则回调并返回成功值
        //this.resolveCallback && this.resolveCallback(value)

        //循环调用成功回调函数
        while(this.resolveCallback.length > 0){
            let callback = this.resolveCallback.shift()
            callback && callback(value)
        }
    }

    //状态pending => rejected
    reject = (value) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'rejected'
        this.failMessage = value

        //失败回调已存在 则回调并返回失败值
        //this.rejectCallback && this.rejectCallback(value)

        //循环调用失败回调函数
        while(this.rejectCallback.length > 0){
            let callback = this.rejectCallback.shift()
            callback && callback(value)
        }
    }

    //then方法
    then = (resolveCallback, rejectCallback) => {
        //判断then方法是否有回调
        resolveCallback = resolveCallback ? resolveCallback : successMessage => successMessage
        rejectCallback = rejectCallback ? rejectCallback : failMessage => failMessage

        let _promise = new JunPromise((resolve, reject) => {
            if(this.status == 'fulfilled') {
                try {
                    setTimeout(() => {
                        let resultPromise = resolveCallback(this.successMessage)
                        // return result
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    }, 0);
                } 
                catch (error) {
                    reject(error)
                }
            } else if(this.status == 'rejected') {
                try {
                    setTimeout(() => {
                        let resultPromise = rejectCallback(this.failMessage)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    }, 0);
                } 
                catch (error) {
                    reject(error)
                }
            } else {
                try {
                    // 等待状态，记录回调函数，等待时间回调
                    // this.resolveCallback.push(resolveCallback)
                    // this.rejectCallback.push(rejectCallback)

                    //then链式调用的时候，就需要把结果也返回给下一个then方法
                    this.resolveCallback.push(() => {
                        let resultPromise = resolveCallback(this.successMessage)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    })
                    this.rejectCallback.push(() => {
                        let resultPromise = rejectCallback(this.successMessage)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
        return _promise
    }

    //resolve方法
    static resolve = (callback) => {
        // if(callback){
        //     //参数本身就是Promise对象
        //     if(callback instanceof JunPromise){
        //         return callback
        //     } 
        //     else if (typeof callback == 'object' && callback.then){
        //         return new JunPromise(resolve => callback.then(resolve))
        //     } 
        //     //参数为常数
        //     else {
        //         return new JunPromise(resolve => resolve(callback))
        //     }
        // } 
        // else {
        //     //不带参数
        //     return new JunPromise(resolve => resolve(callback))
        // }

        //简化
        if(callback instanceof JunPromise){
            return callback
        } 
        else if (typeof callback == 'object' && callback.then){
            return new JunPromise(resolve => callback.then(resolve))
        } 
        else {
            return new JunPromise(resolve => resolve(callback))
        }
    }

    //reject方法
    static reject = (callback) => {
        return new JunPromise((resolve, reject) => reject(callback))
    }
 }

 /**
  * 判断链式的返回值
  * 如果是自己，则报错
  * 如果是常数，则直接返回resolve(常数)
  * 如果是Promise对象，则根据结果返回Promise.then()
  */
 judgmentPromise = (self, resultPromise, resolve, reject) => {
    if(self === resultPromise){
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        console.error('Chaining cycle detected for promise #<Promise>')
    }
    if(resultPromise instanceof JunPromise){
        resultPromise.then(resolve, reject)
    }else{
        resolve(resultPromise)
    }
 }

// module.exports = JunPromise