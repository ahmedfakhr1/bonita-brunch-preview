(function(){
  var lang='es';try{lang=localStorage.getItem('lang')||'es'}catch(e){}
  function apply(){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-en]').forEach(function(el){
      if(!el.hasAttribute('data-es'))el.setAttribute('data-es',el.innerHTML);
      el.innerHTML=lang==='en'?el.getAttribute('data-en'):el.getAttribute('data-es');
    });
    var b=document.querySelector('.lang');if(b){b.textContent=lang==='en'?'ES':'EN';b.setAttribute('aria-label',lang==='en'?'Cambiar a español':'Switch to English')}
    status();
  }
  var lb=document.querySelector('.lang');
  if(lb)lb.addEventListener('click',function(){lang=lang==='en'?'es':'en';try{localStorage.setItem('lang',lang)}catch(e){}apply()});

  function status(){
    var el=document.getElementById('pancake');if(!el)return;
    var p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Madrid',weekday:'short',hour:'numeric',hour12:false}).formatToParts(new Date());
    var d=p.find(function(x){return x.type==='weekday'}).value,h=+p.find(function(x){return x.type==='hour'}).value%24;
    var on=d==='Thu'&&h>=17&&h<19,today=d==='Thu';
    var es=on?'Ahora mismo: pancakes con café, matcha o chai gratis.':today?'Hoy es jueves de pancakes, de 17:00 a 19:00.':'Los jueves son de pancakes, de 17:00 a 19:00.';
    var en=on?'Right now: pancakes with a free coffee, matcha or chai.':today?'Today is pancake Thursday, 17:00 to 19:00.':'Thursdays are pancakes, 17:00 to 19:00.';
    el.classList.toggle('on',on);
    el.querySelector('b').textContent=lang==='en'?en:es;
  }
  apply();

  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
  document.querySelectorAll('.rv').forEach(function(el,i){if(io)io.observe(el);else el.classList.add('in')});

  var chips=document.querySelectorAll('.chips a');
  if(chips.length&&'IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){chips.forEach(function(c){c.removeAttribute('aria-current')});var c=document.querySelector('.chips a[href="#'+e.target.id+'"]');if(c){c.setAttribute('aria-current','true');var r=c.parentNode;r.scrollLeft=c.offsetLeft-r.clientWidth/2+c.clientWidth/2}}})},{rootMargin:'-30% 0px -60% 0px'});
    document.querySelectorAll('.cat').forEach(function(s){so.observe(s)});
  }
})();
