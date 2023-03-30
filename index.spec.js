const BufferQueue = require('./index');

const mockData = () => new Promise(resolve => {
  // 模拟接口延迟三秒
  setTimeout(() => {
    resolve({
      code: 200,
      data: [],
      msg: 'success'
    });
  }, 3000)
})

let bufferQueue = null;

beforeAll(() => {
  bufferQueue = new BufferQueue()
})

it('testing mockData', () => {
  return mockData().then(data => {
    expect(data).toEqual({
      code: 200,
      data: [],
      msg: 'success'
    })
  })
})

it('testing producer', async () => {
  bufferQueue.producer(async () => {
    const response = await mockData();
    expect(response).toEqual({
      code: 200,
      data: [],
      msg: 'success'
    })
  })
  bufferQueue.producer(async () => {
    const response = await mockData();
    expect(response).toEqual({
      code: 200,
      data: [],
      msg: 'success'
    })
  })
  bufferQueue.producer(async () => {
    const response = await mockData();
    expect(response).toEqual({
      code: 200,
      data: [],
      msg: 'success'
    })
  })

  bufferQueue.start()
});
