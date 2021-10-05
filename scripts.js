const list_container = document.getElementById("list-container");
const play_btn = document.getElementById("play-btn");
const prev_btn = document.getElementById("prev-btn");
const next_btn = document.getElementById("next-btn");
const cover_card_img = document.getElementById("cover-card-img");
const title_card = document.getElementById("title-card");
const progress = document.getElementById("progress-bar");
const audio = document.getElementById("audio");
let is_playing = false;
let index = 1;

const canciones = [
    {
        id: 1,
        title: "A tus pies",
        audio:"audio/A Tus Pies",
        cover:"imgbts/MAWZ.jpeg",
        artist:"LIT killah, Rusherking",
    },
    {
        id: 2,
        title: "Let Me Know ",
        audio:"audio/Let Me Know.mp3",
        cover:"imgbts/album-cover(3).jpg",
        artist:"방탄소년단",
    },
    {
        id: 3,
        title: "No More Dream",
        audio:"audio/No More Dream.mp3",
        cover:"imgbts/2 COOL 4 SKOOL.jpg",
        artist:"방탄소년단",
    },
    {
        id: 4,
        title: "Forever Alone",
        audio:"audio/Forever Alone.mp3",
        cover:"imgbts/Forever Alone.jpg",
        artist:"Paulo Londra",
    },
    {
        id: 5,
        title: "YaMeFui",
        audio:"audio/YaMeFui.mp3",
        cover:"imgbts/YaMeFui.jpg",
        artist:"Bizarrap, Duki, Nicki Nicole",
    },
    {
        id: 6,
        title: "Disfruto: Challenge",
        audio:"audio/Disfruto Challenge.mp3",
        cover:"imgbts/Disfruto Challenge",
        artist:"3AM",
    },
    {
        id: 7,
        title: "음 Mmmh",
        audio:"audio/음 Mmmh.mp3",
        cover:"imgbts/음 Mmmh.jpg",
        artist:"KAI",
    },
    {
        id: 8,
        title: "Dumb Litty",
        audio:"audio/Dumb Litty.mp3",
        cover:"imgbts/Dumb Litty.jpg",
        artist:"KARD (카드)",
    },
    {
        id: 9,
        title: "Make A Wish",
        audio:"audio/Make A Wish.mp3",
        cover:"imgbts/Make A Wish.jpg",
        artist:"NCT U",
    },
    {
        id: 10,
        title: "Burn It (feat. MAX)",
        audio:"audio/Burn It (feat. MAX).mp3",
        cover:"imgbts/Burn It.jpg",
        artist:"Agust D, MAX",
    },
];
const renderizar_canciones = (arr) => {
    list_container.innerHTML = "";
    arr.forEach((e) => {
      list_container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="list-item" id="${e.id}">
          <img class="cover" src="${e.cover} atl="${e.title}"/>
         <div class="song-data">
         <div>${e.title}</div>
         <div>${e.artist}</div>
         </div>
         </div>
          `
      );

    });
};
const play_card = (abj_audio) => {
    cover_card_img.src = abj_audio.cover;
    title_card.innerHTML = abj_audio.title;
    is_playing = true;
    play_btn.innerHTML = "pause";
    index = abj_audio.id; 
};
 const play_audio = (id) => {
     const res = canciones.find((e) => e.id == id);
     if (res){
         audio.src = res.audio;
         audio.play();
         play_card(res);
         Animation_active();
         progress.max = audio.duration;
     }
 };
  const Animation_active = () =>{
      if (is_playing){
          cover_card_img.style.animationPlayState= "running";
      }
      else {
          cover_card_img.style.animationPlayState = "paused";
      }
  };
   list_container.addEventListener("click", (e) =>{
       if (e.target.matches("list-item")) {
           play_audio(e.target.id);
       }
       else if (e.target.matches(".cover")){
           play_audio(e.target.parentNode.id);
       }
       else if (e.target.matches(".song_data")){
           play_audio(e.target.parentNode.id);
       }
       else if (e.target.matches(".song.data div")){
           play_audio(e.target.parentNode.parentNode.id);
       }
   });
   play_btn.addEventListener("click", () =>{
       if (is_playing) {
           audio.pause();
           is_playing = false;
           play_btn.innerHTML = "play";
       }
       else{
           is_playing = true; 
           play_btn.innerHTML = "pause";
           audio.play();
       }
       Animation_active();
   });
   window.addEventListener("load", () => {
       progress.max = audio.duration;
       progress.min = 0;
       window.setInterval(() => {
           progress.value = audio.currentTime;
       },
       1000);
       progress.addEventListener("change", () =>{
           audio.currentTime = progress.value;
       });
   });
   next_btn.addEventListener("click", () =>{
       if (index < canciones.length){
           index++;
           play_audio(index);
       }
   });
prev_btn.addEventListener("click", () =>{
    if (index >0) {
        index--;
    }
});
renderizar_canciones(canciones);
const searche_input = document.getElementById("search-input");
searche_input.addEventListener("keyup", () =>{
    let filtrado = canciones.filter((e) =>
    e.title 
    .toLocaleLowerCase()
    .includes(searche_input.value.toString().toLocaleLowerCase())
    );
    renderizar_canciones(filtrado);
});
