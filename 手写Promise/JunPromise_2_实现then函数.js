/*
 * @Author: buleberry 
 * @Date: 2021-01-20 19:14:15 
 * @Last Modified by: buleberry
 * @Last Modified time: 2021-01-26 18:23:30
 */

 /**
  * 实现then函数
  * 1.then的异步调用
  * 2.多个then调用
  * 3.then的链式调用(then返回的是一个Promise对象)
  * 4.then返回的Promise不可以是自身
  * 5.then的参数可选
  * 6.加入try,catch,出错则调用reject回调函数
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