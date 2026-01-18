// -------------------- اللاعبين والكود --------------------
var players=[
  {name_ar:'عمر السيد محمد',name_en:'Omar ElSayed',game:'5L¹丨BOX',id:'5535931335',code:'5682'},
  {name_ar:'عمر الشافعي',name_en:'Omar ElShafie',game:'5L¹丨LEVI',id:'5780015747',code:'1683'},
  {name_ar:'محمد أحمد',name_en:'Mohamed Ahmed',game:'5L¹丨RAMO',id:'5114404295',code:'0618'},
  {name_ar:'زياد محمود',name_en:'Ziad Mahmoud',game:'Кнaled',id:'5181732509',code:'4681'},
  {name_ar:'فارس محسن',name_en:'Fares Mohsen',game:'فرţعون',id:'52013524002',code:'8331'},
  {name_ar:'يوسف عمرو',name_en:'Youssef Amr',game:'5L¹丨BOSS',id:'5568744837',code:'1656'},
  {name_ar:'معاذ محمود',name_en:'Moaz Mahmoud',game:'XR个MOAZ',id:'5888700371',code:'8989'},
  {name_ar:'مهند محمود',name_en:'Mohand Mahmoud',game:'ST丨GREY',id:'5789024569',code:'2326'},
  {name_ar:'محمد سلامه',name_en:'Mohamed Salama',game:'ST丨TAUG',id:'5964471266',code:'1357'},
  {name_ar:'عمر',name_en:'Omar',game:'-',id:'5514938673',code:'8452'},
  {name_ar:'منجا',name_en:'Manga',game:'-',id:'5233336518',code:'5115'}
];

// -------------------- إنشاء البطاقات --------------------
var container=document.getElementById('players-container');
players.forEach(function(p,i){
  var card=document.createElement('div');
  card.className='pair-card';
  var playerDiv=document.createElement('div');
  playerDiv.className='player';
  playerDiv.innerHTML=`<strong>الاسم:</strong> <span class="name">${p.name_ar}</span><br>
  <strong>اسم اللعبة:</strong> ${p.game}<br>
  <strong>ID:</strong> ${p.id}<br>
  <strong>كود:</strong> <input type="text" id="code${i}" value="${p.code}" readonly style="width:60px;text-align:center;"><br>
  <button class="copy-btn" onclick="copyCode('code${i}')">نسخ الكود</button>
  <button class="whatsapp-btn" onclick="openWhatsapp('code${i}','${p.name_ar}','${p.game}','${p.id}')">واتساب</button>`;
  card.appendChild(playerDiv);
  container.appendChild(card);
});

// -------------------- نسخ الكود --------------------
function copyCode(id){
  var copyText=document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0,99999);
  document.execCommand("copy");
  alert("تم نسخ الكود: "+copyText.value);
}

// -------------------- واتساب --------------------
function openWhatsapp(codeId,name,game,id){
  var code=document.getElementById(codeId).value;
  var message=`تم قبولي في البطولة، الكود: ${code}\nالاسم: ${name}\nID: ${id}`;
  window.open(`https://wa.me/201211056530?text=${encodeURIComponent(message)}`,'_blank');
}

// -------------------- الكتابة التلقائية + صوت جوجل --------------------
document.getElementById('start-btn').addEventListener('click',function(){
  document.getElementById('welcome-screen').style.display='none';
  updateLanguage();
  var log=document.getElementById('log');
  var colors=['#ffd54f','#ffb347','#ffc107','#ff8c00','#ff9800','#ffcc80','#ffe57f'];
  var i=0;
  function speakNext(){
    if(i>=players.length) return;
    var p=players[i];
    var text=document.documentElement.dir=='rtl'?`اللاعب ${players[i].name_ar} - الكود: ${players[i].code}. `:`Player ${players[i].name_en} - Code: ${players[i].code}. `;
    var idx=0;
    function typeWriter(){
      if(idx<text.length){
        var span=document.createElement('span');
        span.textContent=text.charAt(idx);
        span.className='letter';
        span.style.color=colors[idx%colors.length];
        log.appendChild(span);
        idx++;
        setTimeout(typeWriter,35);
      }else{
        log.innerHTML+='<br>';
        i++;
        speakNext();
      }
    }
    typeWriter();
    var utterance=new SpeechSynthesisUtterance(text);
    utterance.lang=document.documentElement.dir=='rtl'?'ar-EG':'en-US';
    utterance.rate=0.95;
    window.speechSynthesis.speak(utterance);
  }
  speakNext();
});

// -------------------- النجوم --------------------
for(let i=0;i<100;i++){
  let star=document.createElement('div');
  star.classList.add('star');
  let size=Math.random()*2+1.5;
  star.style.width=size+'px';
  star.style.height=size+'px';
  star.style.top=Math.random()*100+'%';
  star.style.left=Math.random()*100+'%';
  star.style.animationDuration=(Math.random()*4+2)+'s';
  document.getElementById('stars').appendChild(star);
}

// -------------------- تغيير اللغة --------------------
document.getElementById('language-select').addEventListener('change',function(){
  if(this.value=='ar'){
    document.documentElement.dir='rtl';
    updateLanguage();
  }else{
    document.documentElement.dir='ltr';
    updateLanguage();
  }
});

function updateLanguage(){
  var lang=document.documentElement.dir=='rtl'?'ar':'en';
  document.getElementById('welcome-text').innerHTML=lang=='ar'?'مرحبًا بك في موقع بطولة PMGC<br>✨ تحية من النجم ✨':'Welcome to PMGC Tournament<br>✨ Greeting from Al-Najm ✨';
  document.getElementById('page-title').innerHTML=lang=='ar'?'قائمة اللاعبين':'Players List';
  document.querySelectorAll('.player .name').forEach(function(span,i){
    span.textContent=lang=='ar'?players[i].name_ar:players[i].name_en;
  });
}
