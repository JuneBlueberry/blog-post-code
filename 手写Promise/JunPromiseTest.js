/*
 * @Author: buleberry 
 * @Date: 2021-02-01 17:57:38 
 * @Last Modified by: buleberry
 * @Last Modified time: 2021-02-03 21:00:05
 */


/**
 * 单元测试修改点
 * 1.then的参数传入的需要是一个function
 * 2.then判断入参的返回值
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
    //单元测试修改点1
    resolveCallback = typeof resolveCallback === 'function' ? resolveCallback : value => value
    rejectCallback = typeof rejectCallback === 'function' ? rejectCallback : reason => { throw reason }
    //resolveCallback = resolveCallback ? resolveCallback : value => value
    //rejectCallback = rejectCallback ? rejectCallback : reason => reason

    let _promise = new JunPromise((resolve, reject) => {
      if (this.status == 'fulfilled') {
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
      } else if (this.status == 'rejected') {
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
      } else if (this.status == 'pending') {
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
        p.finally(() => {
          if (p.status == 'rejected') {
            reject(p.reason)
          }
          result.push(p)
          index++
          if (index === indexLength) {
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
        p.finally(() => {
          if (p.status == 'fulfilled') {
            resolve(p.value)
          }
          else if (p.status == 'rejected') {
            reject(p.reason)
          }
        })
      })
    })
  }

  //allSettled方法
  static allSettled = (pList) => {
    let result = [], indexLength = pList.length
    return new JunPromise((resolve, reject) => {
      pList.forEach(p => {
        p.finally(() => {
          result.push(p)
          if (result.length === indexLength) {
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
          if (!isSuccess) {
            if (p.status == 'fulfilled') {
              isSuccess = true
              successValue = p.value
            } else if (p.status == 'rejected') {
              failReasonList.push(p.reason)
            }

            index++
            if (isSuccess) {
              resolve(successValue)
            }
            if (index === indexLength) {
              throw failReasonList
            }
          }
        })
      });
    })
  }
}

// 单元测试
JunPromise.defer = JunPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new JunPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd
}

/**
* 判断链式的返回值
* 如果是自己，则报错
* 如果是常数，则直接返回resolve(常数)
* 如果是Promise对象,或者thenable，则根据结果返回Promise.then()
*/
judgmentPromise = (self, resultPromise, resolve, reject) => {
  //单元测试修改点2
  if (self === resultPromise) {
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    return
  }

  if(resultPromise instanceof JunPromise){
    if(resultPromise.status == 'pending'){
      resultPromise.then((value) => {
        //递归
        judgmentPromise(self, value, resolve, reject)
      }, reject)
    } else if(resultPromise.status == 'fulfilled') {
      resolve(resultPromise.value)
    } else if(resultPromise.status == 'rejected') {
      reject(resultPromise.reason)
    }
  } else if (resultPromise && (typeof resultPromise === 'object' || typeof resultPromise === 'function')) {
    let flag  //不能重复调用
    try {
      let then = resultPromise.then
      if(typeof then === 'function'){
        //成功
        const _resolve = (value) => {
          if(flag) return
          flag = true
          //递归
          judgmentPromise(self, value, resolve, reject)
        }

        const _reject = (reason) => {
          if(flag) return
          flag = true
          reject(reason)
        }

        then.call(resultPromise, _resolve, _reject)
      }else{
        resolve(resultPromise)
      }
    } catch (error) {
      if(flag) return
      flag = true
      reject(error)
    }
  } else {
    return resolve(resultPromise)
  }
}

module.exports = JunPromise