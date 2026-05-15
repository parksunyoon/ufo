document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact form script loaded'); // 스크립트 로드 확인

    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Contact form not found!');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted'); // 폼 제출 확인

        const btn = document.querySelector('.submit-btn');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Form data:', { name, email, message }); // 폼 데이터 확인

        btn.disabled = true;
        btn.textContent = 'Sending...';

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        console.log('Attempting to send email...'); // 이메일 전송 시도 확인

        emailjs.send('service_ufo', 'template_tqic2fq', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('메일이 성공적으로 전송되었습니다.');
                form.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                alert('메일 전송에 실패했습니다. 다시 시도해주세요.');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Send';
                console.log('Email send attempt completed'); // 전송 완료 확인
            });
    });
}); 