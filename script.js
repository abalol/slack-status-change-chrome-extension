let Data = { Title: '', URL: '' };

let showConfig = false;

chrome.tabs.getSelected(tab => {
  Data.Title = tab.title;
  Data.URL = tab.url;
  console.log(`Title: ${Data.Title}`);
  console.log(`URL: ${Data.URL}`);
});

window.addEventListener('load', () => {

  // ローカルストレージから前回設定時のtoken等を取得する
  const buttonConfig = document.querySelector('#config');
  const tools = document.querySelector('#tools');
  const buttonConfigDetail = document.querySelector('#configDetail');
  buttonConfig.addEventListener('click', () => {
    buttonConfigDetail.style.display = showConfig ? 'none' : 'block';
    showConfig = !showConfig;
  });
  
  const inputChannel = document.querySelector('#channel');
  const inputToken = document.querySelector('#token');
  const inputEmojis = document.querySelector('#emojis');
  const divIcons = document.querySelector('#icons');
  const inputName = document.querySelector('#username');
  
  inputToken.value = window.localStorage.getItem('token');
  inputChannel.value = window.localStorage.getItem('channel');
  inputEmojis.value = window.localStorage.getItem('emojis');
  inputName.value = window.localStorage.getItem('name');
  if (!inputToken.value) {
    tools.style.display = 'none';
  } else {
    tools.style.display = 'block';
  }

  // 保存ボタンが押されたら内容をブラウザに保持する
  const saveButton = document.querySelector('#save');
  saveButton.addEventListener('click', () => {
    window.localStorage.setItem('token', inputToken.value);
    window.localStorage.setItem('channel', inputChannel.value);
    window.localStorage.setItem('emojis', inputEmojis.value);
    window.localStorage.setItem('name', inputName.value);
    buttonConfigDetail.style.display = 'none';
    if (!inputToken.value) {
      tools.style.display = 'none';
    } else {
      tools.style.display = 'block';
    }
  });

  const emojis = inputEmojis.value.split(',');
  emojis.map(txt => {
    const button = document.createElement('button');
    button.className = 'change-icon-button';
    button.textContent = `${txt}`;
    button.addEventListener('click', () => {
      setIcon(txt, inputToken.value);
    });
    divIcons.appendChild(button);
  });

  const youtubeButton = document.querySelector('#youtube');
  youtubeButton.addEventListener('click', () => {
    const url = new URL('https://slack.info314.now.sh/youtube');
    const msg = `Shared By ${inputName.value}\n${Data.Title}\n${Data.URL}`
    url.searchParams.append('msg', msg);
    url.searchParams.append('token', inputToken.value);
    url.searchParams.append('channel', inputChannel.value);
    url.searchParams.append('name', inputName.value);
    fetch(url).then(response => console.log(response))
  });
  
});

function setIcon(txt, token) {
  const url = new URL('https://slack.info314.now.sh/status');
  url.searchParams.append('emoji', txt);
  url.searchParams.append('token', token);
  fetch(url).then(response => console.log(response))
}