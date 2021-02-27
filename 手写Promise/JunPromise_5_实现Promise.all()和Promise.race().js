/*
 * @Author: may
 * @Date: 2021-01-31 21:54:28 
 * @Last Modified by: may
 * @Last Modified time: 2021-02-301 13:57:49
 */

/**
  * 实现Promise.all
  * 1.由 ES2015 引入,接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有当所有promise都返回成功时才返回成功，
  *   否则返回失败。
  * 2.该方法返回的新的 Promise 实例，只有当所有promise都返回成功时才返回成功；
  *   当任意返回值为失败，则该promise实例返回失败，且将第一个触发失败的错误信息作为自己的错误信息。
  * 3.状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，
  *   每个成员对应一个传入Promise.all()的 Promise 实例。
  * 
  * 实现Promise.race
  * 1.由 ES2015 引入,接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
  * 2.只要参数实例有一个有返回结果，不管是fulfilled还是rejected，则包装实例结束并返回该参数实例的结果。
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

    //all方法
    static all = (pList) => {
        let result = [], indexLength = pList.length, index = 0
        return new JunPromise((resolve, reject) => {
            pList.forEach(p => {
                JunPromise.resolve(p).finally(() => {
                    if(p.status == 'rejected'){
                        reject(p.reason)
                    }
                    result.push(p)
                    index ++
                    if(index === indexLength){
                        resolve(result)
                    }
                })
            });
        })
    }

    // race方法
    static race = (pList) => {
        return new JunPromise((resolve, reject) => {
            pList.forEach(p => {
                JunPromise.resolve(p).finally(() => {
                    if(p.status == 'fulfilled'){
                        resolve(p.value)
                    }
                    else if(p.status == 'rejected'){
                        reject(p.reason)
                    }
                })
            })
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