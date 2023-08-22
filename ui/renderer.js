console.log('from renderer');

document.getElementById('hello').addEventListener('click', () => {
  console.log('sending hello');
  window.ipc.send('hello', { name: 'aaa', age: 23 });
});

document.getElementById('test').addEventListener('click', () => {
  console.log('sending test');
  window.ipc.send('test', 'this is test message');
});
