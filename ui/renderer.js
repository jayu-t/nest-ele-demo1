console.log('from renderer');

document.getElementById('send').addEventListener('click', () => {
  send();
});
function send() {
  console.log('sending');
  window.ipc.send('hello');
}
