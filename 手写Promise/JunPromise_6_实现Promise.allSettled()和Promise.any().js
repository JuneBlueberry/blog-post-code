/*
 * @Author: buleberry 
 * @Date: 2021-01-28 11:53:28 
 * @Last Modified by: buleberry
 * @Last Modified time: 2021-01-28 18:14:20
 */

/**
  * 实现Promise.allSettled
  * 1.由 ES2020 引入,接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，
  *   不管是fulfilled还是rejected，包装实例才会结束。
  * 2.该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。
  * 3.状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，
  *   每个成员对应一个传入Promise.allSettled()的 Promise 实例。
  * 
  * 实现Promise.any
  * 1.由 ES2021 引入,接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
  * 2.只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
  *   如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
  */

class JunPromise {
    //构造函数
    constructor(execute) {
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
        if (this.status != 'pending') {
            return
        }
        this.status = 'fulfilled'
        this.value = value

        //成功回调已存在 则回调并返回成功值
        //this.resolveCallback && this.resolveCallback(value)

        //循环调用成功回调函数
        while (this.resolveCallback.length > 0) {
            let callback = this.resolveCallback.shift()
            callback && callback(value)
        }
    }

    //状态pending => rejected
    reject = (reason) => {
        if (this.status != 'pending') {
            return
        }
        this.status = 'rejected'
        this.reason = reason

        //失败回调已存在 则回调并返回失败值
        //this.rejectCallback && this.rejectCallback(reason)

        //循环调用失败回调函数
        while (this.rejectCallback.length > 0) {
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
            if (this.status == 'fulfilled') {
                try {
                    setTimeout(() => {
                        let resultPromise = resolveCallback(this.value)
                        // return result
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    }, 0);
                }
                catch (error) {
                    reject(error)
                }
            } else if (this.status == 'rejected') {
                try {
                    setTimeout(() => {
                        let resultPromise = rejectCallback(this.reason)
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
                        let resultPromise = resolveCallback(this.value)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    })
                    this.rejectCallback.push(() => {
                        let resultPromise = rejectCallback(this.reason)
                        judgmentPromise(_promise, resultPromise, resolve, reject)
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
        return _promise
    }

    //catch函数
    catch = (rejectCallback) => {
        return this.then(undefined, rejectCallback)
    }

    //finally
    finally = (callback) => {
        return this.then(
            value => JunPromise.resolve(callback()).then(() => value),
            reason => JunPromise.resolve(callback()).then(() => reason)
        )
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
        if (callback instanceof JunPromise) {
            return callback
        }
        else if (typeof callback == 'object' && callback.then) {
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

    //allSettled方法
    static allSettled = (pList) => {
        let result = [], indexLength = pList.length
        return new JunPromise((resolve, reject) => {
            pList.forEach(p => {
                p.finally(() => {
                    result.push(p)
                    if(result.length === indexLength){
                        resolve(result)
                    }
                })
            });
        })
    }

    //any方法
    static any = (pList) => {
        let isSuccess = false, indexLength = pList.length, index = 0
        let successValue = undefined, failReasonList = []
        return new JunPromise((resolve, reject) => {
            pList.forEach(p => {
                p.finally(() => {
                    if(!isSuccess){
                        if(p.status == 'fulfilled'){
                            isSuccess = true
                            successValue = p.value
                        } else if (p.status == 'rejected'){
                            failReasonList.push(p.reason)
                        }
    
                        index++
                        if(isSuccess){
                            resolve(successValue)
                        }
                        if(index === indexLength){
                            throw failReasonList
                        }
                    }
                })
            });
        })
    }
}

/**
 * 判断链式的返回值
 * 如果是自己，则报错
 * 如果是常数，则直接返回resolve(常数)
 * 如果是Promise对象，则根据结果返回Promise.then()
 */
judgmentPromise = (self, resultPromise, resolve, reject) => {
    if (self === resultPromise) {
        reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        console.error('Chaining cycle detected for promise #<Promise>')
    }
    if (resultPromise instanceof JunPromise) {
        resultPromise.then(resolve, reject)
    } else {
        resolve(resultPromise)
    }
}

// module.exports = JunPromise