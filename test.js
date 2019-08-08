function LinkedList(){

	function Node(ele){
    	this.ele = ele
      	this.next = null
    }

    this.length = 0
    this.head = null

    LinkedList.prototype.append = function (ele) {
        var newNode = new Node(ele)

        if(this.head === null){
            this.head = newNode
        }else {
            var current = this.head
            while(current.next){
                current = current.next
            }
            current.next = newNode
        }

        this.length++
    }

    LinkedList.prototype.toString = function () {

        var current = this.head
        var listString = ''

        while(current){
            listString += ',' + current.ele
            current = current.next
        }

        return listString.slice(1)
    }

    // 根据下标删除元素
LinkedList.prototype.insert = function (position, element) {
    // 1.检测越界问题: 越界插入失败
    if (position < 0 || position > this.length) return false

    // 2.找到正确的位置, 并且插入数据
    var newNode = new Node(element)
    var current = this.head
    var previous = null
    index = 0

    // 3.判断是否列表是否在第一个位置插入
    if (position == 0) {
        newNode.next = current
        this.head = newNode
    } else {
        while (index++ < position) {
            previous = current
            current = current.next
        }

        newNode.next = current
        previous.next = newNode
    }

    // 4.length+1
    this.length++

    return true
}

// 根据位置移除节点
LinkedList.prototype.removeAt = function (position) {
  // 1.检测越界问题: 越界移除失败, 返回null
  if (position < 0 || position >= this.length) return null

  // 2.定义变量, 保存信息
  var current = this.head
  var previous = null
  var index = 0

  // 3.判断是否是移除第一项
  if (position === 0) {
      this.head = current.next
  } else {
      while (index++ < position) {
          previous = current
          current = current.next
      }

      previous.next = current.next
  }

  // 4.length-1
  this.length--

  // 5.返回移除的数据
  return current.element
}

// 根据元素获取链表中的位置
LinkedList.prototype.indexOf = function (ele) {
  // 1.定义变量, 保存信息
  var current = this.head
  index = 0

  // 2.找到元素所在的位置
  while (current) {
      if (current.ele === ele) {
          return index
      }
      index++
      current = current.next
  }

  // 3.来到这个位置, 说明没有找到, 则返回-1
  return -1
}

// 获取链表的长度
LinkedList.prototype.size = function () {
  return this.length
}

}

var list1 = new LinkedList()

list1.append(12)
list1.append(23)
list1.append(34)
list1.append(56)

console.log(list1.toString())

list1.insert(4,100)
// list1.insert(3,300)

console.log(list1.toString())

console.log(list1.indexOf(100))
console.log(list1.size())