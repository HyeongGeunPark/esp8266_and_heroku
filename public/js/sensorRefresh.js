(function connect(){
  let socket = io.connect('http://hgparkserver-notebook.duckdns.org:3000');     // exact server address

  let sensor01Temp = document.querySelector('#sensor01_temp');
  let sensor01Hum = document.querySelector('#sensor01_hum');

  for(const sensor in sensors){
    socket.on(sensors[sensor].name, data=>{
      for (const i in sensors[sensor].items){
        document.querySelector(`#${sensors[sensor].name}_${sensors[sensor].items[i]}`).value = data[sensors[sensor].items[i]];
      }
    });
  }

/*   socket.on("sensor01_update", data =>{
    sensor01Temp.value = data.temp;
    sensor01Hum.value = data.humid;
  }); */

  // socket io event handler examples
  /*
  // name change
  let username = document.querySelector('#username');
  let usernameBtn = document.querySelector('#usernameBtn');
  let curUsername = document.querySelector('.card-header');

  usernameBtn.addEventListener('click', e => {
    console.log(username.value);
    socket.emit('change_username', {username: username.value});
    curUsername.textContent = username.value;
    username.value = '';
  });

  // message
  let message = document.querySelector('#message');
  let messageBtn = document.querySelector('#messageBtn');
  let messageList = document.querySelector('#message-list');
  //message send
  messageBtn.addEventListener('click', e => {
    console.log(message.value);
    socket.emit('new_message', {message: message.value});
    message.value='';
  });
  //message receive
  socket.on('receive_message', data => {
    console.log(data);
    let listItem = document.createElement('li');
    listItem.textContent = data.username + ': ' + data.message;
    listItem.classList.add('list-group-item');
    messageList.appendChild(listItem);
  });
  */

})();

//console.log('chatroom.js loaded');