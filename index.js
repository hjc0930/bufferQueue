// 可以看一下接下来这个问题：
// 请用js结合面向对象的思想，实现生产者和消费者的概念逻辑。（代码实现）
// 最好用下面这个实际例子：
// 考虑一个在线的编辑器，用户会输入文字、插入图片、插入视频、插入分页等等，这些需要和后台交互，但不能阻塞用户的行为。
// 注意，需要按顺序和后台交互。比如用户先插入一张图、再插入分页、再插入视频，需要在插入图片的后端成功返回后，再请求分页行为，然后请求视频的保存。

class BufferQueue {
  /** 缓冲队列 */
  #store = [];
  /** 执行消费者的定时器Timer */
  #isConsumerRun = false;
  /** 关闭标识 */
  #isClose = false;

  constructor() {
    // TODO
  }

  /** 启动消费者 */
  start = () => {
    if (this.#isConsumerRun) return;
    this.#consumer();
  }

  /** 关闭消费者 */
  close = () => {
    this.#isClose = true;
  }

  /** 生产者 */
  producer = (producerFunction) => {
    this.#store.push(producerFunction);
  }

  /** 消费者 */
  #consumer = async () => {
    this.#isConsumerRun = true;
    while (this.#store.length) {
      // 判断是否退出
      if (this.#isClose) {
        this.#isClose = false;
        break;
      }

      try {
        await this.#store.shift()?.();
      } catch (error) {
        // TODO: 根据业务需求进行异常处理
      }
    }
    this.#isConsumerRun = false;
  }
}

module.exports = BufferQueue;
