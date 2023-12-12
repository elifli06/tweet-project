const placeholder = document.querySelector(".placeholder");
console.log(placeholder)

const editableInput = document.querySelector(".editable");
console.log(editableInput)

const tweetButton = document.querySelector(".button");
console.log(tweetButton)

const counter = document.getElementById("counter");
console.log(counter)

const readonly = document.querySelector(".readonly");
console.log(readonly)

//tıklanma olayını dinleme yapıyoruz.
editableInput.addEventListener("click", () => {
    placeholder.style.color = "#98a5b1";
});

editableInput.onblur = () => {
    placeholder.style.color = "#333";
  };


  //klavyenin basılma olayını dinliyoruz.
  editableInput.onkeypress = (e) => {
    placeholder.style.display = "none";
    console.log(e)
    inputValidate(e.target.innerText);
  };
  
  //Klavyeden parmağımızı çektiğimiz anı dinliyoruz.
editableInput.onkeyup = (e) => {
    placeholder.style.display = "none";
    inputValidate(e.target.innerText);
  };
  //Yazılan tweetin karakter kontrolu
const inputValidate = (tweet) => {
    //console.log(tweet)
    //dışarıdan gelen input veririsinin uzunluğu
    const tweetLength = tweet.length;
  
    const tweetLimit = 140;
  
  //Kalan karakter limiti
  const currentLimit = tweetLimit - tweetLength;
  console.log(tweetLength)
  console.log(counter);

   //Karakter varmı ona bakıyoruz
   if (tweetLength <= 0) {

    //KARAKTER YOKSA EĞER
    //placeholder görünür hale getirir.

    placeholder.style.display = "block";
    //tweet butonunu pasif yapma işlemi
    tweetButton.classList.remove("active");
    //sayacın görünürlüğünü ortadan kaldırma
    counter.style.display = "none";
  } else {

     //KARAKTER VARSA EĞER

    //Tweet butonunu aktif hale getirme
    tweetButton.classList.add("active");
    //Sayacı görünür yapma işlemi
    counter.style.display = "block";

    //sayacın değerine hesaplanan değeri atama
    counter.innerText = currentLimit;
  }
  let newTweet;

  //KARAKTER SINIRI AŞILDI MI AŞILMADI MI??
  if (tweetLength > tweetLimit) {
    //KARAKTER SINIRININ  AŞILDIĞI DURUM
    //substr ile başlangıç(tweet limiti) ve bitiş(girilen toplam karakter sayısı) noktası belirleyerek taşan karakteri bulma işlemi
    let overTweet = tweet.substr(tweetLimit, tweetLength);
    console.log(overTweet)
    //Taşan karakterleri arka planını kırmızı yapmak için span oluşturma işlemi

    let overTweetElement = `<span class='overTweet'>${overTweet}</span>`;
    console.log(overTweetElement)

    //normal karakteri ve taşan karaketleri birleştirip yeni bir tweet oluşturma
    newTweet = tweet.substr(0, tweetLimit) + overTweetElement;
    //yeni tweet readonly göstereceğimiz için z-indexle görünür yaptık.
    readonly.style.zIndex = "1";
    //sayacın sınırı aşan karakterleri kırmızı gösterme
    counter.style.color = "red";

    //sınır aşıldıysa buttonu pasif yapma
    tweetButton.classList.remove("active");
  } else {

    //KARAKTER SINIRININ AŞILMADIĞI DURUM

    //sayacın kendi normal rengi
    counter.style.color = "#333";
    //taşma işlemi oluştuğu zaman görünür olan yapıyı görünmez yapma işlemi
    readonly.style.zIndex = "-5";
  }

  //oluşan yeni tweeti göstermek için html tarafına gönderme yapma işlemi
  readonly.innerHTML = newTweet;
};