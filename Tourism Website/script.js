document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');
  
    links.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior
  
        const targetId = link.getAttribute('href').substring(1); // Get target section id
        const targetSection = document.getElementById(targetId);
  
        // Scroll to the section smoothly
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      });
    });
  });
  