window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            else{
                let templateParams = {
                    "sender": "xxxxx@gmail.com",
                    "senderEmail": "",
                    "user": "Howard",
                    "message": "你好"
                }
                templateParams.sender = document.getElementById('senderName').value;
                templateParams.senderEmail = document.getElementById('senderEmail').value;
                templateParams.message = document.getElementById('senderMessage').value;
            
                let service_id = "service_lb0ssd6";
                let template_id = "template_in9yfub";
                let userID = "user_yhejJj8fn7kLmiBNeO9rM"
                emailjs.send(service_id, template_id, templateParams,userID)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                })
                .catch((error) => {
                    console.log('FAILED...', error);
                })
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);


window.addEventListener('scroll',()=>{
    let navbar = document.getElementById('navbar');
    if(document.documentElement.scrollTop > 30){
        navbar.classList.add('active')
    }
    else{
        navbar.classList.remove('active')
    }
})

var timer = null;
var scrollLeft = 0, scrollTop = 0;
document.querySelectorAll('.offcanvas-body a').forEach(x=>{
    x.addEventListener('click',(e)=>{
        window.addEventListener('scroll',e=>{
            clearInterval(timer);
            // 重新新的定時器
            timer = setInterval(function () {
                if (document.documentElement.scrollLeft == scrollLeft && document.documentElement.scrollTop == scrollTop) {
                    // 滾動距離相等，認為停止滾動了
                    clearInterval(timer);
                    // ... 做你想做的事情，如回撥處理
                    $('#offcanvasRight').offcanvas('hide')
                } 
                else {
                    // 否則，依然記住上一次滾動位置
                    scrollLeft = document.documentElement.scrollLeft;
                    scrollTop = document.documentElement.scrollTop;
                }
            }, 100);
        })
    })
})

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
})