class Event{

  constructor(){
    this.event = Object.create(null)
  }

  //给某个事件添加监听
  on(name, backcall){
    if(!this.event[name]){
      this.event[name] = []
    }
    this.event[name].push(backcall)
    return this
  }

  //按顺序执行事件中所有的监听
  emit(name, ...args){
    if(!this.event[name]){
      return this
    }
    this.event[name].forEach(element => {
      element.call(this, ...args)
    });
  }

  //移除事件中某个监听
  remove(name, backcall){
    if(!this.event[name]){
      return this
    }
    if(backcall){
      let index = this.event[name].indexOf(backcall)
      this.event[name].splice(index, 1)
    }
    return this
  }

  removeAll(name){
    if(!this.event[name]){
      return this
    }
    this.event[name] = null
    return this
  }

  once(name, backcall){
    let func = (...args) => {
      backcall.call(this, ...args)
      this.remove(name, func)
    }
    this.on(name, func)
    return this
  }
}
