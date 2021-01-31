/*
 * @Author: buleberry 
 * @Date: 2021-01-20 19:14:15 
 * @Last Modified by: blueberry
 * @Last Modified time: 2021-01-31 18:07:00
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
    value = undefined
    //回调失败的值
    reason = undefined
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
        this.value = value

        //成功回调已存在 则回调并返回成功值
        //this.resolveCallback && this.resolveCallback(value)

        //循环调用成功回调函数
        while(this.resolveCallback.length > 0){
            let callback = this.resolveCallback.shift()
            callback && callback(value)
        }
    }

    //状态pending => rejected
    reject = (reason) => {
        if(this.status != 'pending'){
            return
        }
        this.status = 'rejected'
        this.reason = reason

        //失败回调已存在 则回调并返回失败值
        //this.rejectCallback && this.rejectCallback(reason)

        //循环调用失败回调函数
        while(this.rejectCallback.length > 0){
            let callback = this.rejectCallback.shift()
            callback && callback(reason)
        }
    }

    //then方法
    then = (resolveCallback, rejectCallback) => {
        //判断then方法是否有回调
        resolveCallback = resolveCallback ? resolveCallback : value => value
        rejectCallback = rejectCallback ? rejectCallback : reason => reason
    
        let _promise = new JunPromise((resolve, reject) => {
            if(this.status == 'fulfilled') {
                // 放入异步中，否则，此处_promise拿不到
                // 将回调的结果传给下一个then方法
                setTimeout(() => {
                    try {
                        let resultPromise = resolveCallback(this.value)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            } else if(this.status == 'rejected') {
                // 放入异步中，否则，此处_promise拿不到
                // 将回调的结果传给下一个then方法
                setTimeout(() => {
                    try {
                        let resultPromise = rejectCallback(this.reason)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            } else {
                // 等待状态，记录回调函数，等待时间回调
                // this.resolveCallback.push(resolveCallback)
                // this.rejectCallback.push(rejectCallback)
    
                // 等待状态，记录回调函数，等待事件回调
                // then链式调用的时候，就需要把结果也返回给下一个then方法
                this.resolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let resultPromise = resolveCallback(this.value)
                            judgmentPromise(_promise, resultPromise, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                this.rejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let resultPromise = rejectCallback(this.reason)
                            judgmentPromise(_promise, resultPromise, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
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