function filterServices() {
    const input = document.getElementById('deptSearch').value.toLowerCase();
    const items = document.getElementsByClassName('service-item');

    for (let i = 0; i < items.length; i++) {
        const name = items[i].getAttribute('data-name').toLowerCase();
        if (name.includes(input)) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }
}

const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => scrollObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// QR CODE GENERATOR LOGIC
window.onload = function() {
    const siteURL = window.location.href; 
    const qrImage = document.getElementById('qrImage');
    const qrSource = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${siteURL}&color=4B0082`;
    qrImage.src = qrSource;
};

function downloadQR() {
    const img = document.getElementById('qrImage');
    const qrUrl = img.src;
    
    fetch(qrUrl)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'PrimaCare_Hospital_QR.png';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
            window.open(qrUrl, '_blank');
        });
}
